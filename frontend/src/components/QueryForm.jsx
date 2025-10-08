import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE } from '../config'; // added import

const QueryForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    question: '',
  });
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    // Update the corresponding field in the form data state
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage(''); // Clear previous status message on new input
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('Submitting your query...');

    try {
      // API call to the backend server (use API_BASE)
      const url = (API_BASE || '').replace(/\/$/, '') + '/api/queries';
      const res = await axios.post(url, formData);

      console.log('Query submitted successfully:', res.data);
      setMessage('✅ Your query has been submitted successfully! We will get back to you through E-mail.');

      // Reset the form fields on success
      setFormData({ name: '', email: '', question: '' });
    } catch (error) {
      console.error('Submission error:', error.response ? error.response.data : error.message);

      // Get error message from the backend or use a general message
      const errorMessage = error.response && error.response.data.message
        ? error.response.data.message
        : '❌ Failed to submit query. Please try again.';

      setMessage(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    // Replaced inline styles with a placeholder class 'query-container'
    <div className="query-container">
      <h2>Any Other Feedback or Question?</h2>
      <p>Fill out the form below and we'll save your Query for review.</p>
      {/* Added class 'query-form' for form styling */}
      <form onSubmit={handleSubmit} className="query-form">

        {/* Added class 'form-group' for layout of labels/inputs */}
        <div className="form-group">
          <label htmlFor="name" className="query-label">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="query-input" // Class for input fields
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email" className="query-label">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="query-input"
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="question" className="query-label">Your FeedBack/Query:</label>
          <textarea
            id="question"
            name="question"
            value={formData.question}
            onChange={handleChange}
            required
            rows="4"
            className="query-input query-textarea" // Class for textarea
            disabled={isSubmitting}
          />
        </div>

        {/* Class for the submit button */}
        <button type="submit" className="query-submit-btn" disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Submit Query'}
        </button>
      </form>

      {message && (
        // Dynamic class based on success/error status
        <p className={`query-message ${message.startsWith('✅') ? 'success' : 'error'}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default QueryForm;