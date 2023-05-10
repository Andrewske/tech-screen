import React, { useRef, useLayoutEffect } from "react";
import handleKeyUp from "../utils/handleKeyUp";

const ResizeTextArea = ({
  id,
  className,
  initialValue,
  onChange,
  colorShouldChange = false,
  shouldFocus = false,
  onSubmit = null,
}) => {
  const ref = useRef(null);

  // Resizes the textarea to fit all rows of text
  useLayoutEffect(() => {
    const autoResize = () => {
      ref.current.style.height = "0px";
      ref.current.style.height = `${ref.current.scrollHeight}px`;
    };

    if (ref.current && ref.current.focus) {
      autoResize();

      ref.current.addEventListener("input", autoResize, false);

      return () => ref.current.removeEventListener("input", autoResize, false);
    }
  }, [initialValue]);

  // Set style and value on focus. The value needs to be set so the LayoutEffect will resize properly
  const onFocus = (e) => {
    if (ref.current && colorShouldChange) {
      ref.current.style.backgroundColor = null;
      ref.current.style.color = null;
    }

    e.target.value = "";
    e.target.value = initialValue;
  };

  // For color changing sections invert colors onBlur
  const onBlur = () => {
    if (colorShouldChange) {
      console.log(ref.current.value);
      ref.current.style.backgroundColor = "inherit";
      ref.current.style.color = "white";
    }
  };

  return (
    <textarea
      ref={ref}
      id={id}
      autoFocus={shouldFocus}
      className={className}
      style={{
        backgroundColor: "inherit",
        color: "inherit",
      }}
      onChange={() => onChange(id, ref.current.value)}
      onFocus={onFocus}
      onBlur={onBlur}
      value={initialValue}
      onKeyUp={(e) => handleKeyUp(e, onSubmit)}
      rows="1"
      maxLength={140}
    />
  );
};

export default ResizeTextArea;
