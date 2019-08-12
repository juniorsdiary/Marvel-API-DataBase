import * as constants from './constants';
import { getHash } from './lib';
// EVENTS_API
// SERIES_API
// STORIES_API
class Authentication {
  constructor(id) {
    this.id = '';
  }
  createAuthentication() {
    const ts = new Date().getTime();
    const hash = getHash(ts + constants.PRIVATE_KEY + constants.PUBLIC_KEY);
    this.authentication = `${this.id ? '?' : '&'}ts=${ts}&apikey=${constants.PUBLIC_KEY}&hash=${hash}`;
  }
}
class Characters extends Authentication {
  constructor(options) {
    super(options.id);
    this.type = options.type;
    this.api = constants.CHARACTERS_API;
    this.startsWith = options.startsWith;
    this.limit = constants.LIMIT_RESULTS;
    this.order = constants.ORDER;
    this.offset = options.offset;
    this.id = options.id;
    this.query = '';
    this.authentication = '';
  }
  queryParametrs() {
    let startsWithQuery = this.startsWith ? `nameStartsWith=${this.startsWith}` : '';
    let offsetQuery = this.offset ? `offset=${this.offset}` : '';
    let orderQuery = `orderBy=${this.order}`;
    let limitQuery = `limit=${this.limit}`;
    let concatedQuery = [startsWithQuery, orderQuery, limitQuery, offsetQuery].filter(item => item).join('&');
    this.query = this.id ? `/${this.id}` : `?${concatedQuery}`;
  }
  asSecondType() {
    this.queryParametrs();
    this.createAuthentication();
    return `/${this.type}${this.query}${this.authentication}`;
  }
  createApiString() {
    this.queryParametrs();
    this.createAuthentication();
    return `${this.api}${this.query}${this.authentication}`;
  }
}
class Comics extends Authentication {
  constructor(options) {
    super(options.id);
    this.type = options.type;
    this.startsWith = options.startsWith;
    this.api = constants.COMICS_API;
    this.order = constants.ORDER_TITLE;
    this.limit = options.limit || constants.LIMIT_RESULTS;
    this.offset = options.offset;
    this.id = options.id;
    this.query = '';
    this.authentication = '';
  }
  queryParametrs() {
    let startsWithQuery = this.startsWith ? `titleStartsWith=${this.startsWith}` : '';
    let offsetQuery = this.offset ? `offset=${this.offset}` : '';
    let orderQuery = `orderBy=${this.order}`;
    let limitQuery = `limit=${this.limit}`;
    let concatedQuery = [startsWithQuery, orderQuery, limitQuery, offsetQuery].filter(item => item).join('&');
    this.query = `?${concatedQuery}`;
  }
  asSecondType() {
    this.queryParametrs();
    this.createAuthentication();
    return `/${this.type}${this.query}${this.authentication}`;
  }
  createApiString() {
    this.queryParametrs();
    this.createAuthentication();
    return `${this.api}${this.query}${this.authentication}`;
  }
}
class Series extends Authentication {
  constructor(options) {
    super(options.id);
    this.type = options.type;
    this.api = constants.SERIES_API;
    this.startsWith = options.startsWith;
    this.order = constants.ORDER_TITLE;
    this.limit = options.limit || constants.LIMIT_RESULTS;
    this.offset = options.offset;
    this.id = options.id;
    this.query = '';
    this.authentication = '';
  }
  queryParametrs() {
    let startsWithQuery = this.startsWith ? `titleStartsWith=${this.startsWith}` : '';
    let offsetQuery = this.offset ? `offset=${this.offset}` : '';
    let orderQuery = `orderBy=${this.order}`;
    let limitQuery = `limit=${this.limit}`;
    let concatedQuery = [startsWithQuery, orderQuery, limitQuery, offsetQuery].filter(item => item).join('&');
    this.query = `?${concatedQuery}`;
  }
  asSecondType() {
    this.queryParametrs();
    this.createAuthentication();
    return `/${this.type}${this.query}${this.authentication}`;
  }
  createApiString() {
    this.queryParametrs();
    this.createAuthentication();
    return `${this.api}${this.query}${this.authentication}`;
  }
}
class Events extends Authentication {
  constructor(options) {
    super(options.id);
    this.type = options.type;
    this.api = constants.EVENTS_API;
    this.startsWith = options.startsWith;
    this.order = constants.ORDER;
    this.limit = options.limit || constants.LIMIT_RESULTS;
    this.offset = options.offset;
    this.id = options.id;
    this.query = '';
    this.authentication = '';
  }
  queryParametrs() {
    let startsWithQuery = this.startsWith ? `nameStartsWith=${this.startsWith}` : '';
    let offsetQuery = this.offset ? `offset=${this.offset}` : '';
    let orderQuery = `orderBy=${this.order}`;
    let limitQuery = `limit=${this.limit}`;
    let concatedQuery = [startsWithQuery, orderQuery, limitQuery, offsetQuery].filter(item => item).join('&');
    this.query = this.id ? `/${this.id}` : `?${concatedQuery}`;
  }
  asSecondType() {
    this.queryParametrs();
    this.createAuthentication();
    return `/${this.type}${this.query}${this.authentication}`;
  }
  createApiString() {
    this.queryParametrs();
    this.createAuthentication();
    return `${this.api}${this.query}${this.authentication}`;
  }
}
class Stories extends Authentication {
  constructor(options) {
    super(options.id);
    this.type = options.type;
    this.api = constants.STORIES_API;
    this.order = constants.ORDER_ID;
    this.limit = options.limit || constants.LIMIT_RESULTS;
    this.offset = options.offset;
    this.id = options.id;
    this.query = '';
    this.authentication = '';
  }
  queryParametrs() {
    let startsWithQuery = this.startsWith ? `nameStartsWith=${this.startsWith}` : '';
    let offsetQuery = this.offset ? `offset=${this.offset}` : '';
    let orderQuery = `orderBy=${this.order}`;
    let limitQuery = `limit=${this.limit}`;
    let concatedQuery = [startsWithQuery, orderQuery, limitQuery, offsetQuery].filter(item => item).join('&');
    this.query = this.id ? `/${this.id}` : `?${concatedQuery}`;
  }
  asSecondType() {
    this.queryParametrs();
    this.createAuthentication();
    return `/${this.type}${this.query}${this.authentication}`;
  }
  createApiString() {
    this.queryParametrs();
    this.createAuthentication();
    return `${this.api}${this.query}${this.authentication}`;
  }
}

class Creators {
  constructor(options) {
    this.type = options.type;
    this.api = constants.CREATORS_API;
    this.secondDependencyArray = ['comics', 'events', 'series', 'stories'];
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
    switch (options.type) {
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
      case 'stories':
        this.setPrototype(Stories);
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
