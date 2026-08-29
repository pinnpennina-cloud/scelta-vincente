// src/lib/facebook.ts

export interface FacebookAttachmentMedia {
  image?: { src: string };
}

export interface FacebookAttachment {
  title?: string;
  description?: string;
  media?: FacebookAttachmentMedia;
  subattachments?: {
    data: { media?: FacebookAttachmentMedia }[];
  };
}

export interface FacebookPost {
  id: string;
  message?: string;
  created_time: string;
  permalink_url: string;
  full_picture?: string;
  attachments?: {
    data: FacebookAttachment[];
  };
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

  const fields =
    'id,message,created_time,permalink_url,full_picture,attachments{media_type,title,description,media,subattachments}';
  const url = `https://graph.facebook.com/${GRAPH_API_VERSION}/${pageId}/feed?fields=${fields}&limit=${limit}&access_token=${token}`;

  const res = await fetch(url);
  const json: FacebookFeedResponse = await res.json();

  if (json.error) {
    throw new Error(`Graph API error: ${json.error.message}`);
  }

  return json.data ?? [];
}

export async function getPageCoverImage(): Promise<string | null> {
  const pageId = import.meta.env.META_PAGE_ID;
  const token = import.meta.env.META_PAGE_ACCESS_TOKEN;

  if (!pageId || !token) return null;

  const url = `https://graph.facebook.com/${GRAPH_API_VERSION}/${pageId}?fields=picture.type(large),cover&access_token=${token}`;
  const res = await fetch(url);
  const json = await res.json();

  if (json.error) return null;

  return json.cover?.source || json.picture?.data?.url || null;
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
