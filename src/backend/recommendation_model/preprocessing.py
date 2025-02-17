import pandas as pd
import numpy as np
import re
import nltk
import pickle
from nltk.corpus import stopwords
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Download stopwords if not already available
nltk.download('stopwords')
stop_words = set(stopwords.words('english'))  # Load stopwords

# ---- DATA LOADING & CLEANING ----
def load_and_clean_data(filepath, text_column, group_by_column):
    """
    Load CSV file, drop missing values, and clean text data.
    """
    df = pd.read_csv(filepath)

    # Ensure required columns exist
    if text_column not in df.columns or group_by_column not in df.columns:
        raise KeyError(f"Missing required columns '{text_column}' or '{group_by_column}' in {filepath}")

    df.dropna(subset=[text_column], inplace=True)  # Drop rows with missing text
    df['clean_text'] = df[text_column].apply(clean_text)
    
    # Group by the specified column and merge text
    df_grouped = df.groupby(group_by_column)['clean_text'].apply(lambda x: ' '.join(x)).reset_index()
    return df_grouped

# ---- TEXT CLEANING ----
def clean_text(text):
    """
    Preprocess text: lowercase, remove special characters, and remove stopwords.
    """
    text = str(text).lower()
    text = re.sub(r'[^a-z\s]', '', text)  # Remove punctuation & numbers
    text = ' '.join([word for word in text.split() if word not in stop_words])  # Remove stopwords
    return text

# ---- TEXT VECTORIZATION ----
def vectorize_text(df, text_column):
    """
    Convert text data into numerical format using TF-IDF.
    """
    tfidf = TfidfVectorizer(ngram_range=(1, 2))  # Use unigrams & bigrams
    tfidf_matrix = tfidf.fit_transform(df[text_column])
    return tfidf, tfidf_matrix

# ---- COMPUTE SIMILARITY ----
def compute_similarity(tfidf_matrix):
    """
    Compute cosine similarity between entities.
    """
    return cosine_similarity(tfidf_matrix, tfidf_matrix)

# ---- SAVE & LOAD SIMILARITY MATRIX ----
def save_similarity_matrix(cosine_sim, filename):
    """
    Save the computed cosine similarity matrix to a file.
    """
    with open(filename, "wb") as f:
        pickle.dump(cosine_sim, f)

def load_similarity_matrix(filename):
    """
    Load the cosine similarity matrix from a file.
    """
    with open(filename, "rb") as f:
        return pickle.load(f)

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
        "destinations": ("Review", "Destination"),
        "hotels": ("Hotel_Description", "Hotel_Name"),
        "restaurants": ("combined_text", "Restaurant_Name"),  # Combined text will be created
        "travel_agents": ("combined_text", "Agent_Name"),
        "tourist_shops": ("combined_text", "Shop_Name")
    }

    cleaned_data = {}

    for category, path in dataset_paths.items():
        print(f"📥 Loading and cleaning data for {category}...")

        df = pd.read_csv(path)  # Load dataset first

        # Handling dataset-specific preprocessing
        if category == "restaurants":
            required_cols = ["District", "Grade", "Address", "Restaurant_Name"]
            if not all(col in df.columns for col in required_cols):
                raise KeyError(f"Missing required columns in the restaurant dataset: {required_cols}")

            df["combined_text"] = (
                df["District"].astype(str) + " " +
                df["Grade"].astype(str) + " " +
                df["Address"].astype(str)
            )
        
        elif category == "travel_agents":
            required_cols = ["District", "Agent_Name"]
            if not all(col in df.columns for col in required_cols):
                raise KeyError(f"Missing required columns in the travel agents dataset: {required_cols}")

            df["combined_text"] = df["District"].astype(str)

        elif category == "tourist_shops":
            required_cols = ["District", "Shop_Name"]
            if not all(col in df.columns for col in required_cols):
                raise KeyError(f"Missing required columns in the tourist shops dataset: {required_cols}")

            df["combined_text"] = df["District"].astype(str)

        # Load and clean data
        text_col, group_col = column_mappings[category]
        cleaned_data[category] = load_and_clean_data(path, text_col, group_col)

        print(f"📝 Vectorizing text for {category}...")
        tfidf, tfidf_matrix = vectorize_text(cleaned_data[category], "clean_text")

        print(f"📊 Computing similarity matrix for {category}...")
        cosine_sim = compute_similarity(tfidf_matrix)

        save_similarity_matrix(cosine_sim, f"cosine_similarity_{category}.pkl")  # Save per category

    print("✅ Preprocessing complete. All similarity matrices saved!")