import { useEffect } from "react"
import type { ToastType } from "../ComponentInterfaces/ToastInterface"

export default function Toast({ message, type, duration, onClose }: ToastType) {

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration || 3000)
  }, [duration, onClose]);


  return (
    <>
      <div className={`fixed bottom-4 right-4 px-4 py-2 rounded-lg shadow-lg text-white ${type === "success"
          ? "bg-green-500"
          : type === "error"
            ? "bg-red-500"
            : "bg-blue-500"
        }`}
      >
        {message}
      </div>
    </>
  )
}