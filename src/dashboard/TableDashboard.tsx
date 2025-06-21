import React, { useEffect, useState } from "react";
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
import axios from "axios";
import dayjs from "dayjs";
// import "dayjs/locale/th";
// dayjs.locale("th");

interface CBAMData {
  product: string;
  category: string;
  volume?: string;
  carbon?: string;
  date: string;
  ref: string;
}

const TableDashboard = () => {
  const [data, setData] = useState<CBAMData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://178.128.123.212:5000/api/cbam/report/company/1"
        );

        const raw = response.data;

        // ถ้า response เป็น array ให้ map ทุกตัว, ถ้าเป็น object เดียวให้ wrap เป็น array
        const items = Array.isArray(raw) ? raw : [raw];

        const mapped: CBAMData[] = items.map((item: any) => ({
          product: item.industry_type_name,
          category: item.goods_category_name?.trim(),
          volume: "-", // ยังไม่มีใน API
          carbon: "-", // ยังไม่มีใน API
          date: dayjs(item.reporting_period_start).format("D MMM YYYY"),
          ref: item.cn_code_name,
        }));

        setData(mapped);
      } catch (err) {
        console.error("Error fetching CBAM data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
        เอกสาร <strong>CBAM</strong> ส่งไป <strong>EU</strong> ล่าสุด
      </Typography>

      <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f9f9f9" }}>
            <TableRow>
              <TableCell>
                <strong>ชื่อผลิตภัณฑ์</strong>
              </TableCell>
              <TableCell>
                <strong>หมวดหมู่</strong>
              </TableCell>
              <TableCell>
                <strong>ปริมาณ (Tonnes)</strong>
              </TableCell>
              <TableCell>
                <strong>Carbon Footprint (tCO₂eq)</strong>
              </TableCell>
              <TableCell>
                <strong>วันที่ส่งไป EU</strong>
              </TableCell>
              <TableCell>
                <strong>รหัสอ้างอิง EU</strong>
              </TableCell>
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

      {/* Move To Installation */}
      {/* <Box mt={4}>
        <SumupForm />
      </Box> */}
    </Box>
  );
};

export default TableDashboard;
