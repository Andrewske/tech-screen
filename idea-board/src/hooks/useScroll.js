import { useEffect, useCallback } from "react";

const useScroll = () => {
  const scrollLeft = useCallback(
    () => (document.getElementById("board").scrollLeft -= 300),
    []
  );
  const scrollRight = useCallback(
    () => (document.getElementById("board").scrollLeft += 300)
  );

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.keyCode === 37) scrollLeft();
      if (e.keyCode === 39) scrollRight();
    };
    window.addEventListener("keypress", handleKeyPress);

    return () => window.removeEventListener("keypress", handleKeyPress);
  }, [scrollLeft, scrollRight]);

  return { scrollLeft, scrollRight };
};

export default useScroll;
