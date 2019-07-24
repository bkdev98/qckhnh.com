import React, { Component, useState } from 'react';
import axios from 'axios';

class MovieDetail extends Component {
  state = { loaded: false, detail: null };

  source = axios.CancelToken.source();

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.url !== prevState.url) {
      return { url: nextProps.url };
    }
    return null;
  }

  componentDidMount() {
    const { url } = this.props;
    this.fetchApi(url);
  }

  componentDidUpdate(prevProps) {
    const { url } = this.props;
    if (url !== prevProps.url) {
      /**
       * Clean up ongoing request and fetch api
       */
      this.source.cancel();
      this.fetchApi(url);
    }
  }

  componentWillUnmount() {
    this.source.cancel();
  }

  fetchApi = (url) => {
    const { showDelay } = this.props;
    const API_URL = showDelay ? `${url}?mocky-delay=3s` : url;

    /**
     * Initial new CancelToken each time fetch api
     */
    this.source = axios.CancelToken.source();

    axios.get(API_URL, { cancelToken: this.source.token })
      .then(result => {
        this.setState({ loaded: true, detail: result.data });
      })
      .catch(error => {
        if (axios.isCancel(error)) {
          console.log("request cancelled!");
        } else {
          throw error;
        }
      })
  }

  render() {
    const { loaded, detail } = this.state;
    return (
      <div>
        {loaded ? <p>{detail.description}</p> : <p>Loading description...</p>}
      </div>
    );
  }
}

const DemoSolutionReactHooks = ({ showDelay }) => {
  const [selected, setSelected] = useState(null);

  const movies = [
    { id: "1", name: "Synecdoche, New York", url: "http://www.mocky.io/v2/5d379b553100006925b07984" },
    { id: "2", name: "Lost In Translation", url: "http://www.mocky.io/v2/5d379b973100009a38b07986" },
    { id: "3", name: "A Single Man", url: "http://www.mocky.io/v2/5d379bae3100003d95b07988" },
    { id: "4", name: "Melancholia", url: "http://www.mocky.io/v2/5d379bc43100003d95b07989" }
  ]

  return (
    <div style={{ margin: '20px 0', padding: 20, border: '1px solid #666' }}>
      {movies.map(movie => (
        <span
          key={movie.id}
          className={(selected && movie.id === selected.id)
            ? 'link link-active' : 'link'}
          style={{ cursor: 'pointer' }}
          onClick={() => setSelected(movie)}
        >
          {movie.name}
        </span>
      ))}
      <div style={{ minHeight: 200 }}>
        {selected
          ? <MovieDetail url={selected.url} showDelay={showDelay} />
          : <p>Please select movie name to see description!</p>}
      </div>
    </div>
  );
}

export default DemoSolutionReactHooks;
