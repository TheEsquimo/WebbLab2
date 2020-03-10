let key = '1i1aQ';  // once you have a key, it is ok to store it in a variable
const baseUrl = 'https://www.forverkliga.se/JavaScript/api/crud.php?key=' + key;
//const viewRequest = baseUrl + '&op=select';
//fetch(url).then(???).catch(???)
const addBookNameField = document.getElementById('add-book-name');
const addBookAuthorField = document.getElementById('add-book-author-name');
const addBookButton = document.getElementById('add-book-submit');
addBookButton.addEventListener('click', addBook);

async function addBook() {
    let operation = '&op=insert';
    let bookAuthor = '&author=' + addBookAuthorField.value;
    const bookName = '&title=' + addBookNameField.value;
    const endpoint = baseUrl + operation + bookName + bookAuthor;
    let response = await fetch(endpoint);
    let responseText = await response.text;
    console.log(responseText);
}