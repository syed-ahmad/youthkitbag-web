import { useState, useEffect } from 'react';

const useForm = (initiaValues, callback, validate) => {

  const [values, setValues] = useState(initiaValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
      setIsSubmitting(false);
    }
  }, [errors]);

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    setIsSubmitting(true);
    setErrors(validate(values));
  };

  const handleChange = (event) => {
    console.log(event.target.name, event.target.value);
    event.persist();
    setValues(values => ({ ...values, [event.target.name]: event.target.value }));
    console.log(values);
  };

  return {
    handleChange,
    handleSubmit,
    values,
    errors
  }
};

export default useForm; 