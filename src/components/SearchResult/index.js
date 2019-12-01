import React, { useState } from "react";
import PropTypes from "prop-types";
import ListItem from "../ListItem";
import Movies from "../Movies";
import ErrorMessage from "../ErrorMessage";
import ContentLoader from "../ContentLoader";

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
  const { items, loading, error } = props;
  const [selectedPerson, setSelectedPerson] = useState(undefined);

  function onSelect(selected, key) {
    if (typeof key === "undefined" || key === "Enter") {
      setSelectedPerson(selected);
    }
  }

  return (
    <>
      <h2>Found characters</h2>
      {loading && <ContentLoader />}
      {error && <ErrorMessage>Oops... Something went wrong...</ErrorMessage>}
      {!loading && !error && !items.length && (
        <ErrorMessage>
          These are not the characters you are looking for
        </ErrorMessage>
      )}
      {items.map(item => {
        const isSelected = selectedPerson && selectedPerson.id === item.id;
        return (
          <React.Fragment key={item.id}>
            <ListItem
              role="button"
              noMargin={isSelected}
              selected={isSelected}
              tabIndex="0"
              onClick={() => onSelect(item)}
              onKeyPress={e => {
                onSelect(item, e.key);
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
            {isSelected && <Movies person={selectedPerson}></Movies>}
          </React.Fragment>
        );
      })}
    </>
  );
}

SearchResult.propTypes = propTypes;
SearchResult.defaultProps = defaultProps;

export default SearchResult;
