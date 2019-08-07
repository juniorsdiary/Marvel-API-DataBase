import CryptoJS from 'crypto-js';
import * as constants from './constants';
/**
 * [contructParametrsQuery creates search query based on the given parametrs]
 * @param  {[string]} startsWith [search value]
 * @param  {[number]} offset     [number of skipped data results]
 * @param  {[number]} id         [id of the item for single search]
 * @return {[string]}            [full query based of the given parametrs]
 */
export function contructParametrsQuery(startsWith, offset, id) {
  let params = {
    startsWith,
    offset,
    id,
    toString: function() {
      let startsWithQuery = this.startsWith ? `nameStartsWith=${this.startsWith}` : '';
      let offsetQuery = this.offset ? `offset=${this.offset}` : '';
      let orderQuery = `orderBy=${constants.ORDER}`;
      let limitQuery = `limit=${constants.LIMIT_RESULTS}`;
      let concatedQuery = [startsWithQuery, orderQuery, limitQuery, offsetQuery].filter(item => item).join('&');
      return `?${concatedQuery}&`;
    },
  };
  return params;
}
/**
 * [getHash get a timestamp of the current api call]
 * @param  {[number]} ts [timestamp of the call]
 * @return {[string]}    [retrun string of converted hash of ts api publick and private keys]
 */
export function getHash(ts) {
  return CryptoJS.MD5(ts + constants.PRIVATE_KEY + constants.PUBLIC_KEY).toString();
}
/**
 * [createApiString - construct api string for fetch function based on the given parametrs and options]
 * @param  {[string]} fetchSubject [choosed search from [characters, comics, events, stories]]
 * @param  {[string]} startsWith   [value of the current search]
 * @param  {[number]} offset     [number of items skiped through the results data]
 * @return {[string]}        [cinstructed api request for the fetch function]
 */
export function createApiString(fetchSubject, startsWith, offset) {
  const ts = new Date().getTime();
  const hash = getHash(ts);
  const params = contructParametrsQuery(startsWith, offset);
  let authentication = `ts=${ts}&apikey=${constants.PUBLIC_KEY}&hash=${hash}`;
  return `${constants.API_BASE}${fetchSubject}${params}${authentication}`;
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
