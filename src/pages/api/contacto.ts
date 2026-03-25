import type { APIRoute } from 'astro';
import { supabase } from '@/lib/supabase';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.formData();
    const nombre = data.get('nombre') as string;
    const email = data.get('email') as string;
    const protocolo = data.get('protocolo') as string;
    const mensaje = data.get('mensaje') as string;

    // Validación de campos obligatorios
    if (!nombre?.trim() || !email?.trim()) {
      return new Response(JSON.stringify({ error: 'Nombre y email son obligatorios.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { error } = await supabase
      .from('contacto')
      .insert([{ nombre: nombre.trim(), email: email.trim(), protocolo, mensaje: mensaje?.trim() || '' }]);

    if (error) throw error;

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Error en /api/contacto:', err);
    return new Response(JSON.stringify({ error: 'Error interno del servidor.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};