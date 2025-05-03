import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../contexts/UserContext';
import * as coffeeService from '../../services/coffeeService';
import styles from './Account.module.css';
import { Link, useNavigate } from 'react-router'; 
import { Helmet } from 'react-helmet';

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
    <>
<Helmet>
  <title>Your Favourite Coffee Shops | Nooks & Brews</title>
  <meta name="description" content="View and manage your favourite coffee shops on Nooks & Brews. Discover your saved spots and share your favourite cafes with others." />
  <meta name="keywords" content="favourite coffee shops, saved coffee spots, best cafes, coffee shop list, coffee community, Nooks and Brews favourites" />
  <meta property="og:title" content="Your Favourite Coffee Shops | Nooks & Brews" />
  <meta property="og:description" content="Browse and manage your favourite coffee shops in your personal list. Share your top spots and discover more with Nooks & Brews." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://nooksandbrews.com/account/favourites" />
</Helmet>

    
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
    </>
  );
};

export default Account;
