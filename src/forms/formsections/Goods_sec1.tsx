// forms/Section1.tsx
import React, { useState, useEffect } from "react";
import Section from "../../components/Section";
import SectionButton from "../../components/SectionButton";
import LabeledTextField from "../../components/LabeledTextField";
import {
  fetchGoodsData,
  getIndustryOptions,
  getGoodsOptions,
  getRoutesOptions,
  OptionType,
  IndustryGroup,
} from "../../components/dropdown/goods";

import LabeledAutocompleteMap from "../../components/LabeledAutoCompleteMap";

interface Props {
  values: any;
  errors: any;
  onChange: (field: string, value: string) => void;
  onNext: () => void;
}

const Section1: React.FC<Props> = ({ values, errors, onChange, onNext }) => {
  const [goodsData, setGoodsData] = useState<IndustryGroup[]>([]);
  const [industryOptions, setIndustryOptions] = useState<OptionType[]>([]);
  const [goodsOptions, setGoodsOptions] = useState<OptionType[]>([]);
  const [routesOptions, setRoutesOptions] = useState<OptionType[]>([]);

  useEffect(() => {
    fetchGoodsData().then((data) => {
      setGoodsData(data);
      setIndustryOptions(getIndustryOptions(data));
    });
  }, []);

  useEffect(() => {
    if (values.industry_type) {
      setGoodsOptions(getGoodsOptions(goodsData, values.industry_type));
    }
  }, [values.industry_type]);

  useEffect(() => {
    if (values.goods_category && values.industry_type) {
      setRoutesOptions(
        getRoutesOptions(goodsData, values.industry_type, values.goods_category)
      );
    }
  }, [values.goods_category, values.industry_type]);

  const handleSectionSubmit = () => {
    const requiredFields = [
      "industry_type",
      "route",
      "route1",
      "route2",
      "route3",
      "route4",
      "route5",
      "route6",
      "goods_category",
      "amount",
      "amount1",
      "amount2",
      "amount3",
      "amount4",
      "amount5",
      "amount6",
    ];
    const newErrors: any = {};

    requiredFields.forEach((field) => {
      if (!values[field]) newErrors[field] = "กรุณากรอกข้อมูล";
    });

    if (Object.keys(newErrors).length > 0) {
      // แจ้ง error
      return;
    }

    // ✅ ไปหน้า section 2
    onNext();
  };

  return (
    // <form onSubmit={handleSubmit}>
    <Section
      defaultExpanded={true}
      title="(a) List of aggregated goods categories and corresponding production routes"
      subtitle="ชื่อและที่อยู่ผู้ทวนสอบ"
      hasError={
        !!errors.industry_type ||
        !!errors.route ||
        !!errors.route1 ||
        !!errors.route2 ||
        !!errors.route3 ||
        !!errors.route4 ||
        !!errors.route5 ||
        !!errors.route6 ||
        !!errors.goods_category
      }
    >
      <div style={{ display: "flex", gap: "1.5rem", marginBottom: "1rem" }}>
        {/* LEFT */}
        <div style={{ flex: 1 }}>
          <LabeledAutocompleteMap
            caption="Industry type"
            defination="เลือกประเภทอุตสาหกรรม"
            label=""
            name="industry_type"
            options={industryOptions.map((opt) => ({
              ...opt,
              value: String(opt.value),
            }))}
            value={values.industry_type}
            error={errors.industry_type}
            onChange={(val) => {
              onChange("industry_type", String(val));
              onChange("goods_category", ""); // reset
              onChange("route", ""); // reset
            }}
          />

          <LabeledAutocompleteMap
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
          />
          {/* Text Fields for Routes */}
          {[1, 2, 3, 4, 5, 6].map((i) => (
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
          ))}
        </div>

        {/* RIGHT */}
        <div style={{ flex: 1 }}>
          <LabeledAutocompleteMap
            caption="Aggregated goods category"
            defination="เลือกหมวดหมู่สินค้า"
            label=""
            name="goods_category"
            options={goodsOptions.map((opt) => ({
              ...opt,
              value: String(opt.value),
            }))}
            value={values.goods_category}
            error={errors.goods_category}
            onChange={(val) => {
              onChange("goods_category", String(val));
              onChange("route", ""); // reset route เมื่อเปลี่ยน goods
            }}
          />

          {/* Text Fields for Amounts */}
          {[
            "amount",
            "amount1",
            "amount2",
            "amount3",
            "amount4",
            "amount5",
            "amount6",
          ].map((key) => (
            <React.Fragment key={key}>
              <LabeledTextField
                type="number"
                caption={key.replace("amount", "Amount ")}
                defination={`ระบุจำนวน ${key}`}
                label=""
                name={key}
                value={values[key]}
                error={errors[key]}
                onChange={(e) => onChange(key, e.target.value)}
                inputProps={{
                  step: "any",
                  className: "no-spinner",
                }}
              />
              <div
                style={{
                  marginBottom: "1.42rem", 
                }}
              />
            </React.Fragment>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "right" }}>
        <SectionButton
          onValidate={() => {
            const requiredFields = ["installation", "economic_activity"];
            const newErrors: any = {};

            requiredFields.forEach((field) => {
              if (!values[field]) newErrors[field] = "กรุณากรอกข้อมูล";
            });

            // ปัด error กลับไป parent
            if (Object.keys(newErrors).length > 0) {
              // สมมุติว่าอยาก set error ใน parent เลย
              return false;
            }

            return true;
          }}
          onSuccess={onNext}
        />
      </div>
    </Section>
    // </form>
  );
};

export default Section1;
