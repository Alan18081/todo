export const checkValidity = (value,validation) => {
  let message = '';
  let valid = true;
  if(!validation) return {
    valid,
    message
  };
  if(validation.rules.required) {
    valid = value !== '';
    if(!valid) {
      message = validation.messages.required;
      return {
        valid,
        message
      }
    }
  }
  if(validation.rules.minLength) {
    valid = value.length >= validation.rules.minLength;
    if(!valid) {
      message = validation.messages.minLength;
      return {
        valid,
        message
      }
    }
  }
  if(validation.rules.email) {
    valid = validation.rules.email.test(value);
    if (!valid) {
      message = validation.messages.email;
      return {
        valid,
        message
      }
    }
  }
  if(validation.rules.path) {
    valid = validation.rules.path.test(value);
    if (!valid) {
      message = validation.messages.path;
      return {
        valid,
        message
      }
    }
  }
  return {
    valid,
    message
  };
};


export const convertTime = (time) => {
  const miliseconds = time - new Date().getTime();
  if(miliseconds < 0) {
    return false;
  }
  const seconds = miliseconds / 1000;
  const minutes = Math.ceil(seconds / 60);
  const lastSeconds = Math.ceil(seconds % 60);
  return `${minutes < 10 ? '0' + minutes : minutes}:${lastSeconds < 10 ? '0' + lastSeconds : lastSeconds}`;
};