import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExternalLink, FileText, Plus } from 'lucide-react';
import { EmptyState, LoadingRows, Page, Row, Section, Button } from './ui';
import { listBlogPosts } from './blogApi';
import { useToast } from './useToast';

const titleOf = (p) => p.uz?.title || p.en?.title || p.ru?.title || p.slug;

export default function SuperAdminBlog() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toastNode, showToast] = useToast();

  useEffect(() => {
    let alive = true;
    listBlogPosts()
      .then((p) => alive && setPosts(p))
      .catch((err) => alive && showToast(`Yuklab bo'lmadi: ${err.message}`, 'error'))
      .finally(() => alive && setLoading(false));
    return () => { alive = false; };
  }, [showToast]);

  const create = () => navigate('/corp/super-admin/blog/new');

  return (
    <Page
      title="Blog"
      subtitle="Maqolalar saytdagi /blog sahifasida chiqadi. Qoralama ko'rinmaydi."
      action={
        <div style={{ display: 'flex', gap: 8 }}>
          <a className="sa-icon-btn" href="/blog" target="_blank" rel="noopener noreferrer" aria-label="Blogni yangi oynada ochish">
            <ExternalLink size={18} strokeWidth={2.4} />
          </a>
          <button type="button" className="sa-icon-btn" onClick={create} aria-label="Yangi maqola">
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
            title="Hali maqola yo'q"
            text="Birinchi maqolani yozing. Tayyor bo'lgach 'Chop etilsin' ni yoqing."
            action={<Button onClick={create}>Maqola yozish</Button>}
          />
        </div>
      ) : (
        <Section footer="Sayt tilida ko'rinadigan tayyor maqolalar (UZ va EN) kodga kiritilgan va bu ro'yxatda chiqmaydi.">
          {posts.map((p) => (
            <Row
              key={p.id}
              icon={<FileText size={16} />}
              iconTone={p.published ? 'green' : 'gray'}
              title={titleOf(p)}
              subtitle={`${p.date} · /blog/${p.slug}`}
              detail={<span style={{ fontSize: 15 }}>{p.published ? 'Chop etilgan' : 'Qoralama'}</span>}
              onClick={() => navigate(`/corp/super-admin/blog/${p.id}`)}
            />
          ))}
        </Section>
      )}
      {toastNode}
    </Page>
  );
}
