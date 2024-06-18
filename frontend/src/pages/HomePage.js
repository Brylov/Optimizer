import React from 'react';
import AuditForm from '../components/AuditForm';
import SEOResult from '../components/SEOResult';
import useSEOAudit from '../hooks/useSEOAudit';

const HomePage = () => {
  const { results, loading, error, auditURL } = useSEOAudit();

  return (
    <div className="container mx-auto p-10 min-h-screen max-w-7xl">
      <h1 className="text-4xl font-bold mb-6 text-center">SEO Audit Tool</h1>
      <div className="max-w-lg mx-auto bg-white p-10 rounded-lg shadow-md">
        <AuditForm onSubmit={auditURL} />
        {loading && <p className="mt-4 text-center text-blue-500">Loading...</p>}
        {error && <p className="mt-4 text-center text-red-500">{error}</p>}
      </div>
      {results && <SEOResult results={results} />}
    </div>
  );
};

export default HomePage;
