import { useEffect, useState } from "react";

const useUtcTime = () => {
  const [utc, setUtc] = useState("");

  useEffect(() => {
    const tick = () => {
      setUtc(new Date().toUTCString().slice(17, 25));
    };

    tick();

    const interval = setInterval(tick, 1000);

    return () => clearInterval(interval);
  }, []);

  return utc;
};

export default useUtcTime;