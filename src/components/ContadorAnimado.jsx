import { useState, useEffect } from 'react';

export default function AnimatedCounter() {
  const [count, setCount] = useState(1000);
  const targetCount = 2847;
  
  useEffect(() => {
    if (count < targetCount) {
      const timer = setTimeout(() => {
        setCount(prev => Math.min(prev + 17, targetCount));
      }, 30);
      return () => clearTimeout(timer);
    }
  }, [count]);

  return (
    <div className="w-full max-w-2xl pt-5">
      {/* Contador */}
      <div className="flex items-baseline gap-3 mb-4">
        <span className="text-6xl font-bold text-gray-900 tabular-nums">
          +{count.toLocaleString()}
        </span>
        <span className="text-xl text-gray-600 font-medium">
          clientes de este mes
        </span>
      </div>
      
      {/* Barra de progreso */}
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-purple-600 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${(count / targetCount) * 100}%` }}
        />
      </div>
    </div>
  );
}