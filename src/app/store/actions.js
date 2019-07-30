import { FETCH_CHARACTERS } from './types';
import CryptoJS from 'crypto-js';

export const fetchCharacters = () => async dispatch => {
  const apiBase = 'http://gateway.marvel.com:80/v1/public';
  const ts = new Date().getTime();
  const privateKey = '81599b6084196f5eae1b23c0dabd62ade6a0b5a6';
  const publicKey = 'af48a55f0d13c38934f13e3f4df545d0';
  const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();
  let params = {
    orderBy: 'name',
    limit: '100',
    toString: function() {
      return `orderBy=${this.orderBy}&limit=${this.limit}`;
    },
  };
  let res = await fetch(`${apiBase}/characters?${params}&ts=${ts}&apikey=${publicKey}&hash=${hash}`);
  let data = await res.json();
  return {
    type: FETCH_CHARACTERS,
    payload: data.data,
  };
};

export const increment = () => ({});
