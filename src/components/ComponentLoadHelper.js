import React from 'react';
/**
 * Smallest possible png.  img is the only rendered HTML element to support onLoad event
 */
const ComponentLoadHelper = ({ onLoad }) => {
  return (
    <img
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAAAAAA6fptVAAAACklEQVQYV2P4DwABAQEAWk1v8QAAAABJRU5ErkJggg=="
      onLoad={onLoad}
      alt="component load helper"
    />
  );
};
export default ComponentLoadHelper;
