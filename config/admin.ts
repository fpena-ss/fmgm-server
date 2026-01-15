export default ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
  secrets: {
    encryptionKey: env('ENCRYPTION_KEY'),
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
  preview: {
    enabled: true,
    config: {
      allowedOrigins: env('CLIENT_URL', 'http://localhost:5173'),
      async handler(uid, { documentId, locale, status }) {
        const clientUrl = env('CLIENT_URL', 'http://localhost:5173');
        
        // Mapeo de content-types a rutas del frontend
        const routeMap: Record<string, string> = {
          'api::inicio.inicio': '/',
          'api::about-us.about-us': '/about-us',
          'api::contact-us.contact-us': '/contact',
          'api::header-menu.header-menu': '/',
          'api::footer.footer': '/',
          'api::theme.theme': '/',
        };
        
        const route = routeMap[uid] || '/';
        const previewParams = new URLSearchParams({
          preview: 'true',
          status: status || 'draft',
          ...(locale && { locale }),
        });
        
        return `${clientUrl}${route}?${previewParams.toString()}`;
      },
    },
  },
});
