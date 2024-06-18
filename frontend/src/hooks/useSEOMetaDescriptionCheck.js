import { useState } from 'react';

const useSEOMetaDescriptionCheck = () => {
  const [result, setResult] = useState(null);

  const checkMetaDescription = async (metaDescription) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/check_meta_description', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ metaDescription }),
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error fetching the meta description analysis:', error);
    }
  };

  return {
    result,
    checkMetaDescription,
  };
};

export default useSEOMetaDescriptionCheck;
