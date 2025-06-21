import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Tabs,
  Tab,
  Paper,
  Grid,
} from "@mui/material";
import Section from "../components/Section";
import LabeledTextField from "../components/LabeledTextField";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`report-tabpanel-${index}`}
      aria-labelledby={`report-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const a11yProps = (index: number) => {
  return {
    id: `report-tab-${index}`,
    "aria-controls": `report-tabpanel-${index}`,
  };
};

const Report = () => {
  const [tabValue, setTabValue] = useState(0);
  const [formValues, setFormValues] = useState({
    installationName: "",
    product: "",
    carbonFootprint: "",
    date: "",
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const renderCommonFields = (title: string) => (
    <>
      <Typography variant="h6" gutterBottom color="primary">
        {title}
      </Typography>

      {/* <Grid container spacing={2}> */}
      <Grid>
        <LabeledTextField
          type="text"
          caption="Name of Installation"
          defination="ชื่อสถานประกอบการ"
          label=""
          name="installationName"
          value={formValues.installationName}
          onChange={handleInputChange}
          required
        />
      </Grid>
      <Grid>
        <LabeledTextField
          type="text"
          caption="Product"
          defination="ผลิตภัณฑ์"
          label=""
          name="product"
          value={formValues.product}
          onChange={handleInputChange}
          required
        />
      </Grid>
      <div style={{ display: "flex", gap: "1.5rem", marginBottom: "1rem" }}>
        <div style={{ flex: 1 }}>
          <Grid>
            <LabeledTextField
              type="text"
              caption="Carbon Footprint"
              defination="คาร์บอนฟุตพริ้นท์"
              label=""
              name="carbonFootprint"
              value={formValues.carbonFootprint}
              onChange={handleInputChange}
              required
            />
          </Grid>
        </div>
        <div style={{ flex: 1 }}>
          <Grid>
            <LabeledTextField
              type="date"
              caption="Date"
              defination="วันที่"
              label=""
              name="date"
              value={formValues.date}
              onChange={handleInputChange}
              required
            />
          </Grid>
        </div>
      </div>
    </>
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        fontWeight="bold"
        color="#1976d2"
      >
        CBAM Reports
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="text.secondary"
        paragraph
      >
        รายงานข้อมูล CBAM
      </Typography>

      <Paper sx={{ width: "100%", mt: 3 }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="report tabs"
            variant="fullWidth"
          >
            <Tab label="A. Installation Data" {...a11yProps(0)} />
            <Tab label="B. Emission Installation" {...a11yProps(1)} />
            <Tab label="C. Emission of Energy" {...a11yProps(2)} />
            <Tab label="D. Process" {...a11yProps(3)} />
            <Tab label="E. Purchased Precursors" {...a11yProps(4)} />
          </Tabs>
        </Box>

        {/* Tab A: Installation Data */}
        <TabPanel value={tabValue} index={0}>
          <Section
            title="A. Installation Data"
            subtitle="ข้อมูลสถานประกอบการ"
            defaultExpanded={true}
          >
            {renderCommonFields("Installation Information")}
          </Section>
        </TabPanel>

        {/* Tab B: Emission Installation */}
        <TabPanel value={tabValue} index={1}>
          <Section
            title="B. Emission Installation"
            subtitle="การปล่อยมลพิษของสถานประกอบการ"
            defaultExpanded={true}
          >
            {renderCommonFields("Emission Installation Details")}
          </Section>
        </TabPanel>

        {/* Tab C: Emission of Energy */}
        <TabPanel value={tabValue} index={2}>
          <Section
            title="C. Emission of Energy"
            subtitle="การปล่อยมลพิษด้านพลังงาน"
            defaultExpanded={true}
          >
            {renderCommonFields("Energy Emission Details")}
          </Section>
        </TabPanel>

        {/* Tab D: Process */}
        <TabPanel value={tabValue} index={3}>
          <Section
            title="D. Process"
            subtitle="กระบวนการ"
            defaultExpanded={true}
          >
            {renderCommonFields("Process Details")}
          </Section>
        </TabPanel>

        {/* Tab E: Purchased Precursors */}
        <TabPanel value={tabValue} index={4}>
          <Section
            title="E. Purchased Precursors"
            subtitle="การซื้อสารตั้งต้น"
            defaultExpanded={true}
          >
            {renderCommonFields("Purchased Precursors Details")}
          </Section>
        </TabPanel>
      </Paper>
    </Container>
  );
};

export default Report;
