import React, { useState } from 'react';
import { Transition } from '@headlessui/react';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/solid';

const SEOLangAttribute = ({ langAnalysis }) => {
  const [showInfo, setShowInfo] = useState(false);

  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  const isLangSet = langAnalysis && !langAnalysis.includes('No lang attribute found');

  return (
    <div
      className="ml-5 mr-5 mb-7 p-4 rounded-lg bg-white transition-colors cursor-pointer duration-200"
      onClick={toggleInfo}
    >
      <div className="flex justify-between items-start">
        <div>
          <h4 className="question font-bold text-lg mb-2 text-black">
            Document Language
          </h4>
          <p className="mb-4 text-gray-600">
            The `lang` attribute indicates the language of the content in your document.
          </p>
          <div className="ml-5 mr-5 flex border-2 p-4 justify-between rounded-lg items-start">
            * {langAnalysis}
          </div>
        </div>
        <div className="flex items-center">
          {isLangSet ? (
            <CheckCircleIcon className="w-12 h-12 text-green-500" />
          ) : (
            <XCircleIcon className="w-12 h-12 text-red-500" />
          )}
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
            The `lang` attribute is an important HTML attribute that helps define the language of the document's content. It can assist search engines and browsers in providing better user experiences.
          </p>
          <p className="how mb-2 text-gray-600">
            Make sure to set the `lang` attribute on the HTML tag to indicate the primary language of the content. This is crucial for accessibility and SEO.
          </p>
        </div>
      </Transition>
    </div>
  );
};

export default SEOLangAttribute;
