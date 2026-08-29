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

// getPageViewsTotal invariato
