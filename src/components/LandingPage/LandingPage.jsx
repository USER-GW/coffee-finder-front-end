import { useState, useContext } from 'react';
import styles from './LandingPage.module.css';
import { Link } from 'react-router';
import { UserContext } from '../../contexts/UserContext';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const MiniBarChart = ({ data }) => {
  const chartData = [
    { name: '☕️ Quality', value: data?.Quality || 0 },
    { name: '😊 Staff', value: data?.Staff || 0 },
    { name: '📸 Aesthetics', value: data?.Aesthetics || 0 },
    { name: '💻 Work', value: data?.Good4Work || 0 },
    { name: '💸 Price', value: data?.Price || 0 },
  ];

  const getBarColor = (score) => {
    if (score >= 4) return '#8f8f66';
    if (score >= 2.5) return '#d69940';
    return '#bd5a28';
  };

  return (
    <ResponsiveContainer width="100%" minHeight={140} height="70%">
      <BarChart
        data={chartData}
        layout="vertical"
        margin={{ top: 10, right: 15, left: 10, bottom: 10 }}
      >
        <XAxis type="number" domain={[0, 5]} hide />
        <YAxis
          dataKey="name"
          type="category"
          width={100}
          tick={{
            fontSize: 21,
            fontFamily: 'Bebas Neue, sans-serif',
            fill: '#5c4e44',
          }}
        />
        <Bar dataKey="value" radius={[5, 5, 5, 5]}>
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getBarColor(entry.value)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

const LandingPage = (props) => {
  const [filteredResults, setFilteredResults] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const { user, setUser } = useContext(UserContext);

  const handleSearch = (event) => {
    event.preventDefault();
    const searchTerm = searchInput.toLowerCase().trim();
    if (searchTerm === '') {
      setFilteredResults(null);
      return;
    }

    const results = props.coffeeShop.filter(
      (shop) =>
        shop.name.toLowerCase().includes(searchTerm) ||
        shop.location.toLowerCase().includes(searchTerm)
    );

    setFilteredResults(results);
  };

  const shopsToDisplay = filteredResults ?? props.coffeeShop;

  return (
    <div className={`${styles.landingWrapper} ${styles.mainContainer}`}>
      <div className={styles.headerContainer}>
        <h1 className={styles.name}>Nooks & Brews</h1>
      </div>

      <div className={styles.sloganContainer}>
        <p className={styles.slogan}>
          Discover and rate the best brews in your nook of the woods
        </p>
      </div>

      <div className={styles.search}>
        <form onSubmit={handleSearch}>
          <input
            name="search"
            type="text"
            placeholder="Search for a coffee shop..."
            value={searchInput}
            className={styles.searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
              if (e.target.value.trim() === '') {
                setFilteredResults(null);
              }
            }}
          />
          <button className={styles.searchButton} type="submit">
            Search
          </button>
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
                  <p className={styles.rating}>
                    🫘 {coffee.coffeeData?.Rating ?? 'N/A'}
                  </p>
                </div>

                <div className={styles.hoverDetails}>
                  <h2 className={styles.hoverDetailsH2}>{coffee.name}</h2>
                  <MiniBarChart data={coffee.coffeeData} />
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
      
    </div>
  );
};

export default LandingPage;
