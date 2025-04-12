import { useState, useContext } from 'react';
import { useParams } from 'react-router'; // use `react-router-dom` for browser apps
import { UserContext } from '../../contexts/UserContext';

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
    <div>
      <h1>Delete Account</h1>
      <button onClick={handleDeleteClick}>
        Delete Account
      </button>
    </div>
  );
};

export default DeleteAccount;
