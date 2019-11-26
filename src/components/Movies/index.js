import React, { useContext, useCallback } from "react";
import PropTypes from "prop-types";
import { APIContext } from "../../context/api";
import { useRequest } from "../../hooks/request";
import ListItem from "../ListItem";
import loader from "../../loader.svg";

const propTypes = {
  person: PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  }).isRequired
};

const Movies = props => {
  const { person } = props;

  const client = useContext(APIContext);
  const query = useCallback(() => client.getMovies(person), [client, person]);
  const { loading, result: movies, error } = useRequest(query, {
    skip: !person,
    variables: person
  });
  
  return (
    <div>
      <h2>{person.name}</h2>
      {loading && (
        <ListItem>
          <div>
            <img src={loader} alt="" />
          </div>
        </ListItem>
      )}
      {error && (
        <ListItem>
          <div>Oops... Something went wrong...</div>
        </ListItem>
      )}
      {!loading && !error && !movies && (
        <ListItem>
          <div>These are not the movies you are looking for</div>
        </ListItem>
      )}
      {movies &&
        movies.map(film => (
          <ListItem>
            <div>
              <div>
                <div className="list-item-label">Title</div>
                <div>{film.title}</div>
              </div>
            </div>
            <div>
              <div>
                <div className="list-item-label">Release</div>
                <div>{film.release_date}</div>
              </div>
            </div>
            <div style={{ flexGrow: 5 }}>
              <div>
                <div className="list-item-label">Opening</div>
                <div>{film.opening_crawl.substring(0, 150)}...</div>
              </div>
            </div>
          </ListItem>
        ))}
    </div>
  );
};

Movies.propTypes = propTypes;

export default Movies;
