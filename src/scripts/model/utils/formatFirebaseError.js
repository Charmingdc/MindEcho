'use strict';

export const formatError = async (err) => {
  try {
    const result = err.split(':')[1]
      .split(' ')[2]
      .slice(1)
      .split('/')[1]
      .split('-')
      .join(' ')
      .split(')')[0];

    return result;
  } catch (err) {
    console.error(err.message);
  }

};