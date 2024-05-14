import React from 'react';
import { TextField, Button } from '@mui/material';

const Form = ({ fields, onSubmit, values, onChange }) => {
  return (
    <form onSubmit={onSubmit}>
      {fields.map((field) => (
        <TextField
          key={field.name}
          label={field.label}
          type={field.type || 'text'}
          value={values[field.name]}
          onChange={(e) => onChange(field.name, e.target.value)}
          fullWidth
          margin="normal"
        />
      ))}
      <Button variant="contained" color="primary" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default Form;
