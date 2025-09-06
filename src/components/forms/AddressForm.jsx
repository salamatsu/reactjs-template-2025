import { Form, Select, Spin } from "antd";
import { Suspense, useCallback, useEffect, useMemo, useState } from "react";

// Lazy load JSON data with error handling
const loadRegions = () => import("../../assets/json/regions.json");
const loadProvinces = () => import("../../assets/json/provinces.json");
const loadCities = () => import("../../assets/json/cities.json");

// Custom hook for data loading
const useAddressData = () => {
  const [regionsData, setRegionsData] = useState([]);
  const [provincesData, setProvincesData] = useState([]);
  const [citiesData, setCitiesData] = useState([]);
  const [isLoadingRegions, setIsLoadingRegions] = useState(true);
  const [isLoadingProvinces, setIsLoadingProvinces] = useState(false);
  const [isLoadingCities, setIsLoadingCities] = useState(false);

  // Load regions on mount
  useEffect(() => {
    let isMounted = true;

    const loadRegionsData = async () => {
      try {
        const { default: regions } = await loadRegions();
        if (isMounted) {
          setRegionsData(regions || []);
        }
      } catch (error) {
        console.error("Error loading regions:", error);
        if (isMounted) {
          setRegionsData([]);
        }
      } finally {
        if (isMounted) {
          setIsLoadingRegions(false);
        }
      }
    };

    loadRegionsData();

    return () => {
      isMounted = false;
    };
  }, []);

  // Load provinces function
  const loadProvincesData = useCallback(async (regionCode) => {
    if (!regionCode) {
      setProvincesData([]);
      return Promise.resolve();
    }

    setIsLoadingProvinces(true);
    try {
      const { default: provinces } = await loadProvinces();
      const filteredProvinces = provinces.filter(
        (province) => province.regCode === regionCode
      );
      setProvincesData(filteredProvinces || []);
      return Promise.resolve();
    } catch (error) {
      console.error("Error loading provinces:", error);
      setProvincesData([]);
      return Promise.reject(error);
    } finally {
      setIsLoadingProvinces(false);
    }
  }, []);

  // Load cities function
  const loadCitiesData = useCallback(async (provinceCode) => {
    if (!provinceCode) {
      setCitiesData([]);
      return Promise.resolve();
    }

    setIsLoadingCities(true);
    try {
      const { default: cities } = await loadCities();
      const filteredCities = cities.filter(
        (city) => city.provCode === provinceCode
      );
      setCitiesData(filteredCities || []);
      return Promise.resolve();
    } catch (error) {
      console.error("Error loading cities:", error);
      setCitiesData([]);
      return Promise.reject(error);
    } finally {
      setIsLoadingCities(false);
    }
  }, []);

  return {
    regionsData,
    provincesData,
    citiesData,
    isLoadingRegions,
    isLoadingProvinces,
    isLoadingCities,
    loadProvincesData,
    loadCitiesData,
  };
};

const AddressForm = ({ form }) => {
  const {
    regionsData,
    provincesData,
    citiesData,
    isLoadingRegions,
    isLoadingProvinces,
    isLoadingCities,
    loadProvincesData,
    loadCitiesData,
  } = useAddressData();

  // Watch form values
  const selectedRegion = Form.useWatch("region", form);
  const selectedProvince = Form.useWatch("province", form);

  // Load provinces when region changes
  useEffect(() => {
    if (selectedRegion) {
      loadProvincesData(selectedRegion);
      // Clear dependent fields when region changes
      form.setFieldsValue({
        province: undefined,
        city: undefined,
      });
    } else {
      loadProvincesData(null);
    }
  }, [selectedRegion, loadProvincesData, form]);

  // Load cities when province changes
  useEffect(() => {
    if (selectedProvince) {
      loadCitiesData(selectedProvince);
      // Clear city when province changes
      form.setFieldsValue({
        city: undefined,
      });
    } else {
      loadCitiesData(null);
    }
  }, [selectedProvince, loadCitiesData, form]);

  // Memoized region options
  const regionOptions = useMemo(() => {
    if (!regionsData.length) return [];

    return regionsData.map((region) => ({
      label: region.regDesc,
      value: region.regCode,
      key: region.regCode,
    }));
  }, [regionsData]);

  // Memoized province options
  const provinceOptions = useMemo(() => {
    if (!provincesData.length) return [];

    return provincesData.map((province) => ({
      label: province.provDesc,
      value: province.provCode,
      key: province.provCode,
    }));
  }, [provincesData]);

  // Memoized city options
  const cityOptions = useMemo(() => {
    if (!citiesData.length) return [];

    return citiesData.map((city) => ({
      label: city.citymunDesc,
      value: city.citymunCode,
      key: city.citymunCode,
    }));
  }, [citiesData]);

  // Handle region change
  const handleRegionChange = useCallback(
    (value) => {
      form.setFieldsValue({
        region: value,
        province: undefined,
        city: undefined,
      });
    },
    [form]
  );

  // Handle province change
  const handleProvinceChange = useCallback(
    (value) => {
      form.setFieldsValue({
        province: value,
        city: undefined,
      });
    },
    [form]
  );

  // Handle city change
  const handleCityChange = useCallback(
    (value) => {
      form.setFieldsValue({
        city: value,
      });
    },
    [form]
  );

  // Filter option function for search functionality
  const filterOption = useCallback(
    (input, option) =>
      option?.label?.toLowerCase().includes(input.toLowerCase()),
    []
  );

  return (
    <Suspense fallback={<Spin size="large" />}>
      {/* Region Selection */}
      <Form.Item
        name="region"
        label="Region"
        rules={[{ required: true, message: "Please select your region!" }]}
      >
        <Select
          placeholder="Select Region"
          onChange={handleRegionChange}
          showSearch
          filterOption={filterOption}
          allowClear
          loading={isLoadingRegions}
          disabled={isLoadingRegions}
          options={regionOptions}
          notFoundContent={
            isLoadingRegions ? "Loading regions..." : "No regions found"
          }
        />
      </Form.Item>

      {/* Province Selection */}
      <Form.Item
        name="province"
        label="Province"
        rules={[{ required: true, message: "Please select your province!" }]}
      >
        <Select
          placeholder="Select Province"
          onChange={handleProvinceChange}
          showSearch
          filterOption={filterOption}
          allowClear
          loading={isLoadingProvinces}
          disabled={!selectedRegion || isLoadingProvinces}
          options={provinceOptions}
          notFoundContent={
            !selectedRegion
              ? "Please select a region first"
              : isLoadingProvinces
              ? "Loading provinces..."
              : "No provinces found"
          }
        />
      </Form.Item>

      {/* City Selection */}
      <Form.Item
        name="city"
        label="City/Municipality"
        rules={[{ required: true, message: "Please select your city!" }]}
      >
        <Select
          placeholder="Select City/Municipality"
          onChange={handleCityChange}
          showSearch
          filterOption={filterOption}
          allowClear
          disabled={!selectedProvince || isLoadingCities}
          loading={isLoadingCities}
          options={cityOptions}
          notFoundContent={
            !selectedProvince
              ? "Please select a province first"
              : isLoadingCities
              ? "Loading cities..."
              : "No cities found"
          }
        />
      </Form.Item>
    </Suspense>
  );
};

export default AddressForm;
