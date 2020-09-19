import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = { query: '', hits: [] };
  }

  onChange = (event) => {
    this.setState({ query: event.target.value });
  };

  onSearch = (event) => {
    event.preventDefault();

    const { query } = this.state;

    if (query === '') {
      return;
    }

    const cachedHits = localStorage.getItem(query);

    if (cachedHits) {
      this.setState({ hits: JSON.parse(cachedHits) });
    } else {
      fetch(
        `https://gateway.marvel.com:443/v1/public/characters?name=${query}&apikey=${process.env.REACT_APP_MARVEL}&callback=callback_param`,
      )
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          // this.onSetResult(result, query)
        });
    }
  };

  onSetResult = (result, key) => {
    localStorage.setItem(key, JSON.stringify(result.hits));

    this.setState({ hits: result.hits });
  };

  render() {
    return (
      <div>
        <p>Search</p>
        <form onSubmit={this.onSearch}>
          <input type="text" onChange={this.onChange} />
          <button type="submit">Search</button>
        </form>
        
        {this.state.hits.map((item) => (
          <div key={item.objectID}>{item.title}</div>
        ))}
      </div>
    );
  }
}

export default Search;
