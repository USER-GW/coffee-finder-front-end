import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import styles from './NavBar.module.css';
import { UserContext } from '../../contexts/UserContext';


const NavBar = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };


  useEffect(() => {
    setUserMenuOpen(false);
  }, [user]);

  return (
    <>

    <nav className={styles.navBar}>
      <Link className={styles.logo} to="/">N&B</Link>

      <div className={styles.navLinks}>
        <Link to="/">Main Menu</Link>

      

        {!user && (
          <>
            <Link to="/sign-up">Sign Up</Link>
            <Link to="/sign-in">Sign In</Link>
          </>
        )}

        {user && (
          <>
            <div className={styles.addCoffeeshop}>
          <Link to="/add">Add a Coffee Shop</Link>
        </div> 
        
            <Link to={`/account/${user._id}`}>{user.userName}'s 🏅</Link>

            <div className={styles.userMenu}>
              <div 
                className={styles.hamburger} 
                onClick={() => setUserMenuOpen(!userMenuOpen)}
              >
                ☰
              </div>

              <div className={`${styles.userDropdown} ${userMenuOpen ? styles.show : ''}`}>
                <button onClick={handleSignOut} className={styles.signOutBtn}>
                  Sign Out
                </button>
                <Link className={styles.deleteAccount} to={`/delete-account/auth/${user._id}`}>
                  Delete Account
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
    </>
  );
};

export default NavBar;
