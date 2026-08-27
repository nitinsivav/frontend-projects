const bookmarkTitle = document.getElementById('bookmark-title');
const bookmarkUrl = document.getElementById('bookmark-url');
const addBookmarkButton = document.getElementById('add-bookmark');
const bookmarksList = document.getElementById('bookmarks');


document.addEventListener('DOMContentLoaded', loadBookmarks);

addBookmarkButton.addEventListener('click', () => {
    const title = bookmarkTitle.value.trim();
    const url = bookmarkUrl.value.trim();

    if(!title || !url) {
        alert('Please enter both title and URL.');
        return;
    }else {
        if(!url.startsWith('http://') && !url.startsWith('https://')) {
            alert('Please enter a valid URL starting with http:// or https://');
            return;
        }
        addBookmark(title, url);
        saveBookmark(title, url);
        bookmarkTitle.value = '';
        bookmarkUrl.value = '';
    }
});

function addBookmark(title, url) {
    const li = document.createElement('li');
    const link = document.createElement('a');
    link.href = url;
    link.textContent = title;
    link.target = '_blank';

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
        bookmarksList.removeChild(li);
        removeBookmarkFromStorage(title, url);
    });

    li.appendChild(link);
    li.appendChild(deleteButton);
    bookmarksList.appendChild(li);
}

function getBookmarksFromStorage() {
    const bookmarks = localStorage.getItem('bookmarks');
    return bookmarks ? JSON.parse(bookmarks) : [];
}

function saveBookmark(title, url) {
    const bookmarks = getBookmarksFromStorage();
    bookmarks.push({ title, url });
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

function loadBookmarks() {
    const bookmarks = getBookmarksFromStorage();
    bookmarks.forEach(bookmark => {
        addBookmark(bookmark.title, bookmark.url);
    });
}

function removeBookmarkFromStorage(title, url) {
    let bookmarks = getBookmarksFromStorage();
    bookmarks = bookmarks.filter((bookmark) => !(bookmark.title === title || bookmark.url === url));
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}