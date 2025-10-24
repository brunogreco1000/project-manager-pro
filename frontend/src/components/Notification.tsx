"use client";
import { useEffect } from "react";

interface NotificationProps {
  message: string;
  type?: "success" | "error";
  duration?: number;
  onClose: () => void;
}

export const Notification: React.FC<NotificationProps> = ({
  message,
  type = "success",
  duration = 3000,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const bgColor = type === "success" ? "bg-green-500" : "bg-red-500";

  return (
    <div
      className={`${bgColor} text-white p-3 rounded fixed top-4 right-4 shadow-lg`}
    >
      {message}
    </div>
  );
};

export default Notification;
