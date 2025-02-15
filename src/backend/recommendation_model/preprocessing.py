import pandas as pd
import re
import nltk
from nltk.corpus import stopwords
from sklearn.feature_extraction.text import TfidfVectorizer

# Download stopwords
nltk.download('stopwords')

def load_and_clean_data(filepath):
    """
    Load CSV file and preprocess the data
    """
    df = pd.read_csv(filepath)

    # Drop missing values
    df.dropna(inplace=True)

    # Clean text reviews
    df['clean_review'] = df['Review'].apply(clean_text)

    return df

def clean_text(text):
    """
    Function to clean text data
    - Lowercase conversion
    - Remove special characters
    - Remove stopwords
    """
    text = text.lower()  # Convert to lowercase
    text = re.sub(r'[^a-z\s]', '', text)  # Remove special characters
    text = ' '.join([word for word in text.split() if word not in stopwords.words('english')])  # Remove stopwords
    
    return text

def vectorize_text(df):
    """
    Convert text data into numerical format using TF-IDF.
    """
    tfidf = TfidfVectorizer()
    tfidf_matrix = tfidf.fit_transform(df['clean_review'])  # Convert text to vectors
    return tfidf, tfidf_matrix

# Example usage
if __name__ == "__main__":
    filepath = "D:\\Year 3-Sem-2\\SightseerProject\\sightseer\\src\\backend\\DataSet\\Destination Reviews (final).csv"
    df = load_and_clean_data(filepath)
    
    # Vectorizing the cleaned text
    tfidf, tfidf_matrix = vectorize_text(df)
    
    print("TF-IDF Matrix Shape:", tfidf_matrix.shape)  # Debugging: Check output size
