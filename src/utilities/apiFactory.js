import * as constants from './constants';
import { getHash } from './lib';

class CommonAPISettings {
  constructor(options) {
    this.pathname = options.pathname;
    this.startsWith = options.startsWith;
    this.limit = options.limit || constants.LIMIT_RESULTS;
    this.baseApi = constants.API_BASE;
    this.offset = options.offset;
    this.search = options.search || '';
    this.query = '';
    this.authentication = '';
  }
  createAuthentication() {
    const ts = new Date().getTime();
    const hash = getHash(ts + constants.PRIVATE_KEY + constants.PUBLIC_KEY);
    this.authentication = `${/\/\d+\/?/.test(this.pathname) ? '?' : '&'}ts=${ts}&apikey=${constants.PUBLIC_KEY}&hash=${hash}`;
  }
  asSecondType() {
    this.queryParametrs();
    this.createAuthentication();
    return `${this.pathname}${this.search}${this.query}${this.authentication}`;
  }
  createApiString() {
    this.queryParametrs();
    this.createAuthentication();
    return `${this.baseApi}${this.pathname}${this.search}${this.query}${this.authentication}`;
  }
}
class Characters extends CommonAPISettings {
  constructor(options) {
    super(options);
    this.order = options.order || constants.ORDER;
  }
  queryParametrs() {
    let startsWithQuery = this.startsWith ? `nameStartsWith=${this.startsWith}` : '';
    let offsetQuery = this.offset ? `offset=${this.offset}` : '';
    let orderQuery = `orderBy=${this.order}`;
    let limitQuery = `limit=${this.limit}`;
    let concatedQuery = [startsWithQuery, orderQuery, limitQuery, offsetQuery].filter(item => item).join('&');
    this.query = /\/\d+\/?/.test(this.pathname) ? '' : `${this.search ? '&' : '?'}${concatedQuery}`;
  }
}
class Comics extends CommonAPISettings {
  constructor(options) {
    super(options);
    this.order = options.order || constants.ORDER_TITLE;
  }
  queryParametrs() {
    let startsWithQuery = this.startsWith ? `titleStartsWith=${this.startsWith}` : '';
    let offsetQuery = this.offset ? `offset=${this.offset}` : '';
    let orderQuery = `orderBy=${this.order}`;
    let limitQuery = `limit=${this.limit}`;
    let concatedQuery = [startsWithQuery, orderQuery, limitQuery, offsetQuery].filter(item => item).join('&');
    this.query = /\/\d+\/?/.test(this.pathname) ? '' : `${this.search ? '&' : '?'}${concatedQuery}`;
  }
}
class Series extends CommonAPISettings {
  constructor(options) {
    super(options);
    this.order = options.order || constants.ORDER_TITLE;
  }
  queryParametrs() {
    let startsWithQuery = this.startsWith ? `titleStartsWith=${this.startsWith}` : '';
    let offsetQuery = this.offset ? `offset=${this.offset}` : '';
    let orderQuery = `orderBy=${this.order}`;
    let limitQuery = `limit=${this.limit}`;
    let concatedQuery = [startsWithQuery, orderQuery, limitQuery, offsetQuery].filter(item => item).join('&');
    this.query = /\/\d+\/?/.test(this.pathname) ? '' : `${this.search ? '&' : '?'}${concatedQuery}`;
  }
}
class Events extends CommonAPISettings {
  constructor(options) {
    super(options);
    this.order = options.order || constants.ORDER;
  }
  queryParametrs() {
    let startsWithQuery = this.startsWith ? `nameStartsWith=${this.startsWith}` : '';
    let offsetQuery = this.offset ? `offset=${this.offset}` : '';
    let orderQuery = `orderBy=${this.order}`;
    let limitQuery = `limit=${this.limit}`;
    let concatedQuery = [startsWithQuery, orderQuery, limitQuery, offsetQuery].filter(item => item).join('&');
    this.query = /\/\d+\/?/.test(this.pathname) ? '' : `${this.search ? '&' : '?'}${concatedQuery}`;
  }
}
class Creators extends CommonAPISettings {
  constructor(options) {
    super(options);
    this.order = options.order || constants.ORDER_LAST_NAME;
  }
  queryParametrs() {
    let startsWithQuery = this.startsWith ? `nameStartsWith=${this.startsWith}` : '';
    let offsetQuery = this.offset ? `offset=${this.offset}` : '';
    let orderQuery = `orderBy=${this.order}`;
    let limitQuery = `limit=${this.limit}`;
    let concatedQuery = [startsWithQuery, orderQuery, limitQuery, offsetQuery].filter(item => item).join('&');
    this.query = /\/\d+\/?/.test(this.pathname) ? '' : `${this.search ? '&' : '?'}${concatedQuery}`;
  }
}

class ApiFactory {
  constructor() {
    this.apiHash = [];
    this.elementClass = null;
  }
  setPrototype(itemClass) {
    this.elementClass = itemClass;
  }
  createApiHandler(options) {
    let type = options.pathname.match(/\w+/)[0];
    switch (type) {
      case 'characters':
        this.setPrototype(Characters);
        break;
      case 'comics':
        this.setPrototype(Comics);
        break;
      case 'creators':
        this.setPrototype(Creators);
        break;
      case 'events':
        this.setPrototype(Events);
        break;
      case 'series':
        this.setPrototype(Series);
        break;
      default:
        break;
    }
    const item = new this.elementClass(options);
    this.apiHash.push(item);
    return item;
  }
}

const apiFactory = new ApiFactory();

export default apiFactory;
