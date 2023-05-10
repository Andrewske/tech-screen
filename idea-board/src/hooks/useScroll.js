import React, { useEffect, useCallback } from "react";

const useScroll = () => {
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.keyCode === 37) scrollLeft();
      if (e.keyCode === 39) scrollRight();
    };
    window.addEventListener("keypress", handleKeyPress);

    return () => window.removeEventListener("keypress", handleKeyPress);
  }, [scrollLeft, scrollRight]);

  const scrollLeft = useCallback(
    () => (document.getElementById("board").scrollLeft -= 300),
    []
  );
  const scrollRight = useCallback(
    () => (document.getElementById("board").scrollLeft += 300)
  );

  return { scrollLeft, scrollRight };
};

export default useScroll;
