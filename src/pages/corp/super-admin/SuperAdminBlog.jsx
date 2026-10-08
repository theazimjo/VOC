import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExternalLink, FileText, Plus } from 'lucide-react';
import { EmptyState, LoadingRows, Page, Row, Section, Button } from './ui';
import { listBlogPosts } from './blogApi';
import { useToast } from './useToast';

const titleOf = (p) => p.en?.title || p.uz?.title || p.slug;

export default function SuperAdminBlog() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toastNode, showToast] = useToast();

  useEffect(() => {
    let alive = true;
    listBlogPosts()
      .then((p) => alive && setPosts(p))
      .catch((err) => alive && showToast(`Couldn't load: ${err.message}`, 'error'))
      .finally(() => alive && setLoading(false));
    return () => { alive = false; };
  }, [showToast]);

  const create = () => navigate('/corp/super-admin/blog/new');

  return (
    <Page
      title="Blog"
      subtitle="Posts are written in English and appear on the /blog page. Drafts are not shown."
      action={
        <div style={{ display: 'flex', gap: 8 }}>
          <a className="sa-icon-btn" href="/blog" target="_blank" rel="noopener noreferrer" aria-label="Open the blog in a new window">
            <ExternalLink size={18} strokeWidth={2.4} />
          </a>
          <button type="button" className="sa-icon-btn" onClick={create} aria-label="New post">
            <Plus size={20} strokeWidth={2.6} />
          </button>
        </div>
      }
    >
      {loading ? (
        <LoadingRows count={3} />
      ) : posts.length === 0 ? (
        <div className="sa-group">
          <EmptyState
            icon={<FileText size={40} />}
            title="No posts yet"
            text="Write the first post. When it is ready, turn on 'Published'."
            action={<Button onClick={create}>Write a post</Button>}
          />
        </div>
      ) : (
        <Section footer="The two starter posts that ship with the app live in the code and are not listed here.">
          {posts.map((p) => (
            <Row
              key={p.id}
              icon={<FileText size={16} />}
              iconTone={p.published ? 'green' : 'gray'}
              title={titleOf(p)}
              subtitle={`${p.date} · /blog/${p.slug}`}
              detail={<span style={{ fontSize: 15 }}>{p.published ? 'Published' : 'Draft'}</span>}
              onClick={() => navigate(`/corp/super-admin/blog/${p.id}`)}
            />
          ))}
        </Section>
      )}
      {toastNode}
    </Page>
  );
}
