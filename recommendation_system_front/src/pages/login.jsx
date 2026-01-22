import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "./dashboard";
function Login() {
  const [email, setEmail] = useState(""); // état pour l'email
  const [password, setPassword] = useState(""); // état pour le mot de passe
  const [remember, setRemember] = useState(false); // checkbox "Se souvenir de moi"
  const [error, setError] = useState(""); // pour afficher les erreurs
  const navigate = useNavigate(); // pour rediriger après login

  const handleSubmit = async (e) => {
    e.preventDefault(); // empêche le rechargement de la page

    try {
      const res = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, remember }),
      });

      const data = await res.json();

      if (res.ok) {
        // connexion réussie
        console.log("Connecté !", data);
        sessionStorage.setItem("email", JSON.stringify(email));
        navigate("/dashboard"); // redirige vers la page d'accueil
      } else {
        setError(data.message || "Erreur de connexion");
      }
    } catch (err) {
      console.error(err);
      setError("Erreur réseau");
    }
  };

  return (
    <div className="body">
      <header className="navbar navbar-minimal">
        <div className="container">
          <div className="logo">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2" />
              <path d="M12 16L15 19L20 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <a href="/" className="logo-link"><h1>RecoSystem</h1></a>
          </div>
        </div>
      </header>

      <main className="auth-page">
        <div className="auth-container">
          <div className="auth-card">
            <div className="auth-header">
              <h2>Bon retour !</h2>
              <p>Connectez-vous pour accéder à vos recommandations</p>
            </div>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="email">Adresse email</label>
                <input className="mohsn"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="vous@exemple.com"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Mot de passe</label>
                <input className="mohsn"
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Entrez votre mot de passe"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="form-options">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="remember"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                  />
                  <span>Se souvenir de moi</span>
                </label>
                <a href="/forgot-password" className="link-small">Mot de passe oublié ?</a>
              </div>

              <button type="submit" className="btn btn-primary btn-block">Se connecter</button>
            </form>

            <div className="auth-divider"><span>ou</span></div>

            <div className="auth-footer">
              <p>Vous n'avez pas encore de compte ? <a href="/register" className="link-primary">Créer un compte</a></p>
            </div>
          </div>

          <div className="auth-illustration">
            <div className="illustration-content">
              <h3>Vos recommandations vous attendent</h3>
              <p>Connectez-vous pour retrouver votre contenu personnalisé et découvrir de nouvelles suggestions adaptées à vos goûts.</p>
              <div className="stats">
                <div className="stat-item">
                  <div className="stat-number">10K+</div>
                  <div className="stat-label">Utilisateurs actifs</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">50K+</div>
                  <div className="stat-label">Recommandations</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">98%</div>
                  <div className="stat-label">Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer>
        <div className="container">
          <p>&copy; 2025 RecoSystem. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}

export default Login;
