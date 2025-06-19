// components/LabeledAutocomplete.tsx
import React from "react";
import { Autocomplete, TextField, Typography } from "@mui/material";

interface Props {
  label: string;
  caption?: string;
  options: string[];
  value: string;
  name: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  helperText?: string;
  defination?: string;
}

const LabeledAutocomplete: React.FC<Props> = ({
  label,
  caption,
  options,
  value,
  onChange,
  error,
  name,
  helperText,
  defination,
  type = "text",
}) => (
  <>
    {caption && (
      <Typography variant="caption" color="text" style={{ fontWeight: 600 }}>
        {caption}
      </Typography>
    )}
    {defination && (
        <Typography
            variant="caption"
            color="textSecondary"
            style={{ marginBottom: "0.25rem", display: "block" }}
        >
            {defination}
        </Typography>
    )}
    <Autocomplete
      options={options}
      value={value}
      onChange={(_, newValue) => onChange(newValue || "")}
      renderInput={(params) => (
        <TextField
          {...params}
          type={type}
          label={label}
          name={name}
          margin="normal"
          error={!!error}
          helperText={helperText}
        />
      )}
      fullWidth
      freeSolo
    />
  </>
);

export default LabeledAutocomplete;
