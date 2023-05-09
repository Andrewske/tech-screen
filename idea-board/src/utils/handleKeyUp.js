const handleKeyUp = (e) => {
  if (e.keyCode === 13) {
    e.preventDefault();
    e.target.blur();
  }
};

export default handleKeyUp;
