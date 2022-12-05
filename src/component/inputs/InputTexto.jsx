import { useEffect, useState } from 'react';
import { FormControl, InputLabel, OutlinedInput, FormHelperText, InputAdornment } from '@mui/material';
// componente input de tipo text
//https://mui.com/material-ui/react-text-field/ --> doc componente InputLabel
export function InputTexto({ input, label, adornment, accion }) {
  const [value, setValue] = useState(''); // --> valor seleccionado
  const [valid, setValid] = useState(true); // --> muestra un error o no en el input 
  
  //se recibe por las props una funcion para alterar el valor de un estado,
  // esta funcion valida y cambia ese valor del mimso
  const handlerOnChange = ({ target }) => {
    setValid(value.length > 15 ? false : true)
    setValue(target.value);
    accion(target.value + (adornment ? adornment : '')); //--> si recibe un valor a mostrar al final del input lo acopla al valor 
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
        //el adorment se recibe por props y es un texto que se muestra al final del input
        endAdornment={adornment ? <InputAdornment position="end">{adornment}</InputAdornment> : ''}
        label={label}
        value={value}
        onChange={handlerOnChange}
      />
      <FormHelperText id="component-error-text">{!valid ? 'Error' : ''}</FormHelperText>
    </FormControl>
  )
}