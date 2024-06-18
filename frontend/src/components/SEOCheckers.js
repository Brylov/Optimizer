import React from 'react';
import SEOTitleChecker from './SEOTitleChecker';
import SEOMetaDescriptionChecker from './SEOMetaDescriptionChecker';
import SERPSnippet from './SERPSnippet';
import SEOHreflangUsage from './SEOHreflangUsage';
import SEOLangAttribute from './SEOLangAttribute';
import SEOH1Check from './SEOH1Check';
import SEOTagsCheck from './SEOTagsCheck';



const SEOCheckers = ({ title, url, metaDescription, hreflangTags, langAnalysis, h1Tags, h2Tags, h3Tags, h4Tags, h5Tags, h6Tags }) => {
  const isHreflangSupported = hreflangTags.length > 0;
  const tags = { H2: h2Tags, H3: h3Tags, H4: h4Tags, H5: h5Tags, H6: h6Tags };
  const tagNames = ["H2", "H3", "H4", "H5", "H6"];

  return (
    <div>
      <h3 className="text-2xl font-bold mb-4 text-center">On-Site Checks</h3>
      <SEOTitleChecker title={title} />
      <SEOMetaDescriptionChecker metaDescription={metaDescription} />
      <SERPSnippet title={title} url={url} metaDescription={metaDescription} />
      <SEOHreflangUsage isSupported={isHreflangSupported} hreflangTags={hreflangTags} />
      <SEOLangAttribute langAnalysis={langAnalysis} />
      <SEOH1Check h1Tags={h1Tags} />
      <SEOTagsCheck tags={tags} tagNames={tagNames} />
    </div>
  );
};

export default SEOCheckers;
