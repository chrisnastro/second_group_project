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
        document.location.replace('/profile');
    } else {
        const responseData = await response.json();
        if (responseData.message === 'User not logged in') {
            document.location.replace('/login');
        } else {
            alert('Could not add to favorites');
        }
    }
};

document
    .querySelector('#favorite-pet')
    .addEventListener('click', favButtonHandler)