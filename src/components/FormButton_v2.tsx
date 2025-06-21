import React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';

const PaleGreenButton = styled(Button)(({ theme }) => ({
  width: '150px',
  height: '50px',
  fontSize: '18px',
  backgroundColor: '#a5d6a7',
  color: '#fff',
  marginLeft: 'auto',
  borderRadius: '20px',
  '&:hover': {
    backgroundColor: '#81c784',
  },
  [theme.breakpoints.down('sm')]: {
    height: '50px',
    fontSize: '10px',
  },
}));

interface PGButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
}

const PGButton: React.FC<PGButtonProps> = ({ onClick, children }) => {
  return (
    <PaleGreenButton onClick={onClick} startIcon={<SaveIcon />}>
      {children || "save"}
    </PaleGreenButton>
  );
};

export default PGButton;
