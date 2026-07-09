import { Component } from 'react';
import { RefreshCw, AlertOctagon } from 'lucide-react';
import { logError } from '../../utils/errorLogger';
import './ErrorBoundary.css';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    logError(error, { context: `react-boundary: ${info?.componentStack?.slice(0, 300) || ''}` });
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary-screen">
          <div className="error-boundary-icon"><AlertOctagon size={40} strokeWidth={2} /></div>
          <h2>Nimadir noto'g'ri ketdi</h2>
          <p>Kutilmagan xatolik yuz berdi. Sahifani qayta yuklab ko'ring.</p>
          <button className="error-boundary-btn" onClick={this.handleReload}>
            <RefreshCw size={16} strokeWidth={2.3} /> Qayta yuklash
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
