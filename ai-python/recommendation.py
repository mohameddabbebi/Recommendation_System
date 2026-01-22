from flask import Flask, jsonify, request
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import random

app = Flask(__name__)

# Charger modèle pré-entraîné léger et rapide
model = SentenceTransformer('all-MiniLM-L6-v2')

# Construire embeddings pour tous les produits
def embed_products(data):
    product_texts = []
    product_ids = []

    for p in data["all_products"]:
        # Combiner nom, catégorie et prix pour l'embedding du produit
        text = f"{p['name']} {p['category']} {p['price']}"
        product_texts.append(text)
        product_ids.append(p["product_id"])

    embeddings = model.encode(product_texts, convert_to_numpy=True)
    return product_ids, embeddings

# Construire profil utilisateur pondéré
def build_user_profile(data, product_map):
    interactions = data.get("interactions", [])
    vectors = []

    for r in interactions:
        pid = r["product_id"]
        rating = r.get("rating", 3)  # rating par défaut = 3
        review_text = r.get("review_text", "")
        # Combiner description produit + commentaire
        text = f"{product_map[pid]['name']} {product_map[pid]['category']} {review_text}"
        emb = model.encode(text, convert_to_numpy=True)
        # Pondération : ratings 1-5 → -1 à +1
        weight = (rating - 3) / 2
        vectors.append(emb * weight)

    if vectors:
        return np.mean(vectors, axis=0)
    else:
        # Pas d'interaction → vecteur aléatoire pour briser l'égalité
        return np.random.rand(model.get_sentence_embedding_dimension())

# Générer recommandations
def recommend_products(data, top_k=10):
    product_ids, embeddings = embed_products(data)
    product_map = {p["product_id"]: p for p in data["all_products"]}
    product_embeddings_dict = dict(zip(product_ids, embeddings))

    # Profil utilisateur
    user_profile = build_user_profile(data, product_map)

    # Calculer score + tri
    seen_ids = {r["product_id"] for r in data.get("interactions", [])}
    scores = []

    for pid in product_ids:
        if pid in seen_ids:
            continue
        sim = cosine_similarity([user_profile], [product_embeddings_dict[pid]])[0][0]
        sim += random.uniform(0, 1e-6)
        scores.append((pid, sim))

    # Trier par score décroissant
    scores.sort(key=lambda x: x[1], reverse=True)

    # Retourner top_k produits
    return [
        {
            "product_id": pid,
            "name": product_map[pid]["name"],
            "category": product_map[pid]["category"],
            "price": product_map[pid]["price"],
            "score": round(score, 3)
        }
        for pid, score in scores[:top_k]
    ]

# Endpoint Flask
@app.route("/api/recommendations", methods=["POST"])
def recommendations_route():
    data = request.get_json()
    top_k = data.get("top_k", 10)  # Permet au client de choisir top_k
    return jsonify(recommend_products(data, top_k=top_k))

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
