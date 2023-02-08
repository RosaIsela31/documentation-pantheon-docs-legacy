import React, { useState } from "react"
import {
  Hits,
  Pagination,
  Highlight,
  Snippet,
  Stats,
  Index
} from 'react-instantsearch-dom';
import { Link } from 'gatsby';
import moment from 'moment';
import propTypes from "prop-types";
import Layout from "../layout/layout"
import SEO from "../layout/seo"
import "./style.css"

const Hit = ({ hit }) => {
  const pantheonDocsUrl = "https://pantheon.io/docs";
  const convertedDate = moment(hit.reviewed).format('MMM DD, YYYY');
  
  const correctSlug = hit.slug.startsWith('/') ? hit.slug : `/${hit.slug}`

  return (
    <Link to={correctSlug} >
      <div>
        <Highlight attribute="title" hit={hit} tagName="mark" />
      </div>
      <p>
        <span className="results-item-url">{pantheonDocsUrl}{correctSlug}</span>
      </p>
      <Snippet attribute="excerpt" hit={hit} tagName="mark" />
      <span className="results-item-date">
        {convertedDate === 'Invalid date' ? '' : convertedDate}
      </span>
    </Link>
  );
};

Hit.propTypes = {
  hit: propTypes.shape({
    title: propTypes.string.isRequired,
    slug: propTypes.string.isRequired,
  }),
};

const Search = () => {
  const [sortBy, setSortBy] = useState(false)

  const handleClick = (value) => {
    setSortBy(value);
  };

  return (
    <Layout>
      <SEO image={"/images/assets/default-thumb-doc.png"} title="Search" />
      <div style={{ marginTop: "-20px" }} className="container">
        <main className=" doc-content-well" id="docs-main">
          <h1 className="title">Search Results</h1>
          <div className="search-page-hits-container">
            <div className="search-page-sort-by-container">
              <Stats
                translations={{
                  stats(nbHits) {
                    return `${nbHits} results`
                  },
                }}
              />
              <span>
                Sort by: {' '}
                <a href="#" className={sortBy !== "date" ? "sortby_active" : ''} onClick={() => { handleClick('relevance') }}>Relevance</a> |
                <a href="#" className={sortBy === "date" ? "sortby_active" : ''} onClick={() => { handleClick('date') }}>Date</a>
              </span>
            </div>
            <Index
              indexName={sortBy === 'date' ? "legacy-pantheon-docs-date-desc" : "legacy-pantheon-docs"}
            >
              <Hits hitComponent={Hit} />
            </Index>
            <Pagination />
          </div>
        </main>
      </div>
    </Layout>
  )
};

export default Search;
