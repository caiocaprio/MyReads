import React from 'react';

/**
 * Loader
 * Renders the visual component of the loader
 * @returns
 */
const Loader = () => {
  return (
    <div className="loader">
      <div className="lds-ring">
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};

export default Loader;
