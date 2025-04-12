import { useState, useContext} from 'react';
import styles from './LandingPage.module.css';
import { Link } from 'react-router';
import { index } from '../../services/coffeeService';
import { UserContext } from '../../contexts/UserContext';

const LandingPage = (props) => {
  const [filteredResults, setFilteredResults] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const { user, setUser } = useContext(UserContext);

  const handleSearch = (event) => {
    event.preventDefault();
    const searchTerm = searchInput.toLowerCase().trim();
    if (searchTerm === "") {
      setFilteredResults(null);
      return;
    }

    const results = props.coffeeShop.filter((shop) =>
      shop.name.toLowerCase().includes(searchTerm) ||
      shop.location.toLowerCase().includes(searchTerm)
    );

    setFilteredResults(results);
  };

  const shopsToDisplay = filteredResults ?? props.coffeeShop;

  return (
    
    <>
    <main className={styles.mainContainer}>
      <div className={styles.headerContainer}>
    <h1 className = {styles.name}>Bean LDN</h1>
    </div>
      <div className={styles.search}>
        <form onSubmit={handleSearch}>
          <input
            name="search"
            type="text"
            placeholder="Search for a coffee shop..."
            value={searchInput}
            className = {styles.searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
              if (e.target.value.trim() === "") {
                setFilteredResults(null);
              }
            }}
          />
          <button className={styles.searchButton} type="submit">Search</button>
        </form>
      </div>

      <section className={styles.landingPageSection}>
        <div className={styles.shopContainer}>
          {shopsToDisplay.length > 0 ? (
            shopsToDisplay.map((coffee) => (
              <div key={coffee._id} className={styles.shopDiv}>
                <div className={styles.front}>
                  <h2>{coffee.name}</h2>
                  <p>{coffee.location}</p>
                  <p className= {styles.rating}> 🫘 {coffee.coffeeData?.Rating ?? 'N/A'}</p>
                </div>

                <div className={styles.hoverDetails}>
                  <h2 className={styles.hoverDetailsH2}>{coffee.name}</h2>
                  <p>☕️ Quality: {coffee.coffeeData?.Quality ?? 'N/A'}</p>
                  <p>☺️ Staff: {coffee.coffeeData?.Staff ?? 'N/A'}</p>
                  <p>📸 Aesthetics: {coffee.coffeeData?.Aesthetics ?? 'N/A'}</p>
                  <p>💻 Good for Work: {coffee.coffeeData?.Good4Work ?? 'N/A'}</p>
                  <p>💸 Price: {coffee.coffeeData?.Price ?? 'N/A'}</p>

                  <Link to={`/${coffee._id}`} className={styles.hoverDetailsmore}>
                    Show me more
                  </Link>
                </div>
              </div>
            ))
          ) : filteredResults !== null ? (
            <p className={styles.noResults}>Oops, nothing to show.</p>
          ) : null}
      
        </div>
        
      </section>
      </main>
    </>
  );
};

export default LandingPage;
