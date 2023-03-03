import { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";

export const useAxios = (axiosParams) => {
  const initialConfig = axiosParams;
  const [data, setData] = useState(undefined);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [lastParams, setLastParams] = useState(undefined);

  const fetchData = async (params) => {
    try {
      setLoading(true);
      const result = await axios.request(params);
      setData(result.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if(!axiosParams.manual){
      fetchData(axiosParams);
    }
  }, []); // execute once only

  const execute = async (params) => {
    fetchData({ ...initialConfig, ...params });
  };

  return { data, error, loading, execute };
};
