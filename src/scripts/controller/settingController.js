'use strict';

// importing view functions
import { getElement } from '../view/utils/getElement.js';
import { notify } from '../view/utils/notify.js';
import { showLoader } from '../view/utils/showLoader.js';
import { displayUserDetails } from '../view/utils/displayUserDetails.js';
import { applyTheme } from '../view/utils/applyTheme.js';


// importing model functions
import { uploadToCloudinary } from '../model/setting/uploadToCloudinary.js';
import { updateUserDp, updateUsername, updateUserEmail, updateUserPassword } from '../model/setting/updateUserDetails.js';
import { validateEmail, validateUsername, validatePassword } from '../model/setting/validateUpdateInputs.js';
import { getUserDisplayNameAndDp } from '../model/utils/getUserDisplayNameAndDp.js';
import { signUserOut } from '../model/setting/signUserOut.js';
import { getSavedTheme } from '../model/utils/getSavedTheme.js';




// getting dom elements
const bdy = getElement('bdy', 'id');
const introScreen = getElement('intro-screen', 'id');
const loadingScreen = getElement('loading-screen', 'id');
const userDp = getElement('user-dp', 'class');
const usernameDiv = getElement('username-div', 'id');
const editDpBtn = getElement('edit-dp-btn', 'id');
const editNameBtn = getElement('edit-name-btn', 'id');
const editEmailBtn = getElement('edit-email-btn', 'id');
const editPswBtn = getElement('edit-psw-btn', 'id');
const logoutBtn = getElement('logout-btn', 'id');
const dpPicker = getElement('dp-picker', 'id');
const editUsernameForm = getElement('edit-username-form', 'id');
const closeUsernameForm = getElement('close-username-form', 'id');
const usernameInput = getElement('username-input', 'id');
const saveUsernameBtn = getElement('save-username-btn', 'id');
const themeSwitch = getElement('theme-switch', 'id');
const editEmailForm = getElement('edit-email-form', 'id');
const emailInput = getElement('email-input', 'id');
const editEmailPswInput = getElement('edit-email-psw-input', 'id');
const saveEmailBtn = getElement('save-email-btn', 'id');
const editPswForm = getElement('edit-psw-form', 'id');
const currentPswInput = getElement('current-password-input', 'id');
const newPswInput = getElement('new-password-input', 'id');
const savePswBtn = getElement('save-psw-btn', 'id');





export const initSetting = async (app) => {
  try {
    const handleTheme = async () => {
     // retrieving saved from local storage
      const savedTheme = await getSavedTheme();
      
      // apply theme
      await applyTheme(savedTheme, bdy);

      // check theme switch if the current theme is light theme 
      if (savedTheme == 'light-mode') {
        themeSwitch.checked = true;
      }
    };
    handleTheme();


    const renderUserDetails = async () => {
      try {
        const { username, photoURL } = await getUserDisplayNameAndDp(app);

        await displayUserDetails(username, photoURL, usernameDiv, userDp);
      } catch (err) {
        console.error('Failed to display user details:', err.message);
      }
    }
    await renderUserDetails();


    setTimeout(() => {
      introScreen.style.display = 'none';
    }, 1000); // hide intro screen after user information is fetched



    const handleDpUpdate = async (file) => {
      try {
        showLoader(true, loadingScreen); // show loading screen

        const url = await uploadToCloudinary(file); // call function to upload img and return the url

        await updateUserDp(app, url);
        // call function to upate user dp

        showLoader(false, loadingScreen); // hide loading screen

        await renderUserDetails(); // re-render user details
      } catch (err) {
        console.error('Error calling update dp function:', err.message);
      }
    };



    const handleUsernameUpdate = async () => {
      try {
        editUsernameForm.style.display = 'flex';

        saveUsernameBtn.addEventListener('click', async () => {
          const username = usernameInput.value.trim();

          const isUsernameValid = await validateUsername(username);

          if (!isUsernameValid) {
            notify.error('Username must be atleast (4) characters');
            return;
          }

          showLoader(true, loadingScreen);
          const { status, text } = await updateUsername(app, saveUsernameBtn, username); //call function to update username 
          showLoader(false, loadingScreen);

          if (status == 'success') {
            notify.success(`${text}`);
          } else if (status == 'error') {
            notify.error(`${text}`);
          }

          editUsernameForm.style.display = 'none';
          await renderUserDetails(); // re-render user data
          usernameInput.value = '';
        });
      } catch (err) {
        console.error('Failed to call update username function:', err.message);
      }
    };


    const handleEmailUpdate = async () => {
      // attach an event listener to save email button
      saveEmailBtn.addEventListener('click', async () => {
        let email = emailInput.value.trim(); // get email value
        let password = editEmailPswInput.value.trim(); // get password 


        const isEmailValid = await validateEmail(email); // validate email 
        const isPswValid = await validatePassword(password); // validate password

        if (!isEmailValid) {
          notify.error('Error: invalid email');
          return;
        } else if (!isPswValid) {
          notify.error('Password must not be less than (6) characters');
          return;
        }

        showLoader(true, loadingScreen);
        const { type, text } = await updateUserEmail(app, saveEmailBtn, email, password);
        showLoader(false, loadingScreen);

        // reseet inputs and hide modal
        emailInput.value = '';
        editEmailPswInput.value = '';
        editEmailForm.classList.replace('show-form', 'edit-form');

        if (type === 'success') {
          notify.success(`${text}`);

          setTimeout(async () => {
            await signUserOut(app);
          }, 3000); // log user out after 3 seconds
        } else if (type === 'error') {
          notify.error(`${text}`);
        }

      });
    }


    const handlePswUpdate = async () => {
      // attach an event listener to save psw button
      savePswBtn.addEventListener('click', async () => {
        const currentPsw = currentPswInput.value.trim(); // get current password value
        const newPassword = newPswInput.value.trim(); // get password 


        const isCurrentPswValid = await validatePassword(currentPsw); // validate current password 
        const isNewPswValid = await validatePassword(newPassword); // validate new password

        if (!isCurrentPswValid || !isNewPswValid) {
          notify.error('Password must not be less than (6) characters');
          return;
        } else if (currentPsw === newPassword) {
          notify.error(`New password can't be the same as the old password`);
          return;
        }

        showLoader(true, loadingScreen);
        const { type, text } = await updateUserPassword(app, savePswBtn, currentPsw, newPassword);
        showLoader(false, loadingScreen);

        // hide modal and reset password input
        editPswForm.classList.replace('show-form', 'edit-form');
        currentPswInput.value = '';
        newPswInput.value = '';


        if (type === 'success') {
          notify.success(`${text}`);

          setTimeout(async () => {
            await signUserOut(app);
          }, 3000); // log user out after 3 seconds
        } else if (type === 'error') {
          notify.error(`${text}`);
        }

      });
    }


    const handleThemeChange = async () => {
      // event listener to toggle theme
      themeSwitch.addEventListener('click', () => {
        const currentTheme = bdy.classList.contains('default-mode') ? 'default-mode' : 'light-mode';
        const newTheme = currentTheme === 'default-mode' ? 'light-mode' : 'default-mode';

        // apply new theme
        applyTheme(newTheme, bdy);

        // save new theme 
        localStorage.setItem('MindEcho_theme', newTheme);
      });
    }
    handleThemeChange();


    const handleEvents = () => {
      dpPicker.addEventListener('change', async () => {
        const file = dpPicker.files[0]; // get choosen file
        await handleDpUpdate(file); // call function handling dp update
      }); // event listener to update dp


      editNameBtn.addEventListener('click', async () => {
        editUsernameForm.style.display = 'flex';

        await handleUsernameUpdate();
      }); // event listener to show username form

      closeUsernameForm.addEventListener('click', () => {
        editUsernameForm.style.display = 'none';
        usernameInput.value = '';
      }); // event listener to close username form

      editEmailBtn.addEventListener('click', async () => {
        editEmailForm.classList.toggle('show-form'); // toggle class lists to show / hide

        await handleEmailUpdate();
      });

      editPswBtn.addEventListener('click', async () => {
        editPswForm.classList.toggle('show-form');

        await handlePswUpdate();
      })

      logoutBtn.addEventListener('click', async () => {
        showLoader(true, loadingScreen); // show loading 
        await signUserOut(app); // call the function to sign user out
      }); // event listener to log user out
    }
    handleEvents();

  } catch (err) {
    console.error('Error initializing setting controller:', err.message);
  }
};