from fastapi import FastAPI, HTTPException
import pickle
import os

app = FastAPI()

# Function to load similarity matrices safely
def load_similarity_matrix(filename):
    if not os.path.exists(filename):
        print(f"⚠️ Warning: {filename} not found. Skipping...")
        return None
    with open(filename, "rb") as f:
        return pickle.load(f)

# Load all similarity matrices
similarity_matrices = {
    "destinations": load_similarity_matrix("cosine_similarity_destinations.pkl"),
    "hotels": load_similarity_matrix("cosine_similarity_hotels.pkl"),
    "restaurants": load_similarity_matrix("cosine_similarity_restaurants.pkl"),
    "travel_agents": load_similarity_matrix("cosine_similarity_travel_agents.pkl"),
    "tourist_shops": load_similarity_matrix("cosine_similarity_tourist_shops.pkl"),
}

@app.get("/")
def home():
    return {"message": "FastAPI is working!"}

@app.get("/recommend/{category}/{index}")
def recommend(category: str, index: int):
    """
    Recommend similar places based on cosine similarity.

    Args:
        category (str): One of ['destinations', 'hotels', 'restaurants', 'travel_agents', 'tourist_shops']
        index (int): Index of the selected place.

    Returns:
        List of recommended indices or an error message.
    """
    # Validate category
    if category not in similarity_matrices:
        raise HTTPException(status_code=400, detail="Invalid category")

    cosine_sim = similarity_matrices[category]

    # Check if similarity matrix exists
    if cosine_sim is None:
        raise HTTPException(status_code=500, detail=f"Similarity matrix for {category} not found.")

    # Validate index
    if index < 0 or index >= len(cosine_sim):
        raise HTTPException(status_code=400, detail="Invalid index")

    # Get the top 5 similar places (excluding itself)
    similar_indices = cosine_sim[index].argsort()[-6:-1][::-1]
    
    return {"recommendations": similar_indices.tolist()}
