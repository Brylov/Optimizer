import React, { useState, useEffect } from 'react';
import { Transition } from '@headlessui/react';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/solid';

import useSEOTitleCheck from '../hooks/useSEOTitleCheck';

const SEOTitleChecker = ({ title }) => {
  const { result, checkTitle } = useSEOTitleCheck();
  const [showInfo, setShowInfo] = useState(false);

  // Trigger checkTitle once when the component mounts or the title changes
  useEffect(() => {
    if (title && !result) {
      checkTitle(title);
    }
  }, [title, checkTitle, result]);

  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  return (
    <div className="ml-10 mr-10 mb-7 rounded-lg bg-white transition-colors cursor-pointer duration-200" onClick={toggleInfo}>
      <div className="flex justify-between items-start">
        <div className="w-11/12">
          <h4 className="question font-bold text-lg mb-2 text-black">
            Title Tag
          </h4>
          {result && (
            <div className="answer field-value text-gray-700">
              <p>{result.result}</p>
              <p className="mt-2 font-semibold">{title}</p>
              <p className="mt-2 text-sm text-gray-600">Length: {title.length}</p>
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
            The Title Tag is an important HTML element that tells users and Search Engines what the topic of the webpage is and the type of keywords the page should rank for. The Title will appear in the Header Bar of a user's browser. It is also one of the most important (and easiest to improve) On-Page SEO factors.
          </p>
          <p className="how mb-2 text-gray-600">
            We recommend setting a keyword rich Title between 10–70 characters. This is often simple to enter into your CMS system or may need to be manually set in the header section of the HTML code.
          </p>
          <p className="more-info">
            <a href="/blog/title-tag/" target="_blank" className="text-blue-500 hover:underline">Learn more in our guide</a>
          </p>
        </div>
      </Transition>
    </div>
  );
};

export default SEOTitleChecker;
