from flask import Flask, request, render_template, redirect, url_for
import requests
from bs4 import BeautifulSoup
import pandas as pd

app = Flask(__name__)

def get_related_keywords(query, start=0):
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    }
    
    response = requests.get(f"https://www.google.com/search?q={query}&start={start}", headers=headers)
    soup = BeautifulSoup(response.text, "html.parser")
    
    related_keywords = []
    
    # Look for related searches section
    try:
        related_section = soup.find("div", {"id": "bres"})
        if related_section:
            for related_search in related_section.find_all("a"):
                related_keywords.append(related_search.get_text())
        else:
            print("Related keywords section not found.")
    except AttributeError as e:
        print(f"An error occurred: {e}")
    
    return related_keywords

def get_autocomplete_suggestions(query):
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    }
    
    response = requests.get(f"https://www.google.com/complete/search?client=chrome&q={query}", headers=headers)
    suggestions = response.json()[1]
    
    return suggestions

def keyword_research(query, page):
    # Fetch keywords for the given page
    start = (page - 1) * 10
    related_keywords = get_related_keywords(query, start=start)
    
    # Fetch autocomplete suggestions only once
    if page == 1:
        autocomplete_suggestions = get_autocomplete_suggestions(query)
    else:
        autocomplete_suggestions = []

    # Ensure the lists are of the same length by padding with None
    max_len = max(len(related_keywords), len(autocomplete_suggestions))
    
    related_keywords.extend([None] * (max_len - len(related_keywords)))
    autocomplete_suggestions.extend([None] * (max_len - len(autocomplete_suggestions)))
    
    data = {
        "Query": [query] * max_len,
        "Related Keywords": related_keywords,
        "Autocomplete Suggestions": autocomplete_suggestions
    }
    
    df = pd.DataFrame(data)
    return df

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        query = request.form["query"]
        return redirect(url_for('results', query=query, page=1))
    return render_template("index.html")

@app.route("/results", methods=["GET"])
def results():
    query = request.args.get("query")
    page = int(request.args.get("page", 1))
    df = keyword_research(query, page)
    next_page = page + 1
    return render_template("results.html", tables=[df.to_html(classes='data')], titles=df.columns.values, query=query, next_page=next_page)

if __name__ == "__main__":
    app.run(debug=True)
