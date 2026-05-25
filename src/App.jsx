import React, { useState } from 'react';
import Navbar from './components/Navbar';
import QuestionForm from './components/QuestionForm';
import RecommendationCard from './components/RecommendationCard';
import ResultsChart from './components/ResultsChart';
import LoadingSpinner from './components/LoadingSpinner';
import { getRecommendations } from './services/api';
import './App.css';

function App() {
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFormSubmit = async (formData) => {
    setLoading(true);
    setError('');
    setRecommendations(null);

    try {
      const data = await getRecommendations(formData);
      setRecommendations(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch recommendations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setRecommendations(null);
    setError('');
  };

  return (
    <div className="app-container">
      <Navbar />
      
      <main className="main-content">
        <header className="hero-section animate-fade-in">
          <h1 className="hero-title">Discover the Best <span className="text-gradient">Agroforestry Trees</span> for Your Land</h1>
          <p className="hero-subtitle">Answer 4 simple questions and let AI find the perfect tree species for your region, soil, and purpose.</p>
        </header>

        <section className="content-section animate-fade-in delay-100">
          {!recommendations && !loading && (
            <div className="form-wrapper glass-panel">
              <QuestionForm onSubmit={handleFormSubmit} />
            </div>
          )}

          {loading && (
            <div className="loading-wrapper glass-panel">
              <LoadingSpinner />
              <p>Analyzing conditions and consulting our agroforestry AI expert...</p>
            </div>
          )}

          {error && (
            <div className="error-wrapper glass-panel">
              <div className="error-icon">⚠️</div>
              <p className="error-message">{error}</p>
              <button className="btn-primary" onClick={() => setError('')}>Try Again</button>
            </div>
          )}

          {recommendations && !loading && !error && (
            <div className="results-wrapper animate-fade-in delay-200">
              <div className="results-header">
                <h2>Your Top Recommendations</h2>
                <button className="btn-primary reset-btn" onClick={handleReset}>Start Over</button>
              </div>
              
              <div className="chart-wrapper glass-panel">
                <h3>Match Percentage</h3>
                <ResultsChart data={recommendations} />
              </div>

              <div className="cards-grid">
                {recommendations.map((tree, index) => (
                  <div key={index} className={`card-animation-wrapper delay-${(index + 1) * 100}`}>
                    <RecommendationCard 
                      tree={tree} 
                      rank={index + 1} 
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>
      
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Agroforestry Decision Support Tool. Powered by AI.</p>
      </footer>
    </div>
  );
}

export default App;
