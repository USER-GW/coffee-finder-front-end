import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import styles from './CommentForm.module.css';
import { UserContext } from '../../contexts/UserContext';

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
  );
};

export default CommentForm;
