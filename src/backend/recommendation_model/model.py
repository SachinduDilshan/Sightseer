import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Load the dataset (modify path as needed)
dest_reviews = pd.read_csv("./DataSet/Destination Reviews (final).csv")

# Preprocess text data (Combine reviews & category for recommendation)
dest_reviews['content'] = dest_reviews['review_text'] + " " + dest_reviews['category']

# TF-IDF Vectorization
tfidf = TfidfVectorizer(stop_words='english')
tfidf_matrix = tfidf.fit_transform(dest_reviews['content'])

# Compute similarity scores
cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)

def get_recommendations(user_data):
    """
    Recommend destinations based on user interests.
    """
    interests = user_data.get('interests', '')
    
    # Transform user input into vector
    user_vector = tfidf.transform([interests])
    
    # Compute similarity between user input and destinations
    scores = cosine_similarity(user_vector, tfidf_matrix).flatten()
    
    # Get top 5 recommendations
    top_indices = scores.argsort()[-5:][::-1]
    recommendations = dest_reviews.iloc[top_indices][['destination_name', 'rating']].to_dict(orient='records')
    
    return recommendations
