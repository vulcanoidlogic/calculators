import validate from 'validate.js';
import _compact from 'lodash/compact';

export const getErrorList = ({ min, max }, value) => {
  const errorList = _compact([
    validate({ value }, { value: { presence: { message: 'is required' } } }),
    validate({ value }, { value: { numericality: { greaterThanOrEqualTo: min } } }),
    validate({ value }, { value: { numericality: { lessThanOrEqualTo: max } } })
  ]);
  return errorList;
};
