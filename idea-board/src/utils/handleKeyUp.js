const handleKeyUp = (e, func = null) => {
  // Registers Ctrl + Enter
  if ((e.keyCode === 10 || e.keyCode === 13) && e.ctrlKey) {
    // If a funtion is passed, run that function
    if (func) {
      func(e);
      // Otherwise, remove the current target focus
    } else {
      e.preventDefault();
      e.target.blur();
    }
  }
};

export default handleKeyUp;
