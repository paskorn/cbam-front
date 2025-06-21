import React, { useState } from 'react';
import {
  Container, Stepper, Step, StepLabel, Button, Box, Typography,
} from '@mui/material';

import InstallationForm from '../forms/installationForm';
import VerifierForm from '../forms/VerifierForm';
import GoodsForm from '../forms/GoodsForm';
import PrecursorsForm from '../forms/PrecursorsForm';
import AmountForm from '../forms/AmountForm';

const steps = ['Installation', 'Verifier', 'Goods', 'Precursors', 'Amount'];

const Formdev: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  // Keep previous data
  const [installationData, setInstallationData] = useState({
    name: '',
    name_specific: '',
    eco_activity: '',
    address: '',
    city: '',
    country_id: '',
    post_code: '',
    po_box: '',
    latitude: '',
    longitude: '',
    author_represent_id: '',
    email: '',
    tel: '',
    unlocode: '',
    reporting_period_start: new Date(),
    reporting_period_end: new Date(),
  });

  const [verifierData, setVerifierData] = useState({
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

  const [goodsData, setGoodsData] = useState({
    report_id: 0,
    name: "",
    route_1: "",
    route_1_amounts: 0,
    route_2: null as string | null,
    route_2_amounts: null as number | null,
    route_3: null as string | null,
    route_3_amounts: null as number | null,
    route_4: null as string | null,
    route_4_amounts: null as number | null,
    route_5: null as string | null,
    route_5_amounts: null as number | null,
    route_6: null as string | null,
    route_6_amounts: null as number | null,
    total_consumed_within_installation: 0,
    consumed_in_others_amounts: 0,
    condumed_non_cbam_goods_amounts: 0,
    has_heat: 0,
    has_waste_gases: 0,
    direct_emissions: 0,
    imported_heat_value: 0,
    exported_heat_value: 0,
    ef_imported_heat: 0,
    ef_exported_heat: 0,
    electricity_consumption_value: 0,
    ef_electricity: 0,
    source_of_ef_electricity: "",
    exported_electricity_value: null as number | null,
    ef_exported_electricity: null as number | null,
    total_production_amounts: 0,
    produced_for_market_amount: 0,
    imported_wgases_amount: 0,
    ef_imported_wgases: 0,
    exported_wgases_amount: 0,
    ef_exported_wgases: 0,
  });



  // คุณสามารถเพิ่ม state สำหรับฟอร์มอื่น ๆ แบบเดียวกันได้
  // const [goodsData, setGoodsData] = useState({});
  const [precursorsData, setPrecursorsData] = useState({});
  const [amountData, setAmountData] = useState({});

  const handleNext = () => setActiveStep((prevStep) => prevStep + 1);
  const handleBack = () => setActiveStep((prevStep) => prevStep - 1);

  const handleSubmit = () => {
    const allData = {
      installationData,
      verifierData,
      goodsData,
      precursorsData,
      amountData,
    };
    console.log('📦 Submitting all form data:', allData);
    alert('✅ Form submitted!');
  };


  // const handleSubmit = () => {
  //   // Do submit logic here!
  //   alert("Form submitted!");
  // };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <InstallationForm data={installationData} onChange={setInstallationData} />
      case 1:
        return <VerifierForm data={verifierData} onChange={setVerifierData} />;
      case 2:
        return <GoodsForm data={goodsData} onChange={setGoodsData} />;
      case 3:
        return <PrecursorsForm />;
      case 4:
        return <AmountForm />;
      default:
        return <Typography>Unknown step</Typography>;
    }
  };

  return (
    <Container maxWidth="md" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
      {/* 🟡 Status bar */}
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* 🟢 Form content */}
      <Box mt={6}>{renderStepContent(activeStep)}</Box>

      {/* 🔘 Navigation buttons */}
      <Box mt={6} display="flex" justifyContent="space-between">
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          variant="outlined"
        >
          Back
        </Button>
        {activeStep === steps.length - 1 ? (
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Submit
          </Button>
        ) : (
          <Button onClick={handleNext} variant="contained" color="primary">
            Next
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default Formdev;
