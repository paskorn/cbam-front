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
import Navigation from "../components/Navigation";

interface InstallationFormProps {
  redirectPath?: string;
}

const SumupForm: React.FC<InstallationFormProps> = ({
  redirectPath = "/Verifier",
}) => {
  const navigate = useNavigate();

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
          unlocode: String(defaultThailand.value),
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
      "installation",
      "eco_activity",
      "address",
      "post_code",
      "city",
      "country_id",
      "unlocode",
      "latitude",
      "longitude",
      "author_represent_id ",
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
        country_id: formValues.country_id,
        post_code: formValues.post_code,
        po_box: formValues.po_box,
        latitude: formValues.latitude,
        longitude: formValues.longitude,
        author_represent_id: formValues.author_represent_id,
      };

      try {
        const response = await fetch("/api/installations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) throw new Error("Installations submission failed");
        console.log("✅ Installations submitted successfully");
      } catch (error) {
        console.error(error);
      }
    };
    await handleSubmitInstallations();

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
            defaultExpanded={true}
            title="Installation form"
            subtitle=""
            hasError={
              !!formErrors.installation ||
              !!formErrors.eco_activity ||
              !!formErrors.address ||
              !!formErrors.post_code ||
              !!formErrors.city ||
              !!formErrors.country_id ||
              !!formErrors.latitude ||
              !!formErrors.longitude ||
              !!formErrors.author_represent_id ||
              !!formErrors.email ||
              !!formErrors.tel ||
              !!formErrors.po_box
            }
          >
            <div
              style={{ display: "flex", gap: "1.5rem", marginBottom: "1rem" }}
            >
             

              <div style={{ flex: 1 }}>
                <LabeledTextField
                  type="number"
                  caption="Industry Type"
                  defination="ประเภทอุตสาหกรรม"
                  label=""
                  name="po_box"
                  value={formValues.po_box}
                  onChange={handleInputChange}
                  error={formErrors.po_box}
                  //   helperText="ตู้ ปณ."
                />

                <LabeledAutocompleteMap
                  caption="Precursor"
                  defination="วัตถุดิบตั้งต้น"
                  label=""
                  options={countries.map((c) => ({ ...c, value: String(c.value) }))}
                  value={formValues.country_id}
                  name="country_id"
                  onChange={(val) => {
                    const selected = countries.find((c) => c.value === val);
                    setFormValues((prev) => ({
                      ...prev,
                      country_id: String(val),
                      unlocode: selected ? String(selected.value) : "",
                    }));
                  }}
                  error={formErrors.country}
                />

                <LabeledTextField
                  type="number"
                  caption="CN. code"
                  defination=""
                  label=""
                  name="longitude"
                  value={formValues.longitude}
                  onChange={handleInputChange}
                  error={formErrors.long}
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

export default SumupForm;
