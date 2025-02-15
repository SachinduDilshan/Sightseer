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
def load_and_clean_data(filepath):
    """
    Load CSV file, drop missing values, and clean text data.
    """
    df = pd.read_csv(filepath)
    df.dropna(subset=['Review'], inplace=True)  # Drop rows with missing reviews

    if 'Destination' not in df.columns:
        raise KeyError("Column 'Destination' not found in dataset")

    df['clean_review'] = df['Review'].apply(clean_text)

    # Group reviews by destination (combine all reviews for each destination)
    df_grouped = df.groupby('Destination')['clean_review'].apply(lambda x: ' '.join(x)).reset_index()

    return df_grouped

# ---- TEXT CLEANING ----
def clean_text(text):
    """
    Preprocess text: lowercase, remove special characters, and remove stopwords.
    """
    text = text.lower()
    text = re.sub(r'[^a-z\s]', '', text)  # Remove punctuation & numbers
    text = ' '.join([word for word in text.split() if word not in stop_words])  # Remove stopwords
    return text

# ---- TEXT VECTORIZATION ----
def vectorize_text(df):
    """
    Convert text data into numerical format using TF-IDF.
    """
    tfidf = TfidfVectorizer(ngram_range=(1, 2))  # Use unigrams & bigrams
    tfidf_matrix = tfidf.fit_transform(df['clean_review'])
    return tfidf, tfidf_matrix

# ---- COMPUTE SIMILARITY ----
def compute_similarity(tfidf_matrix):
    """
    Compute cosine similarity between destination reviews.
    """
    return cosine_similarity(tfidf_matrix, tfidf_matrix)

# ---- RECOMMENDATION SYSTEM ----
def get_recommendations(destination_name, df, cosine_sim, top_n=5):
    """
    Given a destination, return the most similar destinations.
    """
    indices = pd.Series(df.index, index=df['Destination']).drop_duplicates()

    if destination_name not in indices:
        return ["Destination not found"]

    idx = indices[destination_name]
    sim_scores = list(enumerate(cosine_sim[idx]))  # Get similarity scores

    # Sort based on similarity score
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

    # Debugging: Print top similarity scores
    print(f"🔍 Top 10 Similarity Scores for '{destination_name}':")
    for i, score in sim_scores[:10]:
        print(f"{df['Destination'].iloc[i]} -> {score:.4f}")

    # Remove the input destination itself
    sim_scores = sim_scores[1:]

    # Extract top N unique destinations
    unique_destinations = []
    for i, score in sim_scores:
        if score > 0:  # Only consider meaningful recommendations
            destination = df['Destination'].iloc[i]
            if destination not in unique_destinations:
                unique_destinations.append(destination)
            if len(unique_destinations) == top_n:
                break

    return unique_destinations if unique_destinations else ["No similar destinations found"]

# ---- SAVE & LOAD SIMILARITY MATRIX ----
def save_similarity_matrix(cosine_sim, filename="cosine_similarity.pkl"):
    """
    Save the computed cosine similarity matrix to a file.
    """
    with open(filename, "wb") as f:
        pickle.dump(cosine_sim, f)

def load_similarity_matrix(filename="cosine_similarity.pkl"):
    """
    Load the cosine similarity matrix from a file.
    """
    with open(filename, "rb") as f:
        return pickle.load(f)

# ---- MAIN EXECUTION ----
if __name__ == "__main__":
    filepath = "D:/Year 3-Sem-2/SightseerProject/sightseer/src/backend/DataSet/Destination Reviews (final).csv"
    
    print("📥 Loading and cleaning data...")
    df = load_and_clean_data(filepath)
    
    print("📝 Vectorizing text...")
    tfidf, tfidf_matrix = vectorize_text(df)
    
    print("📊 Computing similarity matrix...")
    cosine_sim = compute_similarity(tfidf_matrix)
    
    save_similarity_matrix(cosine_sim)  # Save for future use
    
    # Debugging: Print sample cleaned data
    print("\n📌 Sample Data After Cleaning & Grouping:")
    print(df.head())

    # Example: Get recommendations for a destination
    destination_query = "Attidiya Bird Sanctuary"
    print(f"\n🔍 Finding similar destinations to: {destination_query}")
    recommendations = get_recommendations(destination_query, df, cosine_sim)
    
    print("🎯 Recommended Destinations:", recommendations)
