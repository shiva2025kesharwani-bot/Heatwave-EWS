export default function Card({ children, className = "" }) {
  return (
    <div className={`bg-[#1a1d24] rounded-xl p-4 border-l-4 border-orange-500 ${className}`}>
      {children}
    </div>
  );
}
