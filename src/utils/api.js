class Api {
  constructor({ baseURL, headers }) {
    this._baseURL = baseURL;
    this._headers = headers;
  }

  async _getJSON(res) {
    if (res.ok) return res.json();

    //getting proper error message from JSON response {'message':''}
    const isJSON = res.headers.get('content-type')?.includes('application/json');
    const data = isJSON ? await res.json() : null;
    const error = (data && data.message) || res.status;

    return Promise.reject(error);
  }

  _getRouteRequest(route, method, body = null) {
    return body ?
      fetch(`${this._baseURL}${route}`, { method, headers: this._headers, body: JSON.stringify(body) })
        .then(this._getJSON) :
      // fetch(`${this._baseUrl}${route}`, { method, headers: this._headers, body: JSON.stringify(body) })
      //   .then(this._getJSON) :
      fetch(`${this._baseURL}${route}`, { method, headers: this._headers })
        .then(this._getJSON);
  }

  handleError(response, cb = null) {
    console.error(`Api error: ${response}`);
    if (typeof cb === 'function') cb(response)
  }

  // api requests
  // get todo list
  getTodoList = () => this._getRouteRequest('/', 'GET');

  // set check
  putTodoDone = (id) => this._getRouteRequest(`/done/${id}`, 'PUT');

  // removes check
  deleteTodoDone = (id) => this._getRouteRequest(`/done/${id}`, 'DELETE');

  // delete item
  deleteTodoItem = (id) => this._getRouteRequest(`/${id}`, 'DELETE');

  // update ToDo item
  updateToDoItem = (obj) => this._getRouteRequest(`/${obj._id}`, 'PATCH', obj);

  // add ToDo item
  addToDoItem = (obj) => this._getRouteRequest('/','POST',obj);

}

const api = new Api({
  baseURL: 'http://62.84.124.240:3000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
