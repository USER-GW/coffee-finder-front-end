import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../contexts/UserContext';
import * as coffeeService from '../../services/coffeeService';
import styles from './Account.module.css';
import { Link, useNavigate } from 'react-router'; 

const Account = () => {
  const { user, setUser } = useContext(UserContext);
  const [favourites, setFavourites] = useState([]);
  const navigate = useNavigate();


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
        <h2 className={styles.favouriteTitle}>  {user?.userName}'s Winners:  </h2>
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
  

</div>
    </section>
  );
};

export default Account;
