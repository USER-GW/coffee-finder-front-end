import { useState } from 'react';
import { useParams } from 'react-router';
import styles from './CommentForm.module.css';

const CommentForm = (props) => {
    const [formData, setFormData] = useState({ text: '' });


    const handleChange = (evt) => {
      setFormData({ ...formData, [evt.target.name]: evt.target.value });
    };
  
    const handleSubmit = (evt) => {
        evt.preventDefault();
        props.handleAddComment(formData);
        setFormData({ text: '' });
      };


  
    return (
      <form onSubmit={handleSubmit} className={styles.commentForm}>
      {/* <label htmlFor="text-input">Your comment:</label> */}
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