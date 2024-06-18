import React, { useState, useEffect } from 'react';
import { Transition } from '@headlessui/react';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/solid';
import useSEOMetaDescriptionCheck from '../hooks/useSEOMetaDescriptionCheck';

const SEOTitleChecker = ({ metaDescription }) => {
  const { result, checkMetaDescription } = useSEOMetaDescriptionCheck();
  const [showInfo, setShowInfo] = useState(false);

  // Trigger checkTitle once when the component mounts or the title changes
  useEffect(() => {
    if (metaDescription && !result) {
      checkMetaDescription(metaDescription);
    }
  }, [metaDescription, checkMetaDescription, result]); 

  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  return (
    <div className="ml-10 mr-10 mb-7 rounded-lg bg-white transition-colors cursor-pointer duration-200" onClick={toggleInfo}>
      <div className="flex justify-between items-start">
        <div className="w-11/12">
          <h4 className="question font-bold text-lg mb-2 text-black">
            Meta Description
          </h4>
          {result && (
            <div className="answer field-value text-gray-700">
              <p>{result.result}</p>
              <p className="mt-2 font-semibold">{metaDescription}</p>
              <p className="mt-2 text-sm text-gray-600">Length: {metaDescription.length}</p>
            </div>
          )}
        </div>
        <div className="w-1/12 flex items-center justify-center">
          <div className="widget-bg-color-icon p-2 rounded-full">
            {result?.status === 'V' ? (
              <CheckCircleIcon className="w-12 h-12 text-green-500" />
            ) : (
              <XCircleIcon className="w-12 h-12 text-red-500" />
            )}
          </div>
        </div>
      </div>
      <Transition
        show={showInfo}
        enter="transition-opacity duration-150"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0">
        <div className="check-info mt-4 pl-4 border-l-4 border-orange-300">
          <p className="what mb-2 text-gray-600">
          Meta Description is another important HTML element that explains more descriptively to Search Engines what your page is about. Meta Descriptions are often used as the text snippets used in Search Engine results (though Search Engines are inceasingly generating these themselves) and can help further signal to Search Engines what keywords your page should rank for.
          </p>
          <p className="how mb-2 text-gray-600">
          Make sure your page has a Meta Description included, and is at an optimum length (between 70 and 160 characters). Make your Meta Description text interesting and easy to comprehend. Use phrases and keywords relevant to the page and user that you would like to rank for. Meta Description is normally available to be updated in your CMS.
          </p>
          <p className="more-info">
            <a href="/blog/meta-description/" target="_blank" className="text-blue-500 hover:underline">Learn more in our guide</a>
          </p>
        </div>
      </Transition>
    </div>
  );
};

export default SEOTitleChecker;
