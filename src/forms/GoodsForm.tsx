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
import LabeledAutocomplete from "../components/LabeledAutoComplete";
import LabeledTextField from "../components/LabeledTextField";
import {
  fetchCountries,
  CountryOption,
} from "../components/dropdown/contriesmap";
import SectionButton from "../components/SectionButton";
import Section1 from "./formsections/Goods_sec1";
import Section2 from "./formsections/Goods_sec2";
import Section3 from "./formsections/Goods_sec3";

interface VerifierFormProps {
  redirectPath?: string;
}

const GoodsForm: React.FC<GoodsFormProps> = ({ data, onChange, redirectPath = "/" }) => {
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
    amounts: {} as { [key: number]: string }, // Add this line to match FormValues
    route: "",
    routes: [] as string[], // Add this line to match FormValues interface
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const [activeStep, setActiveStep] = useState(1); // เริ่มต้นที่ Section 1 เท่านั้น

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

    setActiveStep(2); // ✅ เปิด Section 2
  };

  // Handle form field changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    set((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };


  const [countries, setCountries] = useState<CountryOption[]>([]);

  useEffect(() => {
    const loadCountries = async () => {
      const fetched = await fetchCountries();
      setCountries(fetched);

      const defaultThailand = fetched.find(
        (c: CountryOption) => c.label === "Thailand"
      );

    };
    loadCountries();
  }, []);
  //   const [formValues, setFormValues] = useState(initialValues);
  // const [formErrors, setFormErrors] = useState({});
  //   const [submittedSections, setSubmittedSections] = useState({
  //     section1: false,
  //     section2: false,
  //   });

  const validateSection1 = () => {
    const errors: any = {};
    if (!formValues.industry_type) errors.industry_type = "Required";
    if (!formValues.address) errors.address = "Required";
    if (!formValues.post_code) errors.post_code = "Required";
    if (!formValues.country) errors.country = "Required";

    setFormErrors((prev) => ({ ...prev, ...errors }));
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
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
      if (errorElement) errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    // console.log('✅ Submitted:', formValues);
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
        <Section1
          values={formValues}
          errors={formErrors}
          onChange={(field, val) => {
            setFormValues((prev) => ({ ...prev, [field]: val }));
            setFormErrors((prev) => ({ ...prev, [field]: "" }));
          }}
          onNext={handleFirstSubmit}
        />

        {/* SECTION 2 */}
        {/* {activeStep >= 2 && (
            <Section2
              values={formValues}
              errors={formErrors}
              onChange={handleInputChange}
              onNext={() => setActiveStep(3)}
            />
          )} */}
        <Section2
          values={formValues}
          errors={formErrors}
          onChange={handleInputChange}
          onNext={() => setActiveStep(3)}
        />

        {/* SECTION 3 */}
        {/* {activeStep >= 3 && (
            <Section3
              values={formValues}
              errors={formErrors}
              onChange={handleInputChange}
              onNext={() => setActiveStep(4)}
              setValues={setFormValues}
              countries={countries}
            />
          )} */}
        <Section3
          values={formValues}
          errors={formErrors}
          onChange={handleInputChange}
          onNext={() => setActiveStep(4)}
          setValues={setFormValues}
          countries={countries}
        />
      </Grid>
      {/* </form> */}
    </Container>
  );
};

export default GoodsForm;