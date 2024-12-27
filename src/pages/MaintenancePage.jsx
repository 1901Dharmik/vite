import React from 'react';
import { Clock, Tool, Info } from 'lucide-react';

const MaintenancePage = ({ message, estimatedDowntime }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        <Tool className="mx-auto mb-6 text-yellow-500 w-16 h-16" />
        
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Site Under Maintenance
        </h1>
        
        <p className="text-gray-600 mb-6">
          {message || 'Our site is currently undergoing maintenance. Please check back soon.'}
        </p>
        
        {estimatedDowntime && (
          <div className="flex items-center justify-center mb-6">
            <Clock className="mr-2 text-blue-500" />
            <span className="text-gray-700">
              Estimated Downtime: {new Date(estimatedDowntime).toLocaleString()}
            </span>
          </div>
        )}
        
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
          <div className="flex items-center">
            <Info className="mr-2 text-blue-500" />
            <p className="text-blue-800 text-sm">
              We apologize for any inconvenience. Our team is working to restore services as quickly as possible.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaintenancePage;