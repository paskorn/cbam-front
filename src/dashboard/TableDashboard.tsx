// import React from "react";
import SumupForm from "./SumupForm";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Chip,
} from "@mui/material";

interface CBAMData {
  product: string;
  category: string;
  volume: string;
  carbon: string;
  date: string;
  ref: string;
}

const data: CBAMData[] = [
  {
    product: "Steel Rods - Grade A",
    category: "Iron and Steel",
    volume: "1,200",
    carbon: "2,940 (2.45 tCO₂eq/t)",
    date: "15 มี.ค. 2025",
    ref: "EU-CBAM-2025-001234",
  },
  {
    product: "Cement Type I",
    category: "Cement",
    volume: "2,500",
    carbon: "2,300 (0.92 tCO₂eq/t)",
    date: "10 มี.ค. 2025",
    ref: "EU-CBAM-2025-001198",
  },
  {
    product: "Aluminum Sheets",
    category: "Aluminum",
    volume: "450",
    carbon: "3,654 (8.12 tCO₂eq/t)",
    date: "8 มี.ค. 2025",
    ref: "EU-CBAM-2025-001156",
  },
];

const TableDashboard = () => {
  return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
        เอกสาร <strong>CBAM</strong> ส่งไป <strong>EU</strong> ล่าสุด
      </Typography>

      <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f9f9f9" }}>
            <TableRow>
              <TableCell><strong>ชื่อผลิตภัณฑ์</strong></TableCell>
              <TableCell><strong>หมวดหมู่</strong></TableCell>
              <TableCell><strong>ปริมาณ (Tonnes)</strong></TableCell>
              <TableCell><strong>Carbon Footprint (tCO₂eq)</strong></TableCell>
              <TableCell><strong>วันที่ส่งไป EU</strong></TableCell>
              <TableCell><strong>รหัสอ้างอิง EU</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, idx) => (
              <TableRow key={idx}>
                <TableCell>{row.product}</TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>{row.volume}</TableCell>
                <TableCell>{row.carbon}</TableCell>
                <TableCell>
                  <Chip
                    label={row.date}
                    color="primary"
                    variant="outlined"
                    sx={{ fontWeight: 500 }}
                  />
                </TableCell>
                <TableCell>{row.ref}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

       <Box mt={4}>
    <SumupForm />
  </Box>
    </Box>

   
  );
};

export default TableDashboard;
