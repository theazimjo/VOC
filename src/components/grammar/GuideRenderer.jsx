// Renders the typed blocks produced by utils/grammarGuideParser.parseGuide.
// Shared by the standalone grammar guide page (GrammarGuide.jsx) and the
// course lesson's embedded Grammar stage, so both stay visually consistent
// and a parser/renderer fix only has to happen in one place.
import { splitBoldSegments } from '../../utils/grammarGuideParser';
import { speakWord } from '../../utils/helpers';

export function Segments({ segments }) {
  return segments.map((seg, i) =>
    seg.bold ? (
      <strong key={i} className="gg-bold">{seg.text}</strong>
    ) : (
      <span key={i}>{seg.text}</span>
    )
  );
}

export function GuideBlocks({ blocks, lang = 'en-US' }) {
  return blocks.map((block, idx) => {
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

      case 'example': {
        // The bolded run inside an example line is always the target-language
        // sentence (the Uzbek translation follows unbolded) — that's what a
        // listener wants read aloud, not the translation.
        const speakText = block.segments.filter((s) => s.bold).map((s) => s.text).join(' ').trim();
        return (
          <div key={idx} className="gg-example">
            <span className="gg-example-mark">›</span>
            <p className="gg-example-text">
              <Segments segments={block.segments} />
            </p>
            {speakText && (
              <button
                type="button"
                className="gg-example-speak"
                onClick={() => speakWord(speakText, lang)}
                aria-label="Listen"
                title="Listen"
              >
                🔊
              </button>
            )}
          </div>
        );
      }

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
                      <td key={ci}><Segments segments={splitBoldSegments(cell)} /></td>
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
  });
}
