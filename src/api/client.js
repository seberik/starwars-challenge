class APIClient {
  constructor(config) {
    this.accept = "application/json";
    this.baseURL = config.baseURL;
  }

  async fetch(url) {
    const requestURL = new URL(url, this.baseURL);

    const responseObject = await fetch(requestURL.href);
    const json = await responseObject.json();

    return json;
  }

  async getPerson(person) {
    const response = await fetch(person.url);
    const json = await response.json();
    return json;
  }

  async getMovies(person) {
    return Promise.all(person.films.map(film => this.fetch(film))).then(
      result =>
        result.sort((a, b) => {
          return new Date(b.release_date) - new Date(a.release_date);
        })
    );
  }

  async searchPeople(query) {
    const planets = {};
    const species = {};

    const result = await this.fetch(`/api/people/?search=${query}`);

    const people = await Promise.all(
      result.results.map(async person => {
        let homeworld = planets[person.homeworld];

        // Avoid refetching homeworld
        if (!homeworld) {
          homeworld = await this.fetch(person.homeworld);
          planets[person.homeworld] = homeworld;
        }

        // Avoid refetching species
        const speciesData = await Promise.all(
          person.species.map(specie => {
            if (species[specie]) {
              return species[specie];
            }

            const newSpecie = this.fetch(specie);
            species[newSpecie.url] = newSpecie;
            return newSpecie;
          })
        );

        return {
          id: person.url,
          url: person.url,
          name: person.name,
          films: person.films,
          species: speciesData,
          homeworld
        };
      })
    );

    return people;
  }
}

export default APIClient;
