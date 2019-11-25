import React from "react";
import PropTypes from "prop-types";
import "./index.css";
import loader from "../../loader.svg";

const propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired
    })
  )
};

const defaultProps = {
  items: [],
  error: undefined
};

function SearchResult(props) {
  const { items, loading, error, onClick, onKeyPress } = props;

  return (
    <>
      <h2>Found characters</h2>
      {loading && (
        <div className="list-item">
          <div>
            <img src={loader} alt="" />
          </div>
        </div>
      )}
      {error && (
        <div className="list-item">
          <div>Oops... Something went wrong...</div>
        </div>
      )}
      {!loading && !error && !items && (
        <div className="list-item" role="button" tabIndex="0">
          <div>These are not the droid you are looking for</div>
        </div>
      )}
      {items.map(item => (
        <div
          key={item.id}
          className="list-item"
          role="button"
          tabIndex="0"
          onClick={() => onClick(item)}
          onKeyPress={e => {
            console.log(e.key);
            onKeyPress(e.key, item);
          }}
        >
          <div className="list-item-name">
            <div>
              <div className="list-item-label">Name</div>
              <div>{item.name}</div>
            </div>
          </div>
          <div className="list-item-meta">
            <div className="list-item-home-name">
              <div className="list-item-label">World</div>
              <div>{item.homeworld.name}</div>
            </div>

            <div className="list-item-home-species">
              <div className="list-item-label">Species</div>
              <div>{item.species.map(specie => specie.name).join(",")}</div>
            </div>

            <div className="list-item-home-population">
              <div className="list-item-label">Population</div>
              <div>{item.homeworld.population}</div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

SearchResult.propTypes = propTypes;
SearchResult.defaultProps = defaultProps;

export default SearchResult;
