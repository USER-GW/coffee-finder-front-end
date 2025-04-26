import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../contexts/UserContext';
import * as coffeeService from '../../services/coffeeService';
import styles from './Account.module.css';
import { Link, useNavigate } from 'react-router'; 

const Account = () => {
  const { user, setUser } = useContext(UserContext);
  const [favourites, setFavourites] = useState([]);
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  const handleDeleteAccount = async () => {
    try {
      await coffeeService.deleteAccount(user._id);
      localStorage.removeItem('token');
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error('Failed to delete account:', error);
    }
  };

  useEffect(() => {
    if (!user || !user._id) return;

    const fetchData = async () => {
      const favs = await coffeeService.fetchFavourites(user._id);
      setFavourites(favs);
      console.log("Populated favourites:", favs);
    };
  
    fetchData();
  }, [user?._id]);

  return (
    <section className={styles.mainContainer}>
      <div className={styles.favouriteContainer}>
        <h2 className={styles.favouriteTitle}> ❤️ {user?.userName}'s Favourites:</h2>
        <ul>
          {favourites.length > 0 ? (
            favourites.map((shop) => (
              <li key={shop._id}>
                <h3>{shop.name} - {shop.location}</h3>
                <p>{shop.description}</p>
              </li>
            ))
          ) : (
            <p>You have no favourite shops yet </p>
          )}
        </ul>
      </div>
      <div className={styles.accountBtns}>
  {user && (
    <>
      <button onClick={handleSignOut} className={styles.signOutBtn}>
        Sign Out
      </button>
      <Link className={styles.deleteAccountBtn} to={`/delete-account/auth/${user._id}`}>
        Delete Account
      </Link>
    </>
  )}
</div>
    </section>
  );
};

export default Account;
