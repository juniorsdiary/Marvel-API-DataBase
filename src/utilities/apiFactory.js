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
  /**
   * [createAuthentication description]
   * creates authentication string required by api data base settings
   * @return {[string]}
   */
  createAuthentication() {
    const ts = new Date().getTime();
    const hash = getHash(ts + constants.PRIVATE_KEY + constants.PUBLIC_KEY);
    this.authentication = `${/\/\d+\/?/.test(this.pathname) ? '?' : '&'}ts=${ts}&apikey=${constants.PUBLIC_KEY}&hash=${hash}`;
  }
  /**
   * [asSecondType description]
   * when certain type of data presented as second type, contructs only query part with auth data
   * @return {[string]}
   */
  asSecondType() {
    this.queryParametrs();
    this.createAuthentication();
    return `${this.pathname}${this.search}${this.query}${this.authentication}`;
  }
  /**
   * [createApiString description]
   * creates full url string for fetchin function
   * @return {[string]} [full url string]
   */
  createApiString() {
    this.queryParametrs();
    this.createAuthentication();
    return `${this.baseApi}${this.pathname}${this.search}${this.query}${this.authentication}`;
  }
}
class Characters extends CommonAPISettings {
  constructor(options) {
    super(options);
    this.order = options.order ? constants.NAME_ASC : constants.NAME_DESC;
  }
  /**
   * [queryParametrs description]
   * creates query string based on the provided data of the current search filters
   * @return {[string]} [fetch url query parametrs]
   */
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
    this.order = options.order ? constants.TITLE_ASC : constants.TITLE_DESC;
  }
  /**
   * [queryParametrs description]
   * creates query string based on the provided data of the current search filters
   * @return {[string]} [fetch url query parametrs]
   */
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
    this.order = options.order ? constants.TITLE_ASC : constants.TITLE_DESC;
  }
  /**
   * [queryParametrs description]
   * creates query string based on the provided data of the current search filters
   * @return {[string]} [fetch url query parametrs]
   */
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
    this.order = options.order ? constants.NAME_ASC : constants.NAME_DESC;
  }
  /**
   * [queryParametrs description]
   * creates query string based on the provided data of the current search filters
   * @return {[string]} [fetch url query parametrs]
   */
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
    this.order = options.order ? constants.LAST_NAME_ASC : constants.LAST_NAME_DESC;
  }
  /**
   * [queryParametrs description]
   * creates query string based on the provided data of the current search filters
   * @return {[string]} [fetch url query parametrs]
   */
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
  /**
   * [createApiHandler description]
   * create api handler object based on the path input and saves in hash array
   * @param  {[object]} options [provided data for api handler]
   * @return {[object]}         [api handler for creating url strings to fetch data based on the options parametrs]
   */
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
