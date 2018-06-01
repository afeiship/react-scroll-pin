import AppBase, { $config } from 'components';

export default class {

  static toImgs(inImgStr, inCallback) {
    const list = inImgStr.split(',');
    const { IMG_URL } = $config;
    const callback = inCallback || nx.noop;
    return list.map(item => {
      return callback(IMG_URL, item) || this.toImg(item);
    });
  }

  static toImg(inValue) {
    const { IMG_URL } = $config;
    return `${IMG_URL}/${inValue}`;
  }

}


