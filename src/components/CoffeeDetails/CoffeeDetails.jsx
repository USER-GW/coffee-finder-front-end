import styles from './CoffeeDetails.module.css';
import { useNavigate } from 'react-router';
import { useParams, Link } from 'react-router';
import * as coffeeService from '../../services/coffeeService';
import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';



const CoffeeDetails = (props) => {
    const navigate = useNavigate();
    const { _id } = useParams();
    const [coffeeDeets, setCoffeedeets] = useState(null);
    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        const fetchCoffee = async () => {
          try {
            const coffeeData = await coffeeService.show(_id);
        
            setCoffeedeets(coffeeData);
          } catch (err) {
            console.error("Error fetching coffee:", err);
          }
        };
      
     fetchCoffee();
      }, [_id]);
    
      if (!coffeeDeets) return <div className={styles.loading}>Loading...</div>;

     
    return (
       <>
       <main className={styles.mainContainer}>
    <div className={styles.detailsContainer}>
  <h2 className={styles.shopDetails}>{coffeeDeets.name} - <span> {coffeeDeets.location} </span></h2>

  <div className={styles.detailList}>
    <p className={styles.detailItem}>☕️ <span>Quality:</span> {coffeeDeets.coffeeData.Quality}</p>
    <p className={styles.detailItem}>☺️ <span>Staff:</span> {coffeeDeets.coffeeData.Staff}</p>
    <p className={styles.detailItem}>📸 <span>Aesthetics:</span> {coffeeDeets.coffeeData.Aesthetics}</p>
    <p className={styles.detailItem}>💻 <span>Good for Work:</span> {coffeeDeets.coffeeData.Good4Work}</p>
    <p className={styles.detailItem}>💸 <span>Price:</span> {coffeeDeets.coffeeData.Price}</p>
    <p className={styles.detailItem}>🍴 <span>Food:</span> {coffeeDeets.coffeeData.Food}</p>
    <p className={styles.detailItem}>🌱 <span>Veggie Options:</span> {coffeeDeets.coffeeData.Veggie}</p>
    <p className={styles.detailItem}>🛜 <span>WiFi:</span> {coffeeDeets.coffeeData.WiFi}</p>
    {/* <p className={styles.detailItem}>🦠 <span>Cleanliness:</span> {coffeeDeets.coffeeData.Cleanliness}</p> */}
    <p className={styles.detailItem}>♿️ <span>Accessibility:</span> {coffeeDeets.coffeeData.Accessibility}</p>
    <p className={styles.detailItem}>📢 <span>Loudness:</span> {coffeeDeets.coffeeData.Loud}</p>
    <p className={styles.detailItem}>💼 <span>Good for Meetings:</span> {coffeeDeets.coffeeData.Good4Meetings}</p>
  
  </div>

</div>

{user ? (
  <div className={styles.buttonContainer}>
    <button
      className={styles.addReviewBtn}
      onClick={() => navigate(`/review/${coffeeDeets._id}`)}
    >
      Add Review
    </button>
  </div>
) : (
    <div className={styles.buttonContainer}>
    <button
      className={styles.login}
      onClick={() => navigate("/sign-in/")}
    >
      Sign In to Add Review
    </button>
  </div>
)}

</main>
       </>
 
        
    
    )
  };
  
  export default CoffeeDetails;