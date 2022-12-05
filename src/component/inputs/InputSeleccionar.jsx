import { useEffect, useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
//componente input de seleccion
//https://mui.com/material-ui/react-select/ --> doc componente select
export function InputSeleccionar({ input, label, opciones, accion, desactivado }) {
  const [value, setValue] = useState(''); // --> valor seleccionado
  const [valid, setValid] = useState(true); // --> muestra un error o no en el input 

  //se recibe por las props una funcion para alterar el valor de un estado,
  // esta funcion valida y cambia ese valor del mimso 
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
          /*recibe las opciones a renderizar y por defecto selecciona el valor del id o el mismo nombre*/
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