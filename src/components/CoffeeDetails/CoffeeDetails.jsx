import styles from './CoffeeDetails.module.css';
import { useNavigate, useParams } from 'react-router';
import * as coffeeService from '../../services/coffeeService';
import { useEffect, useState, useContext, useRef } from 'react';
import { UserContext } from '../../contexts/UserContext';
import CommentForm from '../CommentForm/CommentForm';
import { Helmet } from 'react-helmet';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';


import icon from 'leaflet/dist/images/marker-icon.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import shadow from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetina,
  iconUrl: icon,
  shadowUrl: shadow,
});


const emojiIcon = L.divIcon({
  className: 'custom-emoji-icon',
  html: '📍',
  iconSize: [59, 32],
  iconAnchor: [16, 32],
});




const CoffeeDetails = (props) => {
  const navigate = useNavigate();
  const { _id } = useParams();
  const { user } = useContext(UserContext);
  const dropdownRef = useRef(null);

  const [coffeeDeets, setCoffeedeets] = useState(null);
  const [center, setCenter] = useState({ lat: 51.505, lng: -0.09 });
  const [openDropdown, setOpenDropdown] = useState(null);

  const [isFavourited, setIsFavourited] = useState(false);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const checkFavouriteStatus = async () => {
      if (!user || !coffeeDeets) return;
  
      const favourites = await coffeeService.fetchFavourites(user._id);
      const isFav = favourites.some(
        (shop) => shop._id.toString() === coffeeDeets._id.toString()
      );
      setIsFavourited(isFav);
    };
  
    checkFavouriteStatus();
  }, [user, coffeeDeets]);
  
  useEffect(() => {
    const fetchCoffee = async () => {
      try {
        const data = await coffeeService.show(_id);
        setCoffeedeets(data);
      } catch (err) {
        console.error("Error fetching coffee:", err);
      }
    };
    fetchCoffee();
  }, [_id]);

 
  useEffect(() => {
    const getCoordinates = async () => {
      if (!coffeeDeets?.postcode) return;

      const cleanedPostcode = coffeeDeets.postcode.replace(/\s/g, '').toUpperCase();
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cleanedPostcode)}`);
      const data = await res.json();

      if (data.length > 0) {
        const match = data.find(item =>
          item.display_name.replace(/\s/g, '').toUpperCase().includes(cleanedPostcode)
        );
        if (match) {
          setCenter({
            lat: parseFloat(match.lat),
            lng: parseFloat(match.lon),
          });
        }
      }
    };
    getCoordinates();
  }, [coffeeDeets]);




  const handleAddComment = async (commentFormData) => {
    const newComment = await coffeeService.createComment(coffeeDeets._id, commentFormData);
    setCoffeedeets({
      ...coffeeDeets,
      comments: [...coffeeDeets.comments, newComment]
    });
  };

  if (!coffeeDeets) return <div className={styles.loading}>Loading... ☕️</div>;

  return (
    <>
 <Helmet>
  <title>{coffeeDeets.name} | {coffeeDeets.location} | Nooks & Brews</title>
  <meta name="description" content={`Read reviews, see ratings, and explore ${coffeeDeets.name} located in ${coffeeDeets.location}. Discover why it's a favourite coffee spot on Nooks & Brews.`} />
  <meta name="keywords" content="coffee, coffee work place, coffee shops, reviews, community, cafe, London coffee, best coffee shops in London, coffee ratings" />
  <meta property="og:title" content={`${coffeeDeets.name} | ${coffeeDeets.location} | Nooks & Brews`} />
  <meta property="og:description" content={`See ratings, reviews, and more about ${coffeeDeets.name} in ${coffeeDeets.location}. Join Nooks & Brews community to explore the best coffee spots.`} />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={`https://nooksandbrews.com/${coffeeDeets._id}`} />
</Helmet>

    
    <main className={styles.mainContainer}>
      <div className={styles.contentWrapper}>

        <div className={styles.detailsContainer}>
        <div className={styles.btnContainer}>

        <button
  onClick={async () => {
    try {
      const result = await props.handleAddFavourite(coffeeDeets._id, user._id);

      if (result.message === "Added to favourites") {
        setIsFavourited(true);
      } else if (result.message === "Removed from favourites") {
        setIsFavourited(false);
      }
    } catch (err) {
      console.error("Error toggling favourite:", err);
    }
  }}
  className={styles.heartBtn}
  aria-label="Toggle favourite"
>
  {isFavourited ? '❤️' : '🤍'}
</button>

</div>
          <h2 className={styles.shopDetails}>
            {coffeeDeets.name} - <span>{coffeeDeets.location}</span>
         
          </h2>



          <div className={styles.detailList}>
            <p>☕️ <span>Quality:</span> {coffeeDeets.coffeeData.Quality}</p>
            <p>☺️ <span>Staff:</span> {coffeeDeets.coffeeData.Staff}</p>
            <p>📸 <span>Aesthetics:</span> {coffeeDeets.coffeeData.Aesthetics}</p>
            <p>💻 <span>Good for Work:</span> {coffeeDeets.coffeeData.Good4Work}</p>
            <p>💸 <span>Price:</span> {coffeeDeets.coffeeData.Price}</p>
            <p>🍴 <span>Food:</span> {coffeeDeets.coffeeData.Food}</p>
            <p>🌱 <span>Veggie Options:</span> {coffeeDeets.coffeeData.Veggie}</p>
            <p>🛜 <span>WiFi:</span> {coffeeDeets.coffeeData.WiFi}</p>
            <p>♿️ <span>Accessibility:</span> {coffeeDeets.coffeeData.Accessibility}</p>
            <p>📢 <span>Loudness:</span> {coffeeDeets.coffeeData.Loud}</p>
            <p>💼 <span>Good for Meetings:</span> {coffeeDeets.coffeeData.Good4Meetings}</p>
          </div>

          <div className={styles.buttonContainer}>
            {user ? (
              <button
                className={styles.addReviewBtn}
                onClick={() => navigate(`/review/${coffeeDeets._id}`)}
              >
                Add Review
              </button>
            ) : (
              <button
                className={styles.addReviewBtn}
                onClick={() => navigate("/sign-up/")}
              >
                Sign Up to Add Review
              </button>
            )}
          </div>
        </div>

        <div className={styles.commentsAndForm}>
          <h2 className={styles.commentHeading}>Comments</h2>

          <div className={styles.commentList}>
            {!coffeeDeets.comments.length && (
              <p className={styles.noComments}>There are no comments.</p>
            )}
            {coffeeDeets.comments.map((comment) => {
              const isAuthor = comment.author?._id === user?._id;
              return (
                <article key={comment._id} className={styles.commentCard}>
                  {isAuthor && (
                    <div className={styles.optionsWrapper}>
                      <button
                        className={styles.optionsButton}
                        onClick={() =>
                          setOpenDropdown(openDropdown === comment._id ? null : comment._id)
                        }
                      >
                        &#8942;
                      </button>
                      {openDropdown === comment._id && (
                        <div ref={dropdownRef} className={styles.dropdownMenu}>
                          <button
                            className={styles.dropdownItem}
                            onClick={() => {
                              props.handleDeleteComment(_id, comment._id);
                              setOpenDropdown(null);
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                  <p className={styles.commentText}>{comment.text}</p>
                  <footer className={styles.commentFooter}>
                    <p className={styles.commentMeta}>
                      {comment.author?.userName
                        ? `${comment.author.userName} posted on ${new Date(comment.createdAt).toLocaleDateString()}`
                        : 'Anonymous post'}
                    </p>
                  </footer>
                </article>
              );
            })}
          </div>
          <CommentForm handleAddComment={handleAddComment} />
        </div>

        <div className={styles.mapContainer}>
          <MapContainer
            key={center.lat}
            center={center}
            zoom={15}
            scrollWheelZoom={false}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            />
            <Marker position={center} icon={emojiIcon}>
              <Popup>{coffeeDeets.name}</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </main>
    </>
  );
};

export default CoffeeDetails;
