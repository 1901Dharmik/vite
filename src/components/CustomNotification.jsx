import React from "react";
import { toast } from "sonner";
import { CircleCheck, ShieldAlert, Info, TriangleAlert } from "lucide-react";

const CustomNotification = ({ variant, message, duration = 4000 ,customText=" ", item}) => {
  const showNotification = () => {
    let icon;

    switch (variant) {
      case "success":
        icon = (
          <CircleCheck
            size={42}
            style={{
              color: "#118D57",
              // marginRight: "10px",
              padding: "10px",
              backgroundColor: "#e6f4ea",
              borderRadius: "12px",
            }}
          />
        );
        break;
      case "error":
        icon = (
          <ShieldAlert
            size={42}
            style={{
              color: "#B71D18",
              marginRight: "10px",
              padding: "10px",
              backgroundColor: "#fbeae9",
              borderRadius: "12px",
            }}
          />
        );
        break;
      case "info":
        icon = (
          <Info
            size={42}
            style={{
              color: "#006C9C",
              marginRight: "10px",
              padding: "10px",
              backgroundColor: "#e7f3fe",
              borderRadius: "12px",
            }}
          />
        );
        break;
      case "warning":
        icon = (
          <TriangleAlert
            size={42}
            style={{
              color: "orange",
              marginRight: "10px",
              padding: "10px",
              backgroundColor: "#fff4e5",
              borderRadius: "12px",
            }}
          />
        );
        break;
        case "addToCart":
          icon = (
            <img
              src={item?.images[0]?.url}
              style={{
                color: "orange",
                marginRight: "10px",
                padding: "10px",
                backgroundColor: "#fff4e5",
                borderRadius: "12px",
              }}
            />
          );
          break;
      default:
        icon = null;
        break;
    }

    toast.custom((t) => (
      <div className="toaster__info" style={{ display: 'flex', alignItems: 'center', backgroundColor: 'white', borderRadius: '12px', width: "100%", padding: '3px' }}>
        {icon}
        <div style={{ flexGrow: 1 }}>
          <p className='text-sm ml-1 p-1'>{message}</p>
          {customText && <p className='text-xs ml-1 text-gray-500'>{customText}</p>}
        </div>
        <button
          onClick={() => toast.dismiss(t)}
          style={{
            background: 'transparent',
            // border: 'none',
            color: 'black',
            fontSize: '16px',
            cursor: 'pointer',
            marginRight: '10px'
          }}
        >
          &#10005;
        </button>
      </div>
    ), { duration }); // Set the duration here
  };

  return (
    <div>
      <button onClick={showNotification}>Show Notification</button>
    </div>
  );
};

export default CustomNotification;

