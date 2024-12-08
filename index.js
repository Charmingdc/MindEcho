'use strict';


// get elements

const menuToggle = document.querySelector('#menu-toggle');
const menuToggleIcon = document.querySelector('#menu-toggle-icon');
const menu = document.querySelector('.menu');
const currentYear = document.querySelector('#current-year');
const featureBoxes = document.querySelectorAll('.feature-box');
const slideUpAnim = document.querySelectorAll('.slideup-anim');
const slideInAnim = document.querySelectorAll('.slidein-anim');


window.onload = () => {
  const observer = new ScrollObserver(true);
  observer.observe(featureBoxes, null, 'slide-in');
  observer.observe(slideUpAnim, null, 'slide-up');
  observer.observe(slideInAnim, null, 'slide-in');
  
  
  /* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
   particlesJS.load('particle-js', '/src/assets/jsons/particles.json');
};


// event listener to toggle menu bar visibility and change toggle Icon
menuToggle.addEventListener('click', () => {
  menu.classList.toggle('show-menu');
 menuToggleIcon.classList.toggle('fa-xmark')
});


const displayCurrentYear = () => {
  const date = new Date();
  currentYear.textContent = date.getFullYear();
};
displayCurrentYear();