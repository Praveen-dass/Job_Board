import React, { useState } from 'react';

const CompanyReview = ({ company, onClose }) => {
  const [newReview, setNewReview] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
    reviewer: '',
    rating: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview({
      ...newReview,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    company.reviews.push(newReview);
    setNewReview({
      title: '',
      date: new Date().toISOString().split('T')[0],
      description: '',
      reviewer: '',
      rating: 0,
    });
    onClose();
  };

  if (!company) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.companyDetails}>
      <div style={styles.header}>
        <button onClick={onClose} style={styles.closeButton}>Close</button>
        <img src={company.logo} alt={company.name} style={styles.companyLogo} />
      </div>
      <h2>{company.name}</h2>
      <p>{company.description}</p>
      <a href={company.link} target="_blank" rel="noopener noreferrer" style={styles.visitPage}>Visit Page</a>
      <div style={styles.jobPositions}>
        <h3>Job Positions</h3>
        <ul style={styles.jobPositionsList}>
          {company.jobpositions.map((position, index) => (
            <li key={index} style={styles.jobPositionItem}>{position}</li>
          ))}
        </ul>
      </div>
      <div style={styles.reviewsSection}>
        <h3>Reviews</h3>
        <div style={styles.reviews}>
          {company.reviews.map((review, index) => (
            <div key={index} style={styles.review}>
              <h4>{review.title}</h4>
              <p>{review.date}</p>
              <p>{review.description}</p>
              <p><strong>{review.reviewer}</strong></p>
              {/* <StarRating rating={review.rating} /> */}
            </div>
          ))}
        </div>
      </div>
      <div style={styles.reviewFormSection}>
        <h3>Submit a Review</h3>
        <form onSubmit={handleSubmit} style={styles.reviewForm}>
          <input
            type="text"
            name="title"
            placeholder="Review Title"
            value={newReview.title}
            onChange={handleInputChange}
            required
            style={styles.input}
          />
          <textarea
            name="description"
            placeholder="Review Description"
            value={newReview.description}
            onChange={handleInputChange}
            required
            style={styles.textarea}
          />
          <input
            type="text"
            name="reviewer"
            placeholder="Your Name"
            value={newReview.reviewer}
            onChange={handleInputChange}
            maxLength={200}
            required
            style={styles.input}
          />
          <input
            type="number"
            name="rating"
            placeholder="Rating (1-5)"
            value={newReview.rating}
            onChange={handleInputChange}
            min="1"
            max="5"
            required
            style={styles.input}
          />
          <button type="submit" style={styles.submitButton}>Submit Review</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  companyDetails: {
    padding: '20px',
    backgroundColor: '#fff',
    margin: '20px auto',
    maxWidth: '800px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  companyLogo: {
    width: '100px',
    height: 'auto',
  },
  closeButton: {
    padding: '10px 20px',
    backgroundColor: '#ff4d4d',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  visitPage: {
    display: 'inline-block',
    margin: '10px 0',
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '4px',
  },
  jobPositions: {
    marginBottom: '20px',
  },
  jobPositionsList: {
    listStyleType: 'none',
    padding: '0',
  },
  jobPositionItem: {
    backgroundColor: '#f9f9f9',
    padding: '10px',
    margin: '5px 0',
    borderRadius: '4px',
  },
  reviewsSection: {
    marginBottom: '20px',
  },
  reviews: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '20px',
  },
  review: {
    border: '1px solid #ddd',
    padding: '15px',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  },
  reviewFormSection: {
    marginBottom: '20px',
  },
  reviewForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  input: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  textarea: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    resize: 'vertical',
  },
  submitButton: {
    padding: '10px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default CompanyReview;
