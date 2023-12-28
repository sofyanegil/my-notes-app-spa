import { useState } from 'react';

function useInput(defaultValue = '', type = '') {
  const [value, setValue] = useState(defaultValue);

  const onValueChangeHandler = (event) => {
    if (type === 'text') {
      setValue(event.target.innerHTML);
      return;
    }
    setValue(event.target.value);
  };

  return [value, onValueChangeHandler];
}

export default useInput;
