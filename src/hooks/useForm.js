import { useState, useCallback } from 'react';

export const useForm = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    username: '',
  });
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    const validationMessage = target.validationMessage;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: validationMessage });
    setIsValid(target.closest('form').checkValidity() || false);
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return {
    handleChange,
    resetForm,
    values,
    setValues,
    errors,
    setErrors,
    isValid,
    setIsValid,
  };
};
