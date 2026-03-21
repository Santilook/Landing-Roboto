import type { APIRoute } from 'astro';
import {supabase} from '../../lib/supabase';

export const POST: APIRoute = async ({ request }) => {
    const data = await request.formData();
    const nombre = data.get('nombre');
    const email = data.get('email');
    const protocolo = data.get('protocolo');
    const mensaje = data.get('mensaje');

    const { error } = await supabase
    .from('contacto')
    .insert([{ nombre, email, protocolo, mensaje}]);

    if (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
};