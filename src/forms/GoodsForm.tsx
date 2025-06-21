import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import Section1 from "./formsections/Goods_sec1";
import Section2 from "./formsections/Goods_sec2";
import Section3 from "./formsections/Goods_sec3";
import { useNavigate } from "react-router-dom";
import { CountryOption, fetchCountries } from "../components/dropdown/contriesmap";
import SectionButton from "../components/SectionButton";

interface VerifierFormProps {
  redirectPath?: string;
}

const GoodsForm: React.FC<VerifierFormProps> = ({ redirectPath = "/" }) => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
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
    total_consumed_within_installation: "",
    consumed_in_others_amounts: "",
    produced_for_market: "",
    consumed_non_cbam_goods: "",
  });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [activeStep, setActiveStep] = useState(1); 
  const [countries, setCountries] = useState<CountryOption[]>([]);

  // Load countries from API on component mount
  useEffect(() => {
    const loadCountries = async () => {
      const fetched = await fetchCountries();
      setCountries(fetched);
    };
    loadCountries();
  }, []);

  // Load initial form data from local storage
  useEffect(() => {
    const storedValues = localStorage.getItem('goodsForm');
    if (storedValues) {
      setFormValues(JSON.parse(storedValues));
    }
  }, []);

  // Handle form field changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Validate Section 1 fields
  const validateSection1 = () => {
    const requiredFields = ["installation", "economic_activity"];
    const newErrors: { [key: string]: string } = {};
    requiredFields.forEach((field) => {
      if (!formValues[field as keyof typeof formValues]) {
        newErrors[field] = "กรุณากรอกข้อมูล";
      }
    });
    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle the first section's submission
  const handleFirstSubmit = () => {
    const isValid = validateSection1();
    if (isValid) {
      localStorage.setItem('goodsForm', JSON.stringify(formValues));
      setActiveStep(2); // Move to Section 2 directly
    }
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const requiredFields = [
      "installation",
      "address",
      "post_code",
      "city",
      "country",
      "auth_rep",
      "email",
      "tel",
      "fax",
      "accre_mem_state",
      "nat_accre",
      "reg_num",
      "industry_type",
    ];
    const newErrors: { [key: string]: string } = {};
    requiredFields.forEach((field) => {
      if (!formValues[field as keyof typeof formValues]) {
        newErrors[field] = "กรุณากรอกข้อมูล";
      }
    });
    if (Object.keys(newErrors).length > 0) {
      setFormErrors(newErrors);
      const firstErrorField = Object.keys(newErrors)[0];
      const errorElement = document.getElementsByName(firstErrorField)[0];
      if (errorElement) errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    navigate(redirectPath);
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
        {/* SECTION 1 */}
        {activeStep === 1 && (
          <>
            <Section1
              values={formValues}
              errors={formErrors}
              onChange={(field, val) => {
                setFormValues((prev) => ({ ...prev, [field]: val }));
                setFormErrors((prev) => ({ ...prev, [field]: "" }));
              }}
              onNext={handleFirstSubmit} // Hooking into section submit to validate and progress
            />
          </>
        )}
        {/* SECTION 2 */}
        {/* {activeStep === 2 && ( */}
          <Section2
            values={formValues}
            errors={formErrors}
            onChange={handleInputChange}
            onNext={() => setActiveStep(3)}
          />
        {/* // )} */}
        {/* SECTION 3 */}
        {/* {activeStep === 3 && ( */}
          <Section3
            values={formValues}
            errors={formErrors}
            onChange={handleInputChange}
            onNext={() => setActiveStep(4)}
            setValues={setFormValues}
            countries={countries}
          />
        {/* )} */}
      </Grid>
    </Container>
  );
};

export default GoodsForm;