import React, { useState, useEffect } from "react";

const usePersistState = (storeKey, initialState) => {
  const [state, setInternalState] = useState(initialState);

  useEffect(() => {
    const persistedState = JSON.parse(localStorage.getItem(storeKey));

    if (persistedState) {
      setInternalState(persistedState);
    }
  }, []);

  const setState = (newState) => {
    localStorage.setItem(storeKey, JSON.stringify(newState));
    setInternalState(newState);
  };

  return [state, setState];
};

export default usePersistState;
