// src/lib/facebook.ts

export interface FacebookPost {
  id: string;
  message?: string;
  created_time: string;
  permalink_url: string;
  full_picture?: string;
}

interface FacebookFeedResponse {
  data: FacebookPost[];
  error?: {
    message: string;
    type: string;
    code: number;
  };
}

const GRAPH_API_VERSION = 'v26.0';

export async function getFacebookFeed(limit = 10): Promise<FacebookPost[]> {
  const pageId = import.meta.env.META_PAGE_ID;
  const token = import.meta.env.META_PAGE_ACCESS_TOKEN;

  if (!pageId || !token) {
    throw new Error(
      'META_PAGE_ID o META_PAGE_ACCESS_TOKEN mancanti nelle variabili d\'ambiente'
    );
  }

  const fields = 'id,message,created_time,permalink_url,full_picture';
  const url = `https://graph.facebook.com/${GRAPH_API_VERSION}/${pageId}/feed?fields=${fields}&limit=${limit}&access_token=${token}`;

  const res = await fetch(url);
  const json: FacebookFeedResponse = await res.json();

  if (json.error) {
    throw new Error(`Graph API error: ${json.error.message}`);
  }

  return json.data ?? [];
}

export async function getPageViewsTotal(period: 'day' | 'week' | 'days_28' = 'day') {
  const pageId = import.meta.env.META_PAGE_ID;
  const token = import.meta.env.META_PAGE_ACCESS_TOKEN;

  if (!pageId || !token) {
    throw new Error('Variabili d\'ambiente Meta mancanti');
  }

  const url = `https://graph.facebook.com/${GRAPH_API_VERSION}/${pageId}/insights?metric=page_views_total&period=${period}&access_token=${token}`;

  const res = await fetch(url);
  const json = await res.json();

  if (json.error) {
    throw new Error(`Graph API error: ${json.error.message}`);
  }

  return json.data ?? [];
}
