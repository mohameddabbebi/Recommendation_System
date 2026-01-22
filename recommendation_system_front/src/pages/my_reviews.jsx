import { useState, useEffect } from "react";

function MyReviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const email = sessionStorage.getItem("email");
    if (!email) return;

    fetch(
      "http://localhost:8080/api/my-reviews?email=" +
        encodeURIComponent(email)
    )
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="body">
      <header className="navbar navbar-logged">
        <div className="container">
          <div className="logo">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle
                cx="16"
                cy="16"
                r="14"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M12 16L15 19L20 13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <a href="/dashboard" className="logo-link">
              <h1>RecoSystem</h1>
            </a>
          </div>

          <nav className="nav-menu">
            <a href="/dashboard" className="nav-link">
              Recommandations
            </a>
            <a href="/products" className="nav-link">
              Tous les produits
            </a>
            <a href="/my-reviews" className="nav-link active">
              Mes avis
            </a>
          </nav>
        </div>
      </header>

      <main className="my-reviews-page">
        <div className="container">
          <section className="page-header">
            <h2>Mes avis</h2>
            <p>Retrouvez tous les avis que vous avez laissés</p>
          </section>

          <section className="reviews-list">
            {reviews.length === 0 && (
              <div className="empty-state">
                <div className="empty-icon">📝</div>
                <h4>Aucun avis publié</h4>
                <p>Vous n’avez encore laissé aucun avis.</p>
                <a href="/products" className="btn btn-primary">
                  Découvrir des produits
                </a>
              </div>
            )}

            {reviews.map((review) => (
              <div className="review-card" key={review.id}>
                <div className="review-product">
                  <img
                    src={review.product.imageUrl}
                    alt={review.product.name}
                  />

                  <div className="review-product-info">
                    <h4>{review.product.name}</h4>
                    <span className="product-price">
                      {review.product.price.toFixed(2)} €
                    </span>
                    <a
                      href={`/products/${review.product.id}`}
                      className="product-link"
                    >
                      Voir le produit →
                    </a>
                  </div>
                </div>

                <div className="review-content">
                  <div className="review-rating">
                    <span className="stars">
                      {"★".repeat(review.rating)}
                    </span>
                    <span className="review-date">
                      {new Date(review.createdAt).toLocaleDateString("fr-FR")}
                    </span>
                  </div>

                  <p className="review-comment">{review.comment}</p>
                </div>
              </div>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
}

export default MyReviews;
