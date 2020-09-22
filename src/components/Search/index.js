import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

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
        `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyCmff9SEPo4RoHnPck_uknQyVDBHzOQQ8o&address=${query}&inputtype=textquery&language=en`)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          this.onSetResult(result, query)
        });
    }
  };

  onSetResult = (result, key) => {
    localStorage.setItem(key, JSON.stringify(result.hits));

    this.setState({ hits: result.hits });
      console.log(this.state.hits);

  };


  render() {
    return (
      <div>
        <form onSubmit={this.onSearch}>
          <TextField
            type="text"
            onChange={this.onChange}
            autoComplete="search"
            name="search"
            variant="standard"
            required
            id="search"
            label="Search Destinations"
            autoFocus
          />
          <br></br>
          <Button type="submit">Search</Button>
        </form>

        {/* {this.state.hits.map((item) => (
          <div key={item.objectID}>{item.title}</div>
        ))} */}
      </div>
    );
  }
}

export default Search;
