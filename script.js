let key = '1i1aQ';  // once you have a key, it is ok to store it in a variable
const baseUrl = 'https://www.forverkliga.se/JavaScript/api/crud.php?key=' + key;
//const viewRequest = baseUrl + '&op=select';
//fetch(url).then(???).catch(???)

function addBook() {
    const bookName = document.getElementById(bookNameID).value;
    const bookAuthor = document.getElementById(authorNameID).value;
    const insertRequest = baseUrl + `&op=insert&${bookName}&${bookAuthor}`;
    const xhr = new XMLHttpRequest();
    const url = insertRequest;
    const data = JSON.stringify({id: bookName, author: bookAuthor});
    xhr.responseType = 'json';
    xhronreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            console.log('Book added');
        }
    }
    xhr.open('POST', url);
    xhr.send(data);
}

const addBookButton = document.getElementById('add-book-button');
addBookButton.onclick = addBook();