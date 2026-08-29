---
// src/components/FacebookPosts.astro
import { getFacebookFeed, getPageCoverImage } from '../lib/facebook';
import type { FacebookPost } from '../lib/facebook';

const DISPLAY_COUNT = 6;

let posts: FacebookPost[] = [];
let error: string | null = null;
let fallbackImage: string | null = null;

function isRestrictedPlaceholder(text: string): boolean {
  return text.includes('ha condiviso il contenuto solo con un gruppo ristretto');
}

try {
  const rawPosts = await getFacebookFeed(DISPLAY_COUNT + 6);
  fallbackImage = await getPageCoverImage();

  posts = rawPosts
    .filter((post) => {
      const text = post.message || post.attachments?.data?.[0]?.description || '';
      return !isRestrictedPlaceholder(text);
    })
    .slice(0, DISPLAY_COUNT);
} catch (e) {
  error = e instanceof Error ? e.message : 'Errore nel recupero dei post';
}

function getText(post: FacebookPost): string {
  return (
    post.message ||
    post.attachments?.data?.[0]?.description ||
    post.attachments?.data?.[0]?.title ||
    ''
  );
}

function getImage(post: FacebookPost): string | null {
  return (
    post.full_picture ||
    post.attachments?.data?.[0]?.media?.image?.src ||
    post.attachments?.data?.[0]?.subattachments?.data?.[0]?.media?.image?.src ||
    fallbackImage
  );
}
---
