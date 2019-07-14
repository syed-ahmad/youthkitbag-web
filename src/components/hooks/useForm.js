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
  }, [errors, callback, isSubmitting]);

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    setIsSubmitting(true);
    setErrors(validate(values));
  };

  const getNameValue = (eventTarget) => {
    let { name, value, checked, type } = eventTarget;
    if (name.indexOf('[') < 0) {
      return { name, value: (type === 'checkbox' ? checked : value) };
    }
    
    const arrayName = name.substring(0, name.indexOf('['));
    const index = +name.substring(name.indexOf('[') + 1, name.indexOf(']'));
    const propertyName = name.substring(name.indexOf(']') + 2);
    const newItem = {...values[arrayName][index], [propertyName]: value};
    const array = values[arrayName].map(function(item, i) { return i === index ? newItem : item }) ;
    return { name: arrayName, value: array };
  }

  const handleChange = (event) => {
    event.persist();
    const { name, value } = getNameValue(event.target);
    setValues(values => ({ ...values, [name]: value }));
  };

  const setChange = (name, value) => {
    setValues(values => ({ ...values, [name]: value }));
  };

  const addArrayItem = (arrayName, newItem) => {
    const array = [...values[arrayName], ...newItem];
    setValues(values => ({ ...values, [arrayName]: array }));
  }

  const removeArrayItem = (arrayName, index) => {
    const array = values[arrayName].filter(function(item, i) { return i !== index }) ;
    setValues(values => ({ ...values, [arrayName]: array }));
  }

  return {
    setChange,
    handleChange,
    handleSubmit,
    addArrayItem,
    removeArrayItem,
    values,
    setValues,
    errors
  }
};

export default useForm; 