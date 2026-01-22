import {useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [comment , setComment] = useState("");
  const [rate , setRate] = useState(5);
  const email = sessionStorage.getItem("email");
  const id = window.location.pathname.split("/").pop();
  const navigate = useNavigate();
  useEffect(() => {
    console.log("Fetching product with ID:", id);

    fetch(`http://localhost:8080/api/products/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Product not found");
        }
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setReviews(data.reviews);
      })
      .catch((err) => console.error(err));
  }, []);
  
  const add_comment = async() => {
    console.log("Envoi de l'avis :", { productId: id, comment, rating: rate, userEmail: email });
    await fetch("http://localhost:8080/api/add-review" ,{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({productId: id,
      comment: comment,
      rating: rate ,userEmail: email}),
    });
    navigate(`/products/${id}`);
    window.location.reload();
  }
  if (!product) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="body">
      <header className="navbar navbar-logged">
        <div className="container">
          <div className="logo">
            <a href="/dashboard">
              <h1>RecoSystem</h1>
            </a>
          </div>

          <nav className="nav-menu">
            <a href="/dashboard" className="nav-link">Recommandations</a>
            <a href="/products" className="nav-link">Tous les produits</a>
            <a href="/my-reviews" className="nav-link">Mes avis</a>
          </nav>
        </div>
      </header>

      <main className="product-detail-page">
        <div className="container">
          <section className="product-detail">
            <div className="product-detail-image">
              <img src={product.imageUrl} alt={product.name} />
            </div>

            <div className="product-detail-info">
              <span className="product-category">
                {product.category ?? "Non catégorisé"}
              </span>

              <h2>{product.name}</h2>

              <div className="product-rating">
                <span className="stars">
                  {"★".repeat(Math.round(product.averageRating || 0))}
                </span>
                <span className="rating-value">
                  {(product.averageRating || 0).toFixed(1)}
                </span>
              </div>

              <div className="product-price">
                {product.price?.toFixed(2)} €
              </div>

              <p className="product-description">
                {product.description}
              </p>
            </div>
          </section>

          {/* Avis */}
          <section className="reviews-section">
            <h3>Avis des utilisateurs</h3>

            {reviews.length === 0 ? (
              <p>Aucun avis pour ce produit.</p>
            ) : (
              reviews.map((review) => (
                <div key={review.id} className="review-card">
                  <div className="review-rating">
                    {"★".repeat(review.rating)}
                  </div>
                  <p>{review.comment}</p>
                  <p>{review.userName}</p>
                </div>
              ))
            )}
          </section>
          <section className="add-review-section">
  <h1 className="color_header">Laisser un avis</h1>

  <div className="form-group">
    {/* Note */}
    <label htmlFor="rating" className="color_header">
      Note
    </label>
    <select
      id="rating"
      name="rating"
      value={rate}
      onChange={(e) => setRate(Number(e.target.value))}
    >
      <option value="1">1</option>   
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
    </select>

    {/* Commentaire */}
    <label htmlFor="comment" className="color_header">
      Commentaire
    </label>
    <textarea
      id="comment"
      value={comment}
      onChange={(e) => setComment(e.target.value)}
      placeholder="Ajouter un commentaire"
    />

    {/* Bouton */}
    <button type="button" onClick={add_comment}>
      Ajouter
    </button>
  </div>
</section>

        </div>
      </main>
    </div>
  );
}

export default ProductDetails;
