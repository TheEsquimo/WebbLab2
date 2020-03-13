let keyAPI = 'VTVQk';
let baseUrl = 'https://www.forverkliga.se/JavaScript/api/crud.php?key=' + keyAPI;
const standardTryTimes = 10;
let addBookTitleField;
let addBookAuthorField;
let modifyBookIdField;
let modifyBookTitleField;
let modifyBookAuthorField;
let removeBookIdField;
let addBookForm;
let modifyBookForm;
let removeBookForm;
let operationStatusParagraph;

window.addEventListener('load', () => {
    addBookForm = document.getElementById('add-book-form');
    modifyBookForm = document.getElementById('modify-book-form');
    removeBookForm = document.getElementById('remove-book-form');
    addBookTitleField = document.getElementById('add-book-title');
    addBookAuthorField = document.getElementById('add-book-author-name');
    removeBookIdField = document.getElementById('remove-book-id');
    modifyBookIdField = document.getElementById('modify-book-id');
    modifyBookTitleField = document.getElementById('modify-book-title')
    modifyBookAuthorField = document.getElementById('modify-book-author-name')
    bookList = document.getElementById('book-list');
    operationStatusParagraph = document.getElementById('operation-status');
});

function submitBookToAPI(tryTimes = standardTryTimes) {
    if (tryTimes <= 0) {
        console.log('Failed to submit book to API...');
        operationStatusParagraph.innerHTML = 'Failed to submit book to API...';
        return;
    }
    const operation = '&op=insert';
    const bookTitle = '&title=' + addBookTitleField.value;
    const bookAuthor = '&author=' + addBookAuthorField.value;
    const endpoint = baseUrl + operation + bookTitle + bookAuthor;
    fetch(endpoint)
    .then(response => response.json())
    .then(json => {
        if (json.status === 'success') {
            console.log(`Sucessfully added book after ${standardTryTimes - tryTimes} retries!`);
            operationStatusParagraph.innerHTML = `Sucessfully added book after ${standardTryTimes - tryTimes} retries!`;
            clearAddBookForm();
            return true;
        } else {
        return submitBookToAPI(tryTimes - 1);
        }
    });
}

function getBooksFromAPI(tryTimes = standardTryTimes) {
    if (tryTimes <= 0) {
        console.log('Failed to get books from API...');
        return;
    }
    console.log('Getting books from API...');
    const operation = '&op=select';
    const endpoint = baseUrl + operation;
    fetch(endpoint)
    .then(response => response.json())
    .then((json) => {
        if (json.status === 'success') {
            //Make fetched books into a JavaScript array of anonymous objects
            let bookArray = [];
            json.data.forEach(element => {
                bookArray.push({title: element.title, author: element.author, id: element.id});
            });
            //Add books as list elements
            bookList.innerHTML = '';
            for (let i=0; i<bookArray.length; i++) {
                const title = bookArray[i].title;
                const author = bookArray[i].author;
                const id = bookArray[i].id;
                var newBook = document.createElement('li');
                newBook.innerHTML = `Title: ${title} Author: ${author} ID: ${id}`;     
                bookList.appendChild(newBook);
            }
            console.log(`Succesfully fetched books & updated book list after ${standardTryTimes - tryTimes} retries`);
            operationStatusParagraph.innerHTML = `Succesfully fetched books & updated book list after ${standardTryTimes - tryTimes} retries`;
            
        } else {
        return getBooksFromAPI(tryTimes - 1);
        }
    });
}

function clearAddBookForm() {
    addBookTitleField.value = '';
    addBookAuthorField.value = '';
}

function getNewAPIKey(tryTimes = standardTryTimes) {
    if (tryTimes <= 0) {
        console.log('Failed to get new API key...');
        operationStatusParagraph.innerHTML = 'Failed to get new API key...';
        return;
    }
    const url = 'https://www.forverkliga.se/JavaScript/api/crud.php?requestKey';
    fetch(url)
    .then(response => {return response.json()})
    .then((json) => {
        if (json.status === 'success') {
            keyAPI = json.key;
            baseUrl = 'https://www.forverkliga.se/JavaScript/api/crud.php?key=' + keyAPI;
            console.log(`New API key succesfully saved after ${standardTryTimes - tryTimes} retries!`);
            operationStatusParagraph.innerHTML = `New API key succesfully saved after ${standardTryTimes - tryTimes} retries!`;
        }
        else {
            getNewAPIKey(tryTimes - 1);
        }
    })
    .catch((error) => {
        console.log(error.message);
    });
}

function onModifyBookButtonClicked() {
    //if ()
    const id = modifyBookIdField.value;
    const title = modifyBookTitleField.value;
    const author = modifyBookAuthorField.value;
    modifyBookFromAPI(id, title, author);
}

function modifyBookFromAPI(id, title, author, tryTimes = standardTryTimes) {
    if (tryTimes <= 0) {
        console.log('Could not modify book through API...');
        operationStatusParagraph.innerHTML = 'Could not modify book through API...';
        return;
    }
    const operation = '&op=update';
    let theId = '&id=' + id;
    let newTitle = '&title=' + title;
    let newAuthor = '&author=' + author;
    const endpoint = baseUrl + operation + theId + newTitle + newAuthor;
    fetch(endpoint)
    .then((response) => {return response.json()})
    .then((json) => {
        if (json.status === 'success') {
            console.log(`Succesfully modified book after ${standardTryTimes - tryTimes} retries`);
            operationStatusParagraph.innerHTML = `Succesfully modified book after ${standardTryTimes - tryTimes} retries`;
            modifyBookIdField.value = '';
            modifyBookTitleField.value = '';
            modifyBookAuthorField.value  = '';
        }
        else {
            modifyBookFromAPI(id, title, author, tryTimes - 1);
        }
    });
}

function onRemoveBookButtonClicked() {
    const id = removeBookIdField.value;
    removeBookFromAPI(id);
}

function removeBookFromAPI(id, tryTimes = standardTryTimes) {
    if (tryTimes <= 0) {
        console.log('Failed to remove book from API...');
        operationStatusParagraph.innerHTML = 'Failed to remove book from API...';
        return;
    }
    const operation = '&op=delete';
    const theId = '&id=' + id;
    const endpoint = baseUrl + operation + theId;
    fetch(endpoint)
    .then((response) => {return response.json()})
    .then((json) => {
        if (json.status === 'success') {
            console.log('Successfully removed book!');
            operationStatusParagraph.innerHTML = 'Successfully removed book!';
            removeBookIdField.value = '';
            getBooksFromAPI();
        }
        else {
            return removeBookFromAPI(id, tryTimes - 1);
        }
    });
}

function openForm(formName) {
    switch(formName) {
        case 'addBookForm':
            modifyBookForm.style.display = 'none';
            removeBookForm.style.display = 'none';
            addBookForm.style.display = 'block';
            break;
        case 'modifyBookForm':
            modifyBookForm.style.display = 'block';
            removeBookForm.style.display = 'none';
            addBookForm.style.display = 'none';
            break;
        case 'removeBookForm':
            modifyBookForm.style.display = 'none';
            removeBookForm.style.display = 'block';
            addBookForm.style.display = 'none';
            break;
        default:
            console.log('Failed to open form...');
            break;
    }
}