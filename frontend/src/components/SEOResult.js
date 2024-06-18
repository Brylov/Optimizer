import React from 'react';
import SEOScalameters from './SEOScalameters';
import SEOCheckers from './SEOCheckers';
import SEOResultsList from './SEOResultsList';
import monitorImage from '../assets/monitor.png'; // Adjust the path as needed

const SEOResult = ({ results }) => {
  // Example values for the scalameters, replace these with actual data
  const onPageScore = 80;
  const linksScore = 70;
  const usabilityScore = 90;
  const performanceScore = 60;
  const socialScore = 50;

  return (
    <div className="container mx-auto max-w-8xl p-4">
      <div className="mt-3 p-10 bg-white rounded-lg shadow-lg mb-10">
        <h2 className="text-2xl font-bold mb-4 text-center">SEO Analysis Results</h2>
        <div className="flex justify-end mb-8 relative">
          <div className="relative w-[450px] h-[400px]">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${monitorImage})` }}
            >
              {results[0]?.screenshot && (
                <img
                  src={`data:image/png;base64,${results[0].screenshot}`}
                  alt="Screenshot"
                  className="absolute top-[15%] left-[20%] w-[60%] h-[55%] object-contain"
                />
              )}
            </div>
          </div>
        </div>
        <SEOScalameters
          onPageScore={onPageScore}
          linksScore={linksScore}
          usabilityScore={usabilityScore}
          performanceScore={performanceScore}
          socialScore={socialScore}
        />
      </div>
      {results.length > 0 && (
        <div className="mt-3 p-10 bg-white rounded-lg shadow-lg mb-10">
          <SEOCheckers
            title={results[0]?.title}
            url={results[0]?.url}
            metaDescription={results[0]?.meta_description}
            hreflangTags={results[0]?.hreflang_tags || []}
            langAnalysis={results[0]?.lang_analysis || 'No lang attribute found'}
            h1Tags={results[0]?.h1 || []} h2Tags={results[0]?.h2 || []} h3Tags={results[0]?.h3 || []} h4Tags={results[0]?.h4 || []} h5Tags={results[0]?.h5 || []} h6Tags={results[0]?.h6 || []} 
                    />
        </div>
      )}
      {results.length > 0 && (
        <div className="mt-3 p-10 bg-white rounded-lg shadow-lg mb-10">
          <SEOResultsList results={results} />
        </div>
      )}
    </div>
  );
};

export default SEOResult;
