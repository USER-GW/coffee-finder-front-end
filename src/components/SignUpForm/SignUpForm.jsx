import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { signUp } from '../../services/authService';
import { UserContext } from '../../contexts/UserContext';
import styles from './SignUpForm.module.css';
import { Helmet } from 'react-helmet';

const SignUpForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    favouriteShops: [],
  });

  const { userName, firstName, lastName, email, password, confirmPassword} = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newUser = await signUp(formData);
      setUser(newUser);
      navigate('/');
    } catch (err) {
      setMessage(err.message);
    }
  };

  const isFormInvalid = () => {
    return (
      !userName ||
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      password !== confirmPassword
    );
  };

  return (
    <>
        <Helmet>
        <title>Sign Up | Nooks and Brews</title>
        <meta name="description" content="Create your account and join the Nooks and Brews coffee community." />
      </Helmet>
   

    <main className={styles.mainContainer}>
    <div className={styles.signupContainer}>
      <form onSubmit={handleSubmit} className={styles.signupForm}>
        <h1>Create Account</h1>
        {message && <p className={styles.Error}>{message}</p>}

        <div className={styles.formGroup}>
          <label htmlFor='userName'>*User Name</label>
          <p className ={styles.userNameNote}>Note: This will be public if you add a comment</p>
          <input type='text' id='userName' name='userName' value={userName} onChange={handleChange} required />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor='firstName'>*First Name</label>
          <input type='text' id='firstName' name='firstName' value={firstName} onChange={handleChange} required />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor='lastName'>*Last Name</label>
          <input type='text' id='lastName' name='lastName' value={lastName} onChange={handleChange} required />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor='email'>*Email</label>
          <input type='email' id='email' name='email' value={email} onChange={handleChange} required />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor='password'>*Password</label>
          <input type='password' id='password' name='password' value={password} onChange={handleChange} required />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor='confirmPassword'>*Confirm Password</label>
          <input type='password' id='confirmPassword' name='confirmPassword' value={confirmPassword} onChange={handleChange} required />
        </div>

        <div className={styles.formButtons}>
          <button className = {styles.signupBtn}type="submit" disabled={isFormInvalid()}>Sign Up</button>
          <button type="button" className= {styles.cancel} onClick={() => navigate('/')}>Cancel</button>
        </div>
      </form>
    </div>
    </main>
    </>
  );
};

export default SignUpForm;
