import CryptoJS from 'crypto-js';
import { PRIVATE_KEY, PUBLIC_KEY, API_BASE } from './constants';
/**
 * [getHash get a timestamp of the current api call]
 * @param  {[number]} ts [timestamp of the call]
 * @return {[string]}    [retrun string of converted hash of ts api publick and private keys]
 */
export function contructParametrsQuery(startsWith, offset, id) {
  let params = {
    startsWith,
    offset,
    id,
    orderBy: 'name',
    limit: '33',
    toString: function() {
      let startsWithQuery = this.startsWith ? `nameStartsWith=${this.startsWith}` : '';
      let offsetQuery = this.offset ? `offset=${this.offset}` : '';
      let orderQuery = `orderBy=${this.orderBy}`;
      let limitQuery = `limit=${this.limit}`;
      let concatedQuery = [startsWithQuery, orderQuery, limitQuery, offsetQuery].filter(item => item).join('&');
      return `?${concatedQuery}&`;
    },
  };
  return params;
}
/**
 * [fetchCharacters fetches list of characters with paramets set from filter Component]
 * @return {[dispatch function]}        [dispatches data to the reducer]
 */
export function getHash(ts) {
  return CryptoJS.MD5(ts + PRIVATE_KEY + PUBLIC_KEY).toString();
}
/**
 * [createApiString - construct api string for fetch function based on the given parametrs and options]
 * @param  {[string]} params [search parametrs based on the type of search]
 * @param  {[string]} hash   [hash string of the current request]
 * @param  {[number]} ts     [timestamp of the request]
 * @return {[string]}        [cinstructed api request for the fetch function]
 */
export function createApiString(params, hash, ts) {
  let authentication = `ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`;
  return `${API_BASE}${params}${authentication}`;
}
/**
 * [definePagesIndex defines page indexex dependes on the current page number]
 * @param  {[number]} pageNum [current page number]
 * @param  {[number]} pages   [total pages of the fetched results]
 * @return {[array]}         [2d array of page indexes]
 */
export function definePagesIndex(pageNum, pages) {
  let firstPages = pages > 1 ? [1, 2] : [];
  let lastPages = pages >= 5 ? [pages - 1, pages] : [];
  let middlePages = [];
  for (let pageInd = 3; pageInd <= (pages < 5 ? pages : pages - 2); pageInd++) {
    if (pages < 9) middlePages.push(pageInd);
    else if ((pageNum < 4 && pageInd <= 5) || (pageNum >= pages - 5 && pageInd >= pages - 4)) middlePages.push(pageInd);
    else if (pageNum <= 6 && pageInd <= pageNum + 2) middlePages.push(pageInd);
    else if (pageNum > 6 && pageInd <= pageNum + 2 && pageInd >= pageNum - 2) middlePages.push(pageInd);
  }
  return [firstPages, lastPages, middlePages];
}
