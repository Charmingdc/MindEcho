'use strict';

export const removeElement = (parentId, elementId) => {
  const parent = document.getElementById(parentId);
  const element = document.getElementById(elementId);

  if (!parent || !element) {
    console.error('Hey developer, either the parent or child element is not found');
  }

  parent.removeChild(element);
}

