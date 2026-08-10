import React from 'react';
import './VocLogo.css';

export default function VocLogo({ 
  collapsed = false, 
  size = 'md', // 'sm' | 'md' | 'lg'
  subTitle = null,
  className = ''
}) {
  return (
    <div className={`voc-logo-brand voc-logo--${size} ${collapsed ? 'collapsed' : ''} ${className}`}>
      <div className="voc-logo-img-wrap" title="VOCABRY">
        <img src="/logo.png" alt="VOCABRY" className="voc-logo-img" />
      </div>
      {!collapsed && (
        <div className="voc-logo-text-group">
          <span className="voc-logo-title">VOCABRY</span>
          {subTitle && <span className="voc-logo-subtitle">{subTitle}</span>}
        </div>
      )}
    </div>
  );
}
