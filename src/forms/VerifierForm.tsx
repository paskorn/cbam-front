import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Grid,
  Autocomplete,
} from "@mui/material";
import Section from "../components/Section";
import PGButton from "../components/Button";
import { useNavigate } from "react-router-dom";
import LabeledAutocomplete from "../components/LabeledAutoComplete";
import LabeledTextField from "../components/LabeledTextField";
import { countries } from "../components/dropdown/contries";

interface VerifierFormProps {
  redirectPath?: string;
}

const VerifierForm: React.FC<VerifierFormProps> = ({ redirectPath = "/" }) => {
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
          {/* SECTION 1: Installation Address */}
          <Section
            title="ชื่อและที่อยู่ผู้ทวนสอบ"
            subtitle="Name and address of the verifier of this report"
            hasError={
              !!formErrors.installation ||
              !!formErrors.address ||
              !!formErrors.post_code ||
              !!formErrors.country
            }
          >
            <LabeledTextField
              type="text"
              label="ชื่อบริษัทผู้ทวนสอบ"
              caption="Name of the installation"
              name="installation"
              value={formValues.installation}
              onChange={handleInputChange}
              error={formErrors.installation}
            />

            <LabeledTextField
              type="text"
              label="ที่อยู่"
              caption="Street, Number"
              name="address"
              value={formValues.address}
              onChange={handleInputChange}
              error={formErrors.address}
            />

            <LabeledTextField
              type="number"
              label="รหัสไปรษณีย์"
              caption="Post code"
              name="post_code"
              value={formValues.post_code}
              onChange={handleInputChange}
              error={formErrors.post_code}
            />

            <Typography variant="caption" color="textSecondary">
              Country
            </Typography>
            <LabeledAutocomplete
              label="ประเทศ"
              name="country"
              caption="Country"
              options={countries}
              value={formValues.country}
              error={formErrors.country}
              onChange={(val) =>
                setFormValues((prev) => ({ ...prev, country: val }))
              }
            />
          </Section>

          {/* SECTION 2: Authorized Representative */}
          <Section
            title="รายละเอียดตัวแทนที่ได้รับมอบหมายจากบริษัทผู้ทวนสอบ"
            subtitle="Authorised representative of the verifier"
            hasError={
              !!formErrors.auth_rep ||
              !!formErrors.email ||
              !!formErrors.tel ||
              !!formErrors.fax
            }
          >
            <LabeledTextField
              type="text"
              label="ชื่อ"
              caption="Name"
              name="auth_rep"
              value={formValues.auth_rep}
              onChange={handleInputChange}
              error={formErrors.auth_rep}
            />

            <LabeledTextField
              type="email"
              label="อีเมล"
              caption="Email address"
              name="email"
              value={formValues.email}
              onChange={handleInputChange}
              error={formErrors.email}
            />

            <LabeledTextField
              type="tel"
              label="เบอร์โทร"
              caption="Telephone number"
              name="tel"
              value={formValues.tel}
              onChange={handleInputChange}
              error={formErrors.tel}
            />
            <LabeledTextField
              type="number"
              label="โทรสาร"
              caption="Fax"
              name="fax"
              value={formValues.fax}
              onChange={handleInputChange}
              error={formErrors.fax}
            />
          </Section>

          {/* SECTION 3: Accreditation Details */}
          <Section
            title="การรับรองคุณสมบัติของผู้ทวนสอบ"
            subtitle="Information about the verifier's accreditation"
            hasError={
              !!formErrors.accre_mem_state ||
              !!formErrors.nat_accre ||
              !!formErrors.reg_num
            }
          >
            <LabeledAutocomplete
              caption="Accreditation Member State"
              label="ประเทศที่ให้การรับรอง"
              name="accre_mem_state"
              error={formErrors.accre_mem_state}
              options={countries}
              value={formValues.accre_mem_state}
              onChange={(val) =>
                setFormValues((prev) => ({ ...prev, accre_mem_state: val }))
              }
            />
            <LabeledTextField
              type="text"
              label="ชื่อหน่วยงานมาฐานแห่งชาติที่ให้การรับรอง"
              name="nat_accre"
              caption="National Accreditation Body"
              value={formValues.nat_accre}
              onChange={handleInputChange}
              error={formErrors.nat_accre}
            />
            <LabeledTextField
              type="number"
              label="หมายเลขทะเบียนที่ออกโดยหน่วยงานรับรอง"
              caption="Registration Number"
              name="reg_num"
              value={formValues.reg_num}
              onChange={handleInputChange}
              error={formErrors.reg_num}
            />
          </Section>

          <PGButton />
        </Grid>
      </form>
    </Container>
  );
};

export default VerifierForm;
