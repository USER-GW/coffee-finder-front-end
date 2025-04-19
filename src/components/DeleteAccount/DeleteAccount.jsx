import { useState, useContext } from 'react';
import { useParams } from 'react-router'; 
import { UserContext } from '../../contexts/UserContext';
import styles from './DeleteAccount.module.css'; 


const DeleteAccount = (props) => {
  const { user_id } = useParams();
  const { user } = useContext(UserContext);
  const [deletedUser, setDeletedUser] = useState(null);

  const handleDeleteClick = () => {
    if (props.handleDelete && user && user._id) {
      props.handleDelete(user._id);
    }
  };

  return (
    <div className = {styles.deleteAccountContainer}>
      <h1>Are your sure you would like to delete your account?</h1>
      <button className = {styles.deleteBtn} onClick={handleDeleteClick}>
        Delete Account
      </button>
    </div>
  );
};

export default DeleteAccount;
