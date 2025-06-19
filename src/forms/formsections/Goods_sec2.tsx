// forms/Section2.tsx
import React from "react";
import Section from "../../components/Section";
import LabeledTextField from "../../components/LabeledTextField";
import SectionButton from "../../components/SectionButton";

interface Props {
  values: any;
  errors: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNext: () => void;
}

const Section2: React.FC<Props> = ({ values, errors, onChange, onNext }) => {
  return (
    <Section
      title="(b) Amount of aggregated goods"
      subtitle="ปริมาณการผลิต"
      hasError={
        !!errors.auth_rep || !!errors.email || !!errors.tel || !!errors.fax
      }
    >
      <div style={{ display: "flex", gap: "1.5rem", marginBottom: "1rem" }}>
        <div style={{ flex: 1 }}>
          <LabeledTextField
            type="text"
            caption="Total production levels"
            defination="กรอกปริมาณการผลิตทั้งหมด"
            label=""
            name="total_consumed_within_installation"
            value={values.total_consumed_within_installation}
            onChange={onChange}
            error={errors.total_consumed_within_installation}
            readOnly
          />
          <LabeledTextField
            type="number"
            caption="Consumed in other 'production processes within the installation"
            defination="กรอกปริมาณการผลิตเพื่อใช้ในโรงงาน"
            label=""
            name="consumed_in_others_amounts"
            value={values.consumed_in_others_amounts}
            onChange={onChange}
            error={errors.consumed_in_others_amounts}
            inputProps={{
              step: "any",
              className: "appearance-none",
            }}
          />
        </div>

        <div style={{ flex: 1 }}>
          <LabeledTextField
            type="number"
            caption="Produced for the market"
            defination="กรอกปริมาณการผลิตเพื่อจำหน่าย"
            label=""
            name="email"
            value={values.email}
            onChange={onChange}
            error={errors.email}
            inputProps={{
              step: "any",
              className: "appearance-none",
            }}
          />
          <LabeledTextField
            type="number"
            caption="Consumed for non-CBAM goods within the installation"
            defination="กรอกปริมาณการผลิตลิตเพื่อใช้ในโรงงานสำหรับสินค้าที่ไม่อยู่ภายใต้ขอบเขตของ CBAM"
            label=""
            name="consumed_non_cbam_goods"
            value={values.consumed_non_cbam_goods}
            onChange={onChange}
            error={errors.consumed_non_cbam_goods}
            inputProps={{
              step: "any",
              className: "appearance-none",
            }}
          />
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "right" }}>
        <SectionButton onValidate={() => true} onSuccess={onNext} />
      </div>
    </Section>
  );
};

export default Section2;
