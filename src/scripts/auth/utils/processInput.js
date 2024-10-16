export const processInput = (authType, userN, psw, email) => {

 if (authType === 'login') {
   logUserIn(userN, psw);
 } else {
  signUserUp(userN, psw, email);
 }
 
}

const logUserIn = (userN, psw) => {
 alert(`Username: ${userN}, password: ${psw} is logged in successfully`);
}


const signUserUp = (userN, psw, email) => {
 alert(`Username: ${userN}, password:${psw} and email: ${email} is logged in successfully`);
}