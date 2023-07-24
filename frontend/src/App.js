import React from 'react';
import Router from './Router';
import { ParsedQueryProvider } from './providers/parsedQuery';

function App() {
  return (
    <ParsedQueryProvider>
    <div className="container">
      <React.Suspense fallback={<div>loading...</div>}>
        <Router/>
      </React.Suspense>
    </div>
    </ParsedQueryProvider>
  );
}

export default App;
