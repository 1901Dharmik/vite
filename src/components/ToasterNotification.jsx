import React from "react";
import { toast, Toaster } from "sonner";
import {
  CircleCheck,
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  Info,
  Loader2,
  OctagonX,
} from "lucide-react";

const variantStyles = {
  default: "bg-white text-gray-900 border-gray-200",
  info: "bg-blue-50 text-blue-900 border-blue-200",
  warning: "bg-yellow-50 text-yellow-900 border-yellow-200",
  success: "bg-green-50 text-green-900 border-green-200",
  error: "bg-red-50 text-red-900 border-red-200",
  loading: "bg-white text-gray-900 border-gray-200",
};

const variantIcons = {
  default: null,
  info: <Info className="w-5 h-5 text-blue-500 " />,
  warning: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
  success: <CircleCheck className="w-5 h-5 text-green-500" />,
  error: <OctagonX className="w-5 h-5 text-red-500" />,
  loading: <Loader2 className="w-5 h-5 text-gray-500 animate-spin" />,
};

const CustomToast = ({
  title,
  description,
  variant = "default",
  action,
  actionLabel = "Action",
}) => {
  const Icon = variantIcons[variant];

  return (
    <div
      className={` w-[350px] flex items-start p-4 rounded-xl shadow-new-shadow border ${variantStyles[variant]}`}
    >
      <div className="flex justify-center items-center">
        {Icon && <div className="flex-shrink-0 mr-3">{Icon}</div>}
      </div>
      <div className="flex-grow min-w-0">
        <h3 className="text-sm font-medium">{title}</h3>
        {description && (
          <p className="mt-1 text-sm truncate opacity-90">{description}</p>
        )}
      </div>
      <div className="flex-shrink-0 ml-4 flex items-center space-x-2">
        {action && (
          <button
            onClick={action}
            className="px-2 py-1 text-xs font-medium rounded-md bg-white bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent focus:ring-white"
          >
            {actionLabel}
          </button>
        )}
        <button
          onClick={() => toast.dismiss()}
          className="px-2 py-1 text-xs font-medium rounded-md bg-white bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent focus:ring-white"
        >
          Dismiss
        </button>
        {/* {toast.custom((t) => (
          <div>
            <h1>Custom toast</h1>
            <button onClick={(t) => toast.dismiss(t)}>Dismiss</button>
          </div>
        ))} */}
        
      </div>
    </div>
  );
};

export const showToast = (props) => {
  const { duration = 3000 } = props
  toast.custom(() => <CustomToast {...props} />, { duration });
};

export default function ToasterNotification() {
  const handleAction = () => {
    console.log("Action clicked");
  };

  return (
    <div className="p-4 space-y-4">
      <button
        onClick={() =>
          showToast({
            title: "Default Toast",
            description: "This is a default toast message",
          })
        }
        className="px-4 py-2 bg-gray-200 rounded"
      >
        Show Default Toast
      </button>
      <button
        onClick={() =>
          showToast({
            title: "Info Toast",
            description: "This is an info message",
            variant: "info",
          })
        }
        className="px-4 py-2 bg-blue-200 rounded"
      >
        Show Info Toast
      </button>
      <button
        onClick={() =>
          showToast({
            title: "Warning Toast",
            description: "This is a warning message",
            variant: "warning",
          })
        }
        className="px-4 py-2 bg-yellow-200 rounded"
      >
        Show Warning Toast
      </button>
      <button
        onClick={() =>
          showToast({
            title: "Success Toast",
            description: "This is a success message",
            variant: "success",
          })
        }
        className="px-4 py-2 bg-green-200 rounded"
      >
        Show Success Toast
      </button>
      <button
        onClick={() =>
          showToast({
            title: "Error Toast",
            description: "This is an error message",
            variant: "error",
            // action: handleAction,
            // actionLabel: 'Retry',
          })
        }
        className="px-4 py-2 bg-red-200 rounded"
      >
        Show Error Toast
      </button>
      <button
        onClick={() =>
          showToast({
            title: "Loading Toast",
            description: "This is a loading message",
            variant: "loading",
          })
        }
        className="px-4 py-2 bg-gray-200 rounded"
      >
        Show Loading Toast
      </button>
      {/* <Toaster /> */}
    </div>
  );
}
