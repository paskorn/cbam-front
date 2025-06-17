import React from 'react';
import { Container, Typography } from '@mui/material';
import InstallationForm from '../forms/installationForm';


const Installation: React.FC = () => {
  return (
    <Container maxWidth="md" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        รายละเอียดสถานประกอบการ
      </Typography>
      <InstallationForm redirectPath="/Verifier" />
    </Container>
  );
};

export default Installation;
