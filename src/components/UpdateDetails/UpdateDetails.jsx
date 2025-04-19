import { useParams } from 'react-router'; 
import { useState, useEffect, useContext } from 'react';
import * as coffeeService from '../../services/coffeeService';
import styles from './UpdateDetails.module.css';
import { UserContext } from '../../contexts/UserContext';

const UpdateDetails = (props) => {
  const { coffeeShopId } = useParams();
  const { user } = useContext(UserContext);

  console.log('UpdateDetails coffeeShopId:', coffeeShopId);

  const [formData, setFormData] = useState({
    coffeeData: {
      Rating: 0,
      Quality: 0,
      Staff: 0,
      Aesthetics: 0,
      Food: 0,
      Veggie: 0,
      WiFi: 0,
      Price: 0,
      Accessibility: 0,
      Loud: 0,
      Busy: 0,
      Good4Work: 0,
      Good4Meetings: 0
    }
  });

  useEffect(() => {
    const fetchCoffee = async () => {
      try {
        const coffeeDataFromServer = await coffeeService.show(coffeeShopId);
        console.log('Fetched data:', coffeeDataFromServer);
        setFormData(coffeeDataFromServer);
      } catch (err) {
        console.error('Error fetching coffee data:', err);
      }
    };
   
    if (coffeeShopId) fetchCoffee();
  }, [coffeeShopId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const numericValue = parseInt(value);
  
    if (!isNaN(numericValue)) {
      if (numericValue < 0 || numericValue > 5) return;
    }
  
    setFormData((prevFormData) => ({
      ...prevFormData,
      coffeeData: {
        ...prevFormData.coffeeData,
        [name]: value
      }
    }));
  };
  



  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (coffeeShopId) {
      props.handleUpdateShop(coffeeShopId, formData); 
    }
  };

  return (
    <main className={styles.formContainer}>
      <h1 className={styles.formTitle}>What's your take?</h1>
      <h2 className={styles.formSubtitle}>Please input score between 0-5 or computer says no</h2>
      <form onSubmit={handleSubmit} className={styles.formContent}>
        {[
          { label: "Overall Rating 🫘", name: "Rating" },
          { label: "Quality ☕️", name: "Quality" },
          { label: "Staff ☺️", name: "Staff" },
          { label: "Aesthetics 📸", name: "Aesthetics" },
          { label: "Good For Work 💻", name: "Good4Work" },
          { label: "Price 💸", name: "Price" },
          { label: "WiFi 🛜", name: "WiFi" },
          { label: "Food 🍴", name: "Food" },
          { label: "Veggie 🌱", name: "Veggie" },
          { label: "Accessibility ♿️", name: "Accessibility" },
          { label: "Loudness 📢", name: "Loud" },
          { label: "Good For Meetings 💼", name: "Good4Meetings" }
        ].map(({ label, name }) => (
          <label key={name} className={styles.formGroup}>
            <span>{label}:</span>
            <input
              type="number"
              name={name}
              value={formData.coffeeData[name]}
              onChange={handleChange}
              min="0"
              max="5"
              required={["Rating", "Quality", "Staff", "Aesthetics", "Good4Work", "Price"].includes(name)}
            />
          </label>
        ))}

        <button type="submit" className={styles.submitButton}>
          Add Review!
        </button>
      </form>
    </main>
  );
};

export default UpdateDetails;
