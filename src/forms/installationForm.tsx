import React, { useState, useEffect } from "react";
import { Container, Typography, Grid } from "@mui/material";
import Section from "../components/Section";
import PGButton from "../components/FormButton";
import { useNavigate } from "react-router-dom";
import LabeledTextField from "../components/LabeledTextField";
import LabeledAutocompleteMap from "../components/LabeledAutoCompleteMap";
// TODO: Update the import path below to the correct file location if it exists, or create the file if missing.
import {
  fetchCountries,
  CountryOption,
} from "../components/dropdown/contriesmap";
import Box from "@mui/material/Box";

interface InstallationFormProps {
  redirectPath?: string;
}

const InstallationForm: React.FC<InstallationFormProps> = ({}) => {
  // const navigate = useNavigate();

  const [countries, setCountries] = useState<CountryOption[]>([]);

  useEffect(() => {
    const loadCountries = async () => {
      const fetched = await fetchCountries();
      setCountries(fetched);

      const defaultThailand = fetched.find(
        (c: CountryOption) => c.label === "Thailand"
      );
      if (defaultThailand) {
        setFormValues((prev) => ({
          ...prev,
          country_id: String(defaultThailand.value),
          unlocode: String(defaultThailand.abbreviation),
        }));
      }
    };
    loadCountries();
  }, []);

  const [formValues, setFormValues] = useState({
    name: "",
    name_specific: "",
    eco_activity: "",
    address: "",
    city: "",
    country_id: "",
    post_code: "",
    po_box: "",
    latitude: "",
    longitude: "",
    author_represent_id: "",
    email: "",
    tel: "",
    unlocode: "",
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const requiredFields = [
      "name",
      "eco_activity",
      "address",
      "post_code",
      "city",
      "country_id",
      "unlocode",
      "latitude",
      "longitude",
      "author_represent_id",
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

    const handleSubmitInstallations = async () => {
      const payload = {
        name: formValues.name,
        name_specific: formValues.name_specific,
        eco_activity: formValues.eco_activity,
        address: formValues.address,
        city: formValues.city,
        country_id: Number(formValues.country_id),
        post_code: formValues.post_code,
        po_box: formValues.po_box,
        latitude: formValues.latitude,
        longitude: formValues.longitude,
        author_represent_id: Number(formValues.author_represent_id),
      };

      try {
        const response = await fetch(
          "http://178.128.123.212:5000/api/cbam/installation",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }
        );

        if (!response.ok) throw new Error("Installations submission failed");
        console.log("✅ Installations submitted successfully");
      } catch (error) {
        console.error("❌ Error submitting form:", error);
      }
    };
    await handleSubmitInstallations();

    console.log("✅ Submitted:", formValues);
    // navigate(redirectPath);
  };

  return (
    <Container
      maxWidth="md"
      style={{ paddingTop: "2rem", paddingBottom: "2rem" }}
    >
      <form onSubmit={handleSubmit}>
        {/* <form onSubmit={handleSubmit}> */}
        <Grid container spacing={3} alignItems="stretch">
          <Box>
            <Typography
              variant="h5"
              fontWeight="bold"
              gutterBottom
              color="#1976d2"
            >
              About the installation
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              รายละเอียดสถานประกอบการ
            </Typography>
          </Box>
          {/* SECTION 1: ข้อมูลสถานประกอบการ */}
          <Section
            defaultExpanded={true}
            title="Installation form"
            subtitle=""
            hasError={
              !!formErrors.name ||
              !!formErrors.name_specific ||
              !!formErrors.eco_activity ||
              !!formErrors.address ||
              !!formErrors.city ||
              !!formErrors.country_id ||
              !!formErrors.post_code ||
              !!formErrors.po_box ||
              !!formErrors.latitude ||
              !!formErrors.longitude ||
              !!formErrors.author_represent_id ||
              !!formErrors.email ||
              !!formErrors.tel
            }
          >
            <Box mb={3}>
              <LabeledTextField
                caption="Name of the installation(ENG)"
                defination="ชื่อสถานประกอบการเป็นภาษาอังกฤษ (Installation Name - English)"
                label=""
                name="name"
                value={formValues.name}
                onChange={handleInputChange}
                error={formErrors.name}
              />
              <LabeledTextField
                caption="Name of the installation(TH)"
                defination="ชื่อของสถานที่ผลิต เช่น โรงงาน เหมือง (Installation Name - Optional)"
                label=""
                name="name_specific"
                value={formValues.name_specific}
                onChange={handleInputChange}
                error={formErrors.name_specific}
              />
              <LabeledTextField
                caption="Economic activity"
                defination="เลือกประเภทของกิจกรรมหลักในสถานประกอบการ (Economic Activity)"
                label=""
                name="eco_activity"
                value={formValues.eco_activity}
                onChange={handleInputChange}
                error={formErrors.eco_activity}
              />
              <LabeledTextField
                caption="Street, Number"
                defination="ถนน เลขที่ (Street, Number)"
                label=""
                name="address"
                value={formValues.address}
                onChange={handleInputChange}
                error={formErrors.address}
              />
              <LabeledTextField
                caption="City"
                defination="ชื่อจังหวัดหรือเมือง (City)"
                label=""
                value={formValues.city}
                name="city"
                onChange={handleInputChange}
                error={formErrors.city}
              />
            </Box>

            <div
              style={{ display: "flex", gap: "1.5rem", marginBottom: "1rem" }}
            >
              <div style={{ flex: 1 }}>
                <LabeledAutocompleteMap
                  caption="Country"
                  defination="เลือกประเทศที่สถานประกอบการตั้งอยู่ (Country)"
                  label=""
                  options={countries.map((c) => ({
                    ...c,
                    value: String(c.value), // 🔥 cast value เป็น string
                  }))}
                  value={formValues.country_id}
                  name="country_id"
                  onChange={(val) => {
                    const selected = countries.find(
                      (c) => String(c.value) === val
                    ); // 🔥 compare string
                    setFormValues((prev) => ({
                      ...prev,
                      country_id: String(val),
                      unlocode: selected?.abbreviation || "",
                    }));
                  }}
                  error={formErrors.country_id}
                />

                <LabeledTextField
                  caption="Post code"
                  defination="รหัสไปรษณีย์ (Post Code)"
                  label=""
                  type="float"
                  name="post_code"
                  value={formValues.post_code}
                  onChange={handleInputChange}
                  error={formErrors.post_code}
                />
                <LabeledTextField
                  caption="Coordinates of the main emission source (latitude)"
                  defination="พิกัดละติจูดของแหล่งปล่อยก๊าซหลัก (Latitude) เช่น 13.7563"
                  label=""
                  type="float"
                  name="latitude"
                  value={formValues.latitude}
                  onChange={handleInputChange}
                  error={formErrors.latitude}
                  inputProps={{ step: "any" }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <LabeledTextField
                  caption="UNLOCODE"
                  defination="รหัสประเทศ"
                  label=""
                  name="unlocode"
                  value={formValues.unlocode}
                  readOnly
                  onChange={() => {}}
                  error={formErrors.unlocode}
                />
                <div
                  style={{
                    display: "flex",
                    gap: "1.5rem",
                    marginBottom: "1.4rem",
                  }}
                ></div>
                <LabeledTextField
                  type="flaot"
                  caption="P.O. Box"
                  defination="หมายเลขตู้ไปรษณีย์ (ถ้ามี) (P.O. Box)"
                  label=""
                  name="po_box"
                  value={formValues.po_box}
                  onChange={handleInputChange}
                  error={formErrors.po_box}
                />
                <LabeledTextField
                  type="float"
                  caption="Coordinates of the main emission source (longitude)"
                  defination="พิกัดลองจิจูดของแหล่งปล่อยก๊าซหลัก (Longitude) เช่น 100.5018"
                  label=""
                  name="longitude"
                  value={formValues.longitude}
                  onChange={handleInputChange}
                  error={formErrors.longitude}
                />
              </div>
            </div>

            <Box mb={3}>
              <LabeledTextField
                caption="Name of authorized representative"
                defination="ชื่อหน่วยงานมาฐานแห่งชาติที่ให้การรับรอง"
                label=""
                name="author_represent_id"
                value={formValues.author_represent_id}
                onChange={handleInputChange}
                error={formErrors.author_represent_id}
              />
            </Box>

            <div
              style={{ display: "flex", gap: "1.5rem", marginBottom: "1rem" }}
            >
              <div style={{ flex: 1 }}>
                <LabeledTextField
                  type="email"
                  caption="Email"
                  defination="อีเมล"
                  label=""
                  name="email"
                  value={formValues.email}
                  onChange={handleInputChange}
                  error={formErrors.email}
                />
              </div>
              <div style={{ flex: 1 }}>
                <LabeledTextField
                  type="tel"
                  caption="Telphone"
                  defination="หมายเลขทะเบียนที่ออกโดยหน่วยงานรับรอง"
                  label=""
                  name="tel"
                  value={formValues.tel}
                  onChange={handleInputChange}
                  error={formErrors.tel}
                />
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "right" }}>
              <PGButton />
            </div>
          </Section>
        </Grid>
      </form>
    </Container>
  );
};

export default InstallationForm;
