import React, { useContext } from "react";
import PropTypes from "prop-types";
import { APIContext } from "../../context/api";
import { useRequest } from "../../hooks/request";
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
  const { loading, result: movies, error } = useRequest(
    person => client.getMovies(person),
    {
      skip: !person,
      variables: person
    }
  );

  console.log({ loading, movies, error });

  return (
    <div>
      <h2>{person.name}</h2>
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
      {!loading && !movies && (
        <div className="list-item" role="button" tabIndex="0">
          <div>These are not the droids you are looking for</div>
        </div>
      )}
      {movies &&
        movies.map(film => (
          <div className="list-item">
            <div>
              <div>
                <div className="list-item-label">Title</div>
                <div>{film.title}</div>
              </div>
            </div>
            <div>
              <div>
                <div className="list-item-label">Opening</div>
                <div>{film.opening_crawl.substring(0, 150)}</div>
              </div>
            </div>
            <div>
              <div>
                <div className="list-item-label">Release</div>
                <div>{film.release_date}</div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

Movies.propTypes = propTypes;

export default Movies;
