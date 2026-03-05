import { useState, useEffect } from "react";

import robot1Img from "../../assets/robot-1.webp";
import robot2Img from "../../assets/robot-2.webp";
import robot3Img from "../../assets/robot-3.webp";

const robots = [
  {
    id: 1,
    name: "T-800 ASSAULT",
    tags: ["COMBAT", "HEAVY"],
    price: "$125,000",
    icon: "⚔",
    description:
      "Unidad de combate pesado con blindaje de titanio grado militar. Diseñada para operaciones en zonas de conflicto de alta intensidad.",
    specs: { armor: 95, speed: 60, weapons: 98, intel: 72 },
    status: "ONLINE",
    integrity: 100,
    weaponSys: "ARMED",
    image: robot1Img,
  },
  {
    id: 2,
    name: "XJ-9 SENTRY",
    tags: ["UTILITY", "DEFENSE"],
    price: "$85,000",
    icon: "🛡",
    description:
      "Centinela autónomo para vigilancia perimetral. Sensores de largo alcance y respuesta de amenaza en milisegundos.",
    specs: { armor: 80, speed: 55, weapons: 65, intel: 90 },
    status: "ONLINE",
    integrity: 97,
    weaponSys: "STANDBY",
    image: robot2Img,
  },
  {
    id: 3,
    name: "V-22 RAPTOR",
    tags: ["COMBAT", "AERIAL"],
    price: "$150,000",
    icon: "✈",
    description:
      "Unidad de combate aéreo de alta velocidad. Sistema de propulsión dual con capacidad de maniobra en entornos urbanos.",
    specs: { armor: 65, speed: 99, weapons: 92, intel: 80 },
    status: "ONLINE",
    integrity: 88,
    weaponSys: "ARMED",
    image: robot3Img,
  },
  {
    id: 4,
    name: "K-12 LOADER",
    tags: ["UTILITY", "LOGISTICS"],
    price: "$65,000",
    icon: "⚙",
    description:
      "Unidad de carga y logística con capacidad de levantamiento de 5 toneladas. Optimizada para operaciones de suministro.",
    specs: { armor: 88, speed: 40, weapons: 20, intel: 75 },
    status: "ONLINE",
    integrity: 100,
    weaponSys: "UNARMED",
    image: robot1Img,
  },
  {
    id: 5,
    name: "M-500 MEDIC",
    tags: ["SUPPORT", "MEDICAL"],
    price: "$110,000",
    icon: "✚",
    description:
      "Unidad de soporte médico avanzado. Capaz de realizar cirugías de campo y triaje autónomo en zonas de combate.",
    specs: { armor: 60, speed: 70, weapons: 30, intel: 98 },
    status: "ONLINE",
    integrity: 99,
    weaponSys: "STANDBY",
    image: robot2Img,
  },
  {
    id: 6,
    name: "S-9 SCOUT",
    tags: ["RECON", "STEALTH"],
    price: "$92,000",
    icon: "👁",
    description:
      "Unidad de reconocimiento con tecnología de camuflaje activo. Emisión de señal cero en modo stealth.",
    specs: { armor: 45, speed: 95, weapons: 55, intel: 96 },
    status: "ONLINE",
    integrity: 94,
    weaponSys: "CONCEALED",
    image: robot3Img,
  },
];

/* ── Animated Stat bar ── */
const StatBar = ({ label, value }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(0);
    const timer = setTimeout(() => setWidth(value), 50);
    return () => clearTimeout(timer);
  }, [value]);

  const barColor =
    value > 80
      ? "bg-gradient-to-r from-cyan-600 to-cyan-500"
      : value > 50
        ? "bg-cyan-700"
        : "bg-cyan-900";

  const barShadow = value > 80 ? "shadow-[0_0_10px_rgba(8,145,178,0.5)]" : "";

  return (
    <div className="mb-3">
      <div className="flex justify-between mb-1.5">
        <span className="font-[Orbitron] text-[10px] tracking-[2px] text-gray-500">
          {label}
        </span>
        <span className="font-[Orbitron] text-[10px] text-cyan-700">
          {value}%
        </span>
      </div>
      <div className="h-1 bg-gray-200 rounded-sm overflow-hidden">
        <div
          className={`h-full rounded-sm stat-bar-fill ${barColor} ${barShadow}`}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
};

export default function RobotSelector() {
  const [selected, setSelected] = useState(robots[0]);
  const [animating, setAnimating] = useState(false);

  const handleSelect = (robot) => {
    if (robot.id === selected.id) return;
    setAnimating(true);
    setTimeout(() => {
      setSelected(robot);
      setAnimating(false);
    }, 200);
  };

  return (
    <section
      id="modelos"
      className="w-full min-h-screen flex flex-col items-center justify-center px-10 py-15 mt-14 pointer-events-none box-border relative"
    >
      {/* ── HEADER ── */}
      <div className="text-center mb-12 pointer-events-auto">
        <div className="flex items-center justify-center gap-3 mb-3">
          <span className="inline-block w-10 h-[3px] bg-cyan-600 rounded-sm" />
          <span className="font-[Orbitron] text-xs tracking-[6px] text-cyan-700">
            CATÁLOGO
          </span>
          <span className="inline-block w-10 h-[3px] bg-cyan-600 rounded-sm" />
        </div>
        <h2 className="font-[Orbitron] text-[clamp(28px,4vw,48px)] font-bold text-gray-900 m-0 tracking-[4px]">
          Nuestros Modelos
        </h2>
        <p className="font-[Rajdhani] text-lg text-gray-500 mt-3 tracking-[1px]">
          Selecciona una unidad para ver sus especificaciones
        </p>
      </div>

      {/* ── MAIN GRID ── */}
      <div className="flex gap-24 w-full max-w-[1400px] items-start">
        {/* ── LEFT: Robot buttons ── */}
        <div className="flex flex-col gap-3 w-[440px] shrink-0" >
          {robots.map((robot) => {
            const isActive = selected.id === robot.id;
            return (
              <button
                key={robot.id}
                className={`robot-card ${isActive ? "active" : ""} flex items-center gap-3.5 w-full py-4 px-5 rounded-2xl backdrop-blur-[10px] text-left outline-none relative overflow-hidden cursor-pointer ${
                  isActive
                    ? "bg-cyan-50/70 border border-cyan-500"
                    : "bg-white/40 border border-cyan-200/40"
                }`}
              >
                {/* Icon */}
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0 ${
                    isActive
                      ? "bg-cyan-100 border border-cyan-400/40"
                      : "bg-cyan-50/50 border border-cyan-200/30"
                  }`}
                  onClick={() => handleSelect(robot)}
                >
                  {robot.icon}
                </div>

                {/* Info */}
                <div
                  className="flex-1 min-w-0"
                  onClick={() => handleSelect(robot)}
                >
                  <div
                    className={`font-[Orbitron] text-[13px] font-bold tracking-[1.5px] whitespace-nowrap overflow-hidden text-ellipsis ${
                      isActive ? "text-cyan-700" : "text-gray-700"
                    }`}
                  >
                    {robot.name}
                  </div>
                  <div className="font-[Rajdhani] text-xs text-gray-400 tracking-[2px] mt-0.5">
                    {robot.tags.join(" · ")}
                  </div>
                </div>

                {/* Price */}
                <div
                  className={`font-[Orbitron] text-xs font-bold shrink-0 ${
                    isActive ? "text-cyan-700" : "text-gray-400"
                  }`}
                  onClick={() => handleSelect(robot)}
                >
                  {robot.price}
                </div>

                {/* Active indicator */}
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-r-[3px] bg-cyan-600 shadow-[0_0_10px_#0891b2]" />
                )}
              </button>
            );
          })}
        </div>

        {/* ── RIGHT: Detail panel ── */}
        <div
          key={selected.id}
          className="detail-panel flex-1 rounded-3xl border border-cyan-200/40 bg-white/50 backdrop-blur-xl overflow-hidden"
        >
          {/* Image / visual area */}
          <div className="relative h-80 bg-gradient-to-br from-gray-100/90 via-gray-50/90 to-gray-100/90 flex items-center justify-center overflow-hidden">
            {/* Grid pattern */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(8,145,178,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(8,145,178,0.05) 1px, transparent 1px)",
                backgroundSize: "50px 50px",
              }}
            />

            {/* Glow circle behind robot */}
            <div className="absolute w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,rgba(8,145,178,0.1)_0%,transparent_70%)]" />

            {/* Robot image */}
            <img
              src={selected.image.src || selected.image}
              alt={selected.name}
              className={`relative z-[1] max-h-[280px] w-auto object-contain drop-shadow-2xl transition-opacity duration-300 ${
                animating ? "opacity-0" : "opacity-100"
              }`}
            />

            {/* Unit name overlay */}
            <div className="absolute bottom-7 left-7 z-[2]">
              <h3 className="font-[Orbitron] text-[clamp(24px,3vw,36px)] font-black text-gray-900 m-0 tracking-[4px] drop-shadow-[0_0_25px_rgba(8,145,178,0.3)]">
                {selected.name}
              </h3>
              <div className="flex gap-2 mt-2.5">
                {selected.tags.map((tag) => (
                  <span
                    key={tag}
                    className="tag-pill font-[Orbitron] text-[9px] tracking-[2px] py-1 px-3 rounded-full border border-cyan-500/30 bg-cyan-100/50 text-cyan-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Status badges — top right */}
            <div className="absolute top-5 right-5 flex flex-col gap-2 items-end">
              <div className="flex items-center gap-2 py-1.5 px-3.5 rounded-full border border-cyan-300/30 bg-white/80 backdrop-blur-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-600 shadow-[0_0_8px_#0891b2]" />
                <span className="font-[Orbitron] text-[9px] tracking-[2px] text-cyan-700">
                  {selected.status}
                </span>
              </div>
              <div className="py-1.5 px-3.5 rounded-full border border-cyan-300/30 bg-white/80 backdrop-blur-lg font-[Orbitron] text-[9px] tracking-[2px] text-gray-500">
                INTEGRITY{" "}
                <span className="text-cyan-700">{selected.integrity}%</span>
              </div>
            </div>

            {/* Unit ID — top left */}
            <div className="absolute top-5 left-7 font-[Orbitron] text-[10px] tracking-[3px] text-cyan-300/40">
              UNIT-{String(selected.id).padStart(4, "0")}
            </div>
          </div>

          {/* Info section */}
          <div className="p-7 border-t border-cyan-200/30">
            <div className="flex gap-7 flex-wrap">
              {/* Description */}
              <div className="flex-1 min-w-[240px]">
                <p className="font-[Orbitron] text-[10px] tracking-[3px] text-gray-400 mb-2.5 mt-0">
                  DESCRIPCIÓN DE UNIDAD
                </p>
                <p className="font-[Rajdhani] text-[15px] leading-relaxed text-gray-600 mt-0">
                  {selected.description}
                </p>

                {/* Price + buy */}
                <div className="flex items-center gap-5 mt-6 flex-wrap">
                  <div>
                    <p className="font-[Orbitron] text-[10px] tracking-[3px] text-gray-400 mb-1.5 mt-0">
                      PRECIO BASE
                    </p>
                    <span className="font-[Orbitron] text-[28px] font-black text-cyan-700 drop-shadow-[0_0_20px_rgba(8,145,178,0.2)]">
                      {selected.price}
                    </span>
                  </div>
                  <button
                    className="buy-btn font-[Orbitron] text-[11px] font-bold tracking-[3px] py-3.5 px-7 border-none rounded-full bg-cyan-600 text-white shadow-[0_0_25px_rgba(8,145,178,0.3)] cursor-pointer"
                    onClick={() =>
                      alert(`¡Compra de ${selected.name} agregada!`)
                    }
                  >
                    PRE-COMPRA →
                  </button>
                </div>
              </div>

              {/* Stats */}
              <div className="w-[220px] shrink-0" >
                <p className="font-[Orbitron] text-[10px] tracking-[3px] text-gray-400 mb-4 mt-0" >
                  RENDIMIENTO
                </p>
                <StatBar label="ARMADURA" value={selected.specs.armor}  />
                <StatBar label="VELOCIDAD" value={selected.specs.speed} />
                <StatBar label="ARMAMENTO" value={selected.specs.weapons} />
                <StatBar label="INTELIGENCIA" value={selected.specs.intel} />

                {/* Weapon status */}
                <div className="mt-4 flex items-center gap-2.5 py-2.5 px-3.5 rounded-xl border border-cyan-200/30 bg-cyan-50/30">
                  <span className="font-[Orbitron] text-[9px] tracking-[2px] text-gray-400">
                    WEAPON SYS:
                  </span>
                  <span
                    className={`font-[Orbitron] text-[10px] font-bold tracking-[2px] ${
                      selected.weaponSys === "ARMED"
                        ? "text-cyan-700"
                        : selected.weaponSys === "STANDBY"
                          ? "text-gray-500"
                          : "text-gray-400"
                    }`}
                  >
                    {selected.weaponSys}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
