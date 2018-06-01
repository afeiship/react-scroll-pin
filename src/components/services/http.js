import nx from 'next-js-core2';
import NxAxios from 'next-axios';
import AppBase from 'components';
import Response from 'interceptors/response';
import Request from 'interceptors/request';

const Http = nx.declare({
  extends: NxAxios,
  methods: {
    getToken: function () {
      const token = nx.path(AppBase.$.session, 'login.token');
      return token ? 'Bearer ' + token : null;
    },
    setRequestInterceptor: function () {
      this.axios.interceptors.request.use((config) => {
        const Authorization = this.getToken();
        Authorization && nx.mix(config.headers.common, {Authorization});
        return Request.create(config)._data;
      });
    },
    setResponseInterceptor: function () {
      this.axios.interceptors.response.use(function (response) {
        return Response.create(response)._data;
      });
      this.base();
    },
    contentType: function () {
      return nx.contentType('urlencoded');
    },
    toData: function (inResponse) {
      return inResponse.data.data;
    },
    error: function (inError) {
      // const {data} = inError.response;
      alert(JSON.stringify(inError))
      // AppBase.$.error = data;
      // AppBase.notify(data.errorMessage, 'error');
    }
  }
});

export default Http.getInstance();
