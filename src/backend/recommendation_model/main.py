from fastapi import FastAPI

app = FastAPI()  # Initialize FastAPI app

@app.get("/")
def home():
    return {"message": "Welcome to the Sightseer Trip Recommendation API!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
