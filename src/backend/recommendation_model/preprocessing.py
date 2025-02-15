import pandas as pd
import numpy as np
import re
import nltk
from nltk.corpus import stopwords
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Download stopwords
nltk.download('stopwords')

def load_and_clean_data(filepath):
    """
    Load CSV file and preprocess the data
    """
    df = pd.read_csv(filepath)
    df.dropna(inplace=True)
    
    if 'Review' not in df.columns:
        raise KeyError("Column 'Review' not found in dataset")
    
    # Clean reviews
    df['clean_review'] = df['Review'].apply(clean_text)
    
    # ✅ Aggregate reviews by Destination
    df_grouped = df.groupby("Destination")['clean_review'].apply(lambda x: ' '.join(x)).reset_index()
    return df_grouped

def clean_text(text):
    """
    Function to clean text data
    """
    text = text.lower()
    text = re.sub(r'[^a-z\s]', '', text)
    text = ' '.join([word for word in text.split() if word not in stopwords.words('english')])
    return text

def vectorize_text(df):
    """
    Convert text data into numerical format using TF-IDF
    """
    tfidf = TfidfVectorizer(stop_words="english")
    tfidf_matrix = tfidf.fit_transform(df['clean_review'])
    return tfidf, tfidf_matrix

def compute_similarity(tfidf_matrix):
    """
    Compute cosine similarity between destinations
    """
    cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)
    return cosine_sim

def get_recommendations(destination_name, df, cosine_sim, top_n=5):
    indices = pd.Series(df.index, index=df['Destination']).drop_duplicates()

    # ✅ Check if the destination exists in the dataset
    if destination_name not in indices:
        return ["Destination not found"]

    idx = indices[destination_name]
    sim_scores = list(enumerate(cosine_sim[idx]))  # ✅ Ensure sim_scores is a list of tuples

    # ✅ Convert numpy array scores to float properly
    def extract_score(score):
        if isinstance(score, np.ndarray):
            if score.size == 1:
                return float(score.item())  # ✅ Extract single scalar value
            else:
                return float(np.mean(score))  # ✅ Handle unexpected multi-value cases
        return float(score)  # ✅ Convert normal values

    sim_scores = sorted(sim_scores, key=lambda x: extract_score(x[1]), reverse=True)

    # ✅ Print top scores for debugging
    print(f"Top 10 similarity scores for {destination_name}:")
    for i, score in sim_scores[:10]:
        print(f"{df['Destination'].iloc[i]} -> {extract_score(score)}")

    # ✅ Remove the input destination itself
    sim_scores = sim_scores[1:]

    # ✅ Extract top N unique destinations
    unique_destinations = []
    for i, score in sim_scores:
        score = extract_score(score)  # Ensure score is a single float
        if score > 0:
            destination = df['Destination'].iloc[i]
            if destination not in unique_destinations:
                unique_destinations.append(destination)
            if len(unique_destinations) == top_n:
                break

    return unique_destinations if unique_destinations else ["No similar destinations found"]


# Example Usage
filepath = "D:/Year 3-Sem-2/SightseerProject/sightseer/src/backend/DataSet/Destination Reviews (final).csv"
df = load_and_clean_data(filepath)
tfidf, tfidf_matrix = vectorize_text(df)
cosine_sim = compute_similarity(tfidf_matrix)

# Get recommendations
print(df[df["Destination"] == "Attidiya Bird Sanctuary"])
print(get_recommendations("Attidiya Bird Sanctuary", df, cosine_sim))
