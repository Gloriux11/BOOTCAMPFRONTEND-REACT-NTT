import { useState, useEffect } from "react";

const useDistricts = () => {
  const [districts, setDistricts] = useState<string[]>([]);

  useEffect(() => {
    const fetchDistricts = async () => {
      const response = await fetch("/src/data/districts.json");
      const data = await response.json();
      setDistricts(data);
    };

    fetchDistricts();
  }, []);

  return districts;
};

export default useDistricts;