'use strict';


export const displayUserDetails = async (username, dpUrl, usernameDiv, userDp) => {
  try {
    // Check if elements exist
    if (!usernameDiv || !userDp) {
      console.error('Invalid DOM elements passed');
      return;
    }

    // Handle username display
    if (username == null) {
      usernameDiv.textContent = '';
    } else {
      usernameDiv.textContent = username;
    }

    // Default image if no dpUrl is provided
    if (dpUrl == null) {
      dpUrl = 'https://raw.githubusercontent.com/Charmingdc/MindEcho/main/src/assets/imgs/bunny.jpg';
    } 

    // Update display picture
    userDp.innerHTML = `
    <img src="${dpUrl}" alt="${username}'s display picture" />
    `;
  } catch (err) {
    console.log('Failed to display user details:', err.message);
  }
};
