import { useContext } from 'react';
import { Link } from 'react-router';
import styles from './NavBar.module.css';
import { UserContext } from '../../contexts/UserContext';

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <nav className={styles.navBar}>
      <div className={styles.navbarContainer}>
        <ul>
          <li>
            <Link to="/">Main Menu</Link>
          </li>

          {user ? (
            <>
              <li className={styles.addCoffeeshop}>
                <Link to="/add">Add a Coffee Shop</Link>
              </li>

              <li className={styles.dropdown}>
                <span className={styles.dropdownToggle}>
                  {user?.userName}'s Account
                </span>
                <ul className={styles.dropdownMenu}>
                  <li>
                    <Link
                      to="/"
                      className={styles.dropdownItem}
                      onClick={handleSignOut}
                    >
                      Sign Out
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={`/delete-account/auth/${user._id}`}
                      className={styles.dropdownItem}
                    >
                      Delete Account
                    </Link>
                  </li>
                </ul>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/sign-up">Sign Up</Link>
              </li>
              <li>
                <Link to="/sign-in">Sign In</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
