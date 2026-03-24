import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const data = await request.formData();
  const password = data.get('password');

  // Recuperamos la clave maestra del entorno, o usamos una por defecto para testing local
  const masterPassword = import.meta.env.ADMIN_PASSWORD || 'admin123';

  if (password === masterPassword) {
    // Si la clave es correcta, seteamos una cookie de sesión simple
    // En producción deberías usar algo más robusto, pero esto soluciona el acceso básico
    cookies.set('admin_session', 'authenticated_nexus_admin', {
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 // 24 horas
    });

    return redirect('/admin');
  }

  // Si falla, volvemos al login con error
  return redirect('/login?error=true');
};

export const GET: APIRoute = async ({ cookies, redirect }) => {
  // Manejador de logout si acceden vía GET con ?logout=true
  cookies.delete('admin_session', { path: '/' });
  return redirect('/login');
};
