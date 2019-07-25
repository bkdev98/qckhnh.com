---
title: Một vấn đề khi fetch API trong React
description: >-
  Lỗi phổ biến khi gửi HTTP request mà rất ít khi được chú ý.
tag: react
thumbnail: /assets/abort-controller.png
date: 2019-07-24
---

Khi dùng React để fetch API, cả trong React Hooks `useEffect` hay với component lifecycle `componentDidMount`, bạn cần lưu ý rằng những HTTP request vẫn có thể chạy ngầm cả sau khi component đã được update hoặc unmount.

Trong bài mình sử dụng hook `useState` cũng như `useEffect` và chỉ tập trung vào vấn đề fetch dữ liệu, nên nếu chưa biết về React Hooks bạn tham khảo qua [ở đây](https://reactjs.org/docs/hooks-effect.html) nhé!

Các ví dụ chạy được kèm source code của bài viết nằm trong lab [Demo AbortController](/lab/demo-abort-controller).

### Ví dụ mẫu

Lấy một ví dụ, mình có một ứng dụng nhỏ để xem mô tả của một số bộ phim, kiểu như vầy:

![Normal Case](/assets/demo-abort-controller-reproduce-normal-case.gif)

Danh sách các bộ phim được hiển thị trong component `DemoProblemReactHooks` thông qua dữ liệu mẫu `movies`. Dữ liệu `movies` bao gồm các thuộc tính `id`, `name` và `url`, với thuộc tính `url` đại diện cho địa chỉ API dùng để lấy thông tin mô tả cho bộ phim. API này được mình giả lập sử dụng [Mocky](https://www.mocky.io/).

```jsx{43}
const DemoProblemReactHooks = () => {
  const [selected, setSelected] = useState(null)

  const movies = [
    {
      id: "1",
      name: "Synecdoche, New York",
      url: "http://www.mocky.io/v2/5d379b553100006925b07984",
    },
    {
      id: "2",
      name: "Lost In Translation",
      url: "http://www.mocky.io/v2/5d379b973100009a38b07986",
    },
    {
      id: "3",
      name: "A Single Man",
      url: "http://www.mocky.io/v2/5d379bae3100003d95b07988",
    },
    {
      id: "4",
      name: "Melancholia",
      url: "http://www.mocky.io/v2/5d379bc43100003d95b07989",
    },
  ]

  return (
    <div style={{ margin: "20px 0", padding: 20, border: "1px solid #666" }}>
      {movies.map(movie => (
        <span
          key={movie.id}
          className={
            selected && movie.id === selected.id ? "link link-active" : "link"
          }
          style={{ cursor: "pointer" }}
          onClick={() => setSelected(movie)}
        >
          {movie.name}
        </span>
      ))}
      <div style={{ minHeight: 200 }}>
        {selected ? (
          <MovieDetail url={selected.url} />
        ) : (
          <p>Please select movie name to see description!</p>
        )}
      </div>
    </div>
  )
}
```

Khi một bộ phim được chọn, ta sẽ truyền thuộc tính `url` xuống component `MovieDetail`, nơi mà thông tin mô tả của phim được trả về qua `axios` API trong hàm `useEffect`.

```jsx{6,7,8}
const MovieDetail = ({ url }) => {
  const [state, setState] = useState({ loaded: false, detail: null })

  useEffect(() => {
    setState({ loaded: false, detail: null })
    axios.get(url).then(result => {
      setState({ loaded: true, detail: result.data })
    })
  }, [url])

  return (
    <div>
      {state.loaded ? (
        <p>{state.detail.description}</p>
      ) : (
        <p>Loading description...</p>
      )}
    </div>
  )
}
```

Như bạn có thể thấy trong ảnh gif ở trên, dữ liệu bộ phim được trả về và hiển thị chính xác, mọi thứ đều có vẻ hoạt động tốt.

### Tái hiện vấn đề

Bây giờ, hãy thêm một tham số query string `?mocky-delay=3s` vào Mocky endpoint để giả lập độ trễ, thực tế thường là do mạng hoặc do thời gian xử lý ở backend. Việc này sẽ làm vấn đề hiện nguyên hình!

```jsx{3}
const MovieDetail = ({ url, showDelay }) => {
  const [state, setState] = useState({ loaded: false, detail: null })
  const API_URL = showDelay ? `${url}?mocky-delay=3s` : url

  useEffect(() => {
    setState({ loaded: false, detail: null })
    axios.get(API_URL).then(result => {
      setState({ loaded: true, detail: result.data })
    })
  }, [url])

  return (
    <div>
      {state.loaded ? (
        <p>{state.detail.description}</p>
      ) : (
        <p>Loading description...</p>
      )}
    </div>
  )
}
```

Cùng xem điều gì sẽ xảy ra:

![Race Condition](/assets/demo-abort-controller-reproduce-race-condition.gif)

Sự delay của mỗi request sẽ làm response trả về chồng lên nhau, khiến kết quả hiển thị trở nên không chính xác. Vấn đề này sẽ dễ dàng bị bỏ qua trong quá trình development khi dữ liệu cần truy cập thường nằm trên local với độ delay thấp.

### Cách giải quyết: AbortController

Để giải quyết vấn đề này, chúng ta cần huỷ các request đang thực hiện mỗi khi component `MovieDetail` được cập nhật. May mắn là đa số các thư viện quen thuộc để fetch API đều hỗ trợ việc này.

Như trong ví dụ ở trên sử dụng `axios`, thư viện này đã cung cấp sẵn `CancelToken` (thực chất sẽ khởi tạo một `AbortController` instance) để huỷ các request.

```jsx{9,10,17,33,34,35}
const MovieDetail = ({ url, showDelay }) => {
  const [state, setState] = useState({ loaded: false, detail: null })
  const API_URL = showDelay ? `${url}?mocky-delay=3s` : url

  useEffect(() => {
    /**
     * Khởi tạo CancelToken
     */
    const CancelToken = axios.CancelToken
    const source = CancelToken.source()

    setState({ loaded: false, detail: null })
    /**
     * Thêm option `cancelToken` vào axios request để có thể huỷ request này sau đó.
     */
    axios
      .get(API_URL, { cancelToken: source.token })
      .then(result => {
        setState({ loaded: true, detail: result.data })
      })
      .catch(error => {
        if (axios.isCancel(error)) {
          console.log("request cancelled!")
        } else {
          throw error
        }
      })

    /**
     * Hàm trả về (cleanup) trong useEffect sẽ được gọi khi component rerender.
     * Tương ứng với lifecycle componentWillUnmount trong Class Components.
     */
    return function cleanup() {
      source.cancel()
    }
  }, [url])

  return (
    <div>
      {state.loaded ? (
        <p>{state.detail.description}</p>
      ) : (
        <p>Loading description...</p>
      )}
    </div>
  )
}
```

Đối với `fetch`, bạn có thể dùng `signal` trực tiếp từ `AbortController` instance.

```jsx{9,15,30,31,32}
const MovieDetail = ({ url, showDelay }) => {
  const [state, setState] = useState({ loaded: false, detail: null })
  const API_URL = showDelay ? `${url}?mocky-delay=3s` : url

  useEffect(() => {
    /**
     * Khởi tạo AbortController
     */
    const controller = new AbortController()

    setState({ loaded: false, detail: null })
    /**
     * Thêm `signal` vào fetch request có thể huỷ request này sau đó.
     */
    fetch(API_URL, { signal: controller.signal })
      .then(result => {
        setState({ loaded: true, detail: result.data })
      })
      .catch(error => {
        if (controller.signal.aborted) {
          console.log("request cancelled!")
        } else {
          throw error
        }
      })

    /**
     * Hàm trả về (cleanup) trong useEffect sẽ được gọi khi component rerender.
     */
    return function cleanup() {
      controller.abort()
    }
  }, [url])

  return (
    <div>
      {state.loaded ? (
        <p>{state.detail.description}</p>
      ) : (
        <p>Loading description...</p>
      )}
    </div>
  )
}
```

Vậy là xong, từ bây giờ ứng dụng sẽ luôn hiển thị đúng kết quả:

![Normal Case](/assets/demo-abort-controller-result.gif)

Cần lưu ý, vấn đề này xuất hiện ở cả React `useEffect` và React `Component`. Trong phạm vi bài viết, mình chỉ lấy ví dụ sử dụng `useEffect`, mọi người có thể tham khảo chi tiết hơn các trường hợp và code đối với `Class Component` trong lab [Demo AbortController](/lab/demo-abort-controller) nhé.

### Tham khảo thêm

- “How to clean up subscriptions in react components using AbortController?” bởi @seganesa [https://link.medium.com/OLvfQmReyY](https://link.medium.com/OLvfQmReyY).
- useEffect memory leak when setting state in fetch promise #15006 [https://github.com/facebook/react/issues/15006](https://github.com/facebook/react/issues/15006).
