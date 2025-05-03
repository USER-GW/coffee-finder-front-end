import { useParams } from 'react-router'; 
import { useState, useEffect, useContext } from 'react';
import * as coffeeService from '../../services/coffeeService';
import styles from './UpdateDetails.module.css';
import { UserContext } from '../../contexts/UserContext';
import { Helmet } from 'react-helmet';

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
    <>
<Helmet>
  <title>Update Your Coffee Shop Review | Nooks & Brews</title>
  <meta name="description" content="Update your ratings and review for your favourite coffee shop on Nooks & Brews. Share your updated experience with the community." />
  <meta name="keywords" content="update coffee review, add coffee shop scores, edit coffee review, rate coffee shops, coffee ratings, Nooks and Brews reviews" />
  <meta property="og:title" content="Update Your Coffee Shop Review | Nooks & Brews" />
  <meta property="og:description" content="Update your coffee shop ratings and share your latest experience with the Nooks & Brews community. Keep your reviews fresh and helpful." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://nooksandbrews.com/update-review" />
</Helmet>


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
    </>
  );
};

export default UpdateDetails;
