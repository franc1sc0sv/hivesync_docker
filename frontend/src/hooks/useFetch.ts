import { useState } from "react";

const useFetch = ({
  api_function,
  transformData,
}: {
  api_function: () => any;
  transformData?: (data: any) => any;
}) => {
  const [isLoading, setIsloading] = useState(false);
  const [data, setData] = useState([]);

  const fecthData = async () => {
    try {
      setIsloading(true);
      let res = await api_function();

      if (transformData) {
        res = transformData(res);
      }

      setData(res);
      setIsloading(false);

      return res;
    } catch (e) {
      setIsloading(false);
    }
  };
  return { isLoading, fecthData, data };
};

export { useFetch };
