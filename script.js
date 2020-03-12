let keyAPI = 'VTVQk';
let baseUrl = 'https://www.forverkliga.se/JavaScript/api/crud.php?key=' + keyAPI;

window.addEventListener('load', () => {
    addBookNameField = document.getElementById('add-book-name');
    addBookAuthorField = document.getElementById('add-book-author-name');
    removeBookIdField = document.getElementById('remove-book-id');
    bookList = document.getElementById('book-list');
});

function submitBookToAPI(tryTimes) {
    if (tryTimes <= 0) {
        console.log('Failed to submit book to API...');
        return;
    }
    const operation = '&op=insert';
    const bookName = '&title=' + addBookNameField.value;
    const bookAuthor = '&author=' + addBookAuthorField.value;
    const endpoint = baseUrl + operation + bookName + bookAuthor;
    fetch(endpoint)
    .then(response => response.json())
    .then(json => {
        if (json.status === 'success') {
            console.log(`Sucessfully added book after ${11 - tryTimes} attempts!`);
            clearAddBookForm();
            return true;
        } else {
        return submitBookToAPI(tryTimes - 1);
        }
    });
}

function getBooksFromAPI(tryTimes) {
    if (tryTimes <= 0) {
        console.log('Failed to get books from API...');
        return;
    }
    console.log('Getting books from API...')
    const operation = '&op=select';
    const endpoint = baseUrl + operation;
    fetch(endpoint)
    .then(response => response.json())
    .then(json => {
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
            console.log(`Succesfully fetched books & updated book list after ${11 - tryTimes} tries`);
        } else {
        return getBooksFromAPI(tryTimes - 1);
        }
    });
}

function clearAddBookForm() {
    addBookNameField.value = '';
    addBookAuthorField.value = '';
}

function getNewAPIKey(tryTimes) {
    if (tryTimes <= 0) {
        console.log('Failed to get new API key...');
        return;
    }
    const url = 'https://www.forverkliga.se/JavaScript/api/crud.php?requestKey';
    fetch(url)
    .then(response => {return response.json()})
    .then((json) => {
        if (json.status === 'success') {
            keyAPI = json.key;
            baseUrl = 'https://www.forverkliga.se/JavaScript/api/crud.php?key=' + keyAPI;
            console.log(`New API key succesfully saved after ${11 - tryTimes} attempts!`)
        }
        else {
            getNewAPIKey(tryTimes - 1);
        }
    })
    .catch((error) => {
        console.log(error.message);
    })
}

function onRemoveBookButtonPressed() {
    const id = removeBookIdField.value;
    removeBookFromAPI(id, 10);
}

function removeBookFromAPI(id, tryTimes) {
    if (tryTimes <= 0) {
        console.log('Failed to remove book from API...');
        return;
    }
    const operation = '&op=delete';
    const theId = '&id=' + id;
    const endpoint = baseUrl + operation + theId;
    fetch(endpoint)
    .then((response) => {return response.json})
    .then((json) => {
        if (json.status === 'success') {
            console.log('Successfully removed book!');
        }
        else {
            removeBookFromAPI(id, tryTimes - 1);
        }
    })
}