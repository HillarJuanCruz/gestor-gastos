import { useEffect, useState, useCallback, useRef } from "react";

type DataType<T> = T | null;
type ErrorType = Error | null;

interface Params<T> {
  data: DataType<T>;
  loading: boolean;
  error: ErrorType;
  refetch: () => Promise<void>;
}

export const useFetch = <T>(url: string): Params<T> => {
  const [data, setData] = useState<DataType<T>>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorType>(null);

  // Usamos una referencia para el AbortController para poder abortar desde cualquier lado
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchData = useCallback(async () => {
    // Si hay una petición en curso, la abortamos antes de empezar la nueva
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);

    try {
      const response = await fetch(url, { signal: controller.signal });

      if (!response.ok) {
        throw new Error('Error al obtener los datos');
      }

      const jsonData: T = await response.json();
      setData(jsonData);
      setError(null);
    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') {
        setError(err);
      }
    } finally {
      setLoading(false);
    }
  }, [url]);

  // El useEffect solo se encarga del primer montaje y de la limpieza
  useEffect(() => {
    fetchData();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchData]);

  // Devolvemos refetch para que el componente pueda dispararlo manualmente
  return { data, loading, error, refetch: fetchData };
};
