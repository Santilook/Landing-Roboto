import type { APIRoute } from 'astro';

const COOKIE_NAME = 'admin_session';
const COOKIE_VALUE = 'authenticated_nexus_admin';
const COOKIE_ATTRS = {
  path: '/',
  httpOnly: true,
  secure: true,
  sameSite: 'strict' as const,
};

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const data = await request.formData();
  const password = data.get('password');

  const masterPassword = import.meta.env.ADMIN_PASSWORD || 'admin123';

  if (password === masterPassword) {
    cookies.set(COOKIE_NAME, COOKIE_VALUE, {
      ...COOKIE_ATTRS,
      maxAge: 60 * 60 * 24, // 24 horas
    });
    return redirect('/admin');
  }

  return redirect('/login?error=true');
};

// Logout: el usuario accede a /api/auth para cerrar sesión
export const GET: APIRoute = async ({ cookies, redirect }) => {
  cookies.delete(COOKIE_NAME, COOKIE_ATTRS);
  return redirect('/login');
};
