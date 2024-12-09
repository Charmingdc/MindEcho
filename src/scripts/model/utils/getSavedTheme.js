'use strict';


export const getSavedTheme = async () => {
  try {
    const savedTheme = localStorage.getItem('MindEcho_theme') || 'default-mode';

    return savedTheme;
  } catch (err) {
    console.log('Error getting saved theme:', err);
  }
}