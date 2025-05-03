import { useState, useContext } from 'react';
import { useParams } from 'react-router'; 
import { UserContext } from '../../contexts/UserContext';
import styles from './DeleteAccount.module.css'; 
import { Helmet } from 'react-helmet';


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
    <>
    <Helmet>
  <title>Delete Your Account | Nooks & Brews</title>
  <meta name="description" content="Delete your Nooks & Brews account permanently. We're sorry to see you go. This action will remove your reviews, favourites and account data." />
  <meta name="keywords" content="delete account, remove account, Nooks and Brews account, account settings, user profile, close account" />
  <meta property="og:title" content="Delete Your Account | Nooks & Brews" />
  <meta property="og:description" content="Confirm deletion of your Nooks & Brews account. This action is permanent and will remove your profile and content." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://nooksandbrews.com/delete-account" />
</Helmet>
    <div className = {styles.deleteAccountContainer}>
      <h1>Are your sure you would like to delete your account?</h1>
      <button className = {styles.deleteBtn} onClick={handleDeleteClick}>
        Delete Account
      </button>
    </div>
    </>
  );
};

export default DeleteAccount;
