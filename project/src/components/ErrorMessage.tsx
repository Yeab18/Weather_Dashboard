import React from 'react';
import { AlertCircle, RefreshCw, Wifi } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  type?: 'error' | 'network' | 'warning';
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  onRetry,
  type = 'error'
}) => {
  const getIcon = () => {
    switch (type) {
      case 'network':
        return <Wifi className="h-6 w-6" />;
      case 'warning':
        return <AlertCircle className="h-6 w-6" />;
      default:
        return <AlertCircle className="h-6 w-6" />;
    }
  };

  const getColors = () => {
    switch (type) {
      case 'network':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      default:
        return 'bg-red-50 border-red-200 text-red-800';
    }
  };

  return (
    <div className={`p-4 rounded-xl border ${getColors()} backdrop-blur-sm`}>
      <div className="flex items-center mb-2">
        {getIcon()}
        <h3 className="ml-2 text-lg font-semibold">
          {type === 'network' ? 'Connection Error' : 'Something went wrong'}
        </h3>
      </div>
      <p className="mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center px-4 py-2 bg-white/80 hover:bg-white transition-colors duration-200 rounded-lg font-medium"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Try Again
        </button>
      )}
    </div>
  );
};