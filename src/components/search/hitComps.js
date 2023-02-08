import * as React from 'react';
import { Highlight, Snippet } from 'react-instantsearch-dom';
import { Link } from 'gatsby';
import propTypes from "prop-types";

const PageHit = ({ hit }) => {
  const correctSlug = hit.slug.startsWith('/') ? hit.slug : `/${hit.slug}`
  return (
    <Link to={correctSlug} >
      <div>
        <Highlight attribute="title" hit={hit} tagName="mark" />
      </div>
      <Snippet attribute="excerpt" hit={hit} tagName="mark" />
    </Link>
  )
};

PageHit.propTypes = {
  hit: propTypes.shape({
    title: propTypes.string.isRequired,
    slug: propTypes.string.isRequired,
  }),
};

export default PageHit;
