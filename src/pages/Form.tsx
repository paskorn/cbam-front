// import React, { useState, useRef } from 'react';
// import {
//   Container,
//   Stepper,
//   Step,
//   StepLabel,
//   Box,
//   Typography,
// } from '@mui/material';
// import PGButton from '../components/FormButton';

// import InstallationForm from '../forms/installationForm';
// import VerifierForm from '../forms/VerifierForm';
// import GoodsForm from '../forms/GoodsForm';
// import PrecursorsForm from '../forms/PrecursorsForm';
// import AmountForm from '../forms/AmountForm';

// const steps = ['Installation', 'Verifier', 'Goods', 'Precursors', 'Amount'];

// const Form: React.FC = () => {
//   const [activeStep, setActiveStep] = useState(0);

//   const formRefs = [
//     useRef<any>(null),
//     useRef<any>(null),
//     useRef<any>(null),
//     useRef<any>(null),
//     useRef<any>(null),
//   ];

//   const handleNext = async () => {
//     const currentRef = formRefs[activeStep].current;
//     if (currentRef && currentRef.submit) {
//       const success = await currentRef.submit();
//       if (success) {
//         setActiveStep((prev) => prev + 1);
//       } else {
//         alert('Submit failed. Please check your input.');
//       }
//     }
//   };

//   const handleBack = () => {
//     setActiveStep((prev) => prev - 1);
//   };

//   const handleSubmit = async () => {
//     const currentRef = formRefs[activeStep].current;
//     if (currentRef && currentRef.submit) {
//       const success = await currentRef.submit();
//       if (success) {
//         alert('Form submitted!');
//       }
//     }
//   };

//   const renderStepContent = (step: number) => {
//     switch (step) {
//       case 0:
//         return <InstallationForm ref={formRefs[0]} />;
//       case 1:
//         return <VerifierForm ref={formRefs[1]} />;
//       case 2:
//         return <GoodsForm ref={formRefs[2]} />;
//       case 3:
//         return <PrecursorsForm ref={formRefs[3]} />;
//       case 4:
//         return <AmountForm ref={formRefs[4]} />;
//       default:
//         return <Typography>Unknown step</Typography>;
//     }
//   };

//   return (
//     <Container maxWidth="md" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
//       <Stepper activeStep={activeStep} alternativeLabel>
//         {steps.map((label) => (
//           <Step key={label}>
//             <StepLabel>{label}</StepLabel>
//           </Step>
//         ))}
//       </Stepper>

//       <Box mt={6}>{renderStepContent(activeStep)}</Box>

//       <Box mt={6} display="flex" justifyContent="space-between">
//         <PGButton onClick={handleBack} disabled={activeStep === 0}>
//           Back
//         </PGButton>

//         {activeStep === steps.length - 1 ? (
//           <PGButton onClick={handleSubmit}>Submit</PGButton>
//         ) : (
//           <PGButton onClick={handleNext}>Next</PGButton>
//         )}
//       </Box>
//     </Container>
//   );
// };

// export default Form;
