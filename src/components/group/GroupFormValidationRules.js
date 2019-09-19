export default function validate(values) {
  const errors = [];

  if (!values.name) {
    errors.name = 'Name is required';
  }

  // if (!values.tagline) {
  //   errors.tagline = 'Tagline is required';
  // }

  // if (!values.description) {
  //   errors.description = 'Description is required';
  // }

  // if (!values.email) {
  //   errors.email = 'Email is required';
  // }

  // if (!values.website) {
  //   errors.website = 'Website is required';
  // }

  // if (!values.activitys) {
  //   errors.activitys = 'At least one activity is required';
  // }

  // if (!values.tags) {
  //   errors.tags = 'At least one tag is required';
  // }

  return errors;
}
