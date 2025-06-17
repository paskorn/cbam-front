// components/LabeledTextField.tsx
import React from "react";
import { TextField, Typography } from "@mui/material";

interface Props {
  label: string;
  caption?: string;
  // defination?: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  readOnly?: boolean
  helperText?: string;
}

const LabeledTextField: React.FC<Props> = ({
  label,
  caption,
  name,
  value,
  onChange,
  error,
  type = "text",
  readOnly = false,
}) => (
  <>
    {caption && (
      <Typography variant="caption" color="textSecondary">
        {caption}
      </Typography>
    )}
    <TextField
      label={label}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      fullWidth
      margin="normal"
      error={!!error}
      helperText={error || " "} // keep space to align fields
      InputProps={{ readOnly }}
    />
  </>
);

export default LabeledTextField;
