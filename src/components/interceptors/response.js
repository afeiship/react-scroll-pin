import AppBase from 'components';

export default class Response {

  static _instance;

  static create(inResponse) {
    this._instance = this._instance || new Response(inResponse);
    this._instance._data = inResponse;
    this._instance.load();
    return this._instance;
  }

  constructor(inResponse) {
    this._data = inResponse;
  }

  load() {
    const requestUrl = nx.path(this._data, 'request.responseURL');
    const data = nx.path(this._data, 'data.data');
    const path = requestUrl.split('/admin/')[1];
    const action = `$${path.replace(/\//g, '_')}`;
    (this[action] || nx.noop).call(this, data);
  }
}


