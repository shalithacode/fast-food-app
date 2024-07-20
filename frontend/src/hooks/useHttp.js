import { useCallback, useEffect, useState } from "react";

async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }
  return data;
}

export default function useHttp(url, config, initialData) {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const sendRequest = useCallback(
    async function sendRequest(body) {
      setIsLoading(true);
      try {
        const resData = await sendHttpRequest(url, { ...config, body });
        setData(resData);
      } catch (e) {
        setError(e.message);
      }
      setIsLoading(false);
    },
    [url, config]
  );

  useEffect(() => {
    if (config && config.method === "GET") {
      sendRequest(null);
    }
  }, [sendRequest, config]);
  function clearFetchedData() {
    setData(initialData);
  }
  return {
    data,
    isLoading,
    error,
    sendRequest,
    clearFetchedData,
  };
}
