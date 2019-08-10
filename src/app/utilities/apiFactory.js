import * as constants from './constants';
import { getHash } from './lib';
// EVENTS_API
// SERIES_API
// STORIES_API
class Characters {
  constructor(options) {
    this.type = options.type;
    this.api = constants.CHARACTERS_API;
    this.startsWith = options.startsWith;
    this.limit = constants.LIMIT_RESULTS;
    this.order = constants.ORDER;
    this.offset = options.offset;
    this.id = options.id;
    this.secondType = options.secondType;
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
  createAuthentication() {
    const ts = new Date().getTime();
    const hash = getHash(ts + constants.PRIVATE_KEY + constants.PUBLIC_KEY);
    this.authentication = `${this.id ? '?' : '&'}ts=${ts}&apikey=${constants.PUBLIC_KEY}&hash=${hash}`;
  }
  createApiString() {
    this.queryParametrs();
    this.createAuthentication();
    return `${this.api}${this.query}${this.authentication}`;
  }
}
class Comics {
  constructor(options) {
    this.type = options.type;
    this.startsWith = options.startsWith;
    this.api = constants.COMICS_API;
    this.order = constants.ORDER_TITLE;
    this.limit = options.limit || constants.LIMIT_RESULTS;
    this.offset = options.offset;
    this.id = options.id;
    this.secondType = options.secondType;
    this.query = '';
    this.authentication = '';
  }
  createAuthentication() {
    const ts = new Date().getTime();
    const hash = getHash(ts + constants.PRIVATE_KEY + constants.PUBLIC_KEY);
    this.authentication = `${this.id ? '?' : '&'}ts=${ts}&apikey=${constants.PUBLIC_KEY}&hash=${hash}`;
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
    return `/comics${this.query}${this.authentication}`;
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
class Events {
  constructor(options) {
    this.type = options.type;
    this.api = constants.EVENTS_API;
    this.secondDependencyArray = ['comics', 'events', 'series', 'stories'];
  }
}
class Series {
  constructor(options) {
    this.type = options.type;
    this.api = constants.SERIES_API;
    this.secondDependencyArray = ['comics', 'events', 'series', 'stories'];
  }
}
class Stories {
  constructor(options) {
    this.type = options.type;
    this.api = constants.STORIES_API;
    this.secondDependencyArray = ['characters', 'creators', 'events', 'stories'];
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

// /v1/public/characters Fetches lists of characters.
// GET /v1/public/characters/{characterId} Fetches a single character by id.
// GET /v1/public/characters/{characterId}/comics Fetches lists of comics filtered by a character id.
// GET /v1/public/characters/{characterId}/events Fetches lists of events filtered by a character id.
// GET /v1/public/characters/{characterId}/series Fetches lists of series filtered by a character id.
// GET /v1/public/characters/{characterId}/stories Fetches lists of stories filtered by a character id.
//
// GET /v1/public/comics Fetches lists of comics.
// GET /v1/public/comics/{comicId} Fetches a single comic by id.
// GET /v1/public/comics/{comicId}/characters Fetches lists of characters filtered by a comic id.
// GET /v1/public/comics/{comicId}/creators Fetches lists of creators filtered by a comic id.
// GET /v1/public/comics/{comicId}/events Fetches lists of events filtered by a comic id.
// GET /v1/public/comics/{comicId}/stories Fetches lists of stories filtered by a comic id.
//
// GET /v1/public/creators Fetches lists of creators.
// GET /v1/public/creators/{creatorId} Fetches a single creator by id.
// GET /v1/public/creators/{creatorId}/comics Fetches lists of comics filtered by a creator id.
// GET /v1/public/creators/{creatorId}/events Fetches lists of events filtered by a creator id.
// GET /v1/public/creators/{creatorId}/series Fetches lists of series filtered by a creator id.
// GET /v1/public/creators/{creatorId}/stories Fetches lists of stories filtered by a creator id.
//
// GET /v1/public/events Fetches lists of events.
// GET /v1/public/events/{eventId} Fetches a single event by id.
// GET /v1/public/events/{eventId}/characters Fetches lists of characters filtered by an event id.
// GET /v1/public/events/{eventId}/comics Fetches lists of comics filtered by an event id.
// GET /v1/public/events/{eventId}/creators Fetches lists of creators filtered by an event id.
// GET /v1/public/events/{eventId}/series Fetches lists of series filtered by an event id.
// GET /v1/public/events/{eventId}/stories Fetches lists of stories filtered by an event id.
//
// GET /v1/public/series Fetches lists of series.
// GET /v1/public/series/{seriesId} Fetches a single comic series by id.
// GET /v1/public/series/{seriesId}/characters Fetches lists of characters filtered by a series id.
// GET /v1/public/series/{seriesId}/comics Fetches lists of comics filtered by a series id.
// GET /v1/public/series/{seriesId}/creators Fetches lists of creators filtered by a series id.
// GET /v1/public/series/{seriesId}/events Fetches lists of events filtered by a series id.
// GET /v1/public/series/{seriesId}/stories Fetches lists of stories filtered by a series id.
//
// GET /v1/public/stories Fetches lists of stories.
// GET /v1/public/stories/{storyId} Fetches a single comic story by id.
// GET /v1/public/stories/{storyId}/characters Fetches lists of characters filtered by a story id.
// GET /v1/public/stories/{storyId}/comics Fetches lists of comics filtered by a story id.
// GET /v1/public/stories/{storyId}/creators Fetches lists of creators filtered by a story id.
// GET /v1/public/stories/{storyId}/events Fetches lists of events filtered by a story id.
// GET /v1/public/stories/{storyId}/series Fetches lists of series filtered by a story id.
//
