import React from 'react';
import Scalameter from './ui/Scalameter';
const SEOScalameters = ({ onPageScore, linksScore, usabilityScore, performanceScore, socialScore }) => {
    return (
      <div className="flex justify-center mb-8">
        <Scalameter value={onPageScore} text="On-Page" />
        <Scalameter value={linksScore} text="Links" />
        <Scalameter value={usabilityScore} text="Usability" />
        <Scalameter value={performanceScore} text="Performance" />
        <Scalameter value={socialScore} text="Social" />
      </div>
    );
  };
  
  export default SEOScalameters;