const favButtonHandler = async (event) => {
  event.preventDefault();
  console.log(event.target);
  
  const id = document.querySelector('#favorite-pet').getAttribute(
      "data-id"
  );

  const response = await fetch(`/api/favorites`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json' 
      },
      body: JSON.stringify({ pet_id: id }), 
  });

  if (response.ok) {
      document.location('/profile');
  } else {
      alert('Could not add to favorites');
  }
};

  document
.querySelector('#favorite-pet')
.addEventListener('click', favButtonHandler);