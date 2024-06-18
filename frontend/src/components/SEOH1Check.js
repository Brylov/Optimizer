import React, { useState } from 'react';
import { Transition } from '@headlessui/react';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/solid';

const SEOH1Check = ({ h1Tags }) => {
  const [showInfo, setShowInfo] = useState(false);
  const [showTable, setShowTable] = useState(false);

  const toggleInfo = (e) => {
    e.stopPropagation(); // Prevent triggering the extra info toggle
    setShowInfo(!showInfo);
  };

  const toggleTable = (e) => {
    e.stopPropagation(); // Prevent triggering the extra info toggle
    setShowTable(!showTable);
  };

  const isH1Set = h1Tags && h1Tags.length === 1;

  return (
    <div
      className="ml-5 mr-5 mb-7 p-4 rounded-lg bg-white transition-colors cursor-pointer duration-200"
      onClick={toggleInfo}
    >
      <div className="flex justify-between items-start">
        <div>
          <h4 className="question font-bold text-lg mb-2 text-black">
            H1 Tag
          </h4>
          <p className="mb-4 text-gray-600">
            The `H1` tag is an important HTML element that defines the main heading of a webpage.
          </p>
          <button
            className="ml-5 mt-2 text-gray-500 border p-2 rounded hover:underline"
            onClick={toggleTable}
          >
            {showTable ? 'Hide' : 'Show'} H1 Tags
          </button>
        </div>
        <div className="flex items-center">
          {isH1Set ? (
            <CheckCircleIcon className="w-12 h-12 text-green-500" />
          ) : (
            <XCircleIcon className="w-12 h-12 text-red-500" />
          )}
        </div>
      </div>
      <Transition
        show={showTable}
        enter="transition-opacity duration-150"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="mt-4 pl-4">
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b-2 border-gray-200">Tag</th>
                <th className="py-2 px-4 border-b-2 border-gray-200">Value</th>
              </tr>
            </thead>
            <tbody>
              {h1Tags.map((tag, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b border-gray-200">H1</td>
                  <td className="py-2 px-4 border-b border-gray-200">{tag}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
            The `H1` tag is crucial for SEO as it represents the main heading of the webpage. It helps search engines understand the primary topic of your content.
          </p>
          <p className="how mb-2 text-gray-600">
            Ensure that there is only one `H1` tag on your webpage, and it accurately represents the main topic of your content. Additional headings can use `H2`, `H3`, etc., for subtopics.
          </p>
        </div>
      </Transition>
    </div>
  );
};

export default SEOH1Check;
