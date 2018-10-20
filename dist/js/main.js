

document.getElementById('myForm').addEventListener('submit', SaveBookmark);

// save bookmarks
function SaveBookmark(e)
{
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;

    if(!FormValidation(siteName, siteUrl))
    {
        return false;
    }

    var bookmark = {
        name: siteName,
        url: siteUrl
    };

    // Local storage usage
    /*localStorage.setItem('test', 'hello world');
    console.log(localStorage.getItem('test'));
    localStorage.removeItem('test');
    console.log(localStorage.getItem('test'));*/

    // JSON.parse turn a string into a json
    // JSON.stringify turn it into a string

    if(localStorage.getItem('bookmarks') === null)
    {
        var bookmarks = [];
        bookmarks.push(bookmark);   //adding the bookmark into the array
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks)); //save to local storage
    }
    else
    {
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks')); //get bookmarks from localstorage
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));   //re-save to local storage
    }

    // clear the form
    document.getElementById('myForm').reset();

    FetchBookmarks();           //re-fetch bookmarks without reloading the page

    e.preventDefault();
}

// delete bookmark
function DeleteBookmark(url)
{
    // get bookmarks from localstorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    for(var i = 0; i < bookmarks.length; i++)
    {
        if(bookmarks[i].url === url)
        {
            bookmarks.splice(i, 1);  //removing from array by splicing it
        }
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));   //re-save to local storage

    FetchBookmarks();           //re-fetch bookmarks without reloading the page
}

// fetch bookmarks
function FetchBookmarks()
{
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //get output id
    var bookmarksResults = document.getElementById('bookmarksResults');

    //build the output in HTML
    bookmarksResults.innerHTML = "";
    for(var i = 0; i < bookmarks.length; i++)
    {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarksResults.innerHTML += '<div class="well">' +
                                        '<h3>' + name +
                                        ' <a class="btn btn-secondary" target="_blank" href="' + url + '">Visit</a> ' +
                                        ' <a onclick="DeleteBookmark(\'' + url + '\')" class="btn btn-danger" href="#">Delete</a> ' +
                                        '</h3>' +
                                        '</div>';
    }
}

function FormValidation(siteName, siteUrl)
{
    if(!siteName || !siteUrl)
    {
        alert('Please fill in the form');
        return false;
    }

    // regex url validation
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteUrl.match(regex))
    {
        alert('Please use a valid URL');
        return false;
    }

    return true;
}
