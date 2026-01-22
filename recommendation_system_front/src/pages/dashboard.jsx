import { useState  , useEffect} from "react";
import "../App.css";

export default function Dashboard({
  userStats,
  latestProducts = [],
  categories = []
}) {
  const [nbravis, setNbravis] = useState(0);
  useEffect(() => {
    fetch('http://localhost:8080/api/get_nbravis?mail='+sessionStorage.getItem("email")).then(res => res.json()).then(data => setNbravis(data)).catch(err => console.error(err));
  }, []);
  const [currentUser , setCurrentUser] = useState(null);
  useEffect(()=>{
    fetch('http://localhost:8080/api/get_name?mail='+sessionStorage.getItem("email")).then(res => res.json()).then(data => setCurrentUser(data)).catch(err => console.error(err));
    sessionStorage.setItem("name", currentUser?.username || "Utilisateur");
     console.log("Current User in Dashboard:", currentUser);
  },[]);
 
  const [menuOpen, setMenuOpen] = useState(false);
  const [recommendedProducts, setRecommendedProducts] = useState([]); // ✅ ICI

  const userInitial = currentUser?.username?.charAt(0).toUpperCase() || "U";
  
  useEffect(() => {
    const email = sessionStorage.getItem("email");
    if (!email) return;

    fetch(`http://localhost:8080/api/dashboard?email=${encodeURIComponent(email)}`)
      .then(res => res.json())
      .then(data => setRecommendedProducts(data))
      .catch(err => console.error(err));
  }, []);
  return (
    <>
      {/* HEADER */}
      <header className="navbar navbar-logged">
        <div className="container">
          <div className="logo">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2" />
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
            <a href="/dashboard" className="nav-link active">Recommandations</a>
            <a href="/products" className="nav-link">Tous les produits</a>
            <a href="/my-reviews" className="nav-link">Mes avis</a>
          </nav>

          <div className="user-menu">
            <button
              className="user-avatar"
              onClick={e => {
                e.stopPropagation();
                setMenuOpen(!menuOpen);
              }}
            >
              {userInitial}
            </button>

            {menuOpen && (
              <div className="dropdown-menu active">
                <a href="/profile">Mon profil</a>
                <a href="/settings">Paramètres</a>
                <hr />
                <a href="/api/auth/logout" className="logout-link">Déconnexion</a>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="dashboard-page">
        <div className="container">

          {/* BIENVENUE */}
          <section className="welcome-section">
            <div className="welcome-content">
              <h2>
                Bonjour {currentUser?.username || "Utilisateur"} 👋
              </h2>
              <p>Voici vos recommandations personnalisées basées sur vos préférences</p>
            </div>

            <div className="welcome-stats">
              <div className="stat-box">
                <div className="stat-value">{nbravis || 0}</div>
                <div className="stat-label">Avis donnés</div>
              </div>
              <div className="stat-box">
                <div className="stat-value">{userStats?.likedCount || 0}</div>
                <div className="stat-label">Produits aimés</div>
              </div>
            </div>
          </section>

          {/* RECOMMANDATIONS */}
          <section className="recommendations-section">
            <div className="section-header">
              <h3>🎯 Recommandations pour vous</h3>
              <p>Basées sur vos interactions et préférences</p>
            </div>
            {recommendedProducts.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📦</div>
                <h4>Pas encore de recommandations</h4>
                <p>
                  Commencez par noter quelques produits pour recevoir des recommandations personnalisées
                </p>
                <a href="/products" className="btn btn-primary">
                  Découvrir les produits
                </a>
              </div>
            ) : (
              <div className="products-grid">
                {recommendedProducts.map(product => (
                  <div className="product-card" key={product.id}>
                    <div className="product-image">
                      <img
                        src={product.imageUrl || "/images/placeholder.jpg"}
                        alt={product.name}
                      />
                      <div className="product-badge">Recommandé</div>
                    </div>

                    <div className="product-info">
                      <div className="product-category">
                        {product.category || "Non catégorisé"}
                      </div>

                      <h4 className="product-name">{product.name}</h4>

                      <p className="product-description">
                        {product.description?.slice(0, 80)}…
                      </p>

                      <div className="product-footer">
                        <div className="product-rating">
                          <span className="stars">★★★★☆</span>
                          <span className="rating-value">
                            {product.averageRating?.toFixed(1) || "0.0"}
                          </span>
                        </div>

                        <div className="product-price">
                          {product.price
                            ? `${product.price.toFixed(2)} €`
                            : "Prix non disponible"}
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
            )}
          </section>

          {/* NOUVEAUTÉS */}
          {latestProducts.length > 0 && (
            <section className="latest-section">
              <div className="section-header">
                <h3>✨ Nouveautés</h3>
                <p>Les derniers produits ajoutés</p>
              </div>

              <div className="products-horizontal">
                {latestProducts.map(product => (
                  <div className="product-card-horizontal" key={product.id}>
                    <div className="product-image-horizontal">
                      <img
                        src={product.imageUrl || "/images/placeholder.jpg"}
                        alt={product.name}
                      />
                    </div>

                    <div className="product-info-horizontal">
                      <h5>{product.name}</h5>
                      <div className="product-price-small">
                        {product.price ? `${product.price.toFixed(2)} €` : "N/A"}
                      </div>
                    </div>

                    <a href={`/products/${product.id}`} className="card-link" />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* CATÉGORIES */}
          {categories.length > 0 && (
            <section className="categories-section">
              <div className="section-header">
                <h3>🏷️ Catégories populaires</h3>
              </div>

              <div className="categories-grid">
                {categories.map(category => (
                  <a
                    key={category.name}
                    className="category-card"
                    href={`/products?category=${category.name}`}
                  >
                    <div className="category-info">
                      <h4>{category.name}</h4>
                      <p>{category.count} produits</p>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          )}

        </div>
      </main>
    </>
  );
}
