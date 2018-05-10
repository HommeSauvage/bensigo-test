import PropTypes from 'prop-types';

export const propTypes = {
  login: PropTypes.func.isRequired,
};

export const userShape = PropTypes.shape({
  email: PropTypes.string.isRequired, // example
});

export const gatePropTypes = {
  loggedInUser: userShape.isRequired,
  goToLogin: userShape.isRequired,
};
