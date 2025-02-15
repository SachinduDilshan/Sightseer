from flask import Flask, request, jsonify
from model import get_recommendations  # Import ML function

app = Flask(__name__)

@app.route('/')
def home():
    return "Trip Recommendation API is Running!"

@app.route('/recommend', methods=['POST'])
def recommend():
    """ API endpoint to get travel recommendations """
    user_data = request.json  # Get user preferences from request
    recommendations = get_recommendations(user_data)
    return jsonify(recommendations)

if __name__ == '__main__':
    app.run(debug=True)