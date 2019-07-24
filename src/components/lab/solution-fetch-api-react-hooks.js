import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MovieDetail = ({ url, showDelay }) => {
  const [state, setState] = useState({ loaded: false, detail: null });
  const API_URL = showDelay ? `${url}?mocky-delay=3s` : url;

  useEffect(() => {
    /**
     * Khởi tạo CancelToken
     */
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    setState({ loaded: false, detail: null });
    /**
     * Thêm option `cancelToken` vào axios request có thể huỷ request này sau đó.
     */
    axios.get(API_URL, { cancelToken: source.token })
      .then(result => {
        setState({ loaded: true, detail: result.data });
      })
      .catch(error => {
        if (axios.isCancel(error)) {
          console.log("request cancelled!");
        } else {
          throw error;
        }
      })

    /**
     * Hàm trả về (cleanup) trong useEffect sẽ được gọi trước khi component unmount.
     * Tương ứng với lifecycle componentWillUnmount trong Class Components.
     */
    return function cleanup() {
      source.cancel();
    }
  }, [url])

  return (
    <div>
      {state.loaded ? <p>{state.detail.description}</p> : <p>Loading description...</p>}
    </div>
  )
}

const DemoSolutionReactHooks = ({ showDelay }) => {
  const [selected, setSelected] = useState(null);

  const movies = [
    { id: "1", name: "Synecdoche, New York", url: "https://www.mocky.io/v2/5d379b553100006925b07984" },
    { id: "2", name: "Lost In Translation", url: "https://www.mocky.io/v2/5d379b973100009a38b07986" },
    { id: "3", name: "A Single Man", url: "https://www.mocky.io/v2/5d379bae3100003d95b07988" },
    { id: "4", name: "Melancholia", url: "https://www.mocky.io/v2/5d379bc43100003d95b07989" }
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
