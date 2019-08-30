import CryptoJS from 'crypto-js';
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
export function definePagesIndex(pages, pageNum) {
  // console.log(pageNum);
  // console.log(pages);
  const indexArr = [...Array(pages + 1).keys()];
  if (pages < 6) {
    return indexArr.slice(1);
  } else if (pageNum > 2) {
    return [...indexArr.slice(pageNum - 2, pageNum), ...indexArr.slice(pageNum, pageNum + 3)];
  } else if (pageNum > pages - 2) {
    return indexArr.splice(pages, -5);
  }
  return indexArr.slice(1, 6);
}
/**
 * [convertToLocale description]
 * @param  {[type]} timeString [description]
 * @return {[type]}            [description]
 */
export const convertToLocale = timeString => {
  let time = timeString && new Date(timeString.match(/(.+)T/)[1]);
  let options = {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  };
  return time.toLocaleString('en-US', options);
};
