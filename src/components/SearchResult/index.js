import React from "react";
import PropTypes from "prop-types";
import ListItem from "../ListItem";
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
        <ListItem>
          <div>
            <img src={loader} alt="" />
          </div>
        </ListItem>
      )}
      {error && (
        <div className="list-item">
          <div>Oops... Something went wrong...</div>
        </div>
      )}
      {!loading && !error && !items.length && (
        <div className="list-item" role="button" tabIndex="0">
          <div>These are not the characters you are looking for</div>
        </div>
      )}
      {items.map(item => (
        <ListItem
          key={item.id}
          role="button"
          tabIndex="0"
          onClick={() => onClick(item)}
          onKeyPress={e => {
            onKeyPress(e.key, item);
          }}
        >
          <div className="list-item-name" style={{ flexGrow: 2 }}>
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
        </ListItem>
      ))}
    </>
  );
}

SearchResult.propTypes = propTypes;
SearchResult.defaultProps = defaultProps;

export default SearchResult;
