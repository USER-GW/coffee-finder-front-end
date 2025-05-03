const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/auth`;

const signUp = async (formData) => {
  try {
    const res = await fetch(`${BASE_URL}/sign-up`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
     
      const errorMessage = data.err || 'An unexpected error occurred';
      throw new Error(errorMessage);
    }

    if (data.token) {
      localStorage.setItem('token', data.token);
      return JSON.parse(atob(data.token.split('.')[1])).payload;
    }

    throw new Error('Invalid response from server');
  } catch (err) {

    throw new Error(err.message || 'Something went wrong');
  }
};

const signIn = async (formData) => {
    try {
      const res = await fetch(`${BASE_URL}/sign-in`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      const data = await res.json();
  
      if (data.err) {
        throw new Error(data.err);
      }
  
      if (data.token) {
        localStorage.setItem('token', data.token);
        return JSON.parse(atob(data.token.split('.')[1])).payload;
      }
  
      throw new Error('Account not found');
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  };

  const deleteAccount = async (user_id) => {
    try {
      const res = await fetch(`${BASE_URL}/delete-account/${user_id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };


export {
  signUp,
  signIn,
  deleteAccount
};
