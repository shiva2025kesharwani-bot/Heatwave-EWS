export default function Button({ children, ...props }) {
  return (
    <button
      {...props}
      className="px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600
                 text-black font-semibold transition"
    >
      {children}
    </button>
  );
}
