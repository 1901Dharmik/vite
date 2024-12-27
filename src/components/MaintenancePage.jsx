import { Clock } from "lucide-react";

export default function MaintenancePage({ message, estimatedDowntime }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Illustration Container */}
        <div className="mb-8 relative h-64">
          {/* Server Racks and Character Illustration */}
          <div className="flex items-center justify-center gap-4">
            <img src="/public/undraw_maintenance_re_59vn.svg" className="h-48" alt="" />
          </div>
        </div>

        {/* Text Content */}
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Site Under Maintenance
        </h2>
        <h1 className="text-4xl font-bold text-gray-900 mb-6">{message}</h1>
        {estimatedDowntime && (
          <p className="text-sm text-gray-500">
            Estimated downtime: {new Date(estimatedDowntime).toLocaleString()}
          </p>
        )}
      </div>
    </div>
  );
}
