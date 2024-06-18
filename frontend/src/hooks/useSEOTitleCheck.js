import { useState } from 'react';

const useSEOTitleCheck = () => {
  const [result, setResult] = useState(null);

  const checkTitle = async (title) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/check_title', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error fetching the title analysis:', error);
    }
  };

  return {
    result,
    checkTitle,
  };
};

export default useSEOTitleCheck;
