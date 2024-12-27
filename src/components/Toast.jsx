import React from "react";
import { toast } from "sonner";
import {
  CircleCheck,
  ShieldAlert,
  Info,
  TriangleAlert,
  XCircle,
} from "lucide-react";

// Define variant options and respective icons
const variants = {
  success: {
    icon: (
      <CircleCheck
        size={42}
        style={{
          color: "#118D57",
          padding: "10px",
          backgroundColor: "#e6f4ea",
          borderRadius: "12px",
        }}
      />
    ),
    bgColor: "#e7f9ee",
  },
  error: {
    icon: (
      <ShieldAlert
        size={42}
        style={{
          color: "red",
          padding: "10px",
          backgroundColor: "#fbeaea",
          borderRadius: "12px",
        }}
      />
    ),
    bgColor: "#f9e7e7",
  },
  warning: {
    icon: (
      <TriangleAlert
        size={42}
        style={{
          color: "orange",
          padding: "10px",
          backgroundColor: "#fff4e5",
          borderRadius: "12px",
        }}
      />
    ),
    bgColor: "#fff4e5",
  },
  info: {
    icon: (
      <Info
        size={42}
        style={{
          color: "blue",
          padding: "10px",
          backgroundColor: "#e7f5ff",
          borderRadius: "12px",
        }}
      />
    ),
    bgColor: "#e7f5ff",
  },
};

const NotificationComponent = ({ variant, message }) => {
  const { icon, bgColor } = variants[variant] || variants.info; // fallback to 'info'
  const displayMessage =
    typeof message == "string" ? message : JSON.stringify(message);

  return (
    <div class="cards-sec">
      <div class="img">{icon}</div>
      <div class="textBox">
        <div class="textContent">
          {/* <p class="h1">{message}</p> */}
          {/* <span class="span">12 min ago</span> */}
        </div>
        <p class="p">{displayMessage}</p>
        <button
          style={{
            background: "transparent",
            border: "none",
            position: "absolute",
            right: "10px",
            fontSize: "16px",
            bottom: "10px",
            cursor: "pointer",
            color: "#666",
          }}
          onClick={() => toast.dismiss()}
        > 
          <XCircle size={18} className="text-gray-500" />
        </button>
        {/* <div></div> */}
      </div>
    </div>
    // <div
    //   className="toaster__info"
    //   style={{
    //     display: "flex",
    //     alignItems: "center",
    //     justifyContent: "space-between",
    //     backgroundColor: "white",
    //     borderRadius: "12px",
    //     width: "100%",
    //     padding: "8px 10px",
    //     position: "relative",
    //     boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    //   }}
    // >
    //   <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
    //     {icon}
    //     {/* <span className="text-sm ml-1 p-1">{message}</span> */}
    //     <span>{displayMessage}</span>
    //   </div>

    //   {/* Dismiss Button */}
    //   <button
    //     style={{
    //       background: "transparent",
    //       border: "none",
    //       position: "absolute",
    //       right: "10px",
    //       fontSize: "16px",
    //       top: "10px",
    //       cursor: "pointer",
    //       color: "#666",
    //     }}
    //     onClick={() => toast.dismiss()}
    //   >
    //     <XCircle size={18} className="text-gray-500" />
    //   </button>
    // </div>
  );
};

// Function to trigger the toast with custom variant and optional duration
export default function triggerNotification(variant, message, duration = 2500) {
  toast(<NotificationComponent variant={variant} message={message} />, {
    duration,
  });
};

// export default triggerNotification;
