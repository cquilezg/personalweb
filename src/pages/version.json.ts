import type { APIRoute } from 'astro';
import pkg from '../../package.json';

export const prerender = true;

export const GET: APIRoute = () =>
  new Response(JSON.stringify({ version: pkg.version }), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
