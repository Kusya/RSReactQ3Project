export default function CountryTableSkeleton() {
  const rows = Array.from({ length: 8 });

  return (
    <div className="overflow-x-auto animate-pulse">
      <table className="min-w-full  text-sm">
        <thead>
          <tr>
            <th className="px-4 py-2  text-center">Name</th>
            <th className="px-4 py-2  text-left">Population</th>
            <th className="px-4 py-2  text-left">ISO Code</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((_, idx) => (
            <tr key={idx}>
              <td className="px-4 py-2 ">
                <div className="h-4 bg-gray-300 rounded w-32"></div>
              </td>
              <td className="px-4 py-2 ">
                <div className="h-4 bg-gray-300 rounded w-24"></div>
              </td>
              <td className="px-4 py-2 ">
                <div className="h-4 bg-gray-300 rounded w-16"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
