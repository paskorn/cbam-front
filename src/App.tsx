// src/App.tsx

import React, { useState, useEffect } from 'react'; // <-- เพิ่ม useEffect
import { ThemeProvider, createTheme, CssBaseline, Container } from '@mui/material';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Register from './components/auth/Register';
import Login from './components/auth/Login'; // <-- เพิ่มบรรทัดนี้

const theme = createTheme({
  typography: {
    fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  palette: {
    background: {
      default: '#f8f9fa'
    }
  }
});

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // <-- สถานะการ Login
  const [showAuthForm, setShowAuthForm] = useState<'login' | 'register' | null>('login'); // <-- ควบคุมฟอร์ม Login/Register

  // ตรวจสอบสถานะการ Login เมื่อ Component โหลดครั้งแรก
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
      setShowAuthForm(null); // ถ้ามี token แสดงว่า login แล้ว ไม่ต้องแสดงฟอร์ม
    } else {
        setShowAuthForm('login'); // ถ้ายังไม่มี token ให้แสดงฟอร์ม Login
        setCurrentPage('dashboard'); // หรือจะเปลี่ยนเป็น 'login' ก็ได้ค่ะ แล้วแต่พี่อยากให้ UX เป็นแบบไหน
    }
  }, []);

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
    console.log('เปลี่ยนไปหน้า:', page);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowAuthForm(null); // ซ่อนฟอร์ม Login/Register
    setCurrentPage('dashboard'); // ไปหน้า Dashboard เมื่อ Login สำเร็จ
  };

  const handleSwitchToRegister = () => {
    setShowAuthForm('register');
  };

  const handleSwitchToLogin = () => {
    setShowAuthForm('login');
  };

  const renderCurrentPage = () => {
    if (showAuthForm === 'login') {
        return <Login onLoginSuccess={handleLoginSuccess} onSwitchToRegister={handleSwitchToRegister} />;
    }
    if (showAuthForm === 'register') {
        return <Register />; // Register Component ไม่มี onLoginSuccess ในตอนนี้
    }

    // ถ้า Login แล้ว และไม่ใช่หน้า Login/Register ให้แสดงเนื้อหาตาม currentPage
    switch (currentPage) {
      case 'dashboard':
        return (
          <div>
            <h2 style={{ color: '#1a1a1a', fontWeight: '600', marginBottom: '16px' }}>
              📊 Dashboard - หน้าหลัก
            </h2>
            <p style={{ color: '#666666', fontSize: '1rem' }}>
              แสดงสถิติภาภรวมของระบบ CBAM
            </p>
            {/* อาจจะเพิ่มปุ่มหรือลิงก์ไปหน้ากรอกข้อมูลได้ที่นี่ */}
          </div>
        );
      case 'form':
        return (
          <div>
            <h2 style={{ color: '#1a1a1a', fontWeight: '600', marginBottom: '16px' }}>
              📝 กรอกข้อมูล CBAM (สำหรับผู้ใช้งานที่ Login แล้ว)
            </h2>
            <p style={{ color: '#666666', fontSize: '1rem' }}>
              ฟอร์มสำหรับกรอกข้อมูล Carbon Footprint
            </p>
            {/* ตรงนี้ในอนาคตจะเปลี่ยนเป็น Component ของ Form กรอกข้อมูลจริงๆ */}
          </div>
        );
      case 'reports':
        return (
          <div>
            <h2 style={{ color: '#1a1a1a', fontWeight: '600', marginBottom: '16px' }}>
              📈 รายงานสรุป
            </h2>
            <p style={{ color: '#666666', fontSize: '1rem' }}>
              รายงานการปล่อยก๊าซเรือนกระจก
            </p>
          </div>
        );
      case 'status':
        return (
          <div>
            <h2 style={{ color: '#1a1a1a', fontWeight: '600', marginBottom: '16px' }}>
              📋 สถานะใบสมัคร
            </h2>
            <p style={{ color: '#666666', fontSize: '1rem' }}>
              ตรวจสอบสถานะการอนุมัติ
            </p>
          </div>
        );
      case 'admin':
        return (
          <div>
            <h2 style={{ color: '#1a1a1a', fontWeight: '600', marginBottom: '16px' }}>
              🔧 ภาพรวมระบบ (สำหรับผู้ดูแลระบบ)
            </h2>
            <p style={{ color: '#666666', fontSize: '1rem' }}>
              สำหรับผู้ดูแลระบบ TGO
            </p>
          </div>
        );
      default:
        return <div>หน้าไม่พบ</div>;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{
        backgroundColor: '#f8f9fa',
        minHeight: '100vh',
        padding: '24px'
      }}>
        <Container maxWidth="xl">
          {/* Header อาจจะต้องปรับให้แสดงชื่อผู้ใช้จริงในอนาคต */}
          <Header 
            companyName="บริษัท เอบีซี จำกัด"
            userStatus={isLoggedIn ? "เข้าสู่ระบบแล้ว" : "ยังไม่ได้เข้าสู่ระบบ"} // แสดงสถานะการ Login
          />

          {/* Navigation จะแสดงเฉพาะเมื่อ Login แล้ว หรือจะซ่อน/เปลี่ยนปุ่มก็ได้ */}
          {isLoggedIn && (
            <Navigation onPageChange={handlePageChange} />
          )}

          <div style={{
            background: 'white',
            borderRadius: '8px',
            padding: '32px',
            minHeight: '400px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            {renderCurrentPage()}
          </div>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;