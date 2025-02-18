from fastapi import FastAPI, HTTPException
import pickle
import os

app = FastAPI()

# Function to load pickle files safely
def load_pickle_file(filename):
    if not os.path.exists(filename):
        print(f"⚠️ Warning: {filename} not found. Skipping...")
        return None
    with open(filename, "rb") as f:
        return pickle.load(f)

# Load similarity matrices
similarity_matrices = {
    "destinations": load_pickle_file("cosine_similarity_destinations.pkl"),
    "hotels": load_pickle_file("cosine_similarity_hotels.pkl"),
    "restaurants": load_pickle_file("cosine_similarity_restaurants.pkl"),
    "travel_agents": load_pickle_file("cosine_similarity_travel_agents.pkl"),
    "tourist_shops": load_pickle_file("cosine_similarity_tourist_shops.pkl"),
}

# Load index-to-name mappings
index_mappings = {
    "destinations": load_pickle_file("index_mapping_destinations.pkl"),
    "hotels": load_pickle_file("index_mapping_hotels.pkl"),
    "restaurants": load_pickle_file("index_mapping_restaurants.pkl"),
    "travel_agents": load_pickle_file("index_mapping_travel_agents.pkl"),
    "tourist_shops": load_pickle_file("index_mapping_tourist_shops.pkl"),
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
a
    Returns:
        List of recommended names.
    """
    if category not in similarity_matrices:
        raise HTTPException(status_code=400, detail="Invalid category")

    cosine_sim = similarity_matrices[category]
    index_mapping = index_mappings[category]

    if cosine_sim is None or index_mapping is None:
        raise HTTPException(status_code=500, detail=f"Data for {category} not found.")

    if index < 0 or index >= len(cosine_sim):
        raise HTTPException(status_code=400, detail="Invalid index")

    similar_indices = cosine_sim[index].argsort()[-6:-1][::-1]
    recommended_names = [index_mapping[i] for i in similar_indices if i in index_mapping]

    return {"recommendations": recommended_names}
