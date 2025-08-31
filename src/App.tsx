import { Suspense } from 'react';
import './App.css';
import CountryTable from './components/CountryTable';
import CountryTableSkeleton from './components/CountrySkeletonTable';

function App() {
  return (
    <>
      <div className="min-h-screen">
        <Suspense fallback={<CountryTableSkeleton />}>
          <CountryTable />
        </Suspense>
      </div>
    </>
  );
}

export default App;
