import React, {
  forwardRef,
  useState,
  useEffect,
  useImperativeHandle,
} from "react";
import {
  Container,
  Typography,
  Grid,
  Box
} from "@mui/material";
import Section from "../components/Section";
import LabeledTextField from "../components/LabeledTextField";
import LabeledAutocompleteMap from "../components/LabeledAutoCompleteMap";
import {
  fetchCountries,
  CountryOption,
} from "../components/dropdown/contriesmap";

const InstallationForm = forwardRef((props, ref) => {
  const [countries, setCountries] = useState<CountryOption[]>([]);

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

  useEffect(() => {
    const loadCountries = async () => {
      const fetched = await fetchCountries();
      setCountries(fetched);

      const defaultThailand = fetched.find(
        (c) => c.label === "Thailand"
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // 👉 allow Form.tsx to trigger submit
  useImperativeHandle(ref, () => ({
    async submit() {
      const requiredFields = [
        "name", "eco_activity", "address", "post_code", "city",
        "country_id", "unlocode", "latitude", "longitude",
        "author_represent_id", "email", "tel", "po_box"
      ];

      const newErrors: { [key: string]: string } = {};
      requiredFields.forEach((field) => {
        if (!formValues[field as keyof typeof formValues]) {
          newErrors[field] = "กรุณากรอกข้อมูล";
        }
      });

      if (Object.keys(newErrors).length > 0) {
        setFormErrors(newErrors);
        const firstError = Object.keys(newErrors)[0];
        const el = document.getElementsByName(firstError)[0];
        if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
        return false;
      }

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
        const res = await fetch("http://178.128.123.212:5000/api/cbam/installation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error("Submit failed");
        console.log("✅ Installations submitted");
        return true;
      } catch (err) {
        console.error("❌ Submit error:", err);
        return false;
      }
    }
  }));

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        <Box>
          <Typography variant="h5" fontWeight="bold" gutterBottom color="#1976d2">
            About the installation
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            รายละเอียดสถานประกอบการ
          </Typography>
        </Box>

        <Section
          defaultExpanded={true}
          title="Installation form"
          hasError={Object.values(formErrors).some(Boolean)}
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
              name="city"
              value={formValues.city}
              onChange={handleInputChange}
              error={formErrors.city}
            />
          </Box>

          <Box display="flex" gap={3} mb={3}>
            <Box flex={1}>
              <LabeledAutocompleteMap
                caption="Country"
                defination="เลือกประเทศที่สถานประกอบการตั้งอยู่ (Country)"
                label=""
                options={countries.map((c) => ({
                  ...c,
                  value: String(c.value),
                }))}
                value={formValues.country_id}
                name="country_id"
                onChange={(val) => {
                  const selected = countries.find(
                    (c) => String(c.value) === val
                  );
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
              />
            </Box>
            <Box flex={1}>
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
              <LabeledTextField
                caption="P.O. Box"
                defination="หมายเลขตู้ไปรษณีย์ (ถ้ามี)"
                label=""
                name="po_box"
                value={formValues.po_box}
                onChange={handleInputChange}
                error={formErrors.po_box}
              />
              <LabeledTextField
                caption="Coordinates of the main emission source (longitude)"
                defination="พิกัดลองจิจูดของแหล่งปล่อยก๊าซหลัก (Longitude) เช่น 100.5018"
                label=""
                type="float"
                name="longitude"
                value={formValues.longitude}
                onChange={handleInputChange}
                error={formErrors.longitude}
              />
            </Box>
          </Box>

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

          <Box display="flex" gap={3}>
            <Box flex={1}>
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
            </Box>
            <Box flex={1}>
              <LabeledTextField
                type="tel"
                caption="Telphone"
                defination="หมายเลขโทรศัพท์"
                label=""
                name="tel"
                value={formValues.tel}
                onChange={handleInputChange}
                error={formErrors.tel}
              />
            </Box>
          </Box>
        </Section>
      </Grid>
    </Container>
  );
});

export default InstallationForm;
