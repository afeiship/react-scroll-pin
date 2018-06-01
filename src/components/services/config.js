export default class {

  static VERSION = '__BUILD_VERSION__';
  static STORE_PREFIX = 'zb-admin';
  static IMG_URL = 'http://testimg.treasurevision.cn';
  static APIS = {
    baseUrl: '',
    items: {
      '/admin': {
        // global:
        'login': ['post', '/adminUser/login'],
        'logout': ['post', '/adminUser/logout'],
        'profile': ['post', '/self/profile/loginInfo'],
        'system_time': ['post', '/common/systemTime'],
      }
    }
  };

  static MONKEY_BUSY_MSG = '程序猿开紧张开发中...';
  static DATE_FORMAT = {
    datetime: 'YYYY-MM-DD HH:mm:ss',
    date: 'YYYY-MM-DD'
  };
}



