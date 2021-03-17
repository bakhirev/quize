class HttpClient {
  mock(data, delay) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(data), delay || 1000);
    });
  }
  get(url, data) {
    const query = HttpClient.getLikeString(data) || '';
    const urlWithData = url.includes('?')
      ? `${url}&${query}`
      : `${url}${query}`;

    return this.sendRequest('get', urlWithData, data);
  }
  post(url, body) {
    return this.sendRequest('post', url, body);
  }
  put(url, body) {
    return this.sendRequest('put', url, body);
  }
  delete(url) {
    return this.sendRequest('delete', url);
  }
  sendRequest(method, url, data) {
    const options = HttpClient.getRequestOptions(method);
    const optionsWithBody = HttpClient.getOptionsWithBody(options, data);
    return fetch(url, optionsWithBody).then((d) => d.json());
  }
  static getRequestOptions(method) {
    return {
      method,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    };
  }
  static getOptionsWithBody(options, data) {
    return data
      ? { ...options, body: HttpClient.getLikeString(data) }
      : options;
  }
  static getLikeString(data) {
    if (!data) return data;
    if (typeof data === 'object') return JSON.stringify(data);
    if (typeof data.toString === 'function') return data.toString();
    return data;
  }
}

const http = new HttpClient();

export default http;
