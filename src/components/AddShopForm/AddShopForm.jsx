import { useState } from 'react';
import styles from './AddShopForm.module.css';


const AddShopForm = ({ handleAddShop, message, setMessage }) => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
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

  const handleChange = (event) => {
    const { name, value } = event.target;
  
    if (formData.coffeeData.hasOwnProperty(name)) {
      const numericValue = parseInt(value);
      if (!isNaN(numericValue) && (numericValue < 0 || numericValue > 5)) return;
  
      setFormData((prevFormData) => ({
        ...prevFormData,
        coffeeData: {
          ...prevFormData.coffeeData,
          [name]: value,
        }
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value
      }));
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');

    try {
      await handleAddShop(formData);
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <main className={styles.addShopMain}>
   

      <form onSubmit={handleSubmit} className={styles.addShopForm}>
        <h1 className={styles.title}>Add Coffee Shop ☕️</h1>
        <h2 className={styles.formSubtitle}>Please input score between 0-5 or computer says no</h2>
        {message && <p className={styles.error}>{message}</p>}

        <label>
          Name*:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <label>
          Location*:
          <input type="text" name="location" value={formData.location} onChange={handleChange} required />
        </label>
        <label>
          Overall Rating* 🫘:
          <input type="number" name="Rating" value={formData.coffeeData.Rating} onChange={handleChange} min="0" max="5" required />
        </label>
        <label>
          Quality* ☕️:
          <input type="number" name="Quality" value={formData.coffeeData.Quality} onChange={handleChange} min="0" max="5" required />
        </label>
        <label>
          Staff* ☺️:
          <input type="number" name="Staff" value={formData.coffeeData.Staff} onChange={handleChange} min="0" max="5" required />
        </label>
        <label>
          Aesthetics* 📸:
          <input type="number" name="Aesthetics" value={formData.coffeeData.Aesthetics} onChange={handleChange} min="0" max="5" required />
        </label>
        <label>
          Good For Work* 💻:
          <input type="number" name="Good4Work" value={formData.coffeeData.Good4Work} onChange={handleChange} min="0" max="5" required />
        </label>
        <label>
          Price* 💸:
          <input type="number" name="Price" value={formData.coffeeData.Price} onChange={handleChange} min="0" max="5" />
        </label>
        <label>
          WiFi 🛜:
          <input type="number" name="WiFi" value={formData.coffeeData.WiFi} onChange={handleChange} min="0" max="5" />
        </label>
        <label>
          Food 🍴:
          <input type="number" name="Food" value={formData.coffeeData.Food} onChange={handleChange} min="0" max="5" />
        </label>
        <label>
          Veggie 🌱:
          <input type="number" name="Veggie" value={formData.coffeeData.Veggie} onChange={handleChange} min="0" max="5" />
        </label>
        <label>
          Accessibility ♿️:
          <input type="number" name="Accessibility" value={formData.coffeeData.Accessibility} onChange={handleChange} min="0" max="5" />
        </label>
        <label>
          Loudness 📢:
          <input type="number" name="Loud" value={formData.coffeeData.Loud} onChange={handleChange} min="0" max="5" />
        </label>
        <label>
          Good For Meetings 💼:
          <input type="number" name="Good4Meetings" value={formData.coffeeData.Good4Meetings} onChange={handleChange} min="0" max="5" />
        </label>

        <button type="submit">Add Coffee Shop!</button>
      </form>
    </main>
  );
};

export default AddShopForm;
