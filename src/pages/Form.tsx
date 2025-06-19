import React, { useState } from 'react';
import {
  Container,
  Stepper,
  Step,
  StepLabel,
  Button,
  Box,
  Typography,
} from '@mui/material';

import InstallationForm from '../forms/installationForm';
import VerifierForm from '../forms/VerifierForm';
import GoodsForm from '../forms/GoodsForm';
import PrecursorsForm from '../forms/PrecursorsForm';
import AmountForm from '../forms/AmountForm';

const steps = ['Installation', 'Verifier', 'Goods', 'Precursors', 'Amount'];

const Form: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = () => {
    // Do submit logic here!
    alert("Form submitted!");
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <InstallationForm />;
      case 1:
        return <VerifierForm />;
      case 2:
        return <GoodsForm />;
      case 3:
        return <PrecursorsForm />;
      case 4:
        return <AmountForm />;
      default:
        return <Typography>Unknown step</Typography>;
    }
  };

  return (
    <Container maxWidth="md" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
      {/* 🟡 Status bar */}
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* 🟢 Form content */}
      <Box mt={6}>{renderStepContent(activeStep)}</Box>

      {/* 🔘 Navigation buttons */}
      <Box mt={6} display="flex" justifyContent="space-between">
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          variant="outlined"
        >
          Back
        </Button>
        {activeStep === steps.length - 1 ? (
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Submit
          </Button>
        ) : (
          <Button onClick={handleNext} variant="contained" color="primary">
            Next
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default Form;
