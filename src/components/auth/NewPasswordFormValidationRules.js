export default function validate(values) {
  let errors = [];

  if (!values.password) {
    errors.password = 'Password is required';
  }

  return errors;
}
