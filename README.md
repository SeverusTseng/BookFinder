# BookFinder

I make a page to help a user compile a list of books for a book club. Our goal is to give our Javascript skills a workout, use an API, work with JSON, and practice adding and removing elements from the DOM.

My goal is to let the user request information from the Google Books API by giving any combination of title, author, and ISBN number. The user gives a request using the text boxes and clicks "Submit". We send the request to the Google Books API, and get an array of books back.

I bring up an overlay pop-up, in which the user can pick a book from the array for their book list. If the search returned nothing, the pop-up should just say that. Otherwise, we start with the first book in the array. We show the user information on the book - cover image, title, author, beginning of the description - and the user can decide whether to keep that one. If so, we close the pop-up and add the information for the chosen book to the list of books on the main page. Otherwise, the user can choose to look at the next book in the array, and possibly keep that one. Possibly the user will like none of the books in the array, in which case they can close the pop-up and do another search.
