import React from 'react';
import { Container, Typography } from '@mui/material';
import Installation from './Installation';
import VerifierForm from '../forms/VerifierForm';

const Verifier: React.FC = () => {
  return (
    <Container maxWidth="md" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <VerifierForm redirectPath="/" />
    </Container>
  );
};

export default Verifier;
