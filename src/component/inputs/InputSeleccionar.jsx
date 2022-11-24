import { useEffect, useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';

export function InputSeleccionar({ input, label, opciones, accion, desactivado }) {
  const [value, setValue] = useState('');
  const [valid, setValid] = useState(true);

  const handlerOnChange = ({target: {value}}) => {
    setValid(value === 0 ? false : true);
    setValue(value);
    accion(value);
  }

  useEffect(() => {
    if (input) {
      setValue(input);
      setValid(true);
    }
  }, [input, opciones]);

  return (
    <FormControl error={!valid ? true : false} fullWidth>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select label={label} labelId="demo-simple-select-label" id="demo-simple-select"
        value={value}
        defaultValue={0}
        onChange={handlerOnChange}
        disabled={desactivado ? true : false} 
      >
        {
          opciones ?
          opciones.map((i) => <MenuItem key={i.id ? i.id : i} value={i.id ? i.id : i}>{i.nombre ? i.nombre : i}</MenuItem>)
          :
          <MenuItem value={0}>...</MenuItem>
        }
        
      </Select>
      <FormHelperText id="component-error-text">{!valid ? 'Error' : ''}</FormHelperText>
    </FormControl>
  )
}