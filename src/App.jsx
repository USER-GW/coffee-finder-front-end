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



const App = () => {
  const navigate = useNavigate();
  const [coffeeShop, setCoffeeShop] = useState([]);
    const { setUser } = useContext(UserContext);

  useEffect(() => {
    const fetchAllCoffee = async () => {
      const coffeeShop = await coffeeService.index();
      setCoffeeShop(coffeeShop);
    };
    
    fetchAllCoffee();
  }, []);


  const handleAddShop = async (coffeeFormData) => {
    const newCoffeeShop = await coffeeService.create(coffeeFormData);
    setCoffeeShop([newCoffeeShop, ...coffeeShop]); 
    navigate('/');

  };

  const handleUpdateShop = async (_id, coffeeFormData) => {
    console.log('Form submitted:', coffeeFormData, _id);
    const updatedCoffeeShop = await coffeeService.update(_id, coffeeFormData);


    setCoffeeShop(coffeeShop.map((shop) => (_id === shop._id ? updatedCoffeeShop : shop)));

    navigate(`/${_id}`);
  }

  const handleDelete = async (user_id) => {
      const deletedUser = await authService.deleteAccount(user_id);
      localStorage.removeItem('token');
      setUser(null);
      console.log(user_id);
      console.log(deletedUser);
      navigate('/');
  }


  
  return (
    <>
      <NavBar />
      <div>
  

      </div>

      <Routes>
      <Route path="/" element={<LandingPage coffeeShop={coffeeShop}/>} />
      <Route path="/:_id" element={<CoffeeDetails coffeeShop={coffeeShop}/>} />
      <Route path="/add" element={<AddShopForm handleAddShop = {handleAddShop}/>} />
      <Route path='/sign-up' element={<SignUpForm />} />
      <Route path="/sign-in" element={<SignInForm />} />
      <Route path="/delete-account/auth/:user_id" element={<DeleteAccount handleDelete={handleDelete}/>} />
      <Route path ="/review/:_id" element={<UpdateDetails handleUpdateShop={handleUpdateShop} coffeeShop={coffeeShop} />} />

      </Routes>
    </>
  );
};

export default App;