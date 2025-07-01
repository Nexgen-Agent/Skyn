# ╔════════════════════════════════════════════════════════════════════╗
# ║ Lonz Flawls Aura™ Data Ingestion Engine                          ║
# ║ Illuminating Radiant Skin Wisdom from Across the Digital Sphere   ║
# ╠════════════════════════════════════════════════════════════════════╣
# ║ This script gracefully gathers, refines, and harmonizes          ║
# ║ skincare knowledge—empowering next-gen, inclusive diagnostics.   ║
# ╚════════════════════════════════════════════════════════════════════╝

import requests
from bs4 import BeautifulSoup
import pandas as pd
from typing import List, Dict

# ───── Aura Source Configuration ─────
AURA_SOURCES: List[str] = [
    # Insert URLs of trusted, inclusive skincare sources here
    "https://www.example.com/skin-care-tips",
    # "https://www.another-source.com/articles/skin-types",  # ← Add more as needed
]

# ───── Aura Method: Graceful Scraping ─────
def aura_scrape(url: str) -> List[Dict[str, str]]:
    """
    Lonz Flawls Aura™ Method:
    Elegantly retrieves skincare wisdom from a given URL, with empathy and precision.

    Args:
        url (str): The web address to illuminate.

    Returns:
        List[Dict[str, str]]: Curated list of radiant skin insights.
    """
    print(f"[Aura] Gathering radiant insights from: {url}")
    response = requests.get(url)
    if response.status_code != 200:
        print(f"[Aura Alert] Unable to access {url} (Status: {response.status_code})")
        return []
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # ─ Aura Extraction Logic: Adapt for each source’s structure ─
    data = []
    for block in soup.find_all("div", class_="skin-tip-block"):
        skin_concern = block.find("h3", class_="skin-concern")
        recommendation = block.find("p", class_="recommendation")
        category = block.find("span", class_="category")
        if skin_concern and recommendation and category:
            data.append({
                "Skin Concern": skin_concern.text.strip(),
                "Aura-Level Recommendation": recommendation.text.strip(),
                "Category": category.text.strip(),
            })
    print(f"[Aura] Extracted {len(data)} luminous insights.")
    return data

# ───── Aura Method: Dataframe Synthesis ─────
def aura_dataframe(all_data: List[List[Dict[str, str]]]) -> pd.DataFrame:
    """
    Unites all gathered wisdom into a harmonious Aura DataFrame.

    Args:
        all_data (List[List[Dict[str, str]]]): Nested lists of radiant insight dicts.

    Returns:
        pd.DataFrame: The Lonz Flawls Aura™ skin care matrix.
    """
    flat = [item for sublist in all_data for item in sublist]
    df = pd.DataFrame(flat)
    print(f"[Aura] Synthesized {len(df)} radiant insights into the matrix.")
    return df

# ───── Aura Main Routine ─────
if __name__ == "__main__":
    print("\n╔════════════════════════════════════════════════════════╗")
    print("║  Lonz Flawls Aura™: Initiating Skincare Wisdom Sync  ║")
    print("╚════════════════════════════════════════════════════════╝")
    all_insights = []
    for source in AURA_SOURCES:
        insights = aura_scrape(source)
        all_insights.append(insights)
    df = aura_dataframe(all_insights)
    df.to_csv("aura_skin_care_matrix.csv", index=False)
    print("[Aura] Matrix saved as aura_skin_care_matrix.csv")