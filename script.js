const xhr = new XMLHttpRequest;
const url = 'https://www.forverkliga.se/JavaScript/api/crud.php?requestKey';
xhr.responseType = 'json';
xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {

    }
}
xhr.open('GET', url);
xhr.send();
let key = xhr.response;  // once you have a key, it is ok to store it in a variable
const baseUrl = 'https://www.forverkliga.se/JavaScript/api/crud.php?key=' + key;
const viewRequest = baseUrl + '&op=select';
//fetch(url).then(???).catch(???)
