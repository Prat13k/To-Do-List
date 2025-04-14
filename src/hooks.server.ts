// src/hooks.server.ts
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  const lang = event.url.searchParams.get('lang') || 'en';
  const theme = event.cookies.get('theme') || 'light';

  event.locals.lang = lang;
  event.locals.theme = theme;

  return resolve(event, {
    transformPageChunk: ({ html }) =>
      html
        .replace('%lang%', lang)
        .replace('%theme%', theme)
  });
};
