import { useEffect, useState } from 'react';
import { BUILT_IN_POSTS } from './posts';

// Built-in posts render immediately; posts written in the super-admin panel
// arrive from /api/blog and are merged in (a database post with the same slug
// replaces the built-in one). Fetched once per page load.

let cache = null; // Promise<Array> | null

function loadRemote() {
  if (!cache) {
    cache = fetch('/api/blog')
      .then((r) => (r.ok ? r.json() : { posts: [] }))
      .then((d) => (Array.isArray(d.posts) ? d.posts : []))
      .catch(() => []);
  }
  return cache;
}

export function mergePosts(remote) {
  const bySlug = new Map(BUILT_IN_POSTS.map((p) => [p.slug, p]));
  for (const p of remote) if (p?.slug) bySlug.set(p.slug, p);
  return [...bySlug.values()].sort((a, b) => (b.date || '').localeCompare(a.date || ''));
}

/** @returns {{ posts: Array, loading: boolean }} */
export function useBlogPosts() {
  const [state, setState] = useState({ posts: mergePosts([]), loading: true });

  useEffect(() => {
    let alive = true;
    loadRemote().then((remote) => {
      if (alive) setState({ posts: mergePosts(remote), loading: false });
    });
    return () => { alive = false; };
  }, []);

  return state;
}
