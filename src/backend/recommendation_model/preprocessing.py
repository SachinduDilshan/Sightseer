import pandas as pd
import numpy as np
import re
import os
import nltk
import pickle
from nltk.corpus import stopwords
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Download stopwords if not already available
nltk.download('stopwords')
stop_words = set(stopwords.words('english'))  # Load stopwords

# ---- TEXT CLEANING FUNCTION ----
def clean_text(text):
    """
    Preprocess text: convert to lowercase, remove special characters, and stopwords.
    """
    text = str(text).lower()
    text = re.sub(r'[^a-z\s]', '', text)  # Remove punctuation & numbers
    text = ' '.join([word for word in text.split() if word not in stop_words])  # Remove stopwords
    return text

# ---- DATA LOADING & CLEANING FUNCTION ----
def load_and_clean_data(data, text_column, group_by_column, is_dataframe=False):
    """
    Load CSV file (or accept a DataFrame), drop missing values, and clean text data.
    """
    if is_dataframe:
        df = data.copy()
    else:
        if not os.path.exists(data):
            print(f"⚠️ Warning: File not found: {data}. Skipping...")
            return None
        df = pd.read_csv(data)

    if text_column not in df.columns or group_by_column not in df.columns:
        print(f"❌ Error: Missing columns '{text_column}' or '{group_by_column}' in dataset. Skipping...")
        return None

    df.dropna(subset=[text_column], inplace=True)
    df['clean_text'] = df[text_column].apply(clean_text)
    df_grouped = df.groupby(group_by_column)['clean_text'].apply(lambda x: ' '.join(x)).reset_index()
    return df_grouped

# ---- TEXT VECTORIZATION FUNCTION ----
def vectorize_text(df, text_column):
    """Convert text data into numerical format using TF-IDF."""
    tfidf = TfidfVectorizer(ngram_range=(1, 2))  # Unigrams & bigrams
    tfidf_matrix = tfidf.fit_transform(df[text_column])
    return tfidf, tfidf_matrix

# ---- COMPUTE SIMILARITY FUNCTION ----
def compute_similarity(tfidf_matrix):
    """Compute cosine similarity between entities."""
    return cosine_similarity(tfidf_matrix, tfidf_matrix)

# ---- SAVE FUNCTIONS ----
def save_pickle(data, filename):
    """Save data to a pickle file."""
    with open(filename, "wb") as f:
        pickle.dump(data, f)

def save_index_mapping(df, index_column, filename):
    """Save a dictionary mapping indices to names."""
    index_mapping = {i: name for i, name in enumerate(df[index_column])}
    save_pickle(index_mapping, filename)

# ---- MAIN EXECUTION ----
if __name__ == "__main__":
    dataset_paths = {
        "destinations": "D:/Year 3-Sem-2/SightseerProject/sightseer/src/backend/DataSet/Destination Reviews (final).csv",
        "hotels": "D:/Year 3-Sem-2/SightseerProject/sightseer/src/backend/DataSet/Information for Accommodation_SL.csv",
        "restaurants": "D:/Year 3-Sem-2/SightseerProject/sightseer/src/backend/DataSet/SL_Restaurants.csv",
        "travel_agents": "D:/Year 3-Sem-2/SightseerProject/sightseer/src/backend/DataSet/SL_Travel_Agents.csv",
        "tourist_shops": "D:/Year 3-Sem-2/SightseerProject/sightseer/src/backend/DataSet/SL_Tourist_Shops.csv"
    }

    column_mappings = {
        "destinations": ("District", "Destination"),
        "hotels": ("Hotel_Name", "Hotel_Type"),
        "restaurants": ("combined_text", "Restaurant_Name"),
        "travel_agents": ("combined_text", "Agent_Name"),
        "tourist_shops": ("combined_text", "Shop_Name")
    }

    cleaned_data = {}

    for category, path in dataset_paths.items():
        print(f"📥 Loading and cleaning data for {category}...")

        if not os.path.exists(path):
            print(f"⚠️ Warning: File for {category} not found: {path}. Skipping...")
            continue

        df = pd.read_csv(path)

        if category in ["restaurants", "travel_agents", "tourist_shops"]:
            required_cols = {
                "restaurants": ["District", "Grade", "Address", "Restaurant_Name"],
                "travel_agents": ["District", "Agent_Name"],
                "tourist_shops": ["District", "Shop_Name"]
            }
            
            if not all(col in df.columns for col in required_cols[category]):
                print(f"⚠️ Warning: Missing required columns in {category} dataset. Skipping...")
                continue

            df["combined_text"] = df[required_cols[category][0]].astype(str)
            for col in required_cols[category][1:-1]:
                df["combined_text"] += " " + df[col].astype(str)
            cleaned_data[category] = load_and_clean_data(df, "combined_text", required_cols[category][-1], is_dataframe=True)
        else:
            text_col, group_col = column_mappings[category]
            cleaned_data[category] = load_and_clean_data(path, text_col, group_col)

        if cleaned_data[category] is None:
            print(f"⚠️ Skipping {category} due to missing data.")
            continue

        print(f"📝 Vectorizing text for {category}...")
        tfidf, tfidf_matrix = vectorize_text(cleaned_data[category], "clean_text")

        print(f"📊 Computing similarity matrix for {category}...")
        cosine_sim = compute_similarity(tfidf_matrix)

        save_filename = f"cosine_similarity_{category}.pkl"
        save_pickle(cosine_sim, save_filename)
        print(f"✅ Saved similarity matrix: {save_filename}")

        index_mapping_file = f"index_mapping_{category}.pkl"
        save_index_mapping(cleaned_data[category], column_mappings[category][1], index_mapping_file)
        print(f"✅ Saved index mapping: {index_mapping_file}")

print("✅ Preprocessing complete. All similarity matrices saved!")
