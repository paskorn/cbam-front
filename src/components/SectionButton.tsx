// SectionButton.tsx
import React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

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

const SectionButton = ({
  onValidate,
  onSuccess,
}: {
  onValidate: () => boolean;
  onSuccess: () => void;
}) => {
  const handleClick = (e: React.FormEvent) => {
    e.preventDefault();
    if (onValidate()) {
      onSuccess();
    }
  };

  return (
    <PaleGreenButton type="submit" onClick={handleClick}>
      Next
    </PaleGreenButton>
  );
};

export default SectionButton;
