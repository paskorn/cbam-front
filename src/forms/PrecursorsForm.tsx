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
import LabeledAutocomplete from "../components/LabeledAutoComplete";

interface InstallationFormProps {
  redirectPath?: string;
}

const PrecursorsForm: React.FC<InstallationFormProps> = ({
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
          country_code: String(defaultThailand.abbreviation),
        }));
      }
    };
    loadCountries();
  }, []);

  type FormValues = {
    purchased_precursors: string;
    country_code: string;
    route_1?: string;
    route_2?: string;
    route_3?: string;
    route_4?: string;
    route_5?: string;
    route_6?: string;
    amount?: string;
    amount1?: string;
    amount2?: string;
    amount3?: string;
    amount4?: string;
    amount5?: string;
    amount6?: string;
  };

  const [formValues, setFormValues] = useState<FormValues>({
    purchased_precursors: "",
    country_code: "",
    route_1: "",
    route_2: "",
    route_3: "",
    route_4: "",
    route_5: "",
    route_6: "",
    amount: "",
    amount1: "",
    amount2: "",
    amount3: "",
    amount4: "",
    amount5: "",
    amount6: "",
  });

  type FormErrors = {
    [K in keyof FormValues]?: string;
  };

  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const requiredFields = [
      "purchased_precursors",
      "country_code",
      "route_1",
      "route_2",
      "route_3",
      "route_4",
      "route_5",
      "route_6",
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
            <Typography
              variant="h5"
              fontWeight="bold"
              gutterBottom
              color="#1976d2"
            >
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
                  value={formValues.purchased_precursors}
                  onChange={handleInputChange}
                  error={formErrors.purchased_precursors}
                />
                {/* <LabeledAutocompleteMap
            caption="Route"
            defination="เลือกเทคโนโลยีการผลิต"
            label=""
            name="route"
            options={routesOptions.map((opt) => ({
              ...opt,
              value: String(opt.value),
            }))}
            value={values.route}
            error={errors.route}
            onChange={(val) => onChange("route", String(val))}
          /> */}
                {/* Text Fields for Routes */}
                {/* {[1, 2, 3, 4, 5, 6].map((i) => (
            <LabeledAutocompleteMap
              key={`route${i}`}
              caption={`Route ${i}`}
              defination={`เลือก Route ${i}`}
              label=""
              name={`route${i}`}
              options={routesOptions.map((opt) => ({
                ...opt,
                value: String(opt.value),
              }))}
              value={values[`route${i}`]}
              error={errors[`route${i}`]}
              onChange={(val) => onChange(`route${i}`, String(val))}
            />
          ))} */}
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <LabeledAutocomplete
              caption="Country code "
                defination="เลือกรหัสประเทศที่นำเข้าวัตถุดิบ"
                label=""
              name="accre_mem_state"
              error={formErrors.country_code}
              options={countries.map((c) => c.label)}
              value={formValues.country_code}
              onChange={(val) =>
                setFormValues((prev) => ({
                  ...prev,
                  country_code: val,
                }))
              }
            />
              {[
                "amount",
                "amount_1",
                "amount_2",
                "amount_3",
                "amount_4",
                "amount_5",
                "amount_6",
              ].map((key) => (
                <React.Fragment key={key}>
                  <LabeledTextField
                    type="number"
                    caption={key.replace("amount", "Amount ")}
                    defination={`ระบุจำนวน ${key}`}
                    label=""
                    name={key}
                    value={formValues[key as keyof FormValues] || ""}
                    error={formErrors[key as keyof FormErrors]}
                    onChange={handleInputChange}
                    inputProps={{
                      step: "any",
                      className: "appearance-none",
                    }}
                  />
                </React.Fragment>
              ))}
            </div>
          </Section>

          <PGButton />
        </Grid>
      </form>
    </Container>
  );
};

export default PrecursorsForm;
