document.addEventListener('DOMContentLoaded', async () => {

  const handleUserProfileCreation = async (event) => {
    event.preventDefault(); 

    const name = document.querySelector('#name-input').value.trim();
    const email = document.querySelector('#email-input').value.trim();
    const password = document.querySelector('#password-input').value.trim();

    try {
      const response = await fetch('/profile', {
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

  const userProfileForm = document.querySelector('#user-profile-form');
  if (userProfileForm) {
    userProfileForm.addEventListener('submit', handleUserProfileCreation);
  }
});
