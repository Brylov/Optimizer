import React, { useState } from 'react';
import { Transition } from '@headlessui/react';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/solid';

const SEOTagsCheck = ({ tags, tagNames }) => {
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

  // Check if H2 and H3 tags are present
  const h2AndH3Present = tags['h2'] && tags['h2'].length > 0 && tags['h3'] && tags['h3'].length > 0;

  const tagQuantities = tagNames.map(tagName => ({
    tagName,
    quantity: tags[tagName] ? tags[tagName].length : 0,
  }));

  const maxQuantity = Math.max(...tagQuantities.map(tag => tag.quantity), 1); // Ensure maxQuantity is at least 1 to avoid division by zero

  return (
    <div
      className="ml-5 mr-5 mb-7 p-4 rounded-lg bg-white transition-colors cursor-pointer duration-200"
      onClick={toggleInfo}
    >
      <div className="flex justify-between items-start">
        <div>
          <h4 className="question font-bold text-lg mb-2 text-black">
            H2-H6 Tags
          </h4>
          <p className="mb-4 text-gray-600">
            The H2-H6 tags are important HTML elements that define subheadings of a webpage.
          </p>
          <table className="min-w-full bg-white border mb-4">
            <thead>
              <tr>
                <th className="py-3 px-1 border-b-2 border-gray-200 text-center">Tag</th>
                <th className="py-3 px-1 border-b-2 border-gray-200 text-center">Quantity</th>
                <th className="py-3 px-1 border-b-2 border-gray-200 text-center">Scale</th>
              </tr>
            </thead>
            <tbody>
              {tagQuantities.map((tag, index) => (
                <tr key={`${tag.tagName}-${index}`}>
                  <td className="py-3 px-1 border-b border-gray-200 text-center">{tag.tagName}</td>
                  <td className="py-3 px-1 border-b border-gray-200 text-center">{tag.quantity}</td>
                  <td className="py-3 px-1 border-b border-gray-200 text-center">
                    <div className="bg-blue-500 h-2" style={{ width: `${(tag.quantity / maxQuantity) * 75}%` }}></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            className="ml-5 mt-2 text-gray-500 border p-2 rounded hover:underline"
            onClick={toggleTable}
          >
            {showTable ? 'Hide' : 'Show'} Tags
          </button>
        </div>
        <div className="flex items-center">
          {h2AndH3Present ? (
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
                <th className="py-3 px-1 border-b-2 border-gray-200 text-center">Tag</th>
                <th className="py-3 px-1 border-b-2 border-gray-200 text-center">Value</th>
              </tr>
            </thead>
            <tbody>
              {tagNames.map(tagName => (
                (tags[tagName] && tags[tagName].length > 0) ? tags[tagName].map((tag, index) => (
                  <tr key={`${tagName}-${index}`}>
                    <td className="py-3 px-1 border-b border-gray-200 text-center">{tagName}</td>
                    <td className="py-3 px-1 border-b border-gray-200 text-center">{tag}</td>
                  </tr>
                )) : (
                  <tr key={`${tagName}-notfound`}>
                    <td className="py-3 px-1 border-b border-gray-200 text-center">{tagName}</td>
                    <td className="py-3 px-1 border-b border-gray-200 text-center">Not Found</td>
                  </tr>
                )
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
            The H2-H6 tags are crucial for SEO as they represent subheadings of the webpage. They help search engines understand the structure and content hierarchy of your webpage.
          </p>
          <p className="how mb-2 text-gray-600">
            Ensure that H2-H6 tags are used appropriately to define subheadings and improve the readability and SEO of your content.
          </p>
        </div>
      </Transition>
    </div>
  );
};

export default SEOTagsCheck;
