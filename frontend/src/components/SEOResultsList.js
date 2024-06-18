import React from 'react';

const SEOResultsList = ({ results }) => {
  return (
    <div>
      {results.map((item, index) => (
        <div key={index} className="mt-4 p-4 bg-gray-100 rounded-lg ">
          <h3 className="text-xl font-semibold mb-2 text-center">{item.url}</h3>
          <div className="mb-2">
            <span className="font-bold">Title:</span> {item.title}
          </div>
          <div className="mb-2">
            <span className="font-bold">Meta Description:</span> {item.meta_description}
          </div>
          <div className="mb-2">
            <span className="font-bold">H1:</span> {item.h1.join(', ')}
          </div>
          <div className="mb-2">
            <span className="font-bold">H2:</span> {item.h2.join(', ')}
          </div>
          <div className="mb-2">
            <span className="font-bold">H3:</span> {item.h3.join(', ')}
          </div>
          <div className="mb-2">
            <span className="font-bold">Word Count:</span> {item.word_count}
          </div>
          <div className="mb-2">
            <span className="font-bold">Images:</span> {item.images.join(', ')}
          </div>
          <div className="mb-2">
            <span className="font-bold">Alt Texts:</span> {item.alt_texts.join(', ')}
          </div>
          <div className="mb-2">
            <span className="font-bold">Internal Links:</span> {item.internal_links.join(', ')}
          </div>
          <div className="mb-2">
            <span className="font-bold">External Links:</span> {item.external_links.join(', ')}
          </div>
          <div className="mb-2">
            <span className="font-bold">Canonical:</span> {item.canonical}
          </div>
          <div className="mb-2">
            <span className="font-bold">Load Time:</span> {item.load_time} seconds
          </div>
          <div className="mb-2">
            <span className="font-bold">Title Analysis:</span> {item.title_analysis}
          </div>
          <div className="mb-2">
            <span className="font-bold">Meta Description Analysis:</span> {item.meta_description_analysis}
          </div>
          <div className="mb-2">
            <span className="font-bold">Images Analysis:</span> {item.images_analysis}
          </div>
          <div className="mb-2">
            <span className="font-bold">Canonical Analysis:</span> {item.canonical_analysis}
          </div>
          <div className="mb-2">
            <span className="font-bold">Headings Analysis:</span> {item.headings_analysis}
          </div>
          <div className="mb-2">
            <span className="font-bold">Load Time Analysis:</span> {item.load_time_analysis}
          </div>
          <div className="mb-2">
            <span className="font-bold">Internal Links Analysis:</span> {item.internal_links_analysis}
          </div>
          <div className="mb-2">
            <span className="font-bold">External Links Analysis:</span> {item.external_links_analysis}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SEOResultsList;
