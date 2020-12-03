import { useEffect, useState } from "react";
import axios from "../shared/axios";

const useFetch = (url, method, options = null) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  console.log(options);
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const res = await axios[method](url, options);
        console.log(res);
      } catch (e) {
        console.log(e);
        setError(e);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
    // eslint-disable-next-line
  }, []);
  return { isLoading, data, error };
};

export default useFetch;
