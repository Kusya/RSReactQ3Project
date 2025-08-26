export default function CountryTableSkeleton() {
  const rows = Array.from({ length: 8 });

  return (
    <div className="overflow-x-auto animate-pulse">
      <table className="min-w-full border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border text-left">Name</th>
            <th className="px-4 py-2 border text-left">Population (Latest)</th>
            <th className="px-4 py-2 border text-left">ISO Code</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((_, idx) => (
            <tr key={idx}>
              <td className="px-4 py-2 border">
                <div className="h-4 bg-gray-200 rounded w-32"></div>
              </td>
              <td className="px-4 py-2 border">
                <div className="h-4 bg-gray-200 rounded w-24"></div>
              </td>
              <td className="px-4 py-2 border">
                <div className="h-4 bg-gray-200 rounded w-16"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
