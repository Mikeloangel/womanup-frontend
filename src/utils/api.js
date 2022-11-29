class Api {
  /**
   *
   * @param {baseUrl, headers} Object api address and required headers
   */
  constructor({ baseURL, headers }) {
    this._baseURL = baseURL;
    this._headers = headers;
  }

  /**
   * Returns JSON or on fail parses response message
   * @param {res}
   * @returns
   */
  async _getJSON(res) {
    if (res.ok) return res.json();

    //getting proper error message from JSON response {'message':''}
    const isJSON = res.headers.get('content-type')?.includes('application/json');
    const data = isJSON ? await res.json() : null;
    const error = (data && data.message) || res.status;

    return Promise.reject(error);
  }

  /**
   * Combines fetch request and returns JSON
   *
   * @param {String} route endpoint
   * @param {String} method
   * @param {Object} body to fetch
   * @returns
   */
  _getRouteRequest(route, method, body = null) {
    return body ?
      fetch(`${this._baseURL}${route}`, { method, headers: this._headers, body: JSON.stringify(body) })
        .then(this._getJSON) :
      fetch(`${this._baseURL}${route}`, { method, headers: this._headers })
        .then(this._getJSON);
  }

  /**
   * Handles errors with callback
   * @param {*} response error object responce
   * @param {Function} cb callback function for error
   */
  handleError(response, cb = null) {
    console.error(`Api error: ${response}`);
    if (typeof cb === 'function') cb(response)
  }

  // api requests
  // get all todos
  getTodoList = () => this._getRouteRequest('/', 'GET');

  // puts sets isFinished true by todo :id
  putTodoDone = (id) => this._getRouteRequest(`/done/${id}`, 'PUT');

  // delete sets isFinished false by todo :id
  deleteTodoDone = (id) => this._getRouteRequest(`/done/${id}`, 'DELETE');

  // delete todo item by id
  deleteTodoItem = (id) => this._getRouteRequest(`/${id}`, 'DELETE');

  // patch update ToDo item
  updateToDoItem = (obj) => this._getRouteRequest(`/${obj._id}`, 'PATCH', obj);

  // post adds todo item
  addToDoItem = (obj) => this._getRouteRequest('/', 'POST', obj);

}

// instantiates api
const api = new Api({
  baseURL: 'https://mestology.nomoredomains.club/todo/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
