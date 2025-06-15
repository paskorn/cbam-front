import React, { useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';

interface NavigationProps {
  onPageChange: (page: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ onPageChange }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    const pages = ['dashboard', 'form', 'reports', 'status', 'admin'];
    onPageChange(pages[newValue]);
  };

  return (
    <Box sx={{
      background: 'white',
      borderRadius: '8px',
      padding: '8px',
      marginBottom: '24px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <Tabs 
        value={activeTab} 
        onChange={handleTabChange}
        sx={{
          '& .MuiTab-root': {
            flex: 1,
            padding: '12px 16px',
            borderRadius: '6px',
            transition: 'all 0.2s ease',
            fontWeight: '500',
            fontSize: '0.875rem',
            color: '#666666',
            textTransform: 'none'
          },
          '& .Mui-selected': {
            background: '#f0f9ff',
            color: '#0369a1 !important',
            fontWeight: '600'
          }
        }}
        variant="fullWidth"
      >
        <Tab label="หน้าหลัก" />
        <Tab label="กรอกข้อมูล CBAM" />
        <Tab label="รายงานสรุป" />
        <Tab label="สถานะใบสมัคร" />
        <Tab label="ภาพรวมระบบ" />
      </Tabs>
    </Box>
  );
};

export default Navigation;