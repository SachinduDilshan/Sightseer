from fastapi import FastAPI
from pydantic import BaseModel
import pickle
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()  # Initialize FastAPI app

# Enable CORS for frontend-backend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Restrict to frontend origin for security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load precomputed similarity matrices
similarity_matrices = {
    "destinations": pickle.load(open("cosine_similarity_destinations.pkl", "rb")),
    "hotels": pickle.load(open("cosine_similarity_hotels.pkl", "rb")),
    "restaurants": pickle.load(open("cosine_similarity_restaurants.pkl", "rb")),
    "travel_agents": pickle.load(open("cosine_similarity_travel_agents.pkl", "rb")),
    "tourist_shops": pickle.load(open("cosine_similarity_tourist_shops.pkl", "rb"))
}

# Load corresponding data files
data_files = {
    "destinations": pd.read_csv("D:/Year 3-Sem-2/SightseerProject/sightseer/src/backend/DataSet/Destination Reviews (final).csv"),
    "hotels": pd.read_csv("D:/Year 3-Sem-2/SightseerProject/sightseer/src/backend/DataSet/Information for Accommodation_SL.csv"),
    "restaurants": pd.read_csv("D:/Year 3-Sem-2/SightseerProject/sightseer/src/backend/DataSet/SL_Restaurants.csv"),
    "travel_agents": pd.read_csv("D:/Year 3-Sem-2/SightseerProject/sightseer/src/backend/DataSet/SL_Travel_Agents.csv"),
    "tourist_shops": pd.read_csv("D:/Year 3-Sem-2/SightseerProject/sightseer/src/backend/DataSet/SL_Tourist_Shops.csv")
}

# Request model for user preferences
class UserPreferences(BaseModel):
    interests: list[str]
    budget: str
    travel_style: str
    travel_agent: bool

# Recommendation function based on user preferences
def get_recommendations(preferences: UserPreferences, top_n=5):
    recommendations = {
        "destinations": [],
        "hotels": [],
        "restaurants": [],
        "travel_agents": [],
        "tourist_shops": []
    }

    # Loop through each category and filter based on user preferences
    for category, df in data_files.items():
        similarity_matrix = similarity_matrices[category]

        # Find items matching the user's interest
        matched_items = df[df.iloc[:, 1].str.contains("|".join(preferences.interests), case=False, na=False)]

        if matched_items.empty:
            continue  # Skip if no match

        top_item = matched_items.iloc[0, 0]  # Take first matching item
        index = df[df.iloc[:, 0] == top_item].index[0]
        sim_scores = list(enumerate(similarity_matrix[index]))
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)[1:top_n+1]

        recommendations[category] = [df.iloc[i[0], 0] for i in sim_scores]

    return recommendations

# API endpoint for personalized recommendations
@app.post("/recommend")
def recommend_trip(user_prefs: UserPreferences):
    trip_plan = get_recommendations(user_prefs)
    return {"trip_plan": trip_plan}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
