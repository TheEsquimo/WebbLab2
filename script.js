let key = '1i1aQ';  // once you have a key, it is ok to store it in a variable
const baseUrl = 'https://www.forverkliga.se/JavaScript/api/crud.php?key=' + key;
//const viewRequest = baseUrl + '&op=select';
//fetch(url).then(???).catch(???)
const bookArray = [];
const addBookNameField = document.getElementById('add-book-name');
const addBookAuthorField = document.getElementById('add-book-author-name');
const addBookButton = document.getElementById('add-book-submit');
const bookList = document.getElementById('book-list');
addBookButton.addEventListener('click', onAddBookClicked);

function onAddBookClicked() {
    const operation = '&op=insert';
    const bookName = '&title=' + addBookNameField.value;
    const bookAuthor = '&author=' + addBookAuthorField.value;
    const endpoint = baseUrl + operation + bookName + bookAuthor;
    let bookAddSuccess = submitBookToAPI(endpoint);
    if (bookAddSuccess) {
        clearAddBookForm();
        var newBook = document.createElement('li');
        li.innerHTML = {bookName, bookAuthor};     
        bookList.appendChild(newBook);
    }
}

function submitBookToAPI(url) {
    fetch(url)
    .then(response => response.json())
    .then(json => {
        if (json.status === 'success') {
            console.log('Sucessfully added book!')
            return true;
        } else {
        console.log('Failed to add book...');
        return false;
        }
    });
}

function getBooksFromAPI() {
    const operation = '&op=select'
    const endpoint = baseUrl + operation;
    fetch(endpoint)
    .then(response => response.json())
    .then(json => {
        if (json.status === 'success') {
            const bookArray = [];
            json.data.forEach(element => {
                bookArray.push({title: element.title, author: element.author});
            });
            return bookArray;
        } else {
        console.log('Failed to add book...');
        return false;
        }
    });
}

function clearAddBookForm() {
    addBookNameField.value = '';
    addBookAuthorField.value = '';
}

bookArray = getBooksFromAPI();