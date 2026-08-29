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

// ...(FacebookFeedResponse invariato)...

const GRAPH_API_VERSION = 'v26.0';

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

// getPageViewsTotal invariato
