class APIClient {
  constructor(config) {
    this.accept = "application/json";
    this.baseURL = config.baseURL;
    this.cache = {};
  }

  async fetch(url) {
    if (this.cache[url]) {
      return this.cache[url];
    }

    const requestURL = new URL(url, this.baseURL);

    this.cache[url] = fetch(requestURL.href)
      .then(response => response.json())
      .catch(() => {
        this.cache[url] = undefined;
      });

    return this.cache[url];
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
    const result = await this.fetch(`/api/people/?search=${query}`);
    const people = await Promise.all(
      result.results.map(async person => {
        const homeworld = await this.fetch(person.homeworld);

        const species = await Promise.all(
          person.species.map(async specie => {
            return this.fetch(specie);
          })
        );

        return {
          id: person.url,
          url: person.url,
          name: person.name,
          films: person.films,
          species,
          homeworld
        };
      })
    );

    return people;
  }
}

export default APIClient;
