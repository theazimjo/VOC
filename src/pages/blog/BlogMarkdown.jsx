import { Link } from 'react-router-dom';
import Illustration from './illustrations';

function Inline({ nodes }) {
  return nodes.map((n, i) => {
    if (n.t === 'text') return n.v;
    if (n.t === 'strong') return <strong key={i}><Inline nodes={n.c} /></strong>;
    if (n.t === 'em') return <em key={i}><Inline nodes={n.c} /></em>;
    const internal = n.href.startsWith('/');
    return internal
      ? <Link key={i} to={n.href}><Inline nodes={n.c} /></Link>
      : <a key={i} href={n.href} target="_blank" rel="noopener noreferrer"><Inline nodes={n.c} /></a>;
  });
}

/** Renders the blocks produced by parseMarkdown(). */
export default function Markdown({ blocks, lang }) {
  return blocks.map((b, i) => {
    switch (b.type) {
      case 'h2': return <h2 key={i} id={b.id}><Inline nodes={b.inline} /></h2>;
      case 'h3': return <h3 key={i} id={b.id}><Inline nodes={b.inline} /></h3>;
      case 'p': return <p key={i}><Inline nodes={b.inline} /></p>;
      case 'quote': return <blockquote key={i}><Inline nodes={b.inline} /></blockquote>;
      case 'ul': return <ul key={i}>{b.items.map((it, j) => <li key={j}><Inline nodes={it} /></li>)}</ul>;
      case 'ol': return <ol key={i}>{b.items.map((it, j) => <li key={j}><Inline nodes={it} /></li>)}</ol>;
      case 'hr': return <hr key={i} />;
      case 'figure':
        return (
          <figure key={i} className="bl-fig">
            <Illustration name={b.name} lang={lang} />
          </figure>
        );
      case 'image':
        return (
          <figure key={i} className="bl-fig bl-fig--photo">
            <img src={b.src} alt={b.alt} loading="lazy" />
            {b.alt && <figcaption>{b.alt}</figcaption>}
          </figure>
        );
      case 'bars':
        return (
          <figure key={i} className="bl-bars">
            {b.title && <figcaption>{b.title}</figcaption>}
            {b.rows.map((r) => (
              <div key={r.label} className="bl-bar-row">
                <div className="bl-bar-label"><span>{r.label}</span><strong>{r.value.toFixed(2).replace('.', lang === 'en' ? '.' : ',')}</strong></div>
                <div className="bl-bar-track"><span className={`bl-bar-fill bl-bar-fill--${r.tone}`} style={{ width: `${r.value * 100}%` }} /></div>
              </div>
            ))}
            {b.note && <p className="bl-bars-note">{b.note}</p>}
          </figure>
        );
      default: return null;
    }
  });
}
