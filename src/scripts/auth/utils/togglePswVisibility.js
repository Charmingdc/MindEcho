'use strict';

// function to toggle password inputs visibility
export const togglePswVisibility = (toggleId, formId) => {
 
 if (toggleId.classList.contains('fa-eye')) {
   formId.elements.password.type = 'text';
   toggleId.classList.remove('fa-eye');
   toggleId.classList.add('fa-eye-slash');
 } else if (toggleId.classList.contains('fa-eye-slash')) {
   formId.elements.password.type = 'password';
   toggleId.classList.remove('fa-eye-slash');
   toggleId.classList.add('fa-eye');
 }
 
}
