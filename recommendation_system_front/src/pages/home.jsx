import { useState } from 'react'
import viteLogo from '/vite.svg'
import React from 'react';
import '../App.css';


function Home() {
  return (<div className="body">

      <header className="navbar">
        <div className="container">
          <div className="logo">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 16L15 19L20 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h1>RecoSystem</h1>
          </div>

          <nav>
            <a href="/login" className="nav-link">Connexion</a>
            <a href="/register" className="btn btn-primary">Inscription</a>
          </nav>
        </div>
      </header>

      <main>
    <section className="hero">
        <div className="hero-content">
            <span className="badge">Intelligence Artificielle</span>
            <h2>Des recommandations intelligentes adaptées à vos goûts</h2>
            <p>Découvrez du contenu personnalisé grâce à notre algorithme d'apprentissage basé sur vos interactions et avis.</p>
            <div className="hero-actions">
                <a href="/register" className="btn btn-primary btn-large">Commencer gratuitement</a>
                <a href="#features" className="btn btn-secondary btn-large">En savoir plus</a>
            </div>
        </div>
        <div className="hero-illustration">
            <div className="card-stack">
                <div className="recommendation-card card-1">
                    <div className="card-image"></div>
                    <div className="card-info">
                        <div className="rating">★★★★★</div>
                        <div className="card-title"></div>
                    </div>
                </div>
                <div className="recommendation-card card-2">
                    <div className="card-image"></div>
                    <div className="card-info">
                        <div className="rating">★★★★☆</div>
                        <div className="card-title"></div>
                    </div>
                </div>
                <div className="recommendation-card card-3">
                    <div className="card-image"></div>
                    <div className="card-info">
                        <div className="rating">★★★★★</div>
                        <div className="card-title"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="features" className="features">
        <div className="container">
            <h3>Pourquoi choisir RecoSystem ?</h3>
            <div className="features-grid">
                <div className="feature-card">
                    <div className="feature-icon">🎯</div>
                    <h4>Personnalisé</h4>
                    <p>Des recommandations uniques basées sur vos préférences et comportements</p>
                </div>
                <div className="feature-card">
                    <div className="feature-icon">🚀</div>
                    <h4>Rapide</h4>
                    <p>Obtenez instantanément des suggestions pertinentes et actualisées</p>
                </div>
                <div className="feature-card">
                    <div className="feature-icon">🔒</div>
                    <h4>Sécurisé</h4>
                    <p>Vos données sont protégées et votre vie privée respectée</p>
                </div>
                <div className="feature-card">
                    <div className="feature-icon">📊</div>
                    <h4>Intelligent</h4>
                    <p>Un algorithme qui apprend et s'améliore avec chaque interaction</p>
                </div>
            </div>
        </div>
    </section>

    <section className="cta">
        <div className="container">
            <h3>Prêt à découvrir vos prochains coups de cœur ?</h3>
            <p>Rejoignez des milliers d'utilisateurs satisfaits</p>
            <a href="/register" className="btn btn-primary btn-large">Créer mon compte</a>
        </div>
    </section>
</main>
<footer>
    <div className="container">
        <p>&copy; 2025 RecoSystem. Tous droits réservés.</p>
    </div>
</footer>

    </div> );
}

export default Home;