const favButtonHandler = async (event) => {
    event.preventDefault();
    console.log(event.target)
    
      const id = document.querySelector.getAttribute('pet-id');
  
      const response = await fetch(`/api/pets/${id}`, {
        method: 'PUT',
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