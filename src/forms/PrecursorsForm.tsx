import React, { useState, useEffect } from "react";
import { Container, Typography, Grid } from "@mui/material";
import Section from "../components/Section";
import PGButton from "../components/FormButton";
import { useNavigate } from "react-router-dom";
import LabeledTextField from "../components/LabeledTextField";
import LabeledAutocompleteMap from "../components/LabeledAutoCompleteMap";
import Navigation from "../components/Navigation";
import {
  fetchCountries,
  CountryOption,
} from "../components/dropdown/contriesmap";
import Box from "@mui/material/Box";

interface InstallationFormProps {
  redirectPath?: string;
}

const PrecursorsForm: React.FC<InstallationFormProps> = ({
  redirectPath = "/Verifier",
}) => {
  const navigate = useNavigate();
  const [contries, setCountries] = useState<CountryOption[]>([]);
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
          country: String(defaultThailand.value),
          unlocode: String(defaultThailand.value),
        }));
      }
    };
    loadCountries();
  }, []);

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
          <Box>
          <Typography variant="h5" fontWeight="bold" gutterBottom color="#1976d2">
            Purchased precursors
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            รายะเอียดของวัตถุดิบที่ซื้อเข้ามาใช้ในกระบวนการผลิต
          </Typography>
          </Box>
          {/* SECTION 1: ข้อมูลสถานประกอบการ */}
          <Section
            defaultExpanded={true}
            title="(a) List of purchased precursors "
            subtitle="รายการวัตถุดิบ"
            hasError={
              !!formErrors.purchased_precursors ||
              !!formErrors.route_1 ||
              !!formErrors.route_2 ||
              !!formErrors.route_3 ||
              !!formErrors.route_4 ||
              !!formErrors.route_5 ||
              !!formErrors.country_code
            }
          >
            <div
              style={{ display: "flex", gap: "1.5rem", marginBottom: "1rem" }}
            >
              <div style={{ flex: 1 }}>
                <LabeledTextField
                  caption="Purchased precursors "
                  defination="รายการวัตถุดิบ"
                  label=""
                  name="purchased_precursors"
                  value={formValues.installation}
                  onChange={handleInputChange}
                  error={formErrors.installation}
                />
                <LabeledTextField
                  caption="Route 1"
                  defination="เลือก Route 1"
                  label=""
                  name="route_1"
                  value={formValues.economic_activity}
                  onChange={handleInputChange}
                  error={formErrors.economic_activity}
                />
                <LabeledTextField
                  caption="Route 3"
                  defination="เลือก Route 3"
                  label=""
                  type="route_3"
                  name="post_code"
                  value={formValues.post_code}
                  onChange={handleInputChange}
                  error={formErrors.post_code}
                />

                <LabeledTextField
                  caption="Route 5"
                  defination="เลือก Route 5"
                  label=""
                  value={formValues.city}
                  name="route_5"
                  onChange={handleInputChange}
                  error={formErrors.city}
                />
              </div>
              <div style={{ flex: 1 }}>
                <LabeledTextField
                  caption="Country code "
                  defination="เลือกรหัสประเทศที่นำเข้าวัตถุดิบ"
                  label=""
                  type="number"
                  name="country_code"
                  value={formValues.lat}
                  onChange={handleInputChange}
                  error={formErrors.lat}
                />
                <LabeledTextField
                  caption="Route 2"
                  defination="เลือก Route 2"
                  label=""
                  name="route_2"
                  value={formValues.auth_rep}
                  onChange={handleInputChange}
                  error={formErrors.auth_rep}
                />

                <LabeledTextField
                  caption="Route 4"
                  defination="เลือก Route 4"
                  label=""
                  name="route_4"
                  value={formValues.installation}
                  onChange={handleInputChange}
                  error={formErrors.installation}
                />
              </div>
            </div>
          </Section>

          <PGButton />
        </Grid>
      </form>
    </Container>
  );
};

export default PrecursorsForm;
