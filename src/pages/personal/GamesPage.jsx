import { useState, useMemo, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Gamepad2, Plus, Check, X, ExternalLink, Star,
  Clock, Trash2, CheckCircle2, Eye, Bookmark,
  Search, RefreshCw, AlertCircle, Edit3, ArrowLeft,
  Tv, Sparkles, Play, Info, Layers, Trophy, Monitor,
  Smartphone, LayoutGrid, List, Calendar
} from 'lucide-react';
import {
  useGamesTracker,
  PRESET_GAME_GENRES,
  GAME_PLATFORMS,
  computeGlobalGameStats
} from '../../hooks/useGamesTracker';
import { useLanguage } from '../../contexts/LanguageContext';
import { playSound } from '../../utils/feedback';
import './GamesPage.css';

export default function GamesPage() {
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    gameItems,
    loading,
    addGameItem,
    updateGameItem,
    setGameStatus,
    deleteGameItem,
  } = useGamesTracker();

  // Filters synced with URL searchParams & localStorage
  const [selectedPlatform, setSelectedPlatform] = useState(() => {
    return searchParams.get('platform') || localStorage.getItem('voc_games_platform_filter') || 'all';
  });

  const [selectedStatus, setSelectedStatus] = useState(() => {
    return searchParams.get('status') || localStorage.getItem('voc_games_status_filter') || 'all';
  });

  const [searchQuery, setSearchQuery] = useState(() => {
    return searchParams.get('search') || '';
  });

  // View Mode: 'grid' | 'list'
  const [viewMode, setViewMode] = useState(() => {
    return localStorage.getItem('voc_games_view_mode') || 'grid';
  });

  const handleSetViewMode = (mode) => {
    setViewMode(mode);
    localStorage.setItem('voc_games_view_mode', mode);
  };

  // Keep filter state synchronized with URL searchParams
  useEffect(() => {
    const platformFromUrl = searchParams.get('platform');
    if (platformFromUrl && platformFromUrl !== selectedPlatform) {
      setSelectedPlatform(platformFromUrl);
      localStorage.setItem('voc_games_platform_filter', platformFromUrl);
    }

    const statusFromUrl = searchParams.get('status');
    if (statusFromUrl && statusFromUrl !== selectedStatus) {
      setSelectedStatus(statusFromUrl);
      localStorage.setItem('voc_games_status_filter', statusFromUrl);
    }

    const searchFromUrl = searchParams.get('search');
    if (searchFromUrl !== null && searchFromUrl !== searchQuery) {
      setSearchQuery(searchFromUrl);
    }
  }, [searchParams]);

  // Handlers for filter changes
  const handleSelectPlatform = (platform) => {
    setSelectedPlatform(platform);
    localStorage.setItem('voc_games_platform_filter', platform);
    const newParams = new URLSearchParams(searchParams);
    if (platform && platform !== 'all') {
      newParams.set('platform', platform);
    } else {
      newParams.delete('platform');
    }
    setSearchParams(newParams);
  };

  const handleSelectStatus = (status) => {
    setSelectedStatus(status);
    localStorage.setItem('voc_games_status_filter', status);
    const newParams = new URLSearchParams(searchParams);
    if (status && status !== 'all') {
      newParams.set('status', status);
    } else {
      newParams.delete('status');
    }
    setSearchParams(newParams);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    const newParams = new URLSearchParams(searchParams);
    if (query) {
      newParams.set('search', query);
    } else {
      newParams.delete('search');
    }
    setSearchParams(newParams);
  };

  // Detail View State synced with URL query param `?id=...`
  const activeItemId = searchParams.get('id') || null;
  const actionParam = searchParams.get('action') || null;
  const editIdParam = searchParams.get('editId') || null;

  const isFormOpen = actionParam === 'add' || actionParam === 'edit';

  const setActiveItemId = (id) => {
    const newParams = new URLSearchParams(searchParams);
    if (id) {
      const currentY = window.scrollY || document.documentElement.scrollTop || 0;
      sessionStorage.setItem('voc_games_catalog_scroll_y', String(currentY));
      sessionStorage.setItem('voc_games_last_opened_id', id);
      newParams.set('id', id);
    } else {
      newParams.delete('id');
    }
    setSearchParams(newParams);
  };

  // Restore scroll position when returning to catalog
  useEffect(() => {
    if (!activeItemId && !isFormOpen) {
      const savedYStr = sessionStorage.getItem('voc_games_catalog_scroll_y');
      const lastId = sessionStorage.getItem('voc_games_last_opened_id');

      if (savedYStr !== null) {
        const targetY = parseInt(savedYStr, 10);
        const timer = setTimeout(() => {
          window.scrollTo({ top: targetY, behavior: 'auto' });

          if (lastId) {
            const cardEl = document.getElementById(`game-card-${lastId}`);
            if (cardEl) {
              cardEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
            }
          }
        }, 50);

        return () => clearTimeout(timer);
      }
    }
  }, [activeItemId, isFormOpen]);

  const [editingItem, setEditingItem] = useState(null);
  const [deleteModalItem, setDeleteModalItem] = useState(null);
  const [deleteStep, setDeleteStep] = useState(1);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    platform: 'PC',
    status: 'playing',
    genres: [],
    coverUrl: '',
    link: '',
    playtimeHours: 0,
    completionPct: 0,
    description: '',
    rating: 9.0,
    releaseYear: new Date().getFullYear(),
  });

  // Restore Form state from URL/draft
  useEffect(() => {
    if (actionParam === 'add') {
      setEditingItem(null);
      const savedDraft = sessionStorage.getItem('voc_games_add_draft');
      if (savedDraft) {
        try {
          const parsed = JSON.parse(savedDraft);
          if (parsed && typeof parsed === 'object') {
            setFormData(parsed);
          }
        } catch {}
      }
    } else if (actionParam === 'edit' && editIdParam && gameItems.length > 0) {
      const itemToEdit = gameItems.find(i => i.id === editIdParam);
      if (itemToEdit) {
        setEditingItem(itemToEdit);
        setFormData({
          title: itemToEdit.title || '',
          platform: itemToEdit.platform || 'PC',
          status: itemToEdit.status || 'plan_to_play',
          genres: itemToEdit.genres || [],
          coverUrl: itemToEdit.coverUrl || '',
          link: itemToEdit.link || '',
          playtimeHours: itemToEdit.playtimeHours || 0,
          completionPct: itemToEdit.completionPct || 0,
          description: itemToEdit.description || '',
          rating: itemToEdit.rating || 9.0,
          releaseYear: itemToEdit.releaseYear || new Date().getFullYear(),
        });
      }
    }
  }, [actionParam, editIdParam, gameItems]);

  // Persist Add Form draft
  useEffect(() => {
    if (actionParam === 'add' && formData.title) {
      sessionStorage.setItem('voc_games_add_draft', JSON.stringify(formData));
    }
  }, [formData, actionParam]);

  // Selected Detail Item
  const currentDetailItem = useMemo(() => {
    if (!activeItemId) return null;
    return gameItems.find(i => i.id === activeItemId) || null;
  }, [activeItemId, gameItems]);

  // Global Stats
  const globalStats = useMemo(() => computeGlobalGameStats(gameItems), [gameItems]);

  // Active / Most Recently Played Game for Hero Banner
  const featuredGame = useMemo(() => {
    if (!gameItems || gameItems.length === 0) return null;
    const playingItems = gameItems.filter(i => i.status === 'playing');
    if (playingItems.length > 0) {
      return playingItems.sort((a, b) => new Date(b.lastPlayedAt || b.updatedAt || 0) - new Date(a.lastPlayedAt || a.updatedAt || 0))[0];
    }
    return gameItems.sort((a, b) => new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0))[0];
  }, [gameItems]);

  // Filtered Catalog Items
  const filteredItems = useMemo(() => {
    return gameItems.filter(item => {
      // Platform filter
      if (selectedPlatform !== 'all') {
        const itemPlat = (item.platform || '').toLowerCase();
        const selPlat = selectedPlatform.toLowerCase();
        if (!itemPlat.includes(selPlat)) return false;
      }

      // Status filter
      if (selectedStatus !== 'all' && item.status !== selectedStatus) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const titleMatch = (item.title || '').toLowerCase().includes(q);
        const genreMatch = item.genres && item.genres.some(g => g.toLowerCase().includes(q));
        const platformMatch = (item.platform || '').toLowerCase().includes(q);
        if (!titleMatch && !genreMatch && !platformMatch) return false;
      }

      return true;
    });
  }, [gameItems, selectedPlatform, selectedStatus, searchQuery]);

  // Form Handlers
  const handleOpenAdd = () => {
    playSound('click');
    setEditingItem(null);
    setFormData({
      title: '',
      platform: 'PC',
      status: 'playing',
      genres: [],
      coverUrl: '',
      link: '',
      playtimeHours: 20,
      completionPct: 50,
      description: '',
      rating: 9.0,
      releaseYear: new Date().getFullYear(),
    });
    const newParams = new URLSearchParams(searchParams);
    newParams.set('action', 'add');
    newParams.delete('editId');
    setSearchParams(newParams);
  };

  const handleOpenEdit = (item, e) => {
    if (e) e.stopPropagation();
    playSound('click');
    setEditingItem(item);
    setFormData({
      title: item.title || '',
      platform: item.platform || 'PC',
      status: item.status || 'plan_to_play',
      genres: item.genres || [],
      coverUrl: item.coverUrl || '',
      link: item.link || '',
      playtimeHours: item.playtimeHours || 0,
      completionPct: item.completionPct || 0,
      description: item.description || '',
      rating: item.rating || 9.0,
      releaseYear: item.releaseYear || new Date().getFullYear(),
    });
    const newParams = new URLSearchParams(searchParams);
    newParams.set('action', 'edit');
    newParams.set('editId', item.id);
    setSearchParams(newParams);
  };

  const handleCloseForm = () => {
    playSound('click');
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('action');
    newParams.delete('editId');
    setSearchParams(newParams);
    sessionStorage.removeItem('voc_games_add_draft');
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    playSound('success');
    if (editingItem) {
      await updateGameItem(editingItem.id, formData);
    } else {
      await addGameItem(formData);
    }
    handleCloseForm();
  };

  const handleGenreToggle = (genre) => {
    setFormData(prev => {
      const exists = prev.genres.includes(genre);
      if (exists) {
        return { ...prev, genres: prev.genres.filter(g => g !== genre) };
      } else {
        return { ...prev, genres: [...prev.genres, genre] };
      }
    });
  };

  // Delete modal handlers
  const handleStartDelete = (item, e) => {
    if (e) e.stopPropagation();
    playSound('click');
    setDeleteModalItem(item);
    setDeleteStep(1);
  };

  const handleConfirmDelete = async () => {
    if (!deleteModalItem) return;
    playSound('delete');
    await deleteGameItem(deleteModalItem.id);
    if (activeItemId === deleteModalItem.id) {
      setActiveItemId(null);
    }
    setDeleteModalItem(null);
    setDeleteStep(1);
  };

  const renderStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return (
          <span className="game-status-badge completed">
            <CheckCircle2 size={12} />
            <span>Completed</span>
          </span>
        );
      case 'playing':
        return (
          <span className="game-status-badge playing">
            <Gamepad2 size={12} />
            <span>Playing</span>
          </span>
        );
      case 'plan_to_play':
        return (
          <span className="game-status-badge plan">
            <Bookmark size={12} />
            <span>Plan to Play</span>
          </span>
        );
      case 'on_hold':
        return (
          <span className="game-status-badge hold">
            <Clock size={12} />
            <span>On Hold</span>
          </span>
        );
      case 'dropped':
        return (
          <span className="game-status-badge dropped">
            <X size={12} />
            <span>Dropped</span>
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="games-media-page">
      {/* 1. ADD / EDIT FULL PAGE FORM OVERLAY */}
      {isFormOpen ? (
        <motion.div
          className="games-form-page"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
        >
          <div className="form-page-header">
            <button className="netflix-back-btn" onClick={handleCloseForm}>
              <ArrowLeft size={18} />
              <span>Back to Catalog</span>
            </button>
            <div>
              <h1 className="form-page-title">{editingItem ? 'Edit Game' : 'Add New Game'}</h1>
              <p className="form-page-subtitle">Track your gaming journey, playtime hours and progress</p>
            </div>
          </div>

          <form onSubmit={handleFormSubmit} className="form-page-content-grid">
            {/* LEFT CARD: Game Information */}
            <div className="form-section-card">
              <h3 className="section-card-title">
                <Gamepad2 size={20} className="section-icon" />
                <span>Game Details</span>
              </h3>

              <div className="form-group-n">
                <label>Game Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. The Last of Us Part I"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div className="form-row-2">
                <div className="form-group-n">
                  <label>Platform</label>
                  <select
                    value={formData.platform}
                    onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                  >
                    {GAME_PLATFORMS.map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group-n">
                  <label>Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    <option value="playing">Playing</option>
                    <option value="completed">Completed</option>
                    <option value="plan_to_play">Plan to Play</option>
                    <option value="on_hold">On Hold</option>
                    <option value="dropped">Dropped</option>
                  </select>
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-group-n">
                  <label>Playtime (Hours)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    value={formData.playtimeHours}
                    onChange={(e) => setFormData({ ...formData, playtimeHours: parseFloat(e.target.value) || 0 })}
                  />
                </div>

                <div className="form-group-n">
                  <label>Release Year</label>
                  <input
                    type="number"
                    placeholder="e.g. 2022"
                    value={formData.releaseYear}
                    onChange={(e) => setFormData({ ...formData, releaseYear: parseInt(e.target.value, 10) || '' })}
                  />
                </div>
              </div>

              <div className="form-group-n">
                <div className="label-with-value">
                  <label>Rating (1.0 - 10.0)</label>
                  <span className="rating-badge-preview">⭐ {formData.rating || 9.0} / 10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="0.1"
                  className="rating-range-input"
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) || 8.0 })}
                />
              </div>

              <div className="form-group-n">
                <label>Description / Notes</label>
                <textarea
                  rows="4"
                  placeholder="Notes about your playthrough, story thoughts or achievements..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="form-group-n">
                <label>Genres</label>
                <div className="genres-chip-grid">
                  {PRESET_GAME_GENRES.map(g => {
                    const selected = formData.genres.includes(g);
                    return (
                      <button
                        key={g}
                        type="button"
                        className={`genre-chip-btn ${selected ? 'selected' : ''}`}
                        onClick={() => handleGenreToggle(g)}
                      >
                        {selected && <Check size={12} />}
                        <span>{g}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* RIGHT CARD: Media Links & Live Image Preview */}
            <div className="form-section-card">
              <h3 className="section-card-title">
                <Sparkles size={20} className="section-icon" />
                <span>Cover Image & Links</span>
              </h3>

              {/* Live Image Preview */}
              <div className="poster-preview-box">
                <img
                  src={formData.coverUrl || 'https://cdn.akamai.steamstatic.com/steam/apps/1174180/header.jpg'}
                  alt="Cover Preview"
                  className="poster-preview-img"
                  onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80'; }}
                />
                <div className="poster-preview-overlay">
                  <span className="preview-label">Live Cover Preview</span>
                </div>
              </div>

              <div className="form-group-n">
                <label>Cover Image URL</label>
                <input
                  type="url"
                  placeholder="https://cdn.akamai.steamstatic.com/steam/apps/..."
                  value={formData.coverUrl}
                  onChange={(e) => setFormData({ ...formData, coverUrl: e.target.value })}
                />
                <small style={{ color: 'rgba(255,255,255,0.45)', marginTop: '4px', display: 'block', fontSize: '0.8rem' }}>
                  Paste a direct link to the game image or Steam CDN header URL.
                </small>
              </div>

              <div className="form-group-n">
                <label>Store / Info Link</label>
                <input
                  type="url"
                  placeholder="https://store.steampowered.com/app/..."
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                />
              </div>

              <div className="form-actions-bar" style={{ marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <button type="button" className="btn-cancel" onClick={handleCloseForm}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit-save">
                  {editingItem ? 'Save Changes' : 'Add Game'}
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      ) : activeItemId && currentDetailItem ? (
        /* 2. GAME DETAIL VIEW */
        (() => {
          return (
            <motion.div
              className="games-detail-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
            >
              <div className="detail-nav-header">
                <button className="netflix-back-btn" onClick={() => setActiveItemId(null)}>
                  <ArrowLeft size={18} />
                  <span>Back to Catalog</span>
                </button>

                <div className="detail-top-actions">
                  <button
                    className="btn-detail-edit"
                    onClick={(e) => handleOpenEdit(currentDetailItem, e)}
                  >
                    <Edit3 size={16} />
                    <span>Edit</span>
                  </button>
                  <button
                    className="btn-detail-delete"
                    onClick={(e) => handleStartDelete(currentDetailItem, e)}
                  >
                    <Trash2 size={16} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>

              <div className="netflix-detail-hero">
                <img
                  src={currentDetailItem.coverUrl || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80'}
                  alt={currentDetailItem.title}
                  className="detail-hero-poster"
                  onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80'; }}
                />

                <div className="detail-hero-info">
                  <div className="detail-tags-line">
                    <span className="platform-tag">{currentDetailItem.platform || 'PC'}</span>
                    {renderStatusBadge(currentDetailItem.status)}
                  </div>

                  <h1 className="detail-main-title">{currentDetailItem.title}</h1>

                  <div className="detail-stats-bar">
                    <div className="stat-item rating">
                      <Star size={16} fill="#fbbf24" stroke="#fbbf24" />
                      <span>{currentDetailItem.rating || 9.0} / 10</span>
                    </div>

                    {currentDetailItem.releaseYear && (
                      <div className="stat-item year">
                        <Calendar size={16} />
                        <span>{currentDetailItem.releaseYear}</span>
                      </div>
                    )}

                    <div className="stat-item playtime">
                      <Clock size={16} />
                      <span>{currentDetailItem.playtimeHours || 0} hrs played</span>
                    </div>
                  </div>

                  {/* Genres */}
                  {currentDetailItem.genres && currentDetailItem.genres.length > 0 && (
                    <div className="card-genres-list">
                      {currentDetailItem.genres.map(g => (
                        <span key={g} className="genre-badge">{g}</span>
                      ))}
                    </div>
                  )}

                  {/* Description */}
                  {currentDetailItem.description && (
                    <p className="hero-description">{currentDetailItem.description}</p>
                  )}

                  {/* Primary Actions */}
                  <div className="detail-cta-row">
                    {currentDetailItem.link && (
                      <a
                        href={currentDetailItem.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="detail-store-link"
                      >
                        <ExternalLink size={16} />
                        <span>Store Page</span>
                      </a>
                    )}

                    <div className="status-dropdown-box">
                      <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>Status:</label>
                      <select
                        value={currentDetailItem.status}
                        onChange={(e) => setGameStatus(currentDetailItem.id, e.target.value)}
                      >
                        <option value="playing">Playing</option>
                        <option value="completed">Completed</option>
                        <option value="plan_to_play">Plan to Play</option>
                        <option value="on_hold">On Hold</option>
                        <option value="dropped">Dropped</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })()
      ) : (
        /* 3. MAIN CATALOG VIEW */
        <>
          <div className="netflix-header-bar">
            <div className="netflix-brand-group">
              <div>
                <h1 className="netflix-page-title">Gaming Collection</h1>
                <p className="netflix-sub-title">Track your played games and gaming hours</p>
              </div>
            </div>

            <div className="netflix-header-right-actions">
              <div className="netflix-global-time-badge">
                <Clock size={16} className="time-badge-icon" />
                <div className="time-badge-text">
                  <span className="time-badge-label">Total Playtime:</span>
                  <span className="time-badge-value">{globalStats.totalPlayedHours} hrs</span>
                </div>
              </div>

              <button className="netflix-add-btn" onClick={handleOpenAdd}>
                <Plus size={18} />
                <span>Add Game</span>
              </button>
            </div>
          </div>

          {/* FEATURED HERO BANNER */}
          {featuredGame && !searchQuery && (
            <div className="netflix-hero-card">
              <img
                src={featuredGame.coverUrl || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80'}
                alt={featuredGame.title}
                className="hero-backdrop-img"
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80'; }}
              />
              <div className="hero-gradient-overlay" />

              <div className="hero-content">
                <div className="hero-tag-row">
                  <span className="hero-badge-n">GAME</span>
                  <span className="hero-type-tag">{featuredGame.platform || 'PC'}</span>
                </div>

                <h2 className="hero-title">{featuredGame.title}</h2>

                <div className="hero-meta-row">
                  <div className="hero-rating">
                    <Star size={14} fill="#fbbf24" stroke="#fbbf24" />
                    <span>{featuredGame.rating || 9.5}</span>
                  </div>
                  {featuredGame.releaseYear && <span>{featuredGame.releaseYear}</span>}
                  <span>{featuredGame.playtimeHours || 0} hrs</span>
                  {renderStatusBadge(featuredGame.status)}
                </div>

                <p className="hero-description">{featuredGame.description}</p>

                <div className="hero-action-row">
                  <button className="hero-info-btn" onClick={() => setActiveItemId(featuredGame.id)}>
                    <Info size={18} />
                    <span>Game Details</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Controls & Platform Switcher */}
          <div className="netflix-controls-section">
            <div className="netflix-nav-tabs">
              <div className="netflix-tab-group">
                <button
                  className={`netflix-tab-btn ${selectedPlatform === 'all' ? 'active' : ''}`}
                  onClick={() => handleSelectPlatform('all')}
                >
                  All Platforms
                </button>
                <button
                  className={`netflix-tab-btn ${selectedPlatform === 'PC' ? 'active' : ''}`}
                  onClick={() => handleSelectPlatform('PC')}
                >
                  PC
                </button>
                <button
                  className={`netflix-tab-btn ${selectedPlatform === 'PlayStation' ? 'active' : ''}`}
                  onClick={() => handleSelectPlatform('PlayStation')}
                >
                  PlayStation
                </button>
                <button
                  className={`netflix-tab-btn ${selectedPlatform === 'Xbox' ? 'active' : ''}`}
                  onClick={() => handleSelectPlatform('Xbox')}
                >
                  Xbox
                </button>
                <button
                  className={`netflix-tab-btn ${selectedPlatform === 'Switch' ? 'active' : ''}`}
                  onClick={() => handleSelectPlatform('Switch')}
                >
                  Nintendo Switch
                </button>
              </div>

              {/* Right Controls: View Mode, Status Filter & Search */}
              <div className="netflix-controls-right">
                <div className="view-mode-toggle">
                  <button
                    type="button"
                    className={`view-mode-btn ${viewMode === 'grid' ? 'active' : ''}`}
                    onClick={() => handleSetViewMode('grid')}
                    title="Grid View"
                  >
                    <LayoutGrid size={16} />
                  </button>
                  <button
                    type="button"
                    className={`view-mode-btn ${viewMode === 'list' ? 'active' : ''}`}
                    onClick={() => handleSetViewMode('list')}
                    title="List View"
                  >
                    <List size={16} />
                  </button>
                </div>

                <div className="netflix-status-select-wrapper">
                  <select
                    className="netflix-status-select-filter"
                    value={selectedStatus}
                    onChange={(e) => handleSelectStatus(e.target.value)}
                  >
                    <option value="all">All Statuses</option>
                    <option value="playing">Playing</option>
                    <option value="completed">Completed</option>
                    <option value="plan_to_play">Plan to Play</option>
                    <option value="on_hold">On Hold</option>
                    <option value="dropped">Dropped</option>
                  </select>
                </div>

                <div className="netflix-search-box">
                  <Search size={16} className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search game or genre..."
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="netflix-search-input"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Catalog Render */}
          {filteredItems.length > 0 ? (
            viewMode === 'grid' ? (
              /* GRID VIEW */
              <div className="netflix-cards-grid">
                {filteredItems.map((item) => (
                  <motion.div
                    key={item.id}
                    id={`game-card-${item.id}`}
                    className="netflix-card"
                    layout
                    whileHover={{ y: -6, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 380, damping: 22 }}
                    onClick={() => setActiveItemId(item.id)}
                  >
                    <div className="card-image-box">
                      <img
                        src={item.coverUrl || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80'}
                        alt={item.title}
                        className="card-poster"
                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80'; }}
                      />
                      <div className="card-dark-gradient" />

                      <div className="card-top-badges">
                        <div className="badge-rating-netflix">
                          <Star size={11} fill="#fbbf24" stroke="#fbbf24" />
                          <span>{item.rating || 9.0}</span>
                          {item.releaseYear && <span className="card-year-text">• {item.releaseYear}</span>}
                        </div>
                      </div>

                      <span className="card-type-chip">{item.platform || 'PC'}</span>
                    </div>

                    <div className="card-body">
                      <div className="card-title-row">
                        <h3 className="card-title-text">{item.title}</h3>
                      </div>

                      {item.genres && item.genres.length > 0 && (
                        <div className="card-genres-list">
                          {item.genres.slice(0, 3).map(g => (
                            <span key={g} className="genre-badge">{g}</span>
                          ))}
                        </div>
                      )}

                      <div className="card-netflix-progress">
                        <div className="progress-info-row">
                          <span className="card-duration-text">{item.playtimeHours || 0} hrs</span>
                          <div className="card-status-wrapper">
                            {renderStatusBadge(item.status)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              /* LIST VIEW */
              <div className="netflix-list-container">
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    id={`game-card-${item.id}`}
                    className="netflix-list-row"
                    layout
                    whileHover={{ scale: 1.004 }}
                    transition={{ duration: 0.15 }}
                    onClick={() => setActiveItemId(item.id)}
                  >
                    <div className="list-row-poster-box">
                      <img
                        src={item.coverUrl || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80'}
                        alt={item.title}
                        className="list-row-poster"
                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80'; }}
                      />
                    </div>

                    <div className="list-row-content">
                      <div className="list-row-header-box">
                        <span className="list-rank-badge">#{index + 1}</span>
                        <h3 className="list-row-title">{item.title}</h3>
                      </div>

                      <div className="list-row-meta">
                        <span className="list-meta-type">{item.platform || 'PC'}</span>
                        {item.releaseYear && <span className="meta-dot">•</span>}
                        {item.releaseYear && <span>{item.releaseYear}</span>}
                        <span className="meta-dot">•</span>
                        <span>{item.playtimeHours || 0} hrs played</span>
                      </div>

                      <div className="list-row-actions-row">
                        <div className="list-rating-box">
                          <Star size={13} fill="#fbbf24" stroke="#fbbf24" />
                          <span className="rating-score">{item.rating || 9.0}</span>
                        </div>

                        <div className="list-status-badge-wrap">
                          {renderStatusBadge(item.status)}
                        </div>
                      </div>
                    </div>

                    <div className="list-right-actions">
                      <button
                        className="list-row-right-info"
                        title="Details"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveItemId(item.id);
                        }}
                      >
                        <Info size={18} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )
          ) : (
            <div className="netflix-empty-box">
              <AlertCircle size={36} />
              <h3>No games found</h3>
              <p>Click "+ Add Game" to add your favorite games!</p>
              <button className="netflix-add-btn" onClick={handleOpenAdd}>
                <Plus size={18} />
                <span>Add Game</span>
              </button>
            </div>
          )}
        </>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalItem && (
        <div className="netflix-modal-backdrop" onClick={() => setDeleteModalItem(null)}>
          <div className="netflix-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon-warning">
              <Trash2 size={28} />
            </div>
            <h3>Delete Game?</h3>
            <p>Are you sure you want to delete <strong>{deleteModalItem.title}</strong>?</p>
            <div className="modal-actions-row">
              <button className="btn-modal-cancel" onClick={() => setDeleteModalItem(null)}>
                Cancel
              </button>
              <button className="btn-modal-delete-confirm" onClick={handleConfirmDelete}>
                Delete Game
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
