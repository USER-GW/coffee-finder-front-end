const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/`;

const index = async () => {
    try {
      const res = await fetch(BASE_URL, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };
  
  const show = async (_id) => {
    try {
        const res = await fetch(`${BASE_URL}${_id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        return res.json();
    }catch(error) {
      console.log(error);
    }
  }

const create = async (coffeeFormData) => {
  try {
    const res = await fetch(`${BASE_URL}add`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(coffeeFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
}


  const update = async (coffeeShopId, averageRating) => {
  
    try {
      const res = await fetch(`${BASE_URL}review/${coffeeShopId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(averageRating),
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };

  const createComment = async (coffeeShopId, commentFormData) => {
    try {
      const res = await fetch(`${BASE_URL}comment/${coffeeShopId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentFormData),
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteComment = async (coffeeShopId, commentId) => {
    try {
      const res = await fetch(`${BASE_URL}comment/${coffeeShopId}/${commentId}`, {
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
  


 const addFavourite = async (coffeeShopId, userId) => {
  const res = await fetch(`${BASE_URL}account/${coffeeShopId}/${userId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  if (!res.ok) throw new Error('Failed to toggle favourite');

  return res.json();  
};

const fetchFavourites = async (userId) => {
  try {
  
    const res = await fetch(`${BASE_URL}account/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (!res.ok) throw new Error('Failed to fetch favourites');

    return res.json();
  } catch (err) {
    console.error('Error fetching favourites:', err);
    return [];
  }
};

  export { 
    index,
    show,
    create,
    update,
    createComment,
    deleteComment,
    addFavourite,
    fetchFavourites
  };