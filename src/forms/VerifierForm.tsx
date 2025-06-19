import React, { useState } from "react";
import { Container, Grid } from "@mui/material";
import Section from "../components/Section";
import PGButton from "../components/FormButton";
import { useNavigate } from "react-router-dom";
import LabeledAutocomplete from "../components/LabeledAutoComplete";
import LabeledTextField from "../components/LabeledTextField";
// import { countries } from "../components/dropdown/goods";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface VerifierFormProps {
  redirectPath?: string;
}

const VerifierForm: React.FC<VerifierFormProps> = ({ redirectPath = "/" }) => {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    installation_name: "",
    address: "",
    city: "",
    country_id: "",
    post_code: "",
    authorized_rep_id: "",
    accreditation_state: "",
    accreditation_national_body: "",
    registration_no: "",

    name: "",
    email: "",
    phone: "",
    fax: "",
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleAutocompleteChange = (name: string, val: string) => {
    setFormValues((prev) => ({ ...prev, [name]: val }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmitSection1And3 = async () => {
    const payload = {
      installation: formValues.installation_name,
      address: formValues.address,
      city: formValues.city,
      country: formValues.country_id,
      post_code: formValues.post_code,
      auth_rep: formValues.authorized_rep_id,
      accre_mem_state: formValues.accreditation_state,
      nat_accre: formValues.accreditation_national_body,
      reg_num: formValues.registration_no,
    };

    try {
      const response = await fetch("/api/verifier", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Section 1 & 3 submission failed");
      console.log("✅ Section 1 & 3 submitted successfully");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmitSection2 = async () => {
    const payload = {
      name: formValues.name,
      email: formValues.email,
      tel: formValues.phone,
      fax: formValues.fax,
    };

    try {
      const response = await fetch("/api/authorized_representatives", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Section 2 submission failed");
      console.log("✅ Section 2 submitted successfully");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const requiredFields = [
      "installation",
      "address",
      "post_code",
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

    await handleSubmitSection1And3();
    await handleSubmitSection2();

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
              Verifier of the report 
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              only if available and not required during transitional period
            </Typography>
          </Box>
          {/* SECTION 1: Installation Address */}
          <Section
            defaultExpanded={true}
            title="Name and address of the verifier of this report"
            subtitle="ชื่อและที่อยู่ผู้ทวนสอบ"
            hasError={
              !!formErrors.installation ||
              !!formErrors.address ||
              !!formErrors.post_code ||
              !!formErrors.country
            }
          >
            <LabeledTextField
              type="text"
              caption="Name of the installation"
              defination="ชื่อบริษัทผู้ทวนสอบ"
              label=""
              name="installation"
              value={formValues.installation_name}
              onChange={handleInputChange}
              error={formErrors.installation}
            />

            <LabeledTextField
              type="text"
              caption="Street, Number"
              defination="ที่อยู่ บ้านเลขที่ ถนน ของผู้ทวนสอบ"
              label=""
              name="address"
              value={formValues.address}
              onChange={handleInputChange}
              error={formErrors.address}
            />

            <LabeledTextField
              type="number"
              caption="Post code"
              defination="รหัสไปรษณีย์"
              label=""
              name="post_code"
              value={formValues.post_code}
              onChange={handleInputChange}
              error={formErrors.post_code}
            />

            {/* <LabeledAutocomplete
              caption="Country"
              defination="ประเทศ"
              label=""
              name="country"
              options={countries}
              value={formValues.country_id}
              error={formErrors.country_id}
              onChange={(val) => handleAutocompleteChange("country", val)}
            /> */}
          </Section>

          {/* SECTION 2: Authorized Representative */}
          <Section
            title="Authorised representative of the verifier"
            subtitle="รายละเอียดตัวแทนที่ได้รับมอบหมายจากบริษัทผู้ทวนสอบ"
            hasError={
              !!formErrors.auth_rep ||
              !!formErrors.email ||
              !!formErrors.tel ||
              !!formErrors.fax
            }
          >
            <LabeledTextField
              type="text"
              caption="Name"
              defination="ชื่อ-นามสกุลของตัวแทน"
              label="Name"
              name="auth_rep"
              value={formValues.authorized_rep_id}
              onChange={handleInputChange}
              error={formErrors.authorized_rep_id}
            />

            <LabeledTextField
              type="email"
              caption="Email address"
              defination="อีเมล"
              label=""
              name="email"
              value={formValues.email}
              onChange={handleInputChange}
              error={formErrors.email}
            />

            <LabeledTextField
              type="tel"
              caption="Telephone number"
              defination="เบอร์โทร"
              label=""
              name="tel"
              value={formValues.phone}
              onChange={handleInputChange}
              error={formErrors.tel}
            />
            <LabeledTextField
              type="number"
              caption="Fax"
              defination="เบอร์แฟกซ์"
              label="Fax"
              name="fax"
              value={formValues.fax}
              onChange={handleInputChange}
              error={formErrors.fax}
            />
          </Section>

          {/* SECTION 3: Accreditation Details */}
          <Section
            title="Information about the verifier's accreditation"
            subtitle="การรับรองคุณสมบัติของผู้ทวนสอบ"
            hasError={
              !!formErrors.accre_mem_state ||
              !!formErrors.nat_accre ||
              !!formErrors.reg_num
            }
          >
            {/* <LabeledAutocomplete
              caption="Accreditation Member State"
              defination="เลือกประเทศ"
              label=""
              name="accre_mem_state"
              error={formErrors.accre_mem_state}
              options={countries}
              value={formValues.accreditation_state}
              onChange={(val) =>
                handleAutocompleteChange("accre_mem_state", val)
              }
            /> */}
            <LabeledTextField
              type="text"
              caption="National Accreditation Body"
              defination="ชื่อหน่วยงานมาฐานแห่งชาติที่ให้การรับรองผู้ทวนสอบ"
              label=""
              name="nat_accre"
              value={formValues.accreditation_national_body}
              onChange={handleInputChange}
              error={formErrors.accreditation_national_body}
            />
            <LabeledTextField
              type="number"
              caption="Registration Number"
              defination="หมายเลขทะเบียนที่หน่วยงานรับรองออกให้"
              label=""
              name="reg_num"
              value={formValues.registration_no}
              onChange={handleInputChange}
              error={formErrors.registration_no}
            />
          </Section>

          <PGButton />
        </Grid>
      </form>
    </Container>
  );
};

export default VerifierForm;
