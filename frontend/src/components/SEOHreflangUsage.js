import React, { useState } from 'react';
import { Transition } from '@headlessui/react';
import { InformationCircleIcon } from '@heroicons/react/solid';

const SEOHreflangUsage = ({ hreflangTags, isSupported }) => {
  const [showInfo, setShowInfo] = useState(false);
  const [showLangs, setShowLangs] = useState(false);

  const toggleInfo = (e) => {
    e.stopPropagation();
    setShowInfo(!showInfo);
  };
  
  const toggleLangs = (e) => {
    e.stopPropagation();
    setShowLangs(!showLangs);
  };

  return (
    <div className="ml-5 mr-5 mb-7 p-4 rounded-lg bg-white transition-colors cursor-pointer duration-200" onClick={toggleInfo}> 
      <div className="flex justify-between items-start">
        <div>
          <h4 className="question font-bold text-lg mb-2 text-black">
            Hreflang Usage
          </h4>
          <p className="mb-4 text-gray-600">
            {isSupported
              ? 'Hreflang attributes are used in this page.'
              : 'No use of Hreflang attributes on this page.'}
          </p>
        </div>
        <div className="flex items-center">
          <InformationCircleIcon className="w-12 h-12 text-gray-400" onClick={toggleInfo} />
        </div>
      </div>
      <button
        className="ml-5 mt-2 text-gray-500 border p-1 hover:underline"
        onClick={toggleLangs}
      >
        {showLangs ? 'Hide Langs' : 'Show Langs'}
      </button>
      <Transition
        show={showLangs}
        enter="transition-opacity duration-150"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="ml-5 mr-5 flex border-2 p-4 justify-between rounded-lg items-start">
          <div className="w-11/12">
            <ul className="list-disc list-inside text-gray-800">
              {hreflangTags.length > 0 ? (
                hreflangTags.map((tag, index) => (
                  <li key={index}>{tag}</li>
                ))
              ) : (
                <li>No hreflang tags found.</li>
              )}
            </ul>
          </div>
        </div>
      </Transition>
      <Transition
        show={showInfo}
        enter="transition-opacity duration-150"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="check-info mt-4 pl-4 border-l-4 border-orange-300">
          <p className="what mb-2 text-gray-600">
            Hreflang tags are used to indicate the language and regional targeting of a webpage. This helps search engines serve the correct version of your site to users based on their language and region.
          </p>
          <p className="how mb-2 text-gray-600">
            Ensure that each hreflang tag is correctly implemented and points to the appropriate language or regional version of your page. This can help improve the visibility and relevance of your content in different regions and languages.
          </p>
        </div>
      </Transition>
    </div>
  );
};

export default SEOHreflangUsage;
