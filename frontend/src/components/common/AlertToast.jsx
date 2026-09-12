import { useEffect, useState } from "react";

export default function AlertToast({ toast, onClose }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (toast) {
      setVisible(true);
      const t = setTimeout(() => {
        setVisible(false);
        setTimeout(() => onClose && onClose(), 300);
      }, 8000);
      return () => clearTimeout(t);
    }
  }, [toast, onClose]);

  if (!toast) return null;

  return (
    <div
      className={
        "fixed top-4 right-4 z-50 max-w-sm rounded-xl shadow-2xl border-l-4 border-red-500 bg-[#1a1d24] p-4 transition-all duration-300 " +
        (visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8")
      }
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl">🔥</span>
        <div className="flex-1">
          <div className="font-bold text-white">{toast.title}</div>
          <div className="text-sm text-gray-300 mt-1">{toast.body}</div>
        </div>
        <button
          onClick={() => { setVisible(false); setTimeout(() => onClose && onClose(), 300); }}
          className="text-gray-500 hover:text-white text-lg leading-none"
        >
          ×
        </button>
      </div>
    </div>
  );
}
