import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Paper, Link as MuiLink } from '@mui/material';
import axios from 'axios'; // Import axios
import { Link } from 'react-router-dom'; // สมมติว่ามี React Router Dom สำหรับการนำทาง

interface LoginProps {
    onLoginSuccess: () => void; // Callback function เมื่อ Login สำเร็จ
    onSwitchToRegister: () => void; // Callback function เมื่อต้องการเปลี่ยนไปหน้า Register
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess, onSwitchToRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(''); // สำหรับแสดงผลข้อความจาก Backend

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setMessage(''); // Clear previous messages

        try {
            // เปลี่ยน IP_ADDRESS เป็น 206.189.45.229 และ PORT เป็น 5000
            const response = await axios.post('http://206.189.45.229:5000/api/login', {
                email,
                password
            });

            // สมมติว่า Backend ส่ง token กลับมาเมื่อ Login สำเร็จ
            const token = response.data.token;
            if (token) {
                localStorage.setItem('authToken', token); // เก็บ Token ไว้ใน Local Storage
                setMessage(response.data.message || 'Login successful!');
                onLoginSuccess(); // เรียก Callback เพื่อบอก App.tsx ว่า Login สำเร็จแล้ว
            } else {
                setMessage('Login successful, but no token received.');
            }

        } catch (error: any) {
            console.error('Login error:', error);
            setMessage(error.response?.data?.message || 'Login failed. Please check your credentials.');
        }
    };

    return (
        <Paper elevation={3} sx={{ padding: 4, maxWidth: 500, margin: 'auto', mt: 4 }}>
            <Typography variant="h5" component="h1" gutterBottom align="center">
                เข้าสู่ระบบ
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="อีเมล"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="รหัสผ่าน"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    เข้าสู่ระบบ
                </Button>
                {message && (
                    <Typography variant="body2" color={message.includes('successful') ? 'success.main' : 'error.main'} align="center">
                        {message}
                    </Typography>
                )}
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <MuiLink component="button" onClick={onSwitchToRegister} variant="body2">
                        ยังไม่มีบัญชี? สมัครสมาชิกที่นี่
                    </MuiLink>
                </Box>
            </Box>
        </Paper>
    );
};

export default Login;