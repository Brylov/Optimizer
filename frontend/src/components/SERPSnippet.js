import React, { useState } from 'react';
import { Transition } from '@headlessui/react';
import { InformationCircleIcon } from '@heroicons/react/solid';

const SERPSnippet = ({ title, url, metaDescription }) => {
  const [showInfo, setShowInfo] = useState(false);

  const formattedUrl = url
    ? url.startsWith('http://') || url.startsWith('https://')
      ? url
      : `https://${url}`
    : 'URL not available';
  const displayUrl = formattedUrl.replace(/^https?:\/\//, '') + ' ⋮';

  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  return (
    <div
      className="ml-6 mr-6 mb-7 p-4 rounded-lg bg-white transition-colors cursor-pointer duration-200 "
      onClick={toggleInfo}
    >
      <div className="flex justify-between items-start">
        <div>
          <h4 className="question font-bold text-lg mb-2 text-black">
            SERP Snippet
          </h4>
          <p className="mb-4 text-gray-600">
            This illustrates how your page may appear in Search Results. Note, this is intended as a guide and Search Engines are more frequently generating this content dynamically.
          </p>
        </div>
        <div className="flex items-center">
          <InformationCircleIcon className="w-12 h-12 text-gray-400" />
        </div>
      </div>
      <div className="ml-5 mr-5 flex border-2 p-3 justify-between rounded-lg items-start">
        <div className="w-11/12">
          <div className="text-sm text-gray-600 truncate">{displayUrl}</div>
          <h3 className="text-xl text-blue-700 hover:underline cursor-pointer my-2">{title}</h3>
          <p className="text-sm text-gray-800">{metaDescription}</p>
        </div>
      </div>
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
            The SERP Snippet illustrates how your page may be shown in Search Results for a particular query. Typically the page's Title, URL, and Meta Description have been the main components utilized here, and hence should be carefully dictated, though Search Engines are more frequently building these snippets themselves to better represent the page content to their searchers.
          </p>
          <p className="how mb-2 text-gray-600">
            It's important that the SERP Snippet is enticing for your searchers to click on, and accurately represents your content to avoid bounces or heavy re-writing by the Search Engine. You should keep these factors in mind when populating the page Title, Meta Description, and URL.
          </p>
        </div>
      </Transition>
    </div>
  );
};

export default SERPSnippet;
