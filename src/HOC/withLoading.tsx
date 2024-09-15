// src/HOC/withLoading.tsx
import React, { useState, useEffect } from "react";
import Spinner from "@/components/ui/Spiner";

const withLoading = (
  WrappedComponent: React.ComponentType<any>,
  fetchData: () => Promise<any>,
) => {
  return (props: any) => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      const getData = async () => {
        try {
          const result = await fetchData();
          setData(result);
        } catch (err) {
          setError("Failed to fetch data");
        } finally {
          setLoading(false);
        }
      };
      getData();
    }, []);

    if (loading) {
      return <Spinner />;
    }
    return (
      <WrappedComponent
        data={data}
        loading={loading}
        error={error}
        {...props}
      />
    );
  };
};

export default withLoading;
