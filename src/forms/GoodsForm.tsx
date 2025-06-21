import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import Section from "../components/Section";
import PGButton from "../components/FormButton";
import { useNavigate } from "react-router-dom";
import {
  fetchCountries,
  CountryOption,
} from "../components/dropdown/contriesmap";
import Section1 from "./formsections/Goods_sec1";
import Section2 from "./formsections/Goods_sec2";
import Section3 from "./formsections/Goods_sec3";
import axios from "axios";

interface GoodsFormProps {
  data: {
    report_id: number;
    name: string;
    route_1: string;
    route_1_amounts: number;
    route_2: string | null;
    route_2_amounts: number | null;
    route_3: string | null;
    route_3_amounts: number | null;
    route_4: string | null;
    route_4_amounts: number | null;
    route_5: string | null;
    route_5_amounts: number | null;
    route_6: string | null;
    route_6_amounts: number | null;
    total_consumed_within_installation: number;
    consumed_in_others_amounts: number;
    condumed_non_cbam_goods_amounts: number;
    has_heat: number;
    has_waste_gases: number;
    direct_emissions: number;
    imported_heat_value: number;
    exported_heat_value: number;
    ef_imported_heat: number;
    ef_exported_heat: number;
    electricity_consumption_value: number;
    ef_electricity: number;
    source_of_ef_electricity: string;
    exported_electricity_value: number | null;
    ef_exported_electricity: number | null;
    total_production_amounts: number;
    produced_for_market_amount: number;
    imported_wgases_amount: number;
    ef_imported_wgases: number;
    exported_wgases_amount: number;
    ef_exported_wgases: number;
  };
  onChange: (data: GoodsFormProps["data"]) => void;
  redirectPath?: string;
}

const GoodsForm: React.FC<GoodsFormProps> = ({ data, onChange, redirectPath = "/" }) => {
  const navigate = useNavigate();

  const [formValues, set] = useState({
    installation: "",
    economic_activity: "",
    address: "",
    post_code: "",
    po_box: "",
    city: "",
    country: "",
    unlocode: "",
    lat: "",
    long: "",
    auth_rep: "",
    email: "",
    tel: "",
    fax: "",
    accre_mem_state: "",
    nat_accre: "",
    reg_num: "",
    industry_type: "",
    goods_category: "",
    precursors: [] as string[],
    amounts: {} as { [key: number]: string },
    route: "",
    routes: [] as string[],
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [activeStep, setActiveStep] = useState(1);
  const [countries, setCountries] = useState<CountryOption[]>([]);

  useEffect(() => {
    const loadCountries = async () => {
      const fetched = await fetchCountries();
      setCountries(fetched);
    };
    loadCountries();
  }, []);



  const handleFirstSubmit = () => {
    const requiredFieldsSection1 = ["installation", "economic_activity"];
    const newErrors: { [key: string]: string } = {};
    requiredFieldsSection1.forEach((field) => {
      if (!formValues[field as keyof typeof formValues]) {
        newErrors[field] = "กรุณากรอกข้อมูล";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setFormErrors(newErrors);
      return;
    }

    setActiveStep(2);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    set((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const requiredFields = [
      "report_id",
      "name",
      "route_1",
      "route_1_amounts",
      "route_2",
      "route_2_amounts",
      "route_3",
      "route_3_amounts",
      "route_4",
      "route_4_amounts",
      "route_5",
      "route_5_amounts",
      "route_6",
      "route_6_amounts",
      "total_consumed_within_installation",
      "consumed_in_others_amounts",
      "condumed_non_cbam_goods_amounts",
      "has_heat",
      "has_waste_gases",
      "direct_emissions",
      "imported_heat_value",
      "exported_heat_value",
      "ef_imported_heat",
      "ef_exported_heat",
      "electricity_consumption_value",
      "ef_electricity",
      "source_of_ef_electricity",
      "exported_electricity_value",
      "ef_exported_electricity",
      "total_production_amounts",
      "produced_for_market_amount",
      "imported_wgases_amount",
      "ef_imported_wgases",
      "exported_wgases_amount",
      "ef_exported_wgases"
    ];

    const newErrors: { [key: string]: string } = {};
    requiredFields.forEach((field) => {
      if (data[field as keyof typeof data] === undefined || data[field as keyof typeof data] === null) {
        newErrors[field] = "กรุณากรอกข้อมูล";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setFormErrors(newErrors);
      const firstErrorField = Object.keys(newErrors)[0];
      const errorElement = document.getElementsByName(firstErrorField)[0];
      if (errorElement)
        errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/cbam/d_goods", data);
      const insertedId = res.data?.insertId || res.data?.id;

      if (insertedId) {
        const getRes = await axios.get(`http://localhost:5000/api/cbam/installation/${insertedId}`);
        console.log("✅ ข้อมูลที่เพิ่งบันทึก:", getRes.data);
      }

      navigate(redirectPath);
    } catch (err: any) {
      console.error("❌ เกิดข้อผิดพลาดระหว่างส่งข้อมูล:", err.response?.data || err.message);
    }
  };

  return (
    <Container maxWidth="md" style={{ paddingTop: "2rem", paddingBottom: "2rem" }}>
      <Grid container spacing={3} alignItems="stretch">
        <Box>
          <Typography variant="h5" fontWeight="bold" gutterBottom color="#1976d2">
            Aggregated goods categories and relevant production processes
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            รายละเอียดของกลุ่มสินค้าและกระบวนการผลิต
          </Typography>
        </Box>

        <Section1
          values={formValues}
          errors={formErrors}
          onChange={(field, val) => {
            set((prev) => ({ ...prev, [field]: val }));
            setFormErrors((prev) => ({ ...prev, [field]: "" }));
          }}
          onNext={handleFirstSubmit}
        />

        <Section2
          values={formValues}
          errors={formErrors}
          onChange={handleInputChange}
          onNext={() => setActiveStep(3)}
        />

        <Section3
          values={formValues}
          errors={formErrors}
          onChange={handleInputChange}
          onNext={() => setActiveStep(4)}
          setValues={set}
          countries={countries}
        />

        <PGButton />
      </Grid>

      {/* <Box mt={4} textAlign="center">
        <PGButton onClick={handleSubmit}>บันทึกและส่งข้อมูล</PGButton>
      </Box> */}
    </Container>
  );
};

export default GoodsForm;
