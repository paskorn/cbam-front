// src/components/Section.tsx
import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface SectionProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  hasError?: boolean; 
}

const Section: React.FC<SectionProps> = ({
  title,
  subtitle,
  children,
  defaultExpanded = false,
  hasError = false, 
}) => {
  return (
    <Grid size={12}>
      <Accordion
        defaultExpanded={defaultExpanded}
        style={{
          boxShadow: hasError ? '0 0 0 2px rgba(211, 47, 47, 0.2)' : '0 0 0 2px rgba(148, 142, 142, 0.15)',
          borderRadius: '8px',
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <div>
          <Typography variant="h6" color={hasError ? 'error' : 'success'}>
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body2" color="textSecondary" sx={{ mt: 0.5 }}>
              {subtitle}
            </Typography>
          )}
          </div>
        </AccordionSummary>
        
        <AccordionDetails>{children}</AccordionDetails>
      </Accordion>
    </Grid>
  );
};

export default Section;
