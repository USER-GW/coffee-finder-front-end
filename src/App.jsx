import { useState, useEffect, useContext } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router'; 
import * as coffeeService from './services/coffeeService';
import * as authService from './services/authService';

import NavBar from './components/NavBar/NavBar';
import LandingPage from './components/LandingPage/LandingPage';
import CoffeeDetails from './components/CoffeeDetails/CoffeeDetails';
import AddShopForm from './components/AddShopForm/AddShopForm';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import UpdateDetails from './components/UpdateDetails/UpdateDetails';
import DeleteAccount from './components/DeleteAccount/DeleteAccount';
import CommentForm from './components/CommentForm/CommentForm';
import Account from './components/Account/Account';
import Footer from './components/Footer/Footer';
import { UserContext } from './contexts/UserContext';


import './App.css';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation(); // ← grab current path
  const [coffeeShop, setCoffeeShop] = useState([]);
  const { setUser } = useContext(UserContext);
  const [message, setMessage] = useState('');
  const [favourite, setFavoutite] = useState(false);

  useEffect(() => {
    const fetchAllCoffee = async () => {
      const coffeeShop = await coffeeService.index();
      setCoffeeShop(coffeeShop);
    };
    fetchAllCoffee();
  }, []);

  const handleAddShop = async (coffeeFormData) => {
    const existingCoffeeShopName = coffeeShop.find(
      (shop) => shop.name === coffeeFormData.name
    );
    const existingCoffeeShopPostCode = coffeeShop.find(
      (shop) => shop.postcode === coffeeFormData.postcode
    );
  
    
    if (existingCoffeeShopName && existingCoffeeShopPostCode) {
      throw new Error('This coffee shop already exists, please add your own review to it!');
    }
  
    const newCoffeeShop = await coffeeService.create(coffeeFormData);
    setCoffeeShop([newCoffeeShop, ...coffeeShop]);
    navigate('/');
  };

  const handleUpdateShop = async (coffeeShopId, coffeeFormData) => {
    const updatedCoffeeShop = await coffeeService.update(coffeeShopId, coffeeFormData);
    setCoffeeShop(
      coffeeShop.map((shop) =>
        coffeeShopId === shop._id ? updatedCoffeeShop : shop
      )
    );
    navigate(`/${coffeeShopId}`);
  };

  const handleDelete = async (user_id) => {
    const deletedUser = await authService.deleteAccount(user_id);
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  const handleDeleteComment = async (coffeeShopId, commentId) => {
    const deleted = await coffeeService.deleteComment(coffeeShopId, commentId);
    if (!deleted) return;
    setCoffeeShop((prev) =>
      prev.map((shop) =>
        shop._id === coffeeShopId
          ? {
              ...shop,
              comments: shop.comments.filter(
                (comment) => comment._id.toString() !== commentId.toString()
              ),
            }
          : shop
      )
    );
  };

  const handleAddFavourite = async (coffeeShopId, userId) => {
    const favourite  = await coffeeService.addFavourite(coffeeShopId, userId);
    console.log(coffeeShopId, userId);
    setFavoutite(favourite);
    console.log(favourite);
  }

  

  return (
    <div className="app-container">
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<LandingPage coffeeShop={coffeeShop} />} />
          <Route path="/:_id" element={<CoffeeDetails coffeeShop={coffeeShop} handleDeleteComment={handleDeleteComment} handleAddFavourite={handleAddFavourite} setFavourite={setFavoutite}/>} />
          <Route path="/add" element={<AddShopForm handleAddShop={handleAddShop} message={message} setMessage={setMessage} />} />
          <Route path="/sign-up" element={<SignUpForm />} />
          <Route path="/sign-in" element={<SignInForm />} />
          <Route path="/delete-account/auth/:user_id" element={<DeleteAccount handleDelete={handleDelete} />} />
          <Route path="/review/:coffeeShopId" element={<UpdateDetails handleUpdateShop={handleUpdateShop} />} />
          <Route path="/account/:user_id" element={<Account favourite={favourite} coffeeShop={coffeeShop}/> } />
        </Routes>
      
      </main>

    
      {location.pathname !== '/' && <Footer />}
    </div>
  );
};

export default App;
