import React, { useState } from "react";
import { Container, Typography, Grid } from "@mui/material";
import Section from "../components/Section";
import PGButton from "../components/Button";
import { useNavigate } from "react-router-dom";
import LabeledTextField from "../components/LabeledTextField";
import LabeledAutocompleteMap from "../components/LabeledAutoCompleteMap";
import { countries } from "../components/dropdown/contriesmap";



interface InstallationFormProps {
  redirectPath?: string;
}

const InstallationForm: React.FC<InstallationFormProps> = ({
  redirectPath = "/Verifier",
}) => {
  const navigate = useNavigate();

  const defaultCountry = countries.find((c) => c.label === "Thailand");
  
  const [formValues, setFormValues] = useState({
    installation: "",
    economic_activity: "",
    address: "",
    post_code: "",
    po_box: "",
    city: "",
    country: defaultCountry?.value || "",
    unlocode: defaultCountry?.value || "",
    lat: "",
    long: "",
    auth_rep: "",
    email: "",
    tel: "",
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
      "economic_activity",
      "address",
      "post_code",
      "city",
      "country",
      "unlocode",
      "lat",
      "long",
      "auth_rep",
      "email",
      "tel",
      "po_box",
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

    // console.log("✅ Submitted:", formValues);
    navigate(redirectPath);
  };

  return (
    <Container
      maxWidth="md"
      style={{ paddingTop: "2rem", paddingBottom: "2rem" }}
    >
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3} alignItems="stretch">
          {/* SECTION 1: ข้อมูลสถานประกอบการ */}
          <Section
            title="ข้อมูลสถานประกอบการ"
            subtitle=""
            hasError={
              !!formErrors.installation || !!formErrors.economic_activity
            }
          >
            <LabeledTextField
              label="Name of the installation"
              caption="ชื่อสถานประกอบการ"
              name="installation"
              value={formValues.installation}
              onChange={handleInputChange}
              error={formErrors.installation}
            />
            <LabeledTextField
              label="Economic activity"
              caption="ประเภทของกิจการ"
              name="economic_activity"
              value={formValues.economic_activity}
              onChange={handleInputChange}
              error={formErrors.economic_activity}
            />
          </Section>

          {/* SECTION 2: ข้อมูลที่อยู่*/}
          <Section
            title="Address"
            subtitle=""
            hasError={
              !!formErrors.address ||
              !!formErrors.post_code ||
              !!formErrors.city ||
              !!formErrors.country
            }
          >
            <LabeledTextField
              type="text"
              label="Street, Number"
              caption="ที่อยู่"
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
            <LabeledTextField
              type="number"
              label="ตู้ ปณ."
              caption="P.O. Box"
              name="po_box"
              value={formValues.po_box}
              onChange={handleInputChange}
              error={formErrors.po_box }
              helperText= "ตู้ ปณ."

            />
            <LabeledTextField
              label="เมือง"
              caption="City"
              value={formValues.city}
              name="city"
              onChange={handleInputChange}
              error={formErrors.city}
            />

            <LabeledAutocompleteMap
            label="ประเทศ"
            caption="Country"
            options={countries}
            value={formValues.country}
            name="country"
            onChange={(val) => {
                const selected = countries.find((c) => c.value === val);
                setFormValues((prev) => ({
                ...prev,
                country: val,
                unlocode: selected?.value || "",
                }));
            }}
            error={formErrors.country}
            />

             <LabeledTextField
                type="text"
                caption="UNLOCODE"
                label="รหัสประเทศ"
                name="unlocode"
                value={formValues.unlocode}
                readOnly
                onChange={() => {}}
                error={formErrors.unlocode }
                />

          </Section>

          {/* SECTION 3: พิกัดที่ตั้งโรงงาน */}
          <Section
            title="พิกัดที่ตั้งโรงงาน"
            subtitle=""
            hasError={
              !!formErrors.unlocode || !!formErrors.lat || !!formErrors.long
            }
          >
           
            <LabeledTextField
              type="number"
              label="ละติจูด"
              caption="Coordinates of the main emission source (latitude)"
              name="lat"
              value={formValues.lat}
              onChange={handleInputChange}
              error={formErrors.lat}
            />
            <LabeledTextField
              type="number"
              label="ลองจิจูด"
              caption="Coordinates of the main emission source (longitude)"
              name="long"
              value={formValues.long}
              onChange={handleInputChange}
              error={formErrors.long}
            />
          </Section>

          {/* SECTION 4: ผู้แทนและการติดต่อ */}
          <Section
            title="ข้อมูลตัวแทนที่ได้รับมอบอำนาจ"
            subtitle=""
            hasError={
              !!formErrors.auth_rep || !!formErrors.email || !!formErrors.tel
            }
          >
            <LabeledTextField
              label="ชื่อผู้แทน"
              caption="Name of authorized representative"
              name="auth_rep"
              value={formValues.auth_rep}
              onChange={handleInputChange}
              error={formErrors.auth_rep}
            />
            <LabeledTextField
              type="email"
              label="อีเมล"
              caption="Email"
              name="email"
              value={formValues.email}
              onChange={handleInputChange}
              error={formErrors.email}
            />
            <LabeledTextField
              type="tel"
              caption="Telphone"
              label="เบอร์โทร"
              name="tel"
              value={formValues.tel}
              onChange={handleInputChange}
              error={formErrors.tel}
            />
          </Section>

          <PGButton />
        </Grid>
      </form>
    </Container>
  );
};

export default InstallationForm;