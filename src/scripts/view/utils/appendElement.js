'use strict';

export const appendElement = (parentId, elementId) => {
  const parent = document.getElementById(parentId);
  const element = document.getElementById(elementId);

  if (!parent || !element) {
    console.error(`An error? This is it: Either parent or child element  is not definded`);
  }

  parent.appendChild(element);
}

