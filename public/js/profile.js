document.addEventListener('DOMContentLoaded', async () => {

  const handleUserProfileCreation = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#name-input').value.trim();
    const email = document.querySelector('#email-input').value.trim();
    const password = document.querySelector('#password-input').value.trim();

    try {
      const response = await fetch('/api/users/profile', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        window.location.reload();
      } else {
        console.error('Failed to create user profile');
        alert('Failed to create user profile');
      }
    } catch (error) {
      console.error('Error creating user profile:', error);
      alert('Failed to create user profile');
    }
  };

  async function handleFavoritePet(event) {
    event.preventDefault();

    const petId = event.target.getAttribute('data-pet-id');

    try {
      const response = await fetch(`/api/favorites/${petId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('Pet added to favorites!');
      } else {
        console.error('Failed to add pet to favorites');
        alert('Failed to add pet to favorites');
      }
    } catch (error) {
      console.error('Error adding pet to favorites:', error);
      alert('Error adding pet to favorites');
    }
  };

  const userProfileForm = document.querySelector('#user-profile-form');
  if (userProfileForm) {
    userProfileForm.addEventListener('submit', handleUserProfileCreation);
  }

  const favoritePetButton = document.querySelector('#favorite-pet-button');
  if (favoritePetButton) {
    favoritePetButton.addEventListener('click', handleFavoritePet);
  }
});

