import React, { useState } from 'react';
import './QuestionForm.css';
import { MapPin, Droplets, CloudRain, Target } from 'lucide-react';

const QuestionForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    region: '',
    soil: '',
    rainfall: '',
    purpose: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="question-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Tell us about your land</h2>
      
      <div className="form-group">
        <label className="form-label">
          <MapPin size={18} className="label-icon" />
          Which state or region are you in?
        </label>
        <select 
          name="region" 
          value={formData.region} 
          onChange={handleChange} 
          className="form-select" 
          required
        >
          <option value="" disabled>Select a state...</option>
          <option value="Rajasthan">Rajasthan</option>
          <option value="Maharashtra">Maharashtra</option>
          <option value="Karnataka">Karnataka</option>
          <option value="Punjab">Punjab</option>
          <option value="Tamil Nadu">Tamil Nadu</option>
          <option value="Kerala">Kerala</option>
          <option value="Uttar Pradesh">Uttar Pradesh</option>
          <option value="Gujarat">Gujarat</option>
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">
          <Droplets size={18} className="label-icon" />
          What type of soil do you have?
        </label>
        <select 
          name="soil" 
          value={formData.soil} 
          onChange={handleChange} 
          className="form-select" 
          required
        >
          <option value="" disabled>Select soil type...</option>
          <option value="Loamy">Loamy</option>
          <option value="Clay">Clay</option>
          <option value="Sandy">Sandy</option>
          <option value="Black Cotton">Black Cotton</option>
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">
          <CloudRain size={18} className="label-icon" />
          How much rain does your area get per year?
        </label>
        <select 
          name="rainfall" 
          value={formData.rainfall} 
          onChange={handleChange} 
          className="form-select" 
          required
        >
          <option value="" disabled>Select rainfall range...</option>
          <option value="Less than 600mm">Less than 600mm</option>
          <option value="600 to 1200mm">600 to 1200mm</option>
          <option value="More than 1200mm">More than 1200mm</option>
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">
          <Target size={18} className="label-icon" />
          What is the main purpose?
        </label>
        <select 
          name="purpose" 
          value={formData.purpose} 
          onChange={handleChange} 
          className="form-select" 
          required
        >
          <option value="" disabled>Select main purpose...</option>
          <option value="Shade for crops">Shade for crops</option>
          <option value="Timber">Timber</option>
          <option value="Fodder">Fodder</option>
          <option value="Fruit">Fruit</option>
        </select>
      </div>

      <button type="submit" className="btn-primary form-submit-btn">
        Get Recommendations
      </button>
    </form>
  );
};

export default QuestionForm;
