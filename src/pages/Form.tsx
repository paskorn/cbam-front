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

const Form: React.FC = () => {
    const [activeStep, setActiveStep] = useState(0);

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

    // คุณสามารถเพิ่ม state สำหรับฟอร์มอื่น ๆ แบบเดียวกันได้
    const [goodsData, setGoodsData] = useState({});
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

    const renderStepContent = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <InstallationForm
                        data={installationData}
                        onChange={setInstallationData}
                    />
                );
            case 1:
                return <VerifierForm data={verifierData} onChange={setVerifierData} />;
            // case 2:
            //     return <GoodsForm data={goodsData} onChange={setGoodsData} />;
            // case 3:
            //   return <PrecursorsForm data={precursorsData} onChange={setPrecursorsData} />;
            // case 4:
            //   return <AmountForm data={amountData} onChange={setAmountData} />;
            default:
                return <Typography>Unknown step</Typography>;
        }
    };

    return (
        <Container maxWidth="md" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            <Box mt={6}>{renderStepContent(activeStep)}</Box>

            <Box mt={6} display="flex" justifyContent="space-between">
                <Button disabled={activeStep === 0} onClick={handleBack} variant="outlined">Back</Button>
                {activeStep === steps.length - 1 ? (
                    <Button onClick={handleSubmit} variant="contained" color="primary">Submit</Button>
                ) : (
                    <Button onClick={handleNext} variant="contained" color="primary">Next</Button>
                )}
            </Box>
        </Container>
    );
};

export default Form;
