import { Suspense } from 'react';
import './App.css';
import CountryTable from './components/CountryTable';
import CountryTableSkeleton from './components/CountrySkeletonTable';

function App() {
  return (
    <>
      <div className="min-h-screen bg-white text-gray-800">
        <div className="p-6">
          <Suspense fallback={<CountryTableSkeleton />}>
            <CountryTable />
          </Suspense>
        </div>
      </div>
    </>
  );
}

export default App;
