import { useState, useMemo, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import {
  Film, Plus, Check, X, ExternalLink, Star,
  Clock, Trash2, CheckCircle2, Eye, Bookmark,
  Search, RefreshCw, AlertCircle, Edit3, ArrowLeft,
  Tv, Sparkles, ChevronRight, Repeat, Play, Info,
  Minus, Layers, AlertTriangle, Calendar, MoreVertical,
  GripVertical, LayoutGrid, List
} from 'lucide-react';
import {
  useMediaTracker,
  PRESET_GENRES,
  ONE_PIECE_ARCS,
  computeMediaStats,
  computeGlobalMediaStats,
  formatMinutesToHours,
  parseMinutes
} from '../../hooks/useMediaTracker';
import { useLanguage } from '../../contexts/LanguageContext';
import { playSound } from '../../utils/feedback';
import './MoviesPage.css';

export default function MoviesPage() {
  const { t, language } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    mediaItems,
    loading,
    addMediaItem,
    updateMediaItem,
    incrementWatchCount,
    setWatchStatus,
    toggleEpisodeWatched,
    addEpisodeToItem,
    updateEpisodeInItem,
    reorderEpisodesInItem,
    reorderMediaItems,
    deleteEpisodeFromItem,
    deleteMediaItem
  } = useMediaTracker();

  // Filters synced with URL searchParams & localStorage (F5 & Detail View navigation persistence)
  const [selectedType, setSelectedType] = useState(() => {
    return searchParams.get('type') || localStorage.getItem('voc_movies_type_filter') || 'all';
  });

  const [selectedStatus, setSelectedStatus] = useState(() => {
    return searchParams.get('status') || localStorage.getItem('voc_movies_status_filter') || 'all';
  });

  const [searchQuery, setSearchQuery] = useState(() => {
    return searchParams.get('search') || '';
  });

  // Keep filter state synchronized with URL searchParams
  useEffect(() => {
    const typeFromUrl = searchParams.get('type');
    if (typeFromUrl && typeFromUrl !== selectedType) {
      setSelectedType(typeFromUrl);
      localStorage.setItem('voc_movies_type_filter', typeFromUrl);
    } else if (!typeFromUrl && localStorage.getItem('voc_movies_type_filter')) {
      const savedType = localStorage.getItem('voc_movies_type_filter');
      if (savedType !== 'all') {
        setSelectedType(savedType);
      }
    }

    const statusFromUrl = searchParams.get('status');
    if (statusFromUrl && statusFromUrl !== selectedStatus) {
      setSelectedStatus(statusFromUrl);
      localStorage.setItem('voc_movies_status_filter', statusFromUrl);
    } else if (!statusFromUrl && localStorage.getItem('voc_movies_status_filter')) {
      const savedStatus = localStorage.getItem('voc_movies_status_filter');
      if (savedStatus !== 'all') {
        setSelectedStatus(savedStatus);
      }
    }

    const searchFromUrl = searchParams.get('search');
    if (searchFromUrl !== null && searchFromUrl !== searchQuery) {
      setSearchQuery(searchFromUrl);
    }
  }, [searchParams]);

  // Handlers for filter changes
  const handleSelectType = (type) => {
    setSelectedType(type);
    localStorage.setItem('voc_movies_type_filter', type);
    const newParams = new URLSearchParams(searchParams);
    if (type && type !== 'all') {
      newParams.set('type', type);
    } else {
      newParams.delete('type');
    }
    setSearchParams(newParams);
  };

  const handleSelectStatus = (status) => {
    setSelectedStatus(status);
    localStorage.setItem('voc_movies_status_filter', status);
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

  // View Mode: 'grid' | 'list'
  const [viewMode, setViewMode] = useState(() => {
    return localStorage.getItem('voc_movies_view_mode') || 'grid';
  });

  const handleSetViewMode = (mode) => {
    setViewMode(mode);
    localStorage.setItem('voc_movies_view_mode', mode);
  };

  // Detail View State synced with URL query param `?id=...` (F5 refresh persistence)
  const activeItemId = searchParams.get('id') || null;
  const actionParam = searchParams.get('action') || null;
  const editIdParam = searchParams.get('editId') || null;

  const isFormOpen = actionParam === 'add' || actionParam === 'edit';

  const setActiveItemId = (id) => {
    const newParams = new URLSearchParams(searchParams);
    if (id) {
      // Save current Y scroll position & target ID before opening detail view
      const currentY = window.scrollY || document.documentElement.scrollTop || 0;
      sessionStorage.setItem('voc_movies_catalog_scroll_y', String(currentY));
      sessionStorage.setItem('voc_movies_last_opened_id', id);
      newParams.set('id', id);
    } else {
      newParams.delete('id');
    }
    setSearchParams(newParams);
  };

  // Restore scroll position & bring clicked card back into view upon returning to catalog
  useEffect(() => {
    if (!activeItemId && !isFormOpen) {
      const savedYStr = sessionStorage.getItem('voc_movies_catalog_scroll_y');
      const lastId = sessionStorage.getItem('voc_movies_last_opened_id');

      if (savedYStr !== null) {
        const targetY = parseInt(savedYStr, 10);
        const timer = setTimeout(() => {
          window.scrollTo({ top: targetY, behavior: 'auto' });

          if (lastId) {
            const cardEl = document.getElementById(`media-card-${lastId}`);
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

  // 3-Step Delete Confirmation Modal State (Media Item)
  const [deleteModalItem, setDeleteModalItem] = useState(null);
  const [deleteStep, setDeleteStep] = useState(1);

  // 3-Step Delete Confirmation Modal State (Episode)
  const [deleteEpModal, setDeleteEpModal] = useState(null);
  const [deleteEpStep, setDeleteEpStep] = useState(1);

  // Episode Popover Menu State (Three Dots ":")
  const [openEpMenuId, setOpenEpMenuId] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    format: 'single', // 'single' | 'multi'
    type: 'movie',
    status: 'watching',
    genres: [],
    posterUrl: '',
    link: '',
    duration: '',
    description: '',
    rating: 8.5,
    releaseYear: '',
    watchCount: 1,
  });

  // Restore Add / Edit state & draft when URL actionParam changes (F5 refresh persistence)
  useEffect(() => {
    if (actionParam === 'add') {
      setEditingItem(null);
      const savedDraft = sessionStorage.getItem('voc_movies_add_draft');
      if (savedDraft) {
        try {
          const parsed = JSON.parse(savedDraft);
          if (parsed && typeof parsed === 'object') {
            setFormData(parsed);
          }
        } catch {
          // fallback
        }
      }
    } else if (actionParam === 'edit' && editIdParam && mediaItems.length > 0) {
      const itemToEdit = mediaItems.find(i => i.id === editIdParam);
      if (itemToEdit) {
        setEditingItem(itemToEdit);
        setFormData({
          title: itemToEdit.title || '',
          format: itemToEdit.format || (itemToEdit.type === 'movie' ? 'single' : 'multi'),
          type: itemToEdit.type || 'movie',
          status: itemToEdit.status || 'plan_to_watch',
          genres: itemToEdit.genres || [],
          posterUrl: itemToEdit.posterUrl || '',
          link: itemToEdit.link || '',
          duration: itemToEdit.duration || '',
          description: itemToEdit.description || '',
          rating: itemToEdit.rating || 8.0,
          releaseYear: itemToEdit.releaseYear || '',
          watchCount: typeof itemToEdit.watchCount === 'number'
            ? itemToEdit.watchCount
            : (itemToEdit.status === 'plan_to_watch' ? 0 : 1),
        });
      }
    }
  }, [actionParam, editIdParam, mediaItems]);

  // Persist Add Form draft to sessionStorage automatically
  useEffect(() => {
    if (actionParam === 'add' && formData.title) {
      sessionStorage.setItem('voc_movies_add_draft', JSON.stringify(formData));
    }
  }, [formData, actionParam]);

  // Episode Form & Edit Modal State
  const [newEpNum, setNewEpNum] = useState('');
  const [newEpTitle, setNewEpTitle] = useState('');
  const [newEpDuration, setNewEpDuration] = useState('');
  const [newEpDate, setNewEpDate] = useState('');
  const [editingEp, setEditingEp] = useState(null);

  const [epPage, setEpPage] = useState(1);
  const EPS_PER_PAGE = 50;

  const [selectedArcId, setSelectedArcId] = useState('all');
  const arcTabRefs = useRef({});

  // Selected Detail Item object
  const currentDetailItem = useMemo(() => {
    if (!activeItemId) return null;
    return mediaItems.find(i => i.id === activeItemId) || null;
  }, [activeItemId, mediaItems]);

  // Restore remembered selectedArcId from localStorage when detail item changes
  useEffect(() => {
    if (currentDetailItem) {
      const savedArcId = localStorage.getItem(`voc_active_arc_${currentDetailItem.id}`);
      if (savedArcId) {
        setSelectedArcId(savedArcId);
      } else {
        setSelectedArcId('all');
      }
    }
  }, [currentDetailItem?.id]);

  // Handle changing arc tab & saving to localStorage
  const handleSelectArc = (arcId) => {
    setSelectedArcId(arcId);
    if (currentDetailItem) {
      localStorage.setItem(`voc_active_arc_${currentDetailItem.id}`, arcId);
    }
  };

  // Auto-scroll active arc tab into view when active tab changes or detail item opens
  useEffect(() => {
    if (selectedArcId && arcTabRefs.current[selectedArcId]) {
      const timer = setTimeout(() => {
        arcTabRefs.current[selectedArcId]?.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [selectedArcId, currentDetailItem?.id]);

  // Compute Arc groups for current detail item with watched progress %
  const itemArcs = useMemo(() => {
    if (!currentDetailItem || !currentDetailItem.episodes || currentDetailItem.episodes.length === 0) return [];
    const eps = currentDetailItem.episodes;
    
    if (currentDetailItem.title.toLowerCase().includes('one piece')) {
      return ONE_PIECE_ARCS.map(arc => {
        const matchingEps = eps.filter(e => e.epNum >= arc.start && e.epNum <= arc.end);
        const epCount = matchingEps.length;
        const watchedCount = matchingEps.filter(e => e.watched).length;
        const pct = epCount > 0 ? Math.round((watchedCount / epCount) * 100) : 0;
        return { ...arc, epCount, watchedCount, pct };
      }).filter(arc => arc.epCount > 0);
    }
    
    // Fallback 50-episode blocks for other series
    const maxEp = Math.max(...eps.map(e => parseInt(e.epNum, 10) || 0), 1);
    const blocks = [];
    const blockSize = 50;
    for (let s = 1; s <= maxEp; s += blockSize) {
      const end = s + blockSize - 1;
      const matchingEps = eps.filter(e => e.epNum >= s && e.epNum <= end);
      const epCount = matchingEps.length;
      if (epCount > 0) {
        const watchedCount = matchingEps.filter(e => e.watched).length;
        const pct = Math.round((watchedCount / epCount) * 100);
        blocks.push({
          id: `block_${s}_${end}`,
          name: t('movies.blockName', { start: s, end }) || `${s} - ${end}-qismlar`,
          start: s,
          end,
          epCount,
          watchedCount,
          pct
        });
      }
    }
    return blocks;
  }, [currentDetailItem, t]);

  // Overall watched percentage for 'Barchasi' tab
  const allArcPct = useMemo(() => {
    if (!currentDetailItem || !currentDetailItem.episodes || currentDetailItem.episodes.length === 0) return 0;
    const eps = currentDetailItem.episodes;
    const watchedCount = eps.filter(e => e.watched).length;
    return Math.round((watchedCount / eps.length) * 100);
  }, [currentDetailItem]);

  // Displayed episodes filtered by Arc
  const displayedEpisodes = useMemo(() => {
    if (!currentDetailItem || !currentDetailItem.episodes) return [];
    const eps = currentDetailItem.episodes;
    if (selectedArcId === 'all') return eps;

    const arc = itemArcs.find(a => a.id === selectedArcId);
    if (!arc) return eps;

    return eps.filter(e => e.epNum >= arc.start && e.epNum <= arc.end);
  }, [currentDetailItem, selectedArcId, itemArcs]);

  // Next default episode number based on max existing epNum
  const nextDefaultEpNum = useMemo(() => {
    if (!currentDetailItem || !currentDetailItem.episodes || currentDetailItem.episodes.length === 0) {
      return 1;
    }
    const maxEp = Math.max(...currentDetailItem.episodes.map(e => parseInt(e.epNum, 10) || 0));
    return Math.max(1, maxEp + 1);
  }, [currentDetailItem]);

  // Global Watched Stats
  const globalStats = useMemo(() => {
    return computeGlobalMediaStats(mediaItems, language);
  }, [mediaItems, language]);

  // Featured Item for Netflix Top Hero Banner (Last active watching item)
  const featuredMedia = useMemo(() => {
    if (mediaItems.length === 0) return null;
    const watchingItems = mediaItems.filter(i => i.status === 'watching');
    if (watchingItems.length > 0) {
      return [...watchingItems].sort((a, b) => {
        const timeA = new Date(a.lastWatchedAt || a.updatedAt || a.createdAt || 0).getTime();
        const timeB = new Date(b.lastWatchedAt || b.updatedAt || b.createdAt || 0).getTime();
        return timeB - timeA;
      })[0];
    }
    return [...mediaItems].sort((a, b) => {
      const timeA = new Date(a.lastWatchedAt || a.updatedAt || a.createdAt || 0).getTime();
      const timeB = new Date(b.lastWatchedAt || b.updatedAt || b.createdAt || 0).getTime();
      return timeB - timeA;
    })[0];
  }, [mediaItems]);

  const handleOpenAdd = () => {
    sessionStorage.removeItem('voc_movies_add_draft');
    setEditingItem(null);
    setFormData({
      title: '',
      format: 'single',
      type: 'movie',
      status: 'watching',
      genres: ['Action'],
      posterUrl: '',
      link: '',
      duration: '2h 00m',
      description: '',
      rating: 8.5,
      releaseYear: '',
      watchCount: 1,
    });
    setSearchParams({ action: 'add' });
  };

  const handleOpenEdit = (item, e) => {
    if (e) e.stopPropagation();
    setEditingItem(item);
    setFormData({
      title: item.title || '',
      format: item.format || (item.type === 'movie' ? 'single' : 'multi'),
      type: item.type || 'movie',
      status: item.status || 'plan_to_watch',
      genres: item.genres || [],
      posterUrl: item.posterUrl || '',
      link: item.link || '',
      duration: item.duration || '',
      description: item.description || '',
      rating: item.rating || 8.0,
      releaseYear: item.releaseYear || '',
      watchCount: typeof item.watchCount === 'number' 
        ? item.watchCount 
        : (item.status === 'plan_to_watch' ? 0 : 1),
    });
    setSearchParams({ action: 'edit', editId: item.id });
  };

  const handleCloseForm = () => {
    sessionStorage.removeItem('voc_movies_add_draft');
    setEditingItem(null);
    if (editIdParam) {
      setSearchParams({ id: editIdParam });
    } else if (activeItemId) {
      setSearchParams({ id: activeItemId });
    } else {
      setSearchParams({});
    }
  };

  const handleStartDelete = (item, e) => {
    if (e) e.stopPropagation();
    setDeleteModalItem(item);
    setDeleteStep(1);
  };

  const handleConfirmDeleteStep = async () => {
    if (deleteStep === 1) {
      setDeleteStep(2);
    } else if (deleteStep === 2) {
      setDeleteStep(3);
    } else if (deleteStep === 3) {
      if (deleteModalItem) {
        await deleteMediaItem(deleteModalItem.id);
        if (activeItemId === deleteModalItem.id) {
          setActiveItemId(null);
        }
        playSound('correct');
      }
      setDeleteModalItem(null);
      setDeleteStep(1);
    }
  };

  const handleConfirmDeleteEpStep = async () => {
    if (!deleteEpModal || !currentDetailItem) return;

    if (deleteEpStep === 1) {
      setDeleteEpStep(2);
    } else if (deleteEpStep === 2) {
      setDeleteEpStep(3);
    } else if (deleteEpStep === 3) {
      await deleteEpisodeFromItem(currentDetailItem.id, deleteEpModal.id);
      playSound('correct');
      setDeleteEpModal(null);
      setDeleteEpStep(1);
    }
  };

  const toggleGenreSelection = (genre) => {
    setFormData(prev => {
      const exists = prev.genres.includes(genre);
      return {
        ...prev,
        genres: exists ? prev.genres.filter(g => g !== genre) : [...prev.genres, genre]
      };
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const computedWatchCount = formData.status === 'plan_to_watch' 
      ? 0 
      : (parseInt(formData.watchCount) > 0 ? parseInt(formData.watchCount) : 1);

    if (editingItem) {
      await updateMediaItem(editingItem.id, {
        title: formData.title,
        format: formData.format,
        type: formData.type,
        status: formData.status,
        genres: formData.genres,
        posterUrl: formData.posterUrl || 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=80',
        link: formData.link,
        duration: formData.format === 'single' ? formData.duration : '',
        description: formData.description,
        rating: parseFloat(formData.rating) || 8.0,
        watchCount: computedWatchCount,
      });
    } else {
      await addMediaItem({
        ...formData,
        posterUrl: formData.posterUrl || 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=80',
        watchCount: computedWatchCount,
      });
    }

    playSound('correct');
    handleCloseForm();
  };

  const handleAddEpisodeSubmit = async (e) => {
    e.preventDefault();
    if (!currentDetailItem) return;

    const parsedEpNum = parseInt(newEpNum) || nextDefaultEpNum;

    await addEpisodeToItem(currentDetailItem.id, {
      epNum: parsedEpNum,
      title: newEpTitle.trim(),
      duration: newEpDuration.trim(),
      watchedDate: newEpDate,
      watched: Boolean(newEpDate)
    });

    setNewEpNum('');
    setNewEpTitle('');
    setNewEpDuration('');
    setNewEpDate('');
    playSound('correct');
  };

  const handleOpenEpEdit = (ep, e) => {
    if (e) e.stopPropagation();
    setEditingEp({
      id: ep.id,
      epNum: ep.epNum || 1,
      title: ep.title || '',
      duration: ep.duration || '',
      watchedDate: ep.watchedDate || '',
      watched: Boolean(ep.watched)
    });
  };

  const handleSaveEpEdit = async (e) => {
    e.preventDefault();
    if (!currentDetailItem || !editingEp) return;
    await updateEpisodeInItem(currentDetailItem.id, editingEp.id, {
      epNum: parseInt(editingEp.epNum) || 1,
      title: editingEp.title,
      duration: editingEp.duration,
      watchedDate: editingEp.watchedDate,
      watched: editingEp.watched
    });
    playSound('correct');
    setEditingEp(null);
  };

  const handleQuickRewatch = (itemId, e) => {
    if (e) e.stopPropagation();
    incrementWatchCount(itemId, 1);
    playSound('correct');
  };

  // Filtered List
  const filteredItems = useMemo(() => {
    return mediaItems.filter((item) => {
      const matchSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.genres && item.genres.some(g => g.toLowerCase().includes(searchQuery.toLowerCase())));

      const matchStatus = selectedStatus === 'all' || item.status === selectedStatus;
      const matchType = selectedType === 'all' || item.type === selectedType;

      return matchSearch && matchStatus && matchType;
    });
  }, [mediaItems, searchQuery, selectedStatus, selectedType]);

  const getTypeLabel = (type) => {
    switch (type) {
      case 'movie': return t('movies.movie') || 'Kino';
      case 'series': return t('movies.series') || 'Serial';
      case 'anime': return t('movies.anime') || 'Anime';
      case 'cartoon': return t('movies.cartoon') || 'Multfilm';
      case 'documentary': return t('movies.documentary') || 'Hujjatli film';
      default: return type;
    }
  };

  const renderStatusBadge = (status) => {
    switch (status) {
      case 'watching':
        return (
          <span className="card-status-badge-static watching">
            <Eye size={11} />
            <span>{t('movies.watching')}</span>
          </span>
        );
      case 'completed':
        return (
          <span className="card-status-badge-static completed">
            <Check size={11} />
            <span>{t('movies.completed')}</span>
          </span>
        );
      case 'plan_to_watch':
      default:
        return (
          <span className="card-status-badge-static plan">
            <Bookmark size={11} />
            <span>{t('movies.plan_to_watch')}</span>
          </span>
        );
    }
  };

  return (
    <motion.div
      className="netflix-media-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* 1. FULL PAGE DEDICATED ADD / EDIT FORM VIEW */}
      {isFormOpen ? (
        <motion.div
          className="netflix-form-page"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
        >
          {/* Header */}
          <div className="form-page-header">
            <button
              className="netflix-back-btn"
              onClick={handleCloseForm}
            >
              <ArrowLeft size={18} />
              <span>{t('movies.backToCatalog')}</span>
            </button>

            <div>
              <h1 className="form-page-title">{editingItem ? t('movies.editTitle') : t('movies.addTitle')}</h1>
              <p className="form-page-subtitle">{t('movies.subtitle')}</p>
            </div>
          </div>

          {/* Form Content Grid */}
          <form onSubmit={handleFormSubmit} className="form-page-content-grid">
            {/* LEFT COLUMN: Main Metadata */}
            <div className="form-section-card">
              <h3 className="section-card-title">
                <Film size={20} className="section-icon" />
                <span>{t('movies.info')}</span>
              </h3>

              {/* Title */}
              <div className="form-group-n">
                <label>{t('movies.titleLabel')}</label>
                <input
                  type="text"
                  required
                  className="form-input-lg"
                  placeholder={t('movies.titlePlaceholder')}
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              {/* Format Selection Cards */}
              <div className="form-group-n">
                <label className="form-label-aligned">{t('movies.formatLabel')}:</label>
                <div className="format-cards-grid">
                  <div
                    type="button"
                    className={`format-card-btn ${formData.format === 'single' ? 'active' : ''}`}
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        format: 'single',
                        type: prev.type === 'series' ? 'movie' : prev.type
                      }));
                    }}
                  >
                    <div className="format-card-icon">
                      <Film size={20} />
                    </div>
                    <div className="format-card-text">
                      <span className="format-card-title">{t('movies.single')}</span>
                    </div>
                  </div>

                  <div
                    type="button"
                    className={`format-card-btn ${formData.format === 'multi' ? 'active' : ''}`}
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        format: 'multi',
                        type: prev.type === 'movie' ? 'series' : prev.type
                      }));
                    }}
                  >
                    <div className="format-card-icon">
                      <Tv size={20} />
                    </div>
                    <div className="format-card-text">
                      <span className="format-card-title">{t('movies.multi')}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Perfectly Aligned 3-Column Row for Type, Release Year, and Status */}
              <div className="form-row-3">
                <div className="form-group-n">
                  <label className="form-label-aligned">{t('movies.typeLabel')}:</label>
                  <select
                    className="form-control-aligned"
                    value={formData.type}
                    onChange={(e) => {
                      const newType = e.target.value;
                      const autoFormat = (newType === 'movie' || newType === 'cartoon') ? 'single' : 'multi';
                      setFormData(prev => ({ ...prev, type: newType, format: autoFormat }));
                    }}
                  >
                    <option value="movie">{t('movies.movie')}</option>
                    <option value="series">{t('movies.series')}</option>
                    <option value="anime">{t('movies.anime')}</option>
                    <option value="cartoon">{t('movies.cartoon')}</option>
                  </select>
                </div>

                <div className="form-group-n">
                  <label className="form-label-aligned">{t('movies.yearLabel')}:</label>
                  <input
                    type="number"
                    min="1900"
                    max="2030"
                    className="form-control-aligned"
                    placeholder={t('movies.yearPlaceholder')}
                    value={formData.releaseYear || ''}
                    onChange={(e) => setFormData({ ...formData, releaseYear: e.target.value })}
                  />
                </div>

                <div className="form-group-n">
                  <label className="form-label-aligned">{t('movies.statusLabel')}:</label>
                  <select
                    className="form-control-aligned"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    <option value="watching">{t('movies.watching')}</option>
                    <option value="completed">{t('movies.completed')}</option>
                    <option value="plan_to_watch">{t('movies.plan_to_watch')}</option>
                  </select>
                </div>
              </div>

              {/* Rating Slider & Badge */}
              <div className="form-group-n">
                <div className="label-with-value">
                  <label>{t('movies.ratingLabel')}:</label>
                  <span className="rating-badge-preview">⭐ {formData.rating || 8.0} / 10</span>
                </div>
                <input
                  type="range"
                  step="0.1"
                  min="1"
                  max="10"
                  className="rating-range-input"
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) || 8.0 })}
                />
              </div>

              {/* Duration Picker (Only for Single) */}
              {formData.format === 'single' && (() => {
                const currentTotalMins = parseMinutes(formData.duration);
                const currentHours = Math.floor(currentTotalMins / 60);
                const currentMins = currentTotalMins % 60;

                const handleHoursChange = (e) => {
                  const newHours = Math.max(0, parseInt(e.target.value, 10) || 0);
                  const newTotal = newHours * 60 + currentMins;
                  const formatted = newTotal > 0 ? (newHours > 0 ? `${newHours} ${language === 'en' ? 'hr' : language === 'ru' ? 'ч' : 'soat'} ${currentMins > 0 ? `${currentMins} min` : ''}`.trim() : `${currentMins} min`) : '';
                  setFormData(prev => ({ ...prev, duration: formatted }));
                };

                const handleMinsChange = (e) => {
                  const rawMins = Math.max(0, parseInt(e.target.value, 10) || 0);
                  const newMins = Math.min(59, rawMins);
                  const newTotal = currentHours * 60 + newMins;
                  const formatted = newTotal > 0 ? (currentHours > 0 ? `${currentHours} ${language === 'en' ? 'hr' : language === 'ru' ? 'ч' : 'soat'} ${newMins > 0 ? `${newMins} min` : ''}`.trim() : `${newMins} min`) : '';
                  setFormData(prev => ({ ...prev, duration: formatted }));
                };

                return (
                  <div className="form-group-n">
                    <label>{t('movies.durationLabel')}:</label>
                    <div className="duration-picker-grid">
                      <div className="duration-input-wrapper">
                        <input
                          type="number"
                          min="0"
                          max="24"
                          placeholder="0"
                          value={currentHours > 0 ? currentHours : ''}
                          onChange={handleHoursChange}
                        />
                        <span className="duration-unit-badge">{language === 'en' ? 'hr' : language === 'ru' ? 'ч' : 'soat'}</span>
                      </div>
                      <div className="duration-input-wrapper">
                        <input
                          type="number"
                          min="0"
                          max="59"
                          placeholder="0"
                          value={currentMins > 0 ? currentMins : ''}
                          onChange={handleMinsChange}
                        />
                        <span className="duration-unit-badge">min</span>
                      </div>
                    </div>
                    <div className="duration-preview-text">
                      {currentTotalMins > 0 ? (
                        <span>{t('movies.duration')}: <strong>{formatMinutesToHours(currentTotalMins, language)}</strong></span>
                      ) : null}
                    </div>
                  </div>
                );
              })()}

              {/* Genre Selection Chips */}
              <div className="form-group-n">
                <label>{t('movies.genresLabel')}:</label>
                <div className="netflix-genres-chips">
                  {PRESET_GENRES.map(g => {
                    const isSelected = formData.genres.includes(g);
                    return (
                      <button
                        key={g}
                        type="button"
                        className={`genre-chip ${isSelected ? 'selected' : ''}`}
                        onClick={() => toggleGenreSelection(g)}
                      >
                        {isSelected && <Check size={12} />}
                        <span>{g}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Media Links & Poster Live Preview */}
            <div className="form-section-card">
              <h3 className="section-card-title">
                <Sparkles size={20} className="section-icon" />
                <span>{t('movies.posterUrlLabel')}</span>
              </h3>

              {/* Poster Live Preview */}
              <div className="poster-preview-box">
                <img
                  src={formData.posterUrl || 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=80'}
                  alt="Poster Preview"
                  className="poster-preview-img"
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=80'; }}
                />
              </div>

              <div className="form-group-n">
                <label>{t('movies.posterUrlLabel')}:</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={formData.posterUrl}
                  onChange={(e) => setFormData({ ...formData, posterUrl: e.target.value })}
                />
              </div>

              <div className="form-group-n">
                <label>{t('movies.watchLinkLabel')}:</label>
                <input
                  type="url"
                  placeholder="https://www.netflix.com, https://kinopoisk.ru..."
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                />
              </div>

              <div className="form-group-n">
                <label>{t('movies.descriptionLabel')}:</label>
                <textarea
                  rows={4}
                  placeholder={t('movies.descriptionPlaceholder')}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              {/* Submit Actions */}
              <div className="form-page-actions">
                <button
                  type="button"
                  className="btn-form-cancel"
                  onClick={handleCloseForm}
                >
                  {t('movies.cancelBtn')}
                </button>

                <button type="submit" className="btn-form-submit">
                  <Check size={18} />
                  <span>{t('movies.saveBtn')}</span>
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      ) : currentDetailItem ? (() => {
        const stats = computeMediaStats(currentDetailItem);
        const pct = stats.totalEpisodes > 0 ? Math.round((stats.watchedEpisodes / stats.totalEpisodes) * 100) : 0;
        const episodesList = currentDetailItem.episodes || [];
        const isOnePiece = Boolean(
          currentDetailItem &&
          (currentDetailItem.id === 'one-piece-anime' || currentDetailItem.title.toLowerCase().includes('one piece'))
        );
        const totalPages = Math.ceil(episodesList.length / EPS_PER_PAGE) || 1;
        const paginatedEps = episodesList.slice((epPage - 1) * EPS_PER_PAGE, epPage * EPS_PER_PAGE);

        return (
          <motion.div
            className="netflix-detail-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
          >
            {/* Navigation Bar */}
            <div className="detail-nav-header">
              <button className="netflix-back-btn" onClick={() => setActiveItemId(null)}>
                <ArrowLeft size={18} />
                <span>{t('movies.backToCatalog')}</span>
              </button>

              <div className="detail-top-actions">
                <button
                  className="btn-detail-edit"
                  onClick={(e) => handleOpenEdit(currentDetailItem, e)}
                >
                  <Edit3 size={16} />
                  <span>{t('movies.edit')}</span>
                </button>
                {!isOnePiece && (
                  <button
                    className="btn-detail-delete"
                    onClick={(e) => handleStartDelete(currentDetailItem, e)}
                  >
                    <Trash2 size={16} />
                    <span>{t('movies.delete')}</span>
                  </button>
                )}
              </div>
            </div>

            {/* Netflix Detail Hero Card */}
            <div className="netflix-detail-hero">
              <img
                src={currentDetailItem.posterUrl || 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=80'}
                alt={currentDetailItem.title}
                className="detail-hero-poster"
              />

              <div className="detail-hero-info">
                <div className="detail-tags-line">
                  <span className="detail-format-badge">
                    {currentDetailItem.format === 'multi' ? t('movies.multi') : t('movies.single')}
                  </span>
                  <span className="detail-type-badge">
                    {getTypeLabel(currentDetailItem.type)}
                  </span>
                </div>

                <h1 className="detail-main-title">{currentDetailItem.title}</h1>

                <div className="detail-stats-bar">
                  <div className="stat-item rating">
                    <Star size={16} fill="#fbbf24" stroke="#fbbf24" />
                    <span>{currentDetailItem.rating || 8.0} / 10</span>
                  </div>

                  {currentDetailItem.releaseYear && (
                    <div className="stat-item year">
                      <Calendar size={16} />
                      <span>{currentDetailItem.releaseYear}</span>
                    </div>
                  )}

                  {currentDetailItem.format === 'single' ? (
                    <div className="stat-item">
                      <Clock size={16} />
                      <span>
                        {formatMinutesToHours(stats.singleMin, language)}
                        {currentDetailItem.watchCount > 1 ? ` (${formatMinutesToHours(stats.watchedMinutes, language)})` : ''}
                      </span>
                    </div>
                  ) : (
                    <div className="stat-item">
                      <Clock size={16} />
                      <span>{t('movies.totalDuration')}: {formatMinutesToHours(stats.watchedMinutes, language)}</span>
                    </div>
                  )}

                  {/* WATCH COUNT CONTROLLER (Faqat 1 qismli filmlar uchun) */}
                  {currentDetailItem.format === 'single' && (
                    <div className="rewatch-counter-box">
                      <Repeat size={14} className="rewatch-icon" />
                      <span className="rewatch-label">{t('movies.watchedCountLabel')}:</span>
                      <div className="count-controls">
                        <button
                          className="count-btn"
                          title="-"
                          onClick={() => incrementWatchCount(currentDetailItem.id, -1)}
                        >
                          -
                        </button>
                        <span className="count-value">{currentDetailItem.watchCount || 1}x</span>
                        <button
                          className="count-btn"
                          title="+"
                          onClick={() => incrementWatchCount(currentDetailItem.id, 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  )}
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
                      className="btn-netflix-watch"
                    >
                      <Play size={18} fill="#ffffff" />
                      <span>{t('movies.watchNow')}</span>
                    </a>
                  )}

                  <div className="status-dropdown-box">
                    <label>{t('movies.statusLabel')}:</label>
                    <select
                      value={currentDetailItem.status}
                      onChange={(e) => setWatchStatus(currentDetailItem.id, e.target.value)}
                    >
                      <option value="watching">{t('movies.watching')}</option>
                      <option value="completed">{t('movies.completed')}</option>
                      <option value="plan_to_watch">{t('movies.plan_to_watch')}</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Multi-Episode Manager Section */}
            {currentDetailItem.format === 'multi' && (
              <div className="netflix-episodes-panel">
                <div className="episodes-panel-header">
                  <div>
                    <h2>{t('movies.episodesList')}</h2>
                    <div className="ep-progress-summary">
                      {t('movies.episodesProgressSummary', { watched: stats.watchedEpisodes, total: stats.totalEpisodes, pct })} | {t('movies.totalDuration')}: <strong>{formatMinutesToHours(stats.watchedMinutes, language)}</strong>
                    </div>
                  </div>

                  {/* Add Episode Form v2 */}
                  {!isOnePiece && (
                    <form className="add-episode-form-v2" onSubmit={handleAddEpisodeSubmit}>
                      <input
                        type="number"
                        min="1"
                        className="add-ep-input"
                        style={{ width: '85px' }}
                        placeholder={`#${nextDefaultEpNum}`}
                        title={t('movies.epNum')}
                        value={newEpNum}
                        onChange={(e) => setNewEpNum(e.target.value)}
                      />
                      <input
                        type="text"
                        className="add-ep-input"
                        placeholder={t('movies.epTitle')}
                        value={newEpTitle}
                        onChange={(e) => setNewEpTitle(e.target.value)}
                      />
                      <input
                        type="text"
                        className="add-ep-input"
                        style={{ width: '135px' }}
                        placeholder={t('movies.epDuration')}
                        value={newEpDuration}
                        onChange={(e) => setNewEpDuration(e.target.value)}
                      />
                      <input
                        type="date"
                        className="add-ep-input"
                        style={{ width: '135px' }}
                        title={t('movies.watchedDate')}
                        value={newEpDate}
                        onChange={(e) => setNewEpDate(e.target.value)}
                      />
                      <button type="submit" className="netflix-add-btn">
                        <Plus size={16} />
                        <span>{t('movies.addEpisode')}</span>
                      </button>
                    </form>
                  )}
                </div>

                <div className="netflix-progress-track" style={{ height: '8px', marginBottom: '1.5rem' }}>
                  <div className="netflix-progress-bar" style={{ width: `${pct}%` }} />
                </div>

                {itemArcs.length > 0 && (
                  <div className="ep-pagination-row">
                    <button
                      ref={el => arcTabRefs.current['all'] = el}
                      className={`arc-tab-pill ${selectedArcId === 'all' ? 'active' : ''} ${allArcPct === 100 ? 'completed' : ''}`}
                      onClick={() => handleSelectArc('all')}
                      title={`${t('movies.allArcs')}: ${allArcPct}%`}
                    >
                      <div className="arc-pill-fill" style={{ width: `${allArcPct}%` }} />
                      <div className="arc-pill-content">
                        <span>{t('movies.allArcs')}</span>
                        <span className="arc-tab-count">{currentDetailItem.episodes ? currentDetailItem.episodes.length : 0} • {allArcPct}%</span>
                      </div>
                    </button>
                    {itemArcs.map(arc => (
                      <button
                        key={arc.id}
                        ref={el => arcTabRefs.current[arc.id] = el}
                        className={`arc-tab-pill ${selectedArcId === arc.id ? 'active' : ''} ${arc.pct === 100 ? 'completed' : ''}`}
                        onClick={() => handleSelectArc(arc.id)}
                        title={`${arc.name}: ${arc.watchedCount}/${arc.epCount} (${arc.pct}%)`}
                      >
                        <div className="arc-pill-fill" style={{ width: `${arc.pct}%` }} />
                        <div className="arc-pill-content">
                          <span>{arc.name}</span>
                          <span className="arc-tab-count">Ep {arc.start}-{arc.end} • {arc.pct}%</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {displayedEpisodes.length > 0 ? (
                  <Reorder.Group
                    axis="y"
                    values={displayedEpisodes}
                    onReorder={async (newOrder) => {
                      if (currentDetailItem) {
                        if (selectedArcId === 'all') {
                          await reorderEpisodesInItem(currentDetailItem.id, newOrder);
                        } else {
                          const arc = itemArcs.find(a => a.id === selectedArcId);
                          if (arc) {
                            const nonArcEps = (currentDetailItem.episodes || []).filter(e => e.epNum < arc.start || e.epNum > arc.end);
                            const fullMerged = [...nonArcEps, ...newOrder].sort((a, b) => (Number(b.epNum) || 0) - (Number(a.epNum) || 0));
                            await reorderEpisodesInItem(currentDetailItem.id, fullMerged);
                          }
                        }
                      }
                    }}
                    className="episodes-list-column"
                  >
                    {displayedEpisodes.map((ep) => {
                      const epMins = parseMinutes(ep.duration) || 24;
                      const isMenuOpen = openEpMenuId === ep.id;

                      return (
                        <Reorder.Item
                          key={ep.id}
                          value={ep}
                          className={`netflix-ep-row ${ep.watched ? 'watched' : ''}`}
                        >
                          {!isOnePiece && (
                            <div className="ep-drag-handle">
                              <GripVertical size={16} />
                            </div>
                          )}

                          <div
                            className="ep-left-section"
                            onClick={() => toggleEpisodeWatched(currentDetailItem.id, ep.id)}
                          >
                            {ep.watched ? (
                              <CheckCircle2 size={20} className="ep-check-circle" />
                            ) : (
                              <div className="ep-uncheck-circle" />
                            )}

                            <div className="ep-details-col">
                              <span className="ep-name-title">{ep.title}</span>
                              <div className="ep-metadata-badges">
                                <span className="ep-meta-chip">
                                  <Clock size={12} />
                                  <span>{formatMinutesToHours(epMins, language)}</span>
                                </span>
                                {ep.watched && ep.watchedDate && (
                                  <span className="ep-meta-chip watched-date">
                                    <Calendar size={12} />
                                    <span>{ep.watchedDate}</span>
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="ep-row-actions">
                            <div className="ep-menu-popover-wrapper">
                              <button
                                type="button"
                                className="ep-dots-btn"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setOpenEpMenuId(isMenuOpen ? null : ep.id);
                                }}
                              >
                                <MoreVertical size={18} />
                              </button>

                              <AnimatePresence>
                                {isMenuOpen && (
                                  <motion.div
                                    className="ep-dropdown-menu"
                                    initial={{ opacity: 0, scale: 0.9, y: -5 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: -5 }}
                                    transition={{ duration: 0.15 }}
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <button
                                      type="button"
                                      className="ep-menu-item edit"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setOpenEpMenuId(null);
                                        handleOpenEpEdit(ep, e);
                                      }}
                                    >
                                      <Edit3 size={14} />
                                      <span>{t('movies.edit')}</span>
                                    </button>
                                    {!isOnePiece && (
                                      <button
                                        type="button"
                                        className="ep-menu-item delete"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setOpenEpMenuId(null);
                                          setDeleteEpModal(ep);
                                          setDeleteEpStep(1);
                                        }}
                                      >
                                        <Trash2 size={14} />
                                        <span>{t('movies.delete')}</span>
                                      </button>
                                    )}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          </div>
                        </Reorder.Item>
                      );
                    })}
                  </Reorder.Group>
                ) : (
                  <div className="netflix-empty-box">
                    <AlertCircle size={32} />
                    <p>{t('movies.noEpisodes')}</p>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        );
      })() : (
        /* MAIN CATALOG LIST VIEW */
        <>
          {/* Header Bar */}
          <div className="netflix-header-bar">
            <div className="netflix-brand-group">
              <div>
                <h1 className="netflix-page-title">{t('movies.title')}</h1>
                <p className="netflix-sub-title">{t('movies.subtitle')}</p>
              </div>
            </div>

            <div className="netflix-header-right-actions">
              <div className="netflix-global-time-badge">
                <Clock size={16} className="time-badge-icon" />
                <div className="time-badge-text">
                  <span className="time-badge-label">{t('movies.totalDuration')}:</span>
                  <span className="time-badge-value">{globalStats.formattedWatchedTime} ({globalStats.totalWatchedMinutes.toLocaleString()} min)</span>
                </div>
              </div>
            </div>
          </div>

          {/* NETFLIX FEATURED HERO BANNER */}
          {featuredMedia && !searchQuery && (
            <div className="netflix-hero-card">
              <img
                src={featuredMedia.posterUrl || 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80'}
                alt={featuredMedia.title}
                className="hero-backdrop-img"
              />
              <div className="hero-gradient-overlay" />

              <div className="hero-content">
                <div className="hero-tag-row">
                  <span className="hero-badge-n">N</span>
                  <span className="hero-type-tag">{getTypeLabel(featuredMedia.type)}</span>
                </div>

                <h2 className="hero-title">{featuredMedia.title}</h2>

                <div className="hero-meta-row">
                  <div className="hero-rating">
                    <Star size={14} fill="#fbbf24" stroke="#fbbf24" />
                    <span>{featuredMedia.rating || 9.5}</span>
                  </div>
                  {featuredMedia.releaseYear && (
                    <>
                      <span>•</span>
                      <span>{featuredMedia.releaseYear}</span>
                    </>
                  )}
                  <span>•</span>
                  <span>{featuredMedia.format === 'multi' ? t('movies.multi') : t('movies.single')}</span>
                  {featuredMedia.genres && (
                    <>
                      <span>•</span>
                      <span>{featuredMedia.genres.slice(0, 3).join(', ')}</span>
                    </>
                  )}
                </div>

                {featuredMedia.description && (
                  <p className="hero-description">{featuredMedia.description}</p>
                )}

                <div className="hero-actions-row">
                  {featuredMedia.link ? (
                    <a
                      href={featuredMedia.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hero-play-btn"
                    >
                      <Play size={18} fill="#000000" />
                      <span>{t('movies.watchNow')}</span>
                    </a>
                  ) : (
                    <button className="hero-play-btn" onClick={() => setActiveItemId(featuredMedia.id)}>
                      <Play size={18} fill="#000000" />
                      <span>{t('movies.watchNow')}</span>
                    </button>
                  )}

                  <button className="hero-info-btn" onClick={() => setActiveItemId(featuredMedia.id)}>
                    <Info size={18} />
                    <span>{t('movies.info')}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Controls & Category Switcher with Right-Aligned Search Box */}
          <div className="netflix-controls-section">
            <div className="netflix-nav-tabs">
              <div className="netflix-tab-group">
                <button
                  className={`netflix-tab-btn ${selectedType === 'all' ? 'active' : ''}`}
                  onClick={() => handleSelectType('all')}
                >
                  {t('movies.allArcs')}
                </button>
                <button
                  className={`netflix-tab-btn ${selectedType === 'movie' ? 'active' : ''}`}
                  onClick={() => handleSelectType('movie')}
                >
                  {t('movies.movie')}
                </button>
                <button
                  className={`netflix-tab-btn ${selectedType === 'series' ? 'active' : ''}`}
                  onClick={() => handleSelectType('series')}
                >
                  {t('movies.series')}
                </button>
                <button
                  className={`netflix-tab-btn ${selectedType === 'anime' ? 'active' : ''}`}
                  onClick={() => handleSelectType('anime')}
                >
                  {t('movies.anime')}
                </button>
                <button
                  className={`netflix-tab-btn ${selectedType === 'cartoon' ? 'active' : ''}`}
                  onClick={() => handleSelectType('cartoon')}
                >
                  {t('movies.cartoon')}
                </button>
              </div>

              {/* Right Side Actions: View Mode Toggle, Status Filter Dropdown & Search Box */}
              <div className="netflix-controls-right">
                <div className="view-mode-toggle">
                  <button
                    type="button"
                    className={`view-mode-btn ${viewMode === 'grid' ? 'active' : ''}`}
                    onClick={() => handleSetViewMode('grid')}
                    title={t('movies.gridView') || 'Setka'}
                  >
                    <LayoutGrid size={16} />
                  </button>
                  <button
                    type="button"
                    className={`view-mode-btn ${viewMode === 'list' ? 'active' : ''}`}
                    onClick={() => handleSetViewMode('list')}
                    title={t('movies.listView') || 'Ro\'yxat'}
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
                    <option value="all">{t('movies.allStatuses')}</option>
                    <option value="watching">{t('movies.watching')}</option>
                    <option value="completed">{t('movies.completed')}</option>
                    <option value="plan_to_watch">{t('movies.plan_to_watch')}</option>
                  </select>
                </div>

                <div className="netflix-search-box">
                  <Search size={16} className="search-icon" />
                  <input
                    type="text"
                    placeholder={t('movies.searchPlaceholder')}
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="netflix-search-input"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Grid vs List View of Media Items */}
          {loading ? (
            <div className="netflix-loading-box">
              <RefreshCw size={24} className="spin" />
              <span>{t('read.loading')}</span>
            </div>
          ) : filteredItems.length > 0 ? (
            viewMode === 'grid' ? (
              <div className="netflix-cards-grid">
                {filteredItems.map((item) => {
                  const stats = computeMediaStats(item);
                  const pct = stats.totalEpisodes > 0 ? Math.round((stats.watchedEpisodes / stats.totalEpisodes) * 100) : 0;
                  const watchCount = typeof item.watchCount === 'number' ? item.watchCount : (item.status === 'completed' ? 1 : 0);

                  return (
                    <motion.div
                      key={item.id}
                      id={`media-card-${item.id}`}
                      className="netflix-card"
                      layout
                      whileHover={{ y: -6, scale: 1.02 }}
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 22
                      }}
                      onClick={() => setActiveItemId(item.id)}
                    >
                      {/* Poster & Overlay */}
                      <div className="card-image-box">
                        <img
                          src={item.posterUrl || 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=80'}
                          alt={item.title}
                          className="card-poster"
                        />
                        <div className="card-dark-gradient" />

                        <div className="card-top-badges">
                          <div className="badge-rating-netflix">
                            <Star size={11} fill="#fbbf24" stroke="#fbbf24" />
                            <span>{item.rating || 8.0}</span>
                            {item.releaseYear && <span className="card-year-text">• {item.releaseYear}</span>}
                          </div>
                        </div>

                        <span className="card-type-chip">{getTypeLabel(item.type)}</span>
                      </div>

                      {/* Card Body */}
                      <div className="card-body">
                        <div className="card-title-row">
                          <h3 className="card-title-text">{item.title}</h3>
                        </div>

                        {/* Genres */}
                        {item.genres && item.genres.length > 0 && (
                          <div className="card-genres-list">
                            {item.genres.slice(0, 3).map(g => (
                              <span key={g} className="genre-badge">{g}</span>
                            ))}
                          </div>
                        )}

                        {/* Progress Indicator & Time + Status Row */}
                        <div className="card-netflix-progress">
                          <div className="progress-info-row">
                            <span className="card-duration-text">
                              {item.format === 'multi' ? t('movies.episodesProgress', { watched: stats.watchedEpisodes, total: stats.totalEpisodes }) : (item.duration || t('movies.single'))}
                            </span>
                            <div className="card-status-wrapper">
                              {item.format === 'multi' && <span className="pct-red">{pct}%</span>}
                              {renderStatusBadge(item.status)}
                            </div>
                          </div>

                          {item.format === 'multi' && (
                            <div className="netflix-progress-track">
                              <div className="netflix-progress-bar" style={{ width: `${pct}%` }} />
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              /* LIST VIEW */
              <div className="netflix-list-container">
                {filteredItems.map((item, index) => {
                  const stats = computeMediaStats(item);
                  const pct = stats.totalEpisodes > 0 ? Math.round((stats.watchedEpisodes / stats.totalEpisodes) * 100) : 0;

                  return (
                    <motion.div
                      key={item.id}
                      id={`media-card-${item.id}`}
                      className="netflix-list-row"
                      layout
                      whileHover={{ scale: 1.004 }}
                      transition={{ duration: 0.15 }}
                      onClick={() => setActiveItemId(item.id)}
                    >
                      {/* Poster Box with + Quick Add Badge */}
                      <div className="list-row-poster-box">
                        <img
                          src={item.posterUrl || 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=80'}
                          alt={item.title}
                          className="list-row-poster"
                        />
                        <button
                          className="list-poster-add-btn"
                          title="Quick Edit / Update"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenEdit(item);
                          }}
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      {/* Content Info */}
                      <div className="list-row-content">
                        {/* Rank Badge & Title */}
                        <div className="list-row-header-box">
                          <span className="list-rank-badge">#{index + 1}</span>
                          <h3 className="list-row-title">{item.title}</h3>
                        </div>

                        {/* Sub Metadata line: Year · Duration · Type */}
                        <div className="list-row-meta">
                          {item.releaseYear && <span>{item.releaseYear}</span>}
                          {item.releaseYear && <span className="meta-dot">·</span>}
                          <span>
                            {item.format === 'multi'
                              ? t('movies.episodesProgress', { watched: stats.watchedEpisodes, total: stats.totalEpisodes })
                              : (item.duration || t('movies.single'))}
                          </span>
                          <span className="meta-dot">·</span>
                          <span className="list-meta-type">{getTypeLabel(item.type)}</span>
                        </div>

                        {/* Rating Row & Quick Actions */}
                        <div className="list-row-actions-row">
                          <div className="list-rating-box">
                            <Star size={14} fill="#fbbf24" stroke="#fbbf24" />
                            <span className="rating-score">{item.rating || 8.0}</span>
                            <span className="rating-votes">(1.5M)</span>
                          </div>

                          <button
                            className="list-action-btn rate-btn"
                            title="Rate item"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenEdit(item);
                            }}
                          >
                            <Star size={13} />
                            <span>Rate</span>
                          </button>

                          <button
                            className={`list-action-btn status-btn status-${item.status}`}
                            title="Toggle status"
                            onClick={(e) => {
                              e.stopPropagation();
                              const nextStatus =
                                item.status === 'completed'
                                  ? 'watching'
                                  : item.status === 'watching'
                                  ? 'plan_to_watch'
                                  : 'completed';
                              setWatchStatus(item.id, nextStatus);
                              playSound('click');
                            }}
                          >
                            <Eye size={14} />
                            <span>
                              {item.status === 'completed'
                                ? 'Marked as watched'
                                : item.status === 'watching'
                                ? 'Watching'
                                : 'Mark as watched'}
                            </span>
                          </button>
                        </div>
                      </div>

                      {/* Right Side Info Circle Button */}
                      <button
                        className="list-row-right-info"
                        title={t('movies.info')}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveItemId(item.id);
                        }}
                      >
                        <Info size={20} />
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            )
          ) : (
            <div className="netflix-empty-box">
              <AlertCircle size={36} />
              <h3>{t('movies.emptyCatalogTitle')}</h3>
              <p>{t('movies.emptyCatalogHint')}</p>
              <button className="netflix-add-btn" onClick={handleOpenAdd}>
                <Plus size={16} />
                <span>{t('movies.addMedia')}</span>
              </button>
            </div>
          )}
        </>
      )}

      {/* EPISODE EDIT MODAL */}
      <AnimatePresence>
        {editingEp && (
          <div className="netflix-modal-overlay" onClick={() => setEditingEp(null)}>
            <motion.div
              className="netflix-modal-box"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="netflix-modal-header">
                <h2>{t('movies.editEpTitle')}</h2>
                <button className="netflix-close-btn" onClick={() => setEditingEp(null)}>
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSaveEpEdit} className="netflix-modal-body">
                <div className="form-row-2">
                  <div className="form-group-n">
                    <label>{t('movies.epNum')} *</label>
                    <input
                      type="number"
                      min="1"
                      required
                      value={editingEp.epNum}
                      onChange={(e) => setEditingEp({ ...editingEp, epNum: parseInt(e.target.value) || 1 })}
                    />
                  </div>

                  <div className="form-group-n">
                    <label>{t('movies.epTitle')}</label>
                    <input
                      type="text"
                      placeholder={t('movies.epTitle')}
                      value={editingEp.title}
                      onChange={(e) => setEditingEp({ ...editingEp, title: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row-2">
                  <div className="form-group-n">
                    <label>{t('movies.epDuration')}</label>
                    <input
                      type="text"
                      placeholder="24 min"
                      value={editingEp.duration}
                      onChange={(e) => setEditingEp({ ...editingEp, duration: e.target.value })}
                    />
                  </div>

                  <div className="form-group-n">
                    <label>{t('movies.watchedDate')}</label>
                    <input
                      type="date"
                      value={editingEp.watchedDate}
                      onChange={(e) => setEditingEp({ ...editingEp, watchedDate: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group-n">
                  <label>{t('movies.statusLabel')}</label>
                  <select
                    value={editingEp.watched ? "watched" : "unwatched"}
                    onChange={(e) => {
                      const isW = e.target.value === "watched";
                      setEditingEp({
                        ...editingEp,
                        watched: isW,
                        watchedDate: isW ? (editingEp.watchedDate || new Date().toISOString().split('T')[0]) : editingEp.watchedDate
                      });
                    }}
                  >
                    <option value="unwatched">{t('movies.markUnwatched')}</option>
                    <option value="watched">{t('movies.markWatched')}</option>
                  </select>
                </div>

                <div className="netflix-modal-footer">
                  <button type="button" className="btn-n-secondary" onClick={() => setEditingEp(null)}>
                    {t('movies.cancelBtn')}
                  </button>
                  <button type="submit" className="btn-n-primary">
                    {t('movies.saveEpBtn')}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3-STEP DELETE CONFIRMATION MODAL */}
      <AnimatePresence>
        {deleteModalItem && (
          <div className="netflix-modal-overlay" onClick={() => setDeleteModalItem(null)}>
            <motion.div
              className="delete-modal-box"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="delete-steps-bar">
                <span className={`step-pill ${deleteStep >= 1 ? 'active' : ''}`}>1</span>
                <span className={`step-pill ${deleteStep >= 2 ? 'active' : ''}`}>2</span>
                <span className={`step-pill ${deleteStep >= 3 ? 'active' : ''}`}>3</span>
              </div>

              <div className="delete-warning-card">
                <img
                  src={deleteModalItem.posterUrl || 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=80'}
                  alt={deleteModalItem.title}
                />
                <div className="delete-warning-info">
                  <h4>{deleteModalItem.title}</h4>
                  <p>
                    {deleteStep === 1 && (t('movies.deleteStep1Msg', { title: deleteModalItem.title }) || `1/3: ${deleteModalItem.title}?`)}
                    {deleteStep === 2 && (t('movies.deleteStep2Msg') || '2/3')}
                    {deleteStep === 3 && (t('movies.deleteStep3Msg') || '3/3')}
                  </p>
                </div>
              </div>

              <div className="netflix-modal-footer">
                <button type="button" className="btn-n-secondary" onClick={() => setDeleteModalItem(null)}>
                  {t('movies.cancelBtn')}
                </button>
                
                <button
                  type="button"
                  className={deleteStep === 3 ? "btn-danger-confirm" : "btn-n-primary"}
                  onClick={handleConfirmDeleteStep}
                >
                  {deleteStep < 3 ? `Step ${deleteStep}/3 →` : t('movies.deleteConfirmBtn')}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3-STEP DELETE CONFIRMATION MODAL (EPISODE) */}
      <AnimatePresence>
        {deleteEpModal && (
          <div className="netflix-modal-overlay" onClick={() => setDeleteEpModal(null)}>
            <motion.div
              className="delete-modal-box"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="delete-steps-bar">
                <span className={`step-pill ${deleteEpStep >= 1 ? 'active' : ''}`}>1</span>
                <span className={`step-pill ${deleteEpStep >= 2 ? 'active' : ''}`}>2</span>
                <span className={`step-pill ${deleteEpStep >= 3 ? 'active' : ''}`}>3</span>
              </div>

              <div className="delete-warning-card">
                <div className="delete-warning-info">
                  <h4>{deleteEpModal.title}</h4>
                  <p>
                    {deleteEpStep === 1 && (t('movies.deleteEpStep1Msg', { epNum: deleteEpModal.epNum }) || `1/3: #${deleteEpModal.epNum}`)}
                    {deleteEpStep === 2 && (t('movies.deleteEpStep2Msg') || '2/3')}
                    {deleteEpStep === 3 && (t('movies.deleteEpStep3Msg') || '3/3')}
                  </p>
                </div>
              </div>

              <div className="netflix-modal-footer">
                <button type="button" className="btn-n-secondary" onClick={() => setDeleteEpModal(null)}>
                  {t('movies.cancelBtn')}
                </button>
                
                <button
                  type="button"
                  className={deleteEpStep === 3 ? "btn-danger-confirm" : "btn-n-primary"}
                  onClick={handleConfirmDeleteEpStep}
                >
                  {deleteEpStep < 3 ? `Step ${deleteEpStep}/3 →` : t('movies.deleteConfirmBtn')}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Action Button (FAB) */}
      {!currentDetailItem && !isFormOpen && (
        <motion.button
          className="netflix-fab-add-btn"
          onClick={handleOpenAdd}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          title={t('movies.addMedia')}
        >
          <Plus size={26} strokeWidth={2.5} />
        </motion.button>
      )}
    </motion.div>
  );
}
