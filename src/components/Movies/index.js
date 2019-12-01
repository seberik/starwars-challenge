import React, { useContext, useCallback } from "react";
import PropTypes from "prop-types";
import { APIContext } from "../../context/api";
import { useRequest } from "../../hooks/request";
import ListItem from "../ListItem";
import ContentLoader from "../ContentLoader";
import ErrorMessage from "../ErrorMessage";
import "./index.css";

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
    <div className="movie">
      {loading && <ContentLoader />}
      {error && <ErrorMessage>Oops... Something went wrong...</ErrorMessage>}
      {!loading && !error && !movies && (
        <ErrorMessage>
          These are not the movies you are looking for
        </ErrorMessage>
      )}
      {movies &&
        movies.map(movie => (
          <ListItem key={movie.url} noMargin>
            <div>
              <div>
                <div className="list-item-label">Title</div>
                <div>{movie.title}</div>
              </div>
            </div>
            <div>
              <div>
                <div className="list-item-label">Release</div>
                <div>{movie.release_date}</div>
              </div>
            </div>
            <div style={{ flexGrow: 5 }}>
              <div>
                <div className="list-item-label">Opening</div>
                <div>{movie.opening_crawl.substring(0, 150)}...</div>
              </div>
            </div>
          </ListItem>
        ))}
    </div>
  );
};

Movies.propTypes = propTypes;

export default Movies;
