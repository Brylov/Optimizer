import { useState } from 'react';
import axios from 'axios';

const useSEOAudit = () => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const auditURL = async (url) => {
    setLoading(true);
    setResults(null);
    setError(null);

    try {
      const response = await axios.post('http://127.0.0.1:5000/audit', { url });
      setResults(response.data);
    } catch (err) {
      setError('Error fetching SEO data');
    } finally {
      setLoading(false);
    }
  };

  return { results, loading, error, auditURL };
};

export default useSEOAudit;
