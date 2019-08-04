import { FETCH_CHARACTERS, FETCH_SINGLE_CHARACTERS, IS_FETCHING } from './types';
import CryptoJS from 'crypto-js';

const apiBase = 'http://gateway.marvel.com:80/v1/public';
const privateKey = '81599b6084196f5eae1b23c0dabd62ade6a0b5a6';
const publicKey = 'af48a55f0d13c38934f13e3f4df545d0';
/**
 * [getHash get a timestamp of the current api call]
 * @param  {[number]} ts [timestamp of the call]
 * @return {[string]}    [retrun string of converted hash of ts api publick and private keys]
 */
function contructParametrsQuery(startsWith) {
  let params = {
    startsWith,
    orderBy: 'name',
    limit: '20',
    toString: function() {
      let startsWith = this.startsWith ? `nameStartsWith=${this.startsWith}` : '';
      return `${startsWith}&orderBy=${this.orderBy}&limit=${this.limit}`;
    },
  };
  return params;
}
function getHash(ts) {
  return CryptoJS.MD5(ts + privateKey + publicKey).toString();
}
/**
 * [fetchCharacters fetches list of characters with paramets set from filter Component]
 * @return {[dispatch function]}        [dispatches data to the reducer]
 */
export const fetchCharacters = parametrs => async dispatch => {
  const ts = new Date().getTime();
  const hash = getHash(ts);
  let params = contructParametrsQuery(parametrs);
  let res = await fetch(`${apiBase}/characters?${params}&ts=${ts}&apikey=${publicKey}&hash=${hash}`);
  let data = await res.json();
  await dispatch({
    type: FETCH_CHARACTERS,
    payload: data.data,
  });
  await dispatch({ type: IS_FETCHING, payload: false });
};

export const fetchSingleCharacter = id => async dispatch => {
  const ts = new Date().getTime();
  const hash = getHash(ts);
  let res = await fetch(`${apiBase}/characters/${id}?ts=${ts}&apikey=${publicKey}&hash=${hash}`);
  let data = await res.json();
  await dispatch({
    type: FETCH_SINGLE_CHARACTERS,
    payload: data.data,
  });
};
