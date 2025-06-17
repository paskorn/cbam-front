import React from 'react';
import { Autocomplete, TextField, Typography } from '@mui/material';

interface Option {
  label: string;
  value: string;
}

interface Props {
  label: string;
  caption?: string;
  options: Option[];
  value: string; // store actual 'value' (like 'TH')
  name: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
}

const LabeledAutocompleteMap: React.FC<Props> = ({
  label,
  caption,
  options,
  value,
  onChange,
  error,
  name,
  type = 'text',
}) => {
  // This maps the current value (e.g. 'TH') back to the option object
  const selectedOption = options.find((opt) => opt.value === value) || null;

  return (
    <>
      {caption && (
        <Typography variant="caption" color="textSecondary">
          {caption}
        </Typography>
      )}
      <Autocomplete
        options={options}
        getOptionLabel={(option) => option.label}
        isOptionEqualToValue={(option, val) => option.value === val.value}
        value={selectedOption}
        onChange={(_, newValue) => {
          onChange(newValue?.value || '');
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            type={type}
            label={label}
            name={name}
            margin="normal"
            error={!!error}
            helperText={error || " "}
          />
        )}
        fullWidth
      />
    </>
  );
};

export default LabeledAutocompleteMap;
