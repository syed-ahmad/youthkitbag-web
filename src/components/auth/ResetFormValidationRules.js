export default function validate(values) {
  let errors = [];

  if (!values.email) {
    errors.email = 'Email address is required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email address is invalid';
  } else if (values.email.length <= 5) {
    errors.email = 'Email address must be 6 or more characters';
  }

  return errors;
};