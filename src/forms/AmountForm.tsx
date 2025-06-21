import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Grid,
  Autocomplete,
  Box,
} from "@mui/material";
import Section from "../components/Section";
import PGButton from "../components/FormButton";
import { useNavigate } from "react-router-dom";
import LabeledAutocomplete from "../components/LabeledAutoComplete";
import LabeledTextField from "../components/LabeledTextField";
// import { countries } from "../components/dropdown/goods";

interface VerifierFormProps {
  redirectPath?: string;
}

const AmountForm: React.FC<VerifierFormProps> = ({ redirectPath = "/" }) => {
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
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
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
      if (errorElement)
        errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    // console.log('✅ Submitted:', formValues);
    navigate(redirectPath);
  };

  return (
    <Container
      maxWidth="md"
      style={{ paddingTop: "2rem", paddingBottom: "2rem" }}
    >
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3} alignItems="stretch">
          <Box>
          <Typography variant="h5" fontWeight="bold" gutterBottom color="#1976d2">
            Purchased precursors
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            รายะเอียดของวัตถุดิบที่ซื้อเข้ามาใช้ในกระบวนการผลิต
          </Typography>
          </Box>
          
          {/* SECTION 1: Specific embedded emissions*/}
          <Section
            title="(c) Specific embedded emissions"
            subtitle="ปริมาณการปล่อยก๊าซเรือนกระจก"
            hasError={
              !!formErrors.auth_rep ||
              !!formErrors.email ||
              !!formErrors.tel ||
              !!formErrors.fax
            }
          >
            <div style={{ textAlign: "left", marginBottom: "1.5rem" }}>
              <strong>
                {" "}
                Specific embedded direct emissions (SEE (direct)){" "}
              </strong>
            </div>
            <Box mb={3}>
              <div
                style={{ display: "flex", gap: "1.5rem", marginBottom: "1rem" }}
              >
                <div style={{ flex: 1 }}>
                  <LabeledTextField
                    type="text"
                    caption=""
                    defination="กรอกเป็นตัวเลขของค่า SEE direct ของวัตถุดิบตั้งต้น"
                    label="Name"
                    name="auth_rep"
                    value={formValues.auth_rep}
                    onChange={handleInputChange}
                    error={formErrors.auth_rep}
                  />
                </div>

                <div style={{ flex: 1 }}>
                  <LabeledTextField
                    type="email"
                    caption=""
                    defination="ระบุแหล่งที่มาของข้อมูล"
                    label=""
                    name="email"
                    value={formValues.email}
                    onChange={handleInputChange}
                    error={formErrors.email}
                  />
                </div>
              </div>
            </Box>

            <div style={{ textAlign: "left", marginBottom: "1.5rem" }}>
              <strong>
                {" "}
                Specific electricity consumption (for SEE (indirect)){" "}
              </strong>
            </div>
            <Box mb={3}>
              <div
                style={{ display: "flex", gap: "1.5rem", marginBottom: "1rem" }}
              >
                <div style={{ flex: 1 }}>
                  <LabeledTextField
                    type="text"
                    caption=""
                    defination="กรอกเป็นค่าตัวเลขของ SEE indirect ของวัตถุดิบตั้งต้น"
                    label="Name"
                    name="auth_rep"
                    value={formValues.auth_rep}
                    onChange={handleInputChange}
                    error={formErrors.auth_rep}
                  />
                </div>

                <div style={{ flex: 1 }}>
                  <LabeledTextField
                    type="email"
                    caption=""
                    defination="ระบุแหล่งที่มาของข้อมูล"
                    label=""
                    name="email"
                    value={formValues.email}
                    onChange={handleInputChange}
                    error={formErrors.email}
                  />
                </div>
              </div>
            </Box>

            <div style={{ textAlign: "left", marginBottom: "1.5rem" }}>
              <strong>
                {" "}
                Electricity emission factor (for SEE (indirect)){" "}
              </strong>
            </div>
            <Box mb={3}>
              <div
                style={{ display: "flex", gap: "1.5rem", marginBottom: "1rem" }}
              >
                <div style={{ flex: 1 }}>
                  <LabeledTextField
                    type="text"
                    caption=""
                    defination="กรอกเป็นค่าตัวเลขของ SEE indirect ของไฟฟ้าที่ใช้ในการผลิตวัตถุดิบตั้งต้น"
                    label="Name"
                    name="auth_rep"
                    value={formValues.auth_rep}
                    onChange={handleInputChange}
                    error={formErrors.auth_rep}
                  />
                  <LabeledTextField
                    type="email"
                    caption=""
                    defination="Specific embedded indirect emissions (SEE (indirect))"
                    label=""
                    name="email"
                    value={formValues.email}
                    onChange={handleInputChange}
                    error={formErrors.email}
                  />
                </div>

                <div style={{ flex: 1 }}>
                  <LabeledTextField
                    type="email"
                    caption=""
                    defination="ระบุแหล่งที่มาของข้อมูล"
                    label=""
                    name="email"
                    value={formValues.email}
                    onChange={handleInputChange}
                    error={formErrors.email}
                  />
                </div>
              </div>
            </Box>

            <Box mb={3}>
              <div
                style={{ display: "flex", gap: "1.5rem", marginBottom: "1rem" }}
              >
                <div style={{ flex: 1 }}>
                  <LabeledTextField
                    type="text"
                    caption=" Justification for use of default values (if relevant) "
                    defination="กรอกเหตุผลในการใช้ค่ากลาง (ถ้าเกี่ยวข้อง)"
                    label="Name"
                    name="auth_rep"
                    value={formValues.auth_rep}
                    onChange={handleInputChange}
                    error={formErrors.auth_rep}
                  />
                </div>
              </div>
            </Box>
          </Section>

          <PGButton />
        </Grid>
      </form>
    </Container>
  );
};

export default AmountForm;
