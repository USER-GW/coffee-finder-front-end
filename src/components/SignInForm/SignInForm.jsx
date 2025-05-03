import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { signIn } from '../../services/authService';
import { UserContext } from '../../contexts/UserContext';
import styles from './SignInForm.module.css';
import { Helmet } from 'react-helmet';

const SignInForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    favouriteShops: []
  });

  const { userName, email, password, confirmPassword, favouriteShops } = formData;

  const handleChange = (e) => {
    setMessage('');
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const signedInUser = await signIn(formData);
      setUser(signedInUser);
      navigate('/');
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <>
      <Helmet>
  <title>Sign In | Nooks & Brews</title>
  <meta name="description" content="Sign into your Nooks & Brews account to rate coffee shops, share reviews, and join the coffee lover's community." />
  <meta name="keywords" content="sign in, login, Nooks and Brews account, coffee community, coffee reviews" />
  <meta property="og:title" content="Sign In | Nooks & Brews" />
  <meta property="og:description" content="Sign into your account to rate and review coffee shops on Nooks & Brews and join our growing coffee community." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://nooksandbrews.com/sign-in" />
</Helmet>
     

    <div className={styles.signinContainer}>
      <form autoComplete="off" onSubmit={handleSubmit} className={styles.signInForm}>
        <h1>Sign In</h1>
        
     
        {message && <p className={styles.Error}>{message}</p>}

       
        <div className={styles.formGroup}>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            id='email'
            value={email}
            name='email'
            onChange={handleChange}
            required
          />
        </div>

     
        <div className={styles.formGroup}>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            id='password'
            value={password}
            name='password'
            onChange={handleChange}
            required
          />
        </div>

     
        <div className={styles.formGroup}>
          <label htmlFor='confirmPassword'>Confirm Password:</label>
          <input
            type='password'
            id='confirmPassword'
            value={confirmPassword}
            name='confirmPassword'
            onChange={handleChange}
            required
          />
        </div>

        
        <button
          type="submit"
          className={styles.signinButton}
          disabled={!email || !password || !confirmPassword}
        >
          Sign In
        </button>

      
        <button
          type="button"
          className={styles.cancel}
          onClick={() => navigate('/')}
        >
          Cancel
        </button>
      </form>
    </div>
    </>
  );

};

export default SignInForm;
