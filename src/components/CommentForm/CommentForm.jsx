import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import styles from './CommentForm.module.css';
import { UserContext } from '../../contexts/UserContext';
import { Helmet } from 'react-helmet';

const CommentForm = ({ handleAddComment }) => {
  const [formData, setFormData] = useState({ text: '' });
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleAddComment(formData);
    setFormData({ text: '' });
  };

  const handleRedirectSignUp = () => {
    navigate('/sign-up');
  };

  const handleRedirectSignIn = () => {
    navigate('/sign-in');
  };


  if (!user) {
    return (
      <div className={styles.commentForm}>
        <button type="button" onClick={handleRedirectSignUp}>
          Sign Up to Comment
        </button>
     
      </div>
    );
  }

 
  return (
    <>
  <Helmet>
  <title>Discover Coffee Shops | Browse & Rate | Nooks & Brews</title>
  <meta name="description" content="Browse, rate and review the best coffee shops near you on Nooks & Brews. Explore user ratings, share your experiences and find your next favorite spot." />
  <meta name="keywords" content="browse coffee shops, coffee reviews, best cafes, coffee directory, work friendly coffee shops, London cafes, Nooks and Brews" />
  <meta property="og:title" content="Discover Coffee Shops | Nooks & Brews" />
  <meta property="og:description" content="Find and rate amazing coffee shops near you. Explore ratings, read reviews and share your coffee experiences with Nooks & Brews." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://nooksandbrews.com/coffee" />
</Helmet>
    <form onSubmit={handleSubmit} className={styles.commentForm}>
      <textarea
        required
        name="text"
        id="text-input"
        value={formData.text}
        onChange={handleChange}
        placeholder="What's brewing? "
      />
      <button type="submit">Submit Comment</button>
    </form>
    </>
  );
};

export default CommentForm;
