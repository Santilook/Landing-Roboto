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
    <div className="w-full lg:w-auto h-auto px-6 py-6 lg:px-10 bg-white/40 backdrop-blur-md rounded-2xl border border-white/60 shadow-xl lg:relative lg:bottom-20">
      <div className="flex flex-col sm:flex-row gap-8 lg:gap-16 items-center lg:items-start text-center sm:text-left">
        {/* Bloque 1: Tasa de Éxito */}
        <div className="flex flex-col gap-1">
          <span className="font-[Orbitron] text-3xl lg:text-4xl font-black text-gray-900 tracking-[-1px]">
            +{count.toLocaleString()}%
          </span>
          <p className="font-[Space_Mono] text-[10px] lg:text-[11px] text-cyan-600 tracking-[3px] uppercase font-bold">
            Eficiencia Operativa
          </p>
        </div>

        {/* Divisor Visual (Opcional, visible en sm+) */}
        <div
          className="hidden sm:block w-[1px] h-12 bg-gray-200"
          aria-hidden="true"
        />

        {/* Bloque 2: Tiempo de Respuesta */}
        <div className="flex flex-col gap-1">
          <span className="font-[Orbitron] text-3xl lg:text-4xl font-black text-gray-900 tracking-[-1px]">
            +{count2.toFixed(2)}s
          </span>
          <p className="font-[Space_Mono] text-[10px] lg:text-[11px] text-cyan-600 tracking-[3px] uppercase font-bold">
            Latencia de Respuesta
          </p>
        </div>
      </div>
    </div>
  );
}
