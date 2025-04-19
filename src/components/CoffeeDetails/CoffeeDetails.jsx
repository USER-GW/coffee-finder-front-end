import styles from './CoffeeDetails.module.css';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router';
import * as coffeeService from '../../services/coffeeService';
import { useEffect, useState, useContext, useRef } from 'react';
import { UserContext } from '../../contexts/UserContext';
import CommentForm from '../CommentForm/CommentForm';



const CoffeeDetails = (props) => {
  const navigate = useNavigate();
  const { _id } = useParams();
  const [coffeeDeets, setCoffeedeets] = useState(null);
  const { user } = useContext(UserContext);
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null); 


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  const handleAddComment = async (commentFormData) => {
    const newComment = await coffeeService.createComment(coffeeDeets._id, commentFormData);
    setCoffeedeets({ ...coffeeDeets, comments: [...coffeeDeets.comments, newComment] });
  };

  return (
    <main className={styles.mainContainer}>
      <div className={styles.contentWrapper}>
        <div className={styles.detailsContainer}>
          <h2 className={styles.shopDetails}>
            {coffeeDeets.name} - <span>{coffeeDeets.location}</span>
          </h2>

          <div className={styles.detailList}>
            <p className={styles.detailItem}>☕️ <span>Quality:</span> {coffeeDeets.coffeeData.Quality}</p>
            <p className={styles.detailItem}>☺️ <span>Staff:</span> {coffeeDeets.coffeeData.Staff}</p>
            <p className={styles.detailItem}>📸 <span>Aesthetics:</span> {coffeeDeets.coffeeData.Aesthetics}</p>
            <p className={styles.detailItem}>💻 <span>Good for Work:</span> {coffeeDeets.coffeeData.Good4Work}</p>
            <p className={styles.detailItem}>💸 <span>Price:</span> {coffeeDeets.coffeeData.Price}</p>
            <p className={styles.detailItem}>🍴 <span>Food:</span> {coffeeDeets.coffeeData.Food}</p>
            <p className={styles.detailItem}>🌱 <span>Veggie Options:</span> {coffeeDeets.coffeeData.Veggie}</p>
            <p className={styles.detailItem}>🛜 <span>WiFi:</span> {coffeeDeets.coffeeData.WiFi}</p>
            <p className={styles.detailItem}>♿️ <span>Accessibility:</span> {coffeeDeets.coffeeData.Accessibility}</p>
            <p className={styles.detailItem}>📢 <span>Loudness:</span> {coffeeDeets.coffeeData.Loud}</p>
            <p className={styles.detailItem}>💼 <span>Good for Meetings:</span> {coffeeDeets.coffeeData.Good4Meetings}</p>
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
                onClick={() => navigate("/sign-in/")}
              >
                Sign In to Add Review
              </button>
            )}
          </div>
        </div>

        <section className={styles.commentSection}>
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
                ? `${comment.author.userName} posted on ${new Date(
                    comment.createdAt
                  ).toLocaleDateString()}`
                : 'Anonymous post'}
            </p>
          </footer>
        </article>
      );
    })}
  </div>


  <CommentForm handleAddComment={handleAddComment} />
  
</section>
      </div>
 
    </main>
  );
};

export default CoffeeDetails;
