// src/pages/api/facebook.ts
import type { APIRoute } from 'astro';
import { getFacebookFeed } from '../../lib/facebook';

export const prerender = false; // endpoint dinamico, non statico

export const GET: APIRoute = async () => {
  try {
    const posts = await getFacebookFeed(6);
    return new Response(JSON.stringify(posts), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        // cache breve lato edge/CDN per non martellare la Graph API
        'Cache-Control': 'public, max-age=300',
      },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : 'Errore sconosciuto' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
