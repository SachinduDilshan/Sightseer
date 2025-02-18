from fastapi import FastAPI
from pydantic import BaseModel
import pickle
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Enable CORS for frontend-backend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load precomputed similarity matrices with error handling
similarity_matrices = {}
try:
    similarity_matrices["destinations"] = pickle.load(open("cosine_similarity_destinations.pkl", "rb"))
    similarity_matrices["hotels"] = pickle.load(open("cosine_similarity_hotels.pkl", "rb"))
    similarity_matrices["restaurants"] = pickle.load(open("cosine_similarity_restaurants.pkl", "rb"))
    similarity_matrices["travel_agents"] = pickle.load(open("cosine_similarity_travel_agents.pkl", "rb"))
    similarity_matrices["tourist_shops"] = pickle.load(open("cosine_similarity_tourist_shops.pkl", "rb"))
    print("✅ Similarity matrices loaded successfully!")
except Exception as e:
    print(f"❌ Error loading similarity matrices: {e}")

# Load data files
data_files = {
    "destinations": pd.read_csv("D:/Year 3-Sem-2/SightseerProject/sightseer/src/backend/DataSet/Destination Reviews (final).csv"),
    "hotels": pd.read_csv("D:/Year 3-Sem-2/SightseerProject/sightseer/src/backend/DataSet/Information for Accommodation_SL.csv"),
    "restaurants": pd.read_csv("D:/Year 3-Sem-2/SightseerProject/sightseer/src/backend/DataSet/SL_Restaurants.csv"),
    "travel_agents": pd.read_csv("D:/Year 3-Sem-2/SightseerProject/sightseer/src/backend/DataSet/SL_Travel_Agents.csv"),
    "tourist_shops": pd.read_csv("D:/Year 3-Sem-2/SightseerProject/sightseer/src/backend/DataSet/SL_Tourist_Shops.csv")
}
print("✅ Data files loaded successfully!")

# Request model for user preferences
class UserPreferences(BaseModel):
    interests: list[str]
    budget: str
    travel_style: str
    travel_agent: bool

# Recommendation function based on user preferences
def get_recommendations(preferences: UserPreferences, top_n=5):
    print("\n🔍 Debugging get_recommendations()")
    print(f"Received user preferences: {preferences}")

    recommendations = {
        "destinations": [],
        "hotels": [],
        "restaurants": [],
        "travel_agents": [],
        "tourist_shops": []
    }

    for category, df in data_files.items():
        if category not in similarity_matrices:
            print(f"⚠️ No similarity matrix found for {category}, skipping...")
            continue

        similarity_matrix = similarity_matrices[category]

        # Ensure the dataset has enough rows
        if df.shape[0] == 0:
            print(f"⚠️ No data available for {category}, skipping...")
            continue

        # Check if the required column exists
        column_name = df.columns[1]  # Assuming the second column is the relevant text
        print(f"🔹 Searching for interests in column: {column_name}")

        # Find items matching user's interests
        matched_items = df[df[column_name].str.contains("|".join(preferences.interests), case=False, na=False)]
        print(f"✅ Found {len(matched_items)} matches for {category}")

        if matched_items.empty:
            print(f"⚠️ No matches found for {category}, skipping...")
            continue

        # Select the first matching item
        top_item = matched_items.iloc[0, 0]
        index = df[df.iloc[:, 0] == top_item].index[0]

        # Compute similarity scores
        sim_scores = list(enumerate(similarity_matrix[index]))
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)[1:top_n+1]  # Exclude self-match

        recommendations[category] = [df.iloc[i[0], 0] for i in sim_scores]

        print(f"📌 Top {top_n} recommendations for {category}: {recommendations[category]}")

    return recommendations

# API endpoint for recommendations
@app.post("/recommend")
def recommend_trip(user_prefs: UserPreferences):
    print("\n📩 Received request to /recommend")
    print(f"User preferences: {user_prefs}")

    trip_plan = get_recommendations(user_prefs)
    print(f"🔍 Matched items for {category}:")
    print(matched_items[['Destination']])

    if not any(trip_plan.values()):  # If all lists are empty
        print("❌ No recommendations found!")
    
    return {"trip_plan": trip_plan}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
