import AppBase from 'components';

export default class Request {

  static _instance;

  static create(inRequest) {
    this._instance = this._instance || new Request(inRequest);
    this._instance._data = inRequest;
    this._instance.load();
    return this._instance;
  }

  constructor(inRequest) {
    this._data = inRequest;
  }

  load() {
    const requestUrl = nx.path(this._data, 'url');
    const data = nx.path(this._data, 'data');
    const path = requestUrl.split('/admin/')[1];
    const action = `$${path.replace('/', '_')}`;
    (this[action] || this.transformFormData).call(this, data);
    return this;
  }

  transformFormData(inData) {
    nx.path(this._data, 'data', nx.param(inData));
  }

  transformJson(inData) {
    nx.path(this._data, 'data', JSON.stringify(inData));
  }

}


