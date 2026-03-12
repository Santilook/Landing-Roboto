import { useState, useEffect } from "react";

import robot1Img from "../../assets/robot-1.webp";
import robot2Img from "../../assets/robot-2.webp";
import robot3Img from "../../assets/robot-3.webp";
import robot4Img from "../../assets/robot-4.webp";
import robot5Img from "../../assets/robot-5.webp";
import robot6Img from "../../assets/robot-6.webp";

const robots = [
  {
    id: 1,
    name: "T-800 ASSAULT",
    tags: ["COMBATE", "PESADO"],
    price: "$125,000",
    icon: "⚔",
    description:
      "Unidad de combate pesado con blindaje de titanio grado militar. Diseñada para operaciones en zonas de conflicto de alta intensidad.",
    specs: { armor: 95, speed: 60, weapons: 98, intel: 72 },
    status: "EN LÍNEA",
    integrity: 100,
    weaponSys: "ARMADO",
    image: robot1Img,
  },
  {
    id: 2,
    name: "XJ-9 SENTRY",
    tags: ["UTILIDAD", "DEFENSA"],
    price: "$85,000",
    icon: "🛡",
    description:
      "Centinela autónomo para vigilancia perimetral. Sensores de largo alcance y respuesta de amenaza en milisegundos.",
    specs: { armor: 80, speed: 55, weapons: 65, intel: 90 },
    status: "EN LÍNEA",
    integrity: 97,
    weaponSys: "EN ESPERA",
    image: robot2Img,
  },
  {
    id: 3,
    name: "V-22 RAPTOR",
    tags: ["COMBATE", "AÉREO"],
    price: "$150,000",
    icon: "✈",
    description:
      "Unidad de combate aéreo de alta velocidad. Sistema de propulsión dual con capacidad de maniobra en entornos urbanos.",
    specs: { armor: 65, speed: 99, weapons: 92, intel: 80 },
    status: "EN LÍNEA",
    integrity: 88,
    weaponSys: "ARMADO",
    image: robot3Img,
  },
  {
    id: 4,
    name: "K-12 LOADER",
    tags: ["UTILIDAD", "LOGÍSTICA"],
    price: "$65,000",
    icon: "⚙",
    description:
      "Unidad de carga y logística con capacidad de levantamiento de 5 toneladas. Optimizada para operaciones de suministro.",
    specs: { armor: 88, speed: 40, weapons: 20, intel: 75 },
    status: "EN LÍNEA",
    integrity: 100,
    weaponSys: "DESARMADO",
    image: robot4Img,
  },
  {
    id: 5,
    name: "M-500 MEDIC",
    tags: ["SOPORTE", "MÉDICO"],
    price: "$110,000",
    icon: "✚",
    description:
      "Unidad de soporte médico avanzado. Capaz de realizar cirugías de campo y triaje autónomo en zonas de combate.",
    specs: { armor: 60, speed: 70, weapons: 30, intel: 98 },
    status: "EN LÍNEA",
    integrity: 99,
    weaponSys: "EN ESPERA",
    image: robot5Img,
  },
  {
    id: 6,
    name: "S-9 SCOUT",
    tags: ["RECONOCIMIENTO", "SIGILO"],
    price: "$92,000",
    icon: "👁",
    description:
      "Unidad de reconocimiento con tecnología de camuflaje activo. Emisión de señal cero en modo stealth.",
    specs: { armor: 45, speed: 95, weapons: 55, intel: 96 },
    status: "EN LÍNEA",
    integrity: 94,
    weaponSys: "OCULTO",
    image: robot6Img,
  },
];

/* ── Barra de Estadísticas Animada ── */
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
      className="w-full min-h-screen flex flex-col items-center justify-center px-4 md:px-10 py-10 lg:py-15 mt-10 lg:mt-14 pointer-events-none box-border relative"
    >
      {/* ── ENCABEZADO ── */}
      <header className="text-center mb-10 lg:mb-12 pointer-events-auto">
        <div className="flex items-center justify-center gap-3 mb-3">
          <span
            className="inline-block w-8 lg:w-10 h-[2px] lg:h-[3px] bg-cyan-600 rounded-sm"
            aria-hidden="true"
          />
          <span className="font-[Orbitron] text-[10px] lg:text-xs tracking-[4px] lg:tracking-[6px] text-cyan-700 uppercase font-bold">
            Catálogo de Unidades
          </span>
          <span
            className="inline-block w-8 lg:w-10 h-[2px] lg:h-[3px] bg-cyan-600 rounded-sm"
            aria-hidden="true"
          />
        </div>
        <h2 className="font-[Orbitron] text-3xl lg:text-[clamp(28px,4vw,48px)] font-bold text-gray-900 m-0 tracking-[2px] lg:tracking-[4px] uppercase">
          Modelos Disponibles
        </h2>
        <p className="font-[Rajdhani] text-base lg:text-lg text-gray-500 mt-2 lg:mt-3 tracking-[1px]">
          Selecciona una unidad para visualizar sus parámetros de combate y
          utilidad
        </p>
      </header>

      {/* ── CONTENEDOR PRINCIPAL: Responsive (Column on mobile, Row on desktop) ── */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-24 w-full max-w-[1400px] items-start pointer-events-auto">
        {/* ── SELECCIÓN: Lista de robots (Scroll horizontal en mobile) ── */}
        <div
          className="flex lg:flex-col gap-3 w-full lg:w-[440px] shrink-0 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 snap-x lg:snap-none no-scrollbar"
          role="tablist"
          aria-label="Selección de modelos de robots"
        >
          {robots.map((robot) => {
            const isActive = selected.id === robot.id;
            return (
              <button
                key={robot.id}
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${robot.id}`}
                id={`tab-${robot.id}`}
                className={`robot-card snap-start shrink-0 min-w-[280px] lg:min-w-0 ${isActive ? "active" : ""} flex items-center gap-3.5 w-full py-4 px-5 rounded-xl lg:rounded-2xl backdrop-blur-[10px] text-left outline-none relative overflow-hidden cursor-pointer transition-all duration-300 ${
                  isActive
                    ? "bg-cyan-100/40 lg:bg-cyan-50/70 border-2 border-cyan-500 shadow-lg shadow-cyan-500/10"
                    : "bg-white/40 border border-cyan-200/40 hover:border-cyan-400/50"
                }`}
                onClick={() => handleSelect(robot)}
              >
                {/* Ícono */}
                <div
                  className={`w-10 h-10 lg:w-11 lg:h-11 rounded-lg lg:rounded-xl flex items-center justify-center text-lg lg:text-xl shrink-0 transition-colors ${
                    isActive
                      ? "bg-cyan-200 border border-cyan-400/40 text-cyan-800"
                      : "bg-white/60 border border-cyan-200/30 text-gray-400"
                  }`}
                >
                  {robot.icon}
                </div>

                {/* Información */}
                <div className="flex-1 min-w-0">
                  <div
                    className={`font-[Orbitron] text-xs lg:text-[13px] font-bold tracking-[1.5px] whitespace-nowrap overflow-hidden text-ellipsis ${
                      isActive ? "text-cyan-800" : "text-gray-700"
                    }`}
                  >
                    {robot.name}
                  </div>
                  <div className="font-[Rajdhani] text-[10px] lg:text-xs text-gray-400 tracking-[1px] lg:tracking-[2px] mt-0.5 uppercase">
                    {robot.tags.join(" · ")}
                  </div>
                </div>

                {/* Precio */}
                <div
                  className={`font-[Orbitron] text-[10px] lg:text-xs font-bold shrink-0 ${
                    isActive ? "text-cyan-800" : "text-gray-400"
                  }`}
                >
                  {robot.price}
                </div>

                {/* Indicador activo (Lateral) */}
                {isActive && (
                  <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-[4px] rounded-r-[4px] bg-cyan-600 shadow-[0_0_15px_#0891b2]" />
                )}
              </button>
            );
          })}
        </div>

        {/* ── DETALLE: Panel de información (Responsive) ── */}
        <div
          key={selected.id}
          id={`panel-${selected.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${selected.id}`}
          className="detail-panel flex-1 w-full rounded-2xl lg:rounded-3xl border border-cyan-200/40 bg-white/60 backdrop-blur-xl overflow-hidden shadow-2xl transition-all duration-500"
        >
          {/* Área visual (Imagen + Atributos rápidos) */}
          <div className="relative h-64 lg:h-96 bg-gradient-to-br from-gray-100/95 via-white/80 to-gray-200/90 flex items-center justify-center overflow-hidden">
            {/* Patrón de cuadrícula tecnológica */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(8,145,178,0.2) 1.5px, transparent 1.5px), linear-gradient(90deg, rgba(8,145,178,0.2) 1.5px, transparent 1.5px)",
                backgroundSize: "40px 40px",
              }}
              aria-hidden="true"
            />

            {/* Brillo ambiental radiante */}
            <div
              className="absolute w-full h-full bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.1)_0%,transparent_70%)] animate-pulse"
              aria-hidden="true"
            />

            {/* Imagen del robot seleccionado */}
            <img
              src={selected.image.src || selected.image}
              alt={`Vista detallada del modelo ${selected.name}`}
              width="400"
              height="400"
              loading="lazy"
              className={`relative z-[1] max-h-[85%] w-auto object-contain transition-all duration-500 drop-shadow-[0_20px_40px_rgba(0,0,0,0.3)] ${
                animating ? "opacity-0 scale-95" : "opacity-100 scale-100"
              }`}
            />

            {/* Nombre y Tags superpuestos (Esquina inferior) */}
            <div className="absolute bottom-4 lg:bottom-10 left-4 lg:left-10 z-[2]">
              <h3 className="font-[Orbitron] text-2xl lg:text-4xl font-black text-gray-900 m-0 tracking-[2px] lg:tracking-[6px] drop-shadow-sm uppercase italic">
                {selected.name}
              </h3>
              <div className="flex gap-2 mt-2 lg:mt-3">
                {selected.tags.map((tag) => (
                  <span
                    key={tag}
                    className="tag-pill font-[Orbitron] text-[8px] lg:text-[10px] tracking-[1px] lg:tracking-[2.5px] py-1 px-3 rounded-md border border-cyan-500/20 bg-white/40 text-cyan-800 font-bold uppercase backdrop-blur-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Estado de la unidad (Esquina superior derecha) */}
            <div className="absolute top-4 lg:top-6 right-4 lg:right-8 flex flex-col gap-2 items-end">
              <div className="flex items-center gap-2 py-1.5 px-3 lg:px-4 rounded-lg border border-cyan-200/50 bg-white/90 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_8px_#06b6d4]" />
                <span className="font-[Orbitron] text-[8px] lg:text-[10px] tracking-[2px] text-cyan-900 font-bold uppercase">
                  {selected.status}
                </span>
              </div>
              <div className="py-1.5 px-3 lg:px-4 rounded-lg border border-gray-200 bg-white/70 backdrop-blur-md font-[Orbitron] text-[8px] lg:text-[10px] tracking-[2px] text-gray-500 uppercase">
                Integridad:{" "}
                <span className="text-cyan-600 font-bold">
                  {selected.integrity}%
                </span>
              </div>
            </div>

            {/* Número de serie (Esquina superior izquierda) */}
            <div className="absolute top-4 lg:top-6 left-4 lg:left-10 font-[Orbitron] text-[9px] lg:text-[11px] tracking-[4px] text-cyan-900/40 font-bold uppercase">
              X-S0{selected.id} // SECURE
            </div>
          </div>

          {/* Área de información técnica y compra */}
          <div className="p-6 lg:p-10 border-t border-gray-100">
            <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
              {/* Bloque: Descripción y Compra */}
              <div className="flex-1 space-y-6 lg:space-y-8">
                <div>
                  <h4 className="font-[Orbitron] text-[9px] lg:text-[10px] tracking-[3px] text-cyan-600 font-bold mb-3 uppercase">
                    Especificaciones Técnicas
                  </h4>
                  <p className="font-[Rajdhani] text-sm lg:text-[17px] leading-relaxed text-gray-600 italic">
                    {selected.description}
                  </p>
                </div>

                <div className="flex flex-wrap items-end justify-between gap-6 pt-6 border-t border-gray-100">
                  <div className="flex flex-col">
                    <span className="font-[Orbitron] text-[9px] tracking-[2px] text-gray-400 uppercase mb-1">
                      Costo de Adquisición
                    </span>
                    <span className="font-[Orbitron] text-3xl lg:text-4xl font-black text-gray-900">
                      {selected.price}
                    </span>
                  </div>
                  <button
                    className="buy-btn font-[Orbitron] text-[10px] lg:text-[11px] font-black tracking-[3px] py-4 px-8 rounded-xl bg-gray-900 text-cyan-400 hover:text-white hover:bg-cyan-600 transition-all duration-300 shadow-xl shadow-cyan-900/10 active:scale-95 uppercase cursor-pointer"
                    onClick={() =>
                      alert(
                        `Iniciando protocolo de adquisición para: ${selected.name}`,
                      )
                    }
                  >
                    Iniciar Pre-Compra »
                  </button>
                </div>
              </div>

              {/* Bloque: Gráficos de Rendimiento */}
              <div className="w-full md:w-[260px] lg:w-[300px] shrink-0 bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
                <h4 className="font-[Orbitron] text-[9px] tracking-[3px] text-gray-400 font-bold mb-6 uppercase text-center md:text-left">
                  Métricas de Sistema
                </h4>
                <div className="space-y-4">
                  <StatBar label="Blindaje" value={selected.specs.armor} />
                  <StatBar label="Cinética" value={selected.specs.speed} />
                  <StatBar label="Letalidad" value={selected.specs.weapons} />
                  <StatBar label="Cognición" value={selected.specs.intel} />
                </div>

                {/* Estatus del Sistema de Armas */}
                <div className="mt-8 flex items-center justify-between py-3 px-4 rounded-xl border border-cyan-200/50 bg-white shadow-sm">
                  <span className="font-[Orbitron] text-[8px] tracking-[1.5px] text-gray-400 font-bold uppercase">
                    Protocolo Armas:
                  </span>
                  <span
                    className={`font-[Orbitron] text-[10px] font-black tracking-[2px] ${
                      selected.weaponSys === "ARMADO"
                        ? "text-red-500 animate-pulse"
                        : selected.weaponSys === "EN ESPERA"
                          ? "text-orange-500"
                          : "text-cyan-600"
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
