import React from 'react';

// Reusable Card Component that can be used throughout the admin dashboard
const Card = ({ 
  title, 
  description, 
  actionText, 
  actionUrl, 
  icon,
  className = '' 
}) => {
  return (
    <div className={`bg-transparent border border-white/20 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 ${className}`}>
      <div className="p-6">
        {icon && (
          <div className="mb-4 text-primary-600">
            {icon}
          </div>
        )}
        
        {title && (
          <h3 className="text-lg font-medium text-white-800 mb-2">
            {title}
          </h3>
        )}
        
        {description && (
          <p className="text-white-600 mb-4">
            {description}
          </p>
        )}
        
        {actionText && actionUrl && (
          <a 
            href={actionUrl} 
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
          >
            {actionText}
          </a>
        )}
      </div>
    </div>
  );
};

export default Card;