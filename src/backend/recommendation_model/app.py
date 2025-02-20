from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pickle
import pandas as pd
import os
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Enable CORS for frontend-backend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Function to safely load pickle files
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

# Load data files
data_files = {}
file_paths = {
    "destinations": "D:/Year 3-Sem-2/SightseerProject/sightseer/src/backend/DataSet/Destination Reviews (final).csv",
    "hotels": "D:/Year 3-Sem-2/SightseerProject/sightseer/src/backend/DataSet/Information for Accommodation_SL.csv",
    "restaurants": "D:/Year 3-Sem-2/SightseerProject/sightseer/src/backend/DataSet/SL_Restaurants.csv",
    "travel_agents": "D:/Year 3-Sem-2/SightseerProject/sightseer/src/backend/DataSet/SL_Travel_Agents.csv",
    "tourist_shops": "D:/Year 3-Sem-2/SightseerProject/sightseer/src/backend/DataSet/SL_Tourist_Shops.csv"
}

for category, path in file_paths.items():
    try:
        data_files[category] = pd.read_csv(path)
        print(f"✅ {category} data loaded successfully!")
    except Exception as e:
        print(f"❌ Error loading {category} data: {e}")

# Request model for user preferences
class UserPreferences(BaseModel):
    interests: list[str]
    budget: str
    travel_style: str
    travel_agent: bool
    
    # Optional fields (for compatibility with frontend)
    districts: list[str] = None
    date_range: dict = None

# Improved recommendation function
def get_recommendations(preferences: UserPreferences, top_n=5):
    recommendations = {category: [] for category in similarity_matrices.keys()}
    
    # Debug info
    print(f"Processing preferences: {preferences}")
    
    # Special handling for travel agents based on preference
    if not preferences.travel_agent:
        recommendations.pop("travel_agents", None)
    
    # Process each category
    for category, df in data_files.items():
        if category not in similarity_matrices or similarity_matrices[category] is None:
            print(f"Skipping {category}: Missing similarity matrix")
            continue
            
        if df is None or df.empty:
            print(f"Skipping {category}: Empty dataset")
            continue

        similarity_matrix = similarity_matrices[category]
        
        # Fallback approach: If no matches found, use first item as reference
        if df.shape[0] > 0:
            # Try to find items matching interests
            if preferences.interests:
                interest_pattern = "|".join(preferences.interests)
                # Search all text columns for matching interests
                text_columns = df.select_dtypes(include=['object']).columns
                
                for col in text_columns:
                    matched_items = df[df[col].str.contains(interest_pattern, case=False, na=False)]
                    if not matched_items.empty:
                        print(f"Found matches in {category} column {col}")
                        break
                else:
                    # If no matches in any column, use first row
                    matched_items = df.head(1)
                    print(f"No matches found in {category}, using first item")
            else:
                # If no interests provided, use first row
                matched_items = df.head(1)
                
            # Get index for selected item
            top_item_idx = matched_items.index[0]
            
            # Get similar items
            if 0 <= top_item_idx < len(similarity_matrix):
                sim_scores = sorted(list(enumerate(similarity_matrix[top_item_idx])), 
                                   key=lambda x: x[1], reverse=True)[1:top_n+1]
                
                # Get name from first column (assuming ID/name is first column)
                recommended_indices = [i[0] for i in sim_scores]
                recommendations[category] = [
     {
        "name": df.iloc[i, 0],  # Assuming first column is name
        "district": df.iloc[i]["District"] if "District" in df.columns else "Unknown"
    }
    for i in recommended_indices
]

                
                print(f"Found {len(recommendations[category])} recommendations for {category}")
            else:
                print(f"Invalid index {top_item_idx} for {category}")

    # Ensure we have at least some recommendations
    if not any(recommendations.values()):
        # Fallback: provide some default recommendations
        print("No matches found, using fallback recommendations")
        for category, df in data_files.items():
            if df is not None and not df.empty and category in recommendations:
                recommendations[category] = df.iloc[:min(top_n, len(df)), 0].tolist()
    
    return recommendations

# API Endpoints
@app.get("/")
def home():
    return {"message": "FastAPI is running!"}

@app.get("/recommend/{category}/{index}")
def recommend(category: str, index: int):
    """Get recommendations based on cosine similarity."""
    if category not in similarity_matrices:
        raise HTTPException(status_code=400, detail="Invalid category")

    cosine_sim = similarity_matrices[category]
    index_mapping = index_mappings.get(category)

    if cosine_sim is None or index_mapping is None:
        raise HTTPException(status_code=500, detail=f"Data for {category} not found.")

    if index < 0 or index >= len(cosine_sim):
        raise HTTPException(status_code=400, detail="Invalid index")

    similar_indices = cosine_sim[index].argsort()[-6:-1][::-1]
    recommended_names = [index_mapping[i] for i in similar_indices if i in index_mapping]

    return {"recommendations": recommended_names}

@app.post("/recommend")
def recommend_trip(user_prefs: UserPreferences):
    """Generate a trip plan based on user preferences."""
    print(f"Received preferences: {user_prefs}")
    
    trip_plan = get_recommendations(user_prefs)
    
    # Debug info
    print(f"Generated plan: {trip_plan}")
    
    if not any(trip_plan.values()):  # If all lists are empty
        raise HTTPException(status_code=404, detail="No recommendations found")

    return {"trip_plan": trip_plan}