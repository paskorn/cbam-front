import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import Section from "../components/Section";
import PGButton from "../components/FormButton";
import LabeledTextField from "../components/LabeledTextField";
import LabeledAutocompleteMap from "../components/LabeledAutoCompleteMap";
import {
  fetchCountries,
  CountryOption,
} from "../components/dropdown/contriesmap";

interface InstallationFormProps {
  data: {
    name: string;
    name_specific: string;
    eco_activity: string;
    address: string;
    city: string;
    country_id: string;
    post_code: string;
    po_box: string;
    latitude: string;
    longitude: string;
    author_represent_id: string;
    email: string;
    tel: string;
    unlocode: string;
    reporting_period_start: Date;
    reporting_period_end: Date;
  };
  onChange: (data: InstallationFormProps["data"]) => void;
}

const InstallationForm: React.FC<InstallationFormProps> = ({ data, onChange }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const reportIdRaw = location.state?.reportId || null;
  const reportId = reportIdRaw ? Number(reportIdRaw) : null;


  const [countries, setCountries] = useState<CountryOption[]>([]);
  const [formValues, setFormValues] = useState({
    name: data.name || "",
    name_specific: data.name_specific || "",
    eco_activity: data.eco_activity || "",
    address: data.address || "",
    city: data.city || "",
    country_id: data.country_id || "",
    post_code: data.post_code || "",
    po_box: data.po_box || "",
    latitude: data.latitude || "",
    longitude: data.longitude || "",
    author_represent_id: data.author_represent_id || "",
    email: data.email || "",
    tel: data.tel || "",
    unlocode: data.unlocode || "",
    reporting_period_start: data.reporting_period_start
      ? new Date(data.reporting_period_start)
      : new Date(),
    reporting_period_end: data.reporting_period_end
      ? new Date(data.reporting_period_end)
      : new Date(),
  });


  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const formatDate = (date: any): string => {
    if (!date) return "";
    if (date instanceof Date) return date.toISOString().split("T")[0];
    if (typeof date === "string") return date;
    return "";
  };



  useEffect(() => {
    if (!reportId) {
      console.error("❌ reportId ไม่ถูกส่งมา");
    }
  }, [reportId]);

  useEffect(() => {
    const loadCountries = async () => {
      const fetched = await fetchCountries();
      setCountries(fetched);

      const defaultThailand = fetched.find((c) => c.label === "Thailand");
      if (defaultThailand && !data.country_id) {
        onChange({
          ...data,
          country_id: String(defaultThailand.value),
          unlocode: String(defaultThailand.abbreviation),
        });
      }
    };
    loadCountries();
  }, []);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    onChange({ ...formValues, [name]: value });
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!reportId) {
      alert("❌ ไม่พบรหัสรายงาน (reportId) กรุณากลับไปสร้างรายงานก่อน");
      return;
    }

    const requiredFields = [
      "name", "eco_activity", "address", "post_code", "city", "country_id",
      "unlocode", "latitude", "longitude", "author_represent_id",
      "email", "tel", "po_box", "reporting_period_start", "reporting_period_end"
    ];



    const payload = {
      name: formValues.name || null,
      name_specific: formValues.name_specific || null,
      eco_activity: formValues.eco_activity || null,
      address: formValues.address || null,
      city: formValues.city || null,
      country_id: Number(formValues.country_id),
      post_code: formValues.post_code || null,
      po_box: formValues.po_box || "",
      latitude: formValues.latitude || null,
      longitude: formValues.longitude || null,
      author_represent_id: Number(formValues.author_represent_id),
      email: formValues.email || null,
      phone: formValues.tel || null,

    };

    console.log("data:", payload);

    try {
      // POST installation
      const response = await fetch("http://localhost:5000/api/cbam/installation/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("❌ Installation submission failed");
      const result = await response.json();
      const installationId = result.id;
      console.log("✅ Installation submitted. ID:", installationId);

      // PUT update report with installation_id
      const putResponse = await fetch(`http://localhost:5000/api/cbam/report/${reportId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          installation_id: installationId,
          reporting_period_start: formValues.reporting_period_start.toISOString().split("T")[0],
          reporting_period_end: formValues.reporting_period_end.toISOString().split("T")[0],
        }),
      });

      if (!putResponse.ok) throw new Error("❌ Failed to update report with installation_id");
      console.log("✅ Report updated with installation_id ");

      // GET installation detail (optional)
      const getResponse = await fetch(`http://localhost:5000/api/cbam/installation/${installationId}`);
      if (!getResponse.ok) throw new Error("❌ Failed to fetch installation");
      const installationData = await getResponse.json();
      console.log("📥 Installation Details:", installationData);


      // navigate ไปหน้าต่อไป (ถ้าต้องการ)
      // navigate("/verifier", { state: { installationId } });
    } catch (error) {
      console.error("❌ Error submitting form:", error);
      alert("เกิดข้อผิดพลาดขณะส่งข้อมูล กรุณาลองใหม่อีกครั้ง");
    }
  };

  return (
    <Container maxWidth="md" style={{ paddingTop: "2rem", paddingBottom: "2rem" }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3} alignItems="stretch">
          <Box>
            <Typography variant="h5" fontWeight="bold" gutterBottom color="#1976d2">
              About the installation
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              รายละเอียดสถานประกอบการ
            </Typography>
          </Box>
          <Section title="Reporting Period" subtitle="" hasError={false}>

            <div style={{ display: "flex", gap: "1.5rem", marginBottom: "1rem" }}>
              <div style={{ flex: 1 }}>
                <LabeledTextField
                  caption="Start Time"
                  defination="เริ่มต้น"
                  label=""
                  name="reporting_period_start"
                  type="date"
                  value={formatDate(data.reporting_period_start)}
                  onChange={handleInputChange}
                  error={formErrors.reporting_period_start}
                />
              </div>
              <div style={{ flex: 1 }}>
                <LabeledTextField
                  caption="End Time"
                  defination="สิ้นสุด"
                  label=""
                  name="reporting_period_end"
                  type="date"
                  value={formatDate(data.reporting_period_end)}
                  onChange={handleInputChange}
                  error={formErrors.reporting_period_end}
                />

              </div>
            </div>
          </Section>

          <Section
            defaultExpanded
            title="Installation form"
            subtitle=""
            hasError={Object.values(formErrors).some((e) => !!e)}
          >
            <LabeledTextField
              caption="Name of the installation (ENG)"
              defination="ชื่อสถานประกอบการเป็นภาษาอังกฤษ (Installation Name - English)"
              label=""
              name="name"
              value={formValues.name}
              onChange={handleInputChange}
              error={formErrors.name}
            />
            <LabeledTextField
              caption="Name of the installation (TH)"
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

            <div style={{ display: "flex", gap: "1.5rem", marginBottom: "1rem" }}>
              <div style={{ flex: 1 }}>
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
                    const selected = countries.find((c) => String(c.value) === val);
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
                  type="text"
                  name="post_code"
                  value={formValues.post_code}
                  onChange={handleInputChange}
                  error={formErrors.post_code}
                />
                <LabeledTextField
                  caption="Coordinates of the main emission source (latitude)"
                  defination="พิกัดละติจูดของแหล่งปล่อยก๊าซหลัก (Latitude) เช่น 13.7563"
                  label=""
                  type="text"
                  name="latitude"
                  value={formValues.latitude}
                  onChange={handleInputChange}
                  error={formErrors.latitude}
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
                  onChange={() => { }}
                  error={formErrors.unlocode}
                />
                <LabeledTextField
                  caption="P.O. Box"
                  defination="หมายเลขตู้ไปรษณีย์ (ถ้ามี) (P.O. Box)"
                  label=""
                  type="text"
                  name="po_box"
                  value={formValues.po_box}
                  onChange={handleInputChange}
                  error={formErrors.po_box}
                />
                <LabeledTextField
                  caption="Coordinates of the main emission source (longitude)"
                  defination="พิกัดลองจิจูดของแหล่งปล่อยก๊าซหลัก (Longitude) เช่น 100.5018"
                  label=""
                  type="text"
                  name="longitude"
                  value={formValues.longitude}
                  onChange={handleInputChange}
                  error={formErrors.longitude}
                />
              </div>
            </div>

            <LabeledTextField
              caption="Name of authorized representative"
              defination="ชื่อหน่วยงานมาฐานแห่งชาติที่ให้การรับรอง"
              label=""
              name="author_represent_id"
              value={formValues.author_represent_id}
              onChange={handleInputChange}
              error={formErrors.author_represent_id}
            />

            <div style={{ display: "flex", gap: "1.5rem", marginBottom: "1rem" }}>
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


          </Section>
          <PGButton />
        </Grid>
      </form>
    </Container>
  );
};

export default InstallationForm;
