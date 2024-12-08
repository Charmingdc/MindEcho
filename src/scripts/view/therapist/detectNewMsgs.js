'use strict';

export const detectNewMsgs = (chatBox, scrollButton) => {
  
  // function to check if user is at the bottom 
  const isUserAtBottom = () => {
    return chatBox.scrollHeight - chatBox.scrollTop <= chatBox.clientHeight + 50;
  }
  
  // function to scroll to bottom of the page 
  const scrollToBottom = () => {
    chatBox.scrollTo({
     top: chatBox.scrollHeight,
     behavior: 'smooth', // enable smooth scrolling 
    });
    scrollButton.style.display = 'none'; // hide the button once scrolled
  }

  // function to detect new msgs
  const newMessageAdded = () => {
    if (!isUserAtBottom()) {
     scrollButton.style.display = 'flex'; // show the button is user is not at the bottom of the page 
    }
  }
  scrollButton.addEventListener('click', () => scrollToBottom()); // event to scroll to button once the button is clicked

  
  // Listen to new messages been added to the chatBox
  const observer = new MutationObserver(() => {
    newMessageAdded();
  });
  observer.observe(chatBox, {
   childList: true,
  });

  
  // hide the scroll button when user manually scrolled to the bottom 
  chatBox.addEventListener('scroll', () => {
    if (isUserAtBottom()) {
     scrollButton.style.display = 'none';
    }
  });
}