import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { grammarData } from '../../data/grammarData';
import { parseGuide } from '../../utils/grammarGuideParser';
import './GrammarGuide.css';

function Segments({ segments }) {
  return segments.map((seg, i) =>
    seg.bold ? (
      <strong key={i} className="gg-bold">{seg.text}</strong>
    ) : (
      <span key={i}>{seg.text}</span>
    )
  );
}

export default function GrammarGuide() {
  const { level = 'beginner', topicId } = useParams();
  const navigate = useNavigate();

  const levelData = grammarData[level];
  const topic = levelData?.topics?.find((t) => t.id === topicId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!topic) {
    return (
      <div className="grammar-guide-page gg-error-state">
        <div className="gg-error-icon">🔍</div>
        <h2>Topic not found</h2>
        <button className="btn btn-primary" onClick={() => navigate('/grammar')}>
          ← Back to Grammar
        </button>
      </div>
    );
  }

  const blocks = parseGuide(topic.guide);

  return (
    <div className="grammar-guide-page">
      <div className="gg-header">
        <button
          className="gg-back-btn"
          onClick={() => navigate(`/grammar/${level}/${topicId}`)}
          title="Back"
        >
          ←
        </button>
        <div className="gg-header-title-wrap">
          <span className="gg-header-eyebrow">Study Guide</span>
          <h1 className="gg-header-title">
            <span className="gg-header-icon">{topic.icon}</span> {topic.title}
          </h1>
        </div>
      </div>

      <div className="gg-body">
        {blocks.map((block, idx) => {
          switch (block.type) {
            case 'titleSub':
              return (
                <p key={idx} className="gg-title-sub">
                  <Segments segments={block.segments} />
                </p>
              );

            case 'h2':
              return (
                <div key={idx} className="gg-h2-row">
                  {block.number && <span className="gg-h2-badge">{block.number}</span>}
                  <h2 className="gg-h2-text">
                    <Segments segments={block.segments} />
                  </h2>
                </div>
              );

            case 'h3':
              return (
                <h3 key={idx} className="gg-h3-text">
                  <Segments segments={block.segments} />
                </h3>
              );

            case 'note':
              return (
                <div key={idx} className="gg-note">
                  <span className="gg-note-icon">💡</span>
                  <p className="gg-note-text">
                    <Segments segments={block.segments} />
                  </p>
                </div>
              );

            case 'rule':
              if (block.badge) {
                return (
                  <div key={idx} className="gg-step-card">
                    <span className="gg-step-badge">{block.badge}</span>
                    <div className="gg-step-content">
                      <strong className="gg-step-label">{block.label}</strong>
                      <span className="gg-step-desc">
                        <Segments segments={block.segments} />
                      </span>
                    </div>
                  </div>
                );
              }
              return (
                <div key={idx} className={`gg-rule-card gg-rule-${block.kind}`}>
                  <span className="gg-rule-pill">{block.label}</span>
                  <span className="gg-rule-formula">
                    <Segments segments={block.segments} />
                  </span>
                </div>
              );

            case 'step':
              return (
                <div key={idx} className="gg-step-card">
                  {block.badge ? (
                    <span className="gg-step-badge">{block.badge}</span>
                  ) : (
                    <span className="gg-step-dot" aria-hidden="true" />
                  )}
                  <div className="gg-step-content">
                    <strong className="gg-step-label">{block.label}</strong>
                    {block.noteSegments && (
                      <span className="gg-step-note">
                        <Segments segments={block.noteSegments} />
                      </span>
                    )}
                  </div>
                </div>
              );

            case 'numbered':
              return (
                <div key={idx} className="gg-step-card gg-step-plain">
                  <span className="gg-step-badge">{block.badge}</span>
                  <div className="gg-step-content">
                    <span className="gg-step-desc">
                      <Segments segments={block.segments} />
                    </span>
                  </div>
                </div>
              );

            case 'example':
              return (
                <div key={idx} className="gg-example">
                  <span className="gg-example-mark">›</span>
                  <p className="gg-example-text">
                    <Segments segments={block.segments} />
                  </p>
                </div>
              );

            case 'bullet':
              return (
                <div key={idx} className="gg-bullet">
                  <span className="gg-bullet-dot" aria-hidden="true" />
                  <p className="gg-bullet-text">
                    <Segments segments={block.segments} />
                  </p>
                </div>
              );

            case 'table':
              return (
                <div key={idx} className="gg-table-wrap">
                  <table className="gg-table">
                    <thead>
                      <tr>
                        {block.header.map((h, hi) => (
                          <th key={hi}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {block.rows.map((row, ri) => (
                        <tr key={ri}>
                          {row.map((cell, ci) => (
                            <td key={ci}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );

            case 'paragraph':
            default:
              return (
                <p key={idx} className="gg-paragraph">
                  <Segments segments={block.segments} />
                </p>
              );
          }
        })}
      </div>

      <div className="gg-footer">
        <button
          className="gg-cta-btn"
          onClick={() => navigate(`/grammar/${level}/${topicId}`)}
        >
          ✅ Start Exercises
        </button>
      </div>
    </div>
  );
}
