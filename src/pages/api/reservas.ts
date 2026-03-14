import type { APIRoute } from 'astro';
import { supabase } from '@/lib/supabase';

export const POST: APIRoute = async ({ request }) => {
  try {
    // 1. Recibimos los datos que vienen del formulario (frontend)
    const data = await request.formData();
    
    // 2. Extraemos los campos
    const nombre = data.get('nombre') as string;
    const email = data.get('email') as string;
    const modelo = data.get('modelo') as string;
    const mensaje = data.get('mensaje') as string;

    // Si falta algo clave, tiramos error 400
    if (!nombre || !email || !modelo) {
      return new Response(JSON.stringify({
        error: "Faltan datos obligatorios (Nombre, Email o Modelo)"
      }), { status: 400 });
    }

    // 3. Generamos un ID de texto aleatorio para la base de datos y la fecha actual
    const nuevoId = crypto.randomUUID(); 
    const fechaActual = new Date();

    // 4. Guardamos todo en Supabase
    const { error } = await supabase
      .from('reservas')
      .insert([{
        id: nuevoId,
        nombre,
        email,
        modelo,
        fecha: fechaActual,
        mensaje: mensaje || "" // Si no hay mensaje, guardamos texto vacío
      }]);

    if (error) throw error;

    // 5. Devolvemos una respuesta exitosa
    return new Response(JSON.stringify({
      mensaje: "¡Reserva completada con éxito!",
      reservaId: nuevoId
    }), { status: 200 });
  } catch (error) {
    console.error("Error al guardar reserva:", error);
    return new Response(JSON.stringify({
      error: "Ocurrió un error en el servidor."
    }), { status: 500 });
  }
};
