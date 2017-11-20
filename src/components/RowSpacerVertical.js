import React from 'react';
import PropTypes from 'prop-types';

const defaultProps = {
  marginTop: '32px'
};

const propTypes = {
  marginTop: PropTypes.string.isRequired
};

const RowSpacerVertical = ({ marginTop }) => {
  return <div style={{ marginTop }} />;
};

RowSpacerVertical.defaultProps = defaultProps;
RowSpacerVertical.propTypes = propTypes;

export default RowSpacerVertical;
