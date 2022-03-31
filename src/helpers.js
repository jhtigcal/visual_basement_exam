export function validateEmail(email) {
  const mailFormat =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return !mailFormat.test(email);
}

export function validateInput(fieldName, value, index) {
  if (fieldName === 'emailAddress') {
    if (validateEmail(value)) {
      return {
        fieldName,
        index,
        message: 'Invalid email address.',
      };
    }
  }

  if (value === '')
    return {
      fieldName,
      index,
      message: 'Field cannot be empty.',
    };
}

export function convertPascalToSentence(text) {
  const result = text.replace(/([A-Z])/g, ' $1');
  return result.charAt(0).toUpperCase() + result.slice(1);
}
