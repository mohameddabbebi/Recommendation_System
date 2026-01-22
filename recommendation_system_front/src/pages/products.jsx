import { useState, useEffect } from "react";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
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
            <a href="/products" className="nav-link active">
              Tous les produits
            </a>
            <a href="/my-reviews" className="nav-link">
              Mes avis
            </a>
          </nav>
        </div>
      </header>

      <main className="products-page">
        <div className="container">
          <section className="page-header">
            <h2>Tous les produits</h2>
            <p>Découvrez notre catalogue complet</p>
          </section>

          <section className="results-section">
            {products.length === 0 && (
              <div className="empty-state">
                <div className="empty-icon">🔍</div>
                <h4>Aucun produit trouvé</h4>
              </div>
            )}

            <div className="products-grid">
              {products.map((product) => (
                <div className="product-card" key={product.id}>
                  <div className="product-image">
                    <img src={product.imageUrl} alt={product.name} />
                  </div>

                  <div className="product-info">
                    <div className="product-category">
                      {product.category ?? "Non catégorisé"}
                    </div>

                    <h4 className="product-name">{product.name}</h4>

                    <p className="product-description">
                      {product.description?.slice(0, 80)}...
                    </p>

                    <div className="product-footer">
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
                    </div>

                    <a
                      href={`/products/${product.id}`}
                      className="btn btn-primary btn-block"
                    >
                      Voir le produit
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Products;
