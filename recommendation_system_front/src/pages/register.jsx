import {useState} from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'


function Register(){
const [email , setEmail] = useState("");
const [username , setUsername] = useState("");
const [password , setPassword] = useState("");
const navigate = useNavigate();
const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      const res =  await fetch("http://localhost:8080/api/register" ,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({username,email,password}),
      });
      const data = await res.json();
      if(res.ok){
        console.log("Inscription réussie!", data);
        navigate("/login");
      }
      else {
        console.error("Erreur d'inscription:", data.message || "Erreur inconnue");
      }
    }
    catch(err){
      console.error("Erreur réseau:", err); 
      setError("Erreur réseau");
    }
  };
return <div className="body">
<header className="navbar navbar-minimal">
  <div className="container">
    <div className="logo">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 16L15 19L20 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <a href="/" className="logo-link"><h1>RecoSystem</h1></a>
    </div>
  </div>
</header>

<main className="auth-page">
  <div className="auth-container">
    <div className="auth-card">
      <div className="auth-header">
        <h2>Créez votre compte</h2>
        <p>Commencez à recevoir des recommandations personnalisées</p>
      </div>

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label htmlFor="username">Nom d'utilisateur</label>
          <input className='mohsn'
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Choisissez un nom d'utilisateur"
                  required
                  autoComplete="username"
                  minLength={3}
                  value={username}
                  onChange={(e)=>setUsername(e.target.value)}
          />
          <span className="form-hint">Minimum 3 caractères</span>
        </div>

        <div className="form-group">
          <label htmlFor="email">Adresse email</label>
          <input className='mohsn'
                  type="email"
                  id="email"
                  name="email"
                  placeholder="vous@exemple.com"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Mot de passe</label>
          <input className='mohsn'
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Créez un mot de passe sécurisé"
                  required
                  autoComplete="new-password"
                  minLength={8}
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
          />
          <span className="form-hint">Minimum 8 caractères</span>
        </div>

        <div className="form-group">
          <label className="checkbox-label checkbox-full">
            <input type="checkbox" name="terms" required />
            <span>J'accepte les <a href="/terms" className="link-primary">conditions d'utilisation</a> et la <a href="/privacy" className="link-primary">politique de confidentialité</a></span>
          </label>
        </div>

        <button type="submit" className="btn btn-primary btn-block">Créer mon compte</button>
      </form>

      <div className="auth-divider">
        <span>ou</span>
      </div>

      <div className="auth-footer">
        <p>Vous avez déjà un compte ? <a href="/login" className="link-primary">Se connecter</a></p>
      </div>
    </div>

    <div className="auth-illustration">
      <div className="illustration-content">
        <h3>Rejoignez la communauté</h3>
        <p>Découvrez un système de recommandation intelligent qui apprend de vos préférences pour vous proposer du contenu toujours plus pertinent.</p>

        <div className="benefits">
          <div className="benefit-item">
            <div className="benefit-icon">✓</div>
            <div className="benefit-text">
              <strong>Recommandations personnalisées</strong>
              <p>Un algorithme qui s'adapte à vos goûts</p>
            </div>
          </div>
          <div className="benefit-item">
            <div className="benefit-icon">✓</div>
            <div className="benefit-text">
              <strong>Gratuit et sans engagement</strong>
              <p>Créez votre compte en quelques secondes</p>
            </div>
          </div>
          <div className="benefit-item">
            <div className="benefit-icon">✓</div>
            <div className="benefit-text">
              <strong>Données sécurisées</strong>
              <p>Votre vie privée est notre priorité</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>
</div> ;
}


export default Register;