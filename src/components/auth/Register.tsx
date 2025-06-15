import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';
import axios from 'axios'; // Import axios

const Register: React.FC = () => {
    const [companyName, setCompanyName] = useState('');
    const [location, setLocation] = useState('');
    const [industryType, setIndustryType] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(''); // สำหรับแสดงผลข้อความจาก Backend

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setMessage(''); // Clear previous messages

        try {
            // เปลี่ยน IP_ADDRESS เป็น 206.189.45.229 และ PORT เป็น 5000
            const response = await axios.post('http://206.189.45.229:5000/api/register', {
                companyName,
                location,
                industryType,
                email,
                password
            });
            setMessage(response.data.message || 'Registration successful!');
            // อาจจะมีการ redirect หรือ clear form ที่นี่
            setCompanyName('');
            setLocation('');
            setIndustryType('');
            setEmail('');
            setPassword('');

        } catch (error: any) {
            console.error('Registration error:', error);
            setMessage(error.response?.data?.message || 'Registration failed. Please try again.');
        }
    };

    return (
        <Paper elevation={3} sx={{ padding: 4, maxWidth: 500, margin: 'auto', mt: 4 }}>
            <Typography variant="h5" component="h1" gutterBottom align="center">
                สมัครสมาชิก
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="companyName"
                    label="ชื่อบริษัท"
                    name="companyName"
                    autoComplete="company-name"
                    autoFocus
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="location"
                    label="สถานที่ตั้ง"
                    name="location"
                    autoComplete="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="industryType"
                    label="ประเภทอุตสาหกรรม"
                    name="industryType"
                    autoComplete="industry-type"
                    value={industryType}
                    onChange={(e) => setIndustryType(e.target.value)}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="อีเมล"
                    name="email"
                    autoComplete="email"
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
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    ลงทะเบียน
                </Button>
                {message && (
                    <Typography variant="body2" color={message.includes('successful') ? 'success.main' : 'error.main'} align="center">
                        {message}
                    </Typography>
                )}
            </Box>
        </Paper>
    );
};

export default Register;