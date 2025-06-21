import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Container, Grid, Box, Typography } from "@mui/material";
import Section from "../components/Section";
import PGButton from "../components/FormButton";
import LabeledAutocompleteMap from "../components/LabeledAutoCompleteMap";
import LabeledTextField from "../components/LabeledTextField";
import { useNavigate } from "react-router-dom";
import {
  fetchCountries,
  CountryOption,
} from "../components/dropdown/contriesmap";
import LabeledAutocomplete from "../components/LabeledAutoComplete";

const VerifierForm = forwardRef((props, ref) => {
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
  const [countries, setCountries] = useState<CountryOption[]>([]);

  useEffect(() => {
    const loadCountries = async () => {
      const fetched = await fetchCountries();
      setCountries(fetched);
      const defaultThailand = fetched.find((c) => c.label === "Thailand");
      if (defaultThailand) {
        setFormValues((prev) => ({
          ...prev,
          country_id: String(defaultThailand.value),
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

  const handleAutocompleteChange = (name: string, val: string) => {
    setFormValues((prev) => ({ ...prev, [name]: val }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmitSection1And3 = async () => {
    const payload = {
      installation_name: formValues.installation_name,
      address: formValues.address,
      city: formValues.city,
      country_id: formValues.country_id,
      post_code: formValues.post_code,
      authorized_rep_id: formValues.authorized_rep_id,
      accreditation_state: formValues.accreditation_state,
     accreditation_national_body: formValues.accreditation_national_body,
      registration_no: formValues.registration_no,
    };

    const response = await fetch("/api/verifier", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error("Section 1 & 3 submission failed");
    console.log("✅ Section 1 & 3 submitted");
  };

  const handleSubmitSection2 = async () => {
    const payload = {
      email: formValues.email,
      phone: formValues.phone,
      fax: formValues.fax,
    };

    const response = await fetch("/api/authorized_representatives", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error("Section 2 submission failed");
    console.log("✅ Section 2 submitted");
  };

  useImperativeHandle(ref, () => ({
    async submit() {
      const requiredFields = [
        "installation_name",
        "address",
        "post_code",
        "country_id",
        "authorized_rep_id",
        "accreditation_state",
        "accreditation_national_body",
        "registration_no",
        "name",
        "email",
        "phone",
        "fax",
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
        return false;
      }

      try {
        await handleSubmitSection1And3();
        await handleSubmitSection2();
        return true;
      } catch (err) {
        console.error(err);
        return false;
      }
    },
  }));

  return (
    <Container
      maxWidth="md"
      style={{ paddingTop: "2rem", paddingBottom: "2rem" }}
    >
      <form>
        <Grid container spacing={3} alignItems="stretch">
          <Box>
            <Typography
              variant="h5"
              fontWeight="bold"
              gutterBottom
              color="#1976d2"
            >
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
              name="installation_name"
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
              onChange={(val: string | number) => {
                const valStr = String(val);
                const selected = countries.find(
                  (c) => String(c.value) === valStr
                ); // 🔥 compare string
                setFormValues((prev) => ({
                  ...prev,
                  country_id: valStr,
                  unlocode: selected?.abbreviation || "",
                }));
              }}
              error={formErrors.country_id}
            />
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
              label=""
              name="authorized_rep_id"
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
              name="phone"
              value={formValues.phone}
              onChange={handleInputChange}
              error={formErrors.phone}
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
              !!formErrors.accrediation_state ||
              !!formErrors.accreditation_national_body ||
              !!formErrors.registration_no
            }
          >
            <LabeledAutocompleteMap
              caption="Accreditation Member State"
              defination="เลือกประเทศ"
              label=""
              options={countries.map((c) => ({
                ...c,
                value: String(c.value), // 🔥 cast value เป็น string
              }))}
              value={formValues.country_id}
              name="accrediation_state"
              onChange={(val: string | number) => {
                const valStr = String(val);
                const selected = countries.find(
                  (c) => String(c.value) === valStr
                ); // 🔥 compare string
              }}
              error={formErrors.accreditation_state}
            />
            
            <LabeledTextField
              type="text"
              caption="National Accreditation Body"
              defination="ชื่อหน่วยงานมาฐานแห่งชาติที่ให้การรับรองผู้ทวนสอบ"
              label=""
              name="accreditation_national_body"
              value={formValues.accreditation_national_body}
              onChange={handleInputChange}
              error={formErrors.accreditation_national_body}
            />
            <LabeledTextField
              type="number"
              caption="Registration Number"
              defination="หมายเลขทะเบียนที่หน่วยงานรับรองออกให้"
              label=""
              name="registration_no"
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
});

export default VerifierForm;
