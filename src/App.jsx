import { useState, useEffect, useContext } from 'react';
import { Routes, Route, useNavigate } from 'react-router'; 
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
import { UserContext } from './contexts/UserContext';
import CommentForm from './components/CommentForm/CommentForm';



const App = () => {
  const navigate = useNavigate();
  const [coffeeShop, setCoffeeShop] = useState([]);
    const { setUser } = useContext(UserContext);
    const [message, setMessage] = useState('');

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
    const existingCoffeeShopLocation = coffeeShop.find(
      (shop) => shop.location === coffeeFormData.location
    );
  
    if (existingCoffeeShopName && existingCoffeeShopLocation) {
      throw new Error('This coffee shop already exists, please add your own review to it!');
    }
  
    const newCoffeeShop = await coffeeService.create(coffeeFormData);
    setCoffeeShop([newCoffeeShop, ...coffeeShop]);
    navigate('/');
  };
  // const handleUpdateShop = async (coffeeShopId, coffeeFormData) => {
 
  //   const initialRatings = coffeeShop;
  //   console.log("initialRatings:", initialRatings);

  

  //   const newRating = coffeeFormData.coffeeData;
  //   console.log("newRating:", newRating);
  
  //   const averagedCoffeeData = {};
  
  //   for (let key in initialRatings) {
  //     if (newRating[key] === "" || newRating[key] === undefined) {
  //       averagedCoffeeData[key] = initialRatings[key];
  //     } else {
  //       const average = (Number(initialRatings[key]) + Number(newRating[key])) / 2;
  //       averagedCoffeeData[key] = average;
  //       console.log(`${key}: ${average}`);
  //     }
  //   }
  
  //   const averageRating = {
  //     ...coffeeFormData,
  //     coffeeData: averagedCoffeeData
  //   };
  
    
  //   const updatedCoffeeShop = await coffeeService.update(coffeeShopId, averageRating);
  //   console.log(coffeeShopId); 
  //   console.log('returned from server:', updatedCoffeeShop);
  
  
  //   setCoffeeShop(coffeeShop.map((shop) => (coffeeShopId === shop._id ? updatedCoffeeShop : shop)));
  //   console.log('coffeeShopId being passed to update:', coffeeShopId);
  
   
  //   navigate(`/${coffeeShopId}`);
  // };
  
  const handleUpdateShop = async (coffeeShopId, coffeeFormData) => {
    console.log('Form submitted:', coffeeFormData, coffeeShopId);
    const updatedCoffeeShop = await coffeeService.update(coffeeShopId, coffeeFormData);


    setCoffeeShop(coffeeShop.map((shop) => (coffeeShopId === shop._id ? updatedCoffeeShop : shop)));

    navigate(`/${coffeeShopId}`);
  }

 

  const handleDelete = async (user_id) => {
      const deletedUser = await authService.deleteAccount(user_id);
      localStorage.removeItem('token');
      setUser(null);
      console.log(user_id);
      console.log(deletedUser);
      navigate('/');
  }

  const handleDeleteComment = async (coffeeShopId, commentId) => {
    const deleted = await coffeeService.deleteComment(coffeeShopId, commentId);
  
    if (!deleted) {
      console.warn('Comment not deleted');
      return;
    }
  
    setCoffeeShop((prev) => {
      if (!prev || !Array.isArray(prev.comments)) return prev;
  
      return {
        ...prev,
        comments: prev.comments.filter(
          (comment) => comment._id.toString() !== commentId.toString()
        ),
      };
    });
  
  };



  
  return (
    <>
      <NavBar />
      <div>
  

      </div>

      <Routes>
      <Route path="/" element={<LandingPage coffeeShop={coffeeShop}/>} />
      <Route path="/:_id" element={<CoffeeDetails coffeeShop={coffeeShop} handleDeleteComment={handleDeleteComment} />} />
  
      <Route path="/add" element={
    <AddShopForm
      handleAddShop={handleAddShop}
      message={message}
      setMessage={setMessage}
    />
  }
/>
      <Route path='/sign-up' element={<SignUpForm />} />
      <Route path="/sign-in" element={<SignInForm />} />
      <Route path="/delete-account/auth/:user_id" element={<DeleteAccount handleDelete={handleDelete}/>} />
      <Route path="/review/:coffeeShopId" element={<UpdateDetails handleUpdateShop={handleUpdateShop} />} />


      </Routes>
    </>
  );
};

export default App;