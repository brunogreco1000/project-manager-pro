import { useState, useEffect } from "react";
import { api } from "../services/api";
import { AxiosError } from "axios";

export const useFetch = <T>(url: string, deps: any[] = []) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await api.get<T>(url);
        setData(res.data);
      } catch (err) {
        const axiosError = err as AxiosError<{ message: string }>;
        setError(
          axiosError.response?.data.message || axiosError.message || "Error desconocido"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, loading, error };
};
