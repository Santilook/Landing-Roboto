import { useState, useEffect } from "react";

export default function AnimatedCounter() {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);

  const targetCount = 99.9;
  const targetCount2 = 0.3;

  useEffect(() => {
    if (count < targetCount) {
      const timer = setTimeout(() => {
        setCount((prev) => Math.min(prev + 3, targetCount));
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [count]);

  useEffect(() => {
    if (count2 < targetCount2) {
      const timer = setTimeout(() => {
        setCount2((prev) => Math.min(prev + 0.01, targetCount2));
      }, 30);
      return () => clearTimeout(timer);
    }
  }, [count2]);

  return (
    <div className="col-span-2 col-start-1 row-start-5 mx-20 my-10">
      <div className="flex gap-20">
        <div style={{ pointerEvents: "visible" }}>
          <span
            className="text-4xl font-bold"
            style={{ pointerEvents: "none" }}
          >
            +{count.toLocaleString()} %
          </span>
          <p>Tasa de Éxito</p>
        </div>
        <div>
          <span
            className="text-4xl font-bold"
            style={{ pointerEvents: "none" }}
          >
            +{count2.toFixed(2)} s
          </span>
          <p>Tiempo de Respuesta</p>
        </div>
      </div>
    </div>
  );
}
