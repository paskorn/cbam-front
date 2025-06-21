export interface CountryOption {
  label: string;         // eg. Thailand
  value: number;         // eg. 222 ← country_id ที่ API ต้องการ
  abbreviation: string;  // eg. TH ← เอาไปใส่ใน unlocode
}

export const fetchCountries = async (): Promise<CountryOption[]> => {
  try {
    const res = await fetch("http://178.128.123.212:5000/api/cbam/countries");
    const data = await res.json();

    const mappedCountries = data.map((item: any) => ({
      label: item.name,         // ชื่อประเทศ
      value: item.id,           // ใช้ id เป็น country_id
      abbreviation: item.abbreviation // เอาไว้ map ไป unlocode
    }));

    

    return mappedCountries;
  } catch (error) {
    console.error("❌ Failed to fetch countries:", error);
    return [];
  }
};