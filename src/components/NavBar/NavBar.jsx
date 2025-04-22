import { useContext } from 'react';
import { Link, useNavigate } from 'react-router';
import styles from './NavBar.module.css';
import { UserContext } from '../../contexts/UserContext';

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  return (
    <nav className={styles.navBar}>
      <Link className={styles.logo} to="/">N&B</Link>

      <div className={styles.navLinks}>
        <Link to="/">Main Menu</Link>

        <div className={styles.addCoffeeshop}>
          <Link to="/add">Add a Coffee Shop</Link>
        </div>

        {!user && (
          <>
            <Link to="/sign-up">Sign Up</Link>
            <Link to="/sign-in">Sign In</Link>
          </>
        )}

        {user && (
          <>
  
            <Link to={`/account/${user._id}`}>{user.userName}'s Account</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
