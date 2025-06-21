// PrecursorFields.tsx
import React, { useState, useEffect } from "react";
import LabeledTextField from "../../components/LabeledTextField";
import LabeledAutocomplete from "../../components/LabeledAutoComplete";
import { CountryOption } from "../../components/dropdown/contriesmap";
import { 
  fetchGoodsData, 
  getRoutesOptions, 
  OptionType 
} from "../../components/dropdown/goods";
import Box from "@mui/material/Box";

interface PrecursorFieldsProps {
  index: number;
  formValues: any;
  formErrors: any;
  countries: CountryOption[];
  onChange: (name: string, value: string | string[]) => void;
  precursorValue?: string;
  routeValue?: string;
  industryTypeId?: number; // Add industryTypeId
  goodsId?: number; // Add goodsId
}

const Precursors_sec1: React.FC<PrecursorFieldsProps> = ({
  index,
  formValues,
  formErrors,
  countries,
  onChange,
  precursorValue = "",
  routeValue = "",
  industryTypeId,
  goodsId
}) => {
  const [routeOptions, setRouteOptions] = useState<OptionType[]>([]);
  const [isLoadingRoutes, setIsLoadingRoutes] = useState<boolean>(false);

  useEffect(() => {
    // Auto-fill precursor value if provided
    if (precursorValue) {
      onChange(`purchased_precursors_${index}`, precursorValue);
    }
    
    // Auto-fill route value if provided
    if (routeValue) {
      onChange(`route_${index}`, routeValue);
    }

    // Set default country to Thailand if not already set
    if (!formValues[`country_code_${index}`]) {
      const thailandOption = countries.find(country =>
        country.label === "Thailand" || country.abbreviation === "TH"
      );
      if (thailandOption) {
        onChange(`country_code_${index}`, thailandOption.abbreviation);
      }
    }
  }, [precursorValue, routeValue, countries.length]);

  useEffect(() => {
    const loadRouteOptions = async () => {
      // Only fetch routes if we have both industry type ID and goods ID
      if (industryTypeId && goodsId) {
        setIsLoadingRoutes(true);
        try {
          const data = await fetchGoodsData();
          const routesOptions = getRoutesOptions(data, industryTypeId, goodsId);
          setRouteOptions(routesOptions);
        } catch (error) {
          console.error("Error loading route options:", error);
          setRouteOptions([]);
        } finally {
          setIsLoadingRoutes(false);
        }
      }
    };
    loadRouteOptions();
  }, [industryTypeId, goodsId]);

  return (
    <div className="precursor-field-group" style={{ marginBottom: "20px", padding: "15px", border: "1px solid #e0e0e0", borderRadius: "4px" }}>
      <h4 style={{ marginTop: 0, marginBottom: "10px" }}>Precursor {index}</h4>
      
      <LabeledTextField
        caption="Purchased precursor"
        defination="รายการวัตถุดิบ"
        label=""
        name={`purchased_precursors_${index}`}
        value={formValues[`purchased_precursors_${index}`] || ""}
        onChange={(e) => {
          onChange(e.target.name, e.target.value);
        }}
        error={formErrors[`purchased_precursors_${index}`]}
      />
      
      <LabeledAutocomplete
        caption="Country code"
        defination="เลือกรหัสประเทศที่นำเข้าวัตถุดิบ"
        label=""
        name={`country_code_${index}`}
        error={formErrors[`country_code_${index}`]}
        options={countries.map((c) => c.label)}
        value={formValues[`country_code_${index}`] || ""}
        onChange={(val) => onChange(`country_code_${index}`, val)}
      />
    <Box display="flex" gap={3} mb={3}>
      <Box flex={1}>
      <LabeledAutocomplete
        caption="Production Route"
        defination="เลือกเทคโนโลยีการผลิตที่ใช้วัตถุดิบนี้"
        label=""
        name={`route_${index}`}
        error={formErrors[`route_${index}`]}
        options={routeOptions.map(option => option.label)}
        value={formValues[`route_${index}`] || ""}
        onChange={(val) => onChange(`route_${index}`, val)}
        disabled={isLoadingRoutes || routeOptions.length === 0}
        helperText={isLoadingRoutes ? "Loading routes..." : routeOptions.length === 0 ? "No routes available" : ""}
      />
      </Box>
      <Box flex={1}>
        <LabeledTextField
          caption="Amount"
          defination="จำนวน"
          label=""
          type="number"
          name={`amount_${index}`} // New field for amount
          value={formValues[`amount_${index}`] || ""}
          onChange={(e) => {
            onChange(e.target.name, e.target.value);
          }}
          error={formErrors[`amount_${index}`]}
        />
      </Box>
    </Box>
    </div>
  );
};

export default Precursors_sec1;