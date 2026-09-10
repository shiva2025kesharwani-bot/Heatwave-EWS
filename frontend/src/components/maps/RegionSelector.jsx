export default function RegionSelector({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-[#1a1d24] border border-gray-700 rounded-lg px-3 py-2"
    >
      <option value="india">India</option>
      <option value="delhi">Delhi</option>
      <option value="mumbai">Mumbai</option>
      <option value="chennai">Chennai</option>
    </select>
  );
}
