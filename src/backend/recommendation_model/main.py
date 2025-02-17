from fastapi import FastAPI, Query
import pickle
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity

app = FastAPI()  # Initialize FastAPI app

# Load precomputed similarity matrices
similarity_matrices = {
    "destinations": pickle.load(open("cosine_similarity_destinations.pkl", "rb")),
    "hotels": pickle.load(open("cosine_similarity_hotels.pkl", "rb")),
    "restaurants": pickle.load(open("cosine_similarity_restaurants.pkl", "rb")),
    "travel_agents": pickle.load(open("cosine_similarity_travel_agents.pkl", "rb")),
    "tourist_shops": pickle.load(open("cosine_similarity_tourist_shops.pkl", "rb"))
}

# Load the corresponding data files
data_files = {
    "destinations": pd.read_csv("D:/Year 3-Sem-2/SightseerProject/sightseer/src/backend/DataSet/Destination Reviews (final).csv"),
    "hotels": pd.read_csv("D:/Year 3-Sem-2/SightseerProject/sightseer/src/backend/DataSet/Information for Accommodation_SL.csv"),
    "restaurants": pd.read_csv("D:/Year 3-Sem-2/SightseerProject/sightseer/src/backend/DataSet/SL_Restaurants.csv"),
    "travel_agents": pd.read_csv("D:/Year 3-Sem-2/SightseerProject/sightseer/src/backend/DataSet/SL_Travel_Agents.csv"),
    "tourist_shops": pd.read_csv("D:/Year 3-Sem-2/SightseerProject/sightseer/src/backend/DataSet/SL_Tourist_Shops.csv")
}

# Recommendation function
def get_recommendations(category, name, top_n=5):
    if category not in similarity_matrices:
        return {"error": "Invalid category"}

    df = data_files[category]
    similarity_matrix = similarity_matrices[category]

    if name not in df.iloc[:, 0].values:
        return {"error": f"{name} not found in {category} dataset"}

    index = df[df.iloc[:, 0] == name].index[0]
    sim_scores = list(enumerate(similarity_matrix[index]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)[1:top_n+1]
    
    recommendations = [df.iloc[i[0], 0] for i in sim_scores]
    return {"recommendations": recommendations}

# API endpoint for recommendations
@app.get("/recommendations/")
def recommend(category: str = Query(..., description="Category of recommendation"),
              name: str = Query(..., description="Name of the entity"),
              top_n: int = Query(5, description="Number of recommendations")):
    return get_recommendations(category, name, top_n)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
