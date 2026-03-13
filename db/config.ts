import { defineDb, defineTable, column }  from "astro:db";

// 1 Deffinimos la tabla reserva

const Reservas = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    nombre: column.text(),
    email: column.text(),
    modelo: column.text(),
    fecha: column.date(),
    mensaje: column.text({ optional: true }),
  }  
});

export default defineDb({ 
  tables: { Reservas } 
});
