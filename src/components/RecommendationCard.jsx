import React from 'react';
import './RecommendationCard.css';
import { Leaf, Info, CheckCircle2 } from 'lucide-react';

const RecommendationCard = ({ tree, rank }) => {
  return (
    <div className="recommendation-card glass-panel">
      <div className="card-header">
        <div className="rank-badge">#{rank}</div>
        <div className="match-badge">
          {tree.matchPercentage}% Match
        </div>
      </div>
      
      <div className="card-body">
        <h3 className="tree-name">
          <Leaf className="tree-icon" size={24} />
          {tree.name}
        </h3>
        
        <div className="card-section">
          <h4 className="section-title">
            <Info size={16} /> Overview
          </h4>
          <p className="section-content">{tree.explanation}</p>
        </div>
        
        <div className="card-section">
          <h4 className="section-title">
            <CheckCircle2 size={16} /> Why it fits
          </h4>
          <p className="section-content">{tree.reasoning}</p>
        </div>
      </div>
      
      <div className="card-progress-bar">
        <div 
          className="card-progress-fill" 
          style={{ width: `${tree.matchPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default RecommendationCard;
