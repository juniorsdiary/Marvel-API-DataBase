import CryptoJS from 'crypto-js';
/**
 * [fetchFunction description]
 * @param  {[type]}  url [description]
 * @return {Promise}     [description]
 */
export const fetchFunction = async url => {
  const res = await fetch(url);
  return await res.json();
};

/**
 * [getHash get a timestamp of the current api call]
 * @param  {[number]} ts [timestamp of the call]
 * @return {[string]}    [retrun string of converted hash of ts api publick and private keys]
 */
export function getHash(cipherValue) {
  return CryptoJS.MD5(cipherValue).toString();
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

export const convertToLocale = timeString => {
  let options = {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  };
  return new Date(timeString).toLocaleString('en-US', options);
};
