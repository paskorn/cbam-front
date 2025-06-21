import React from "react";
import {
  Checkbox,
  Typography,
  Box,
  Grid,
} from "@mui/material";

interface Props {
  caption?: string;
  defination?: string;
  name: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LabeledCheckbox: React.FC<Props> = ({
  caption,
  defination,
  name,
  checked,
  onChange,
}) => (
  <Box mt={2} mb={1}>
    <Grid container alignItems="flex-start" spacing={2}>
      {/* ✅ Left: Checkbox only */}
      <Grid >
        <Checkbox
          name={name}
          checked={checked}
          onChange={onChange}
          color="secondary"
        />
      </Grid>

      {/* ✅ Right: caption + defination (no label in middle) */}
      <Grid >
        {caption && (
          <Typography
            variant="subtitle2"
            fontWeight="bold"
            color="text.primary"
            display="block"
          >
            {caption}
          </Typography>
        )}
        {defination && (
          <Typography
            variant="caption"
            color="text.secondary"
            display="block"
          >
            {defination}
          </Typography>
        )}
      </Grid>
    </Grid>
  </Box>
);

export default LabeledCheckbox;
