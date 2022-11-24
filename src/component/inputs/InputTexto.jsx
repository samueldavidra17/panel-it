import { useEffect, useState } from 'react';
import { FormControl, InputLabel, OutlinedInput, FormHelperText, InputAdornment } from '@mui/material';

export function InputTexto({ input, label, adornment, accion }) {
  const [value, setValue] = useState('');
  const [valid, setValid] = useState(true);

  const handlerOnChange = ({ target }) => {
    setValid(value.length > 15 ? false : true)
    setValue(target.value);
    accion(target.value + (adornment ? adornment : ''));
  }

  useEffect(() => {
    if (input) {
      setValue(adornment ? input.replace(adornment, "") : input);
      setValid(true);
    }
  }, [input]);

  return (
    <FormControl error={!valid ? true : false} fullWidth>
      <InputLabel htmlFor="component-outlined">{label}</InputLabel>
      <OutlinedInput id="component-outlined" aria-describedby="component-error-text"
        endAdornment={adornment ? <InputAdornment position="end">{adornment}</InputAdornment> : ''}
        label={label}
        value={value}
        onChange={handlerOnChange}
      />
      <FormHelperText id="component-error-text">{!valid ? 'Error' : ''}</FormHelperText>
    </FormControl>
  )
}