import React from "react"
import {
  Hits,
  Pagination,
  Highlight,
  Snippet
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

  return (
    <div>
      <Link to={hit.slug} >
        <div>
          <Highlight attribute="title" hit={hit} tagName="mark" />
        </div>
      </Link>
      <p>
        <span className="results-item-url">{pantheonDocsUrl}{hit.slug}</span>
      </p>
      <Snippet attribute="excerpt" hit={hit} tagName="mark" />
      <span className="results-item-date">
        {convertedDate === 'Invalid date' ? '' : convertedDate}
      </span>
    </div>
  );
};

Hit.propTypes = {
  hit: propTypes.shape({
    title: propTypes.string.isRequired,
    slug: propTypes.string.isRequired,
  }),
};

const Search = () => {
  return (
    <Layout>
      <SEO image={"/images/assets/default-thumb-doc.png"} title="Search" />
      <div style={{ marginTop: "-20px" }} className="container">
        <main className=" doc-content-well" id="docs-main">
          <h1 className="title">Search Results</h1>
          <div className="search-page-hits-container">
            <Hits hitComponent={Hit} />
            <Pagination />
          </div>
        </main>
      </div>
    </Layout>
  )
};

export default Search;
