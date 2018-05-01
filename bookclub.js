function HideOverlay() {
    document.getElementById("overlay").style.display = "none";

    document.getElementById("showLastOne").style.display = "flex";
    document.getElementById("showNextOne").style.display = "flex";
    document.getElementById("keepBook").style.display = "flex";

    for(i = 0; i < 10; i++){
    document.getElementById(i).remove();
    }

}

function newRequest() {

	var title = document.getElementById("title").value;
	title = title.trim();
	title = title.replace(" ","+");

	var author = document.getElementById("author").value;
	author = author.trim();
	author = author.replace(" ","+");

	var isbn = document.getElementById("isbn").value;
	isbn = isbn.trim();
	isbn = isbn.replace("-","");


	var query = ["",title,author,isbn].join("+");
	if (query != "") {

		// remove old script
		var oldScript = document.getElementById("jsonpCall");
		if (oldScript != null) {
			document.body.removeChild(oldScript);
		}
		// make a new script element
		var script = document.createElement('script');

		// build up complicated request URL
		var beginning = "https://www.googleapis.com/books/v1/volumes?q="
		var callback = "&callback=handleResponse"

		script.src = beginning+query+callback	
		script.id = "jsonpCall";

		// put new script into DOM at bottom of body
		document.body.appendChild(script);
		if(window.innerWidth > 800){
		  var backgroud = document.getElementById("bookDisplayMain");
		  backgroud.setAttribute("style","background-color:rgba(0,0,0,0.3);");

		  var search = document.getElementsByClassName("searchBook");
		  search[0].style.display = "none";

		  var or = document.getElementsByClassName("or");
		  or[0].style.opacity = 0.0001;
		  or[1].style.opacity = 0.0001;

		  var inputbutton = document.getElementsByClassName("buttonPart");
		  inputbutton[0].style.marginTop = "50px";

		  document.getElementById("header").style.flexDirection = "row";
		}
		else{
		  var backgroud = document.getElementById("bookDisplayMain");
		  backgroud.setAttribute("style","background-color:rgba(0,0,0,0.3);");

		  var search = document.getElementsByClassName("searchBook");
		  search[0].style.display = "none";

		  var input = document.getElementsByClassName("inputPart");
		  input[0].style.display = "none";

		  var inputbutton = document.getElementsByClassName("buttonPart");
		  inputbutton[0].style.display = "none";

		  document.querySelector("h1").style.textAlign = "center";

		  document.getElementById("a").style.display = "flex";
		  document.getElementById("header").style.flexDirection = "row";
		}
      }	
  }
	
var slideIndex = 0;
var bookListOutside;
var totalBookNum;
function handleResponse(bookListObj) {
	var bookList = bookListObj.items;
	bookListOutside = bookListObj.items;
    document.getElementById("overlay").style.display = "flex"; 

    if(bookList == null){
    	var title = document.getElementById("title").value;
    	var author = document.getElementById("author").value;
    	var isbn = document.getElementById("isbn").value;
    	var cannotFind = "the book "+title+" (Title) by "+author+" (Author) or ISBN number "+isbn+" Could not be found. Please try another search.";
    	var cannotFindDisplay = document.createElement("p");
    	cannotFindDisplay.setAttribute("id","0");
    	cannotFindDisplay.setAttribute("style","font-size:large; color:black;")
    	cannotFindDisplay.textContent = cannotFind;
		var overlay = document.getElementById("overlay_inner");
		overlay.append(cannotFindDisplay);

		document.getElementById("showLastOne").style.display = "none";
		document.getElementById("showNextOne").style.display = "none";
		document.getElementById("keepBook").style.display = "none";
    }
    else {
    	totalBookNum = bookList.length;
    	for (i=0; i<bookList.length; i++) {
		var book = bookList[i];
		var div = document.createElement("div");
		div.setAttribute("class","slides")
		div.setAttribute("id",i);/* where to put the data on the Web page */
		div.setAttribute("style","flex");

        var image = document.createElement("IMG");
        image.setAttribute("src",book.volumeInfo.imageLinks.thumbnail);
        image.setAttribute("alt","no image");
        div.appendChild(image);

        var divWords = document.createElement("div");
		var title = book.volumeInfo.title;
		var titlePgh = document.createElement("p");
		titlePgh.textContent = title;/* ALWAYS AVOID using the innerHTML property */
		titlePgh.setAttribute("class","title");
		divWords.append(titlePgh);

		var publisher = book.volumeInfo.publisher;
		var publisherPgh = document.createElement("p");
		publisherPgh.textContent = publisher;
		publisherPgh.setAttribute("class","author");
		divWords.append(publisherPgh);

		var description = book.volumeInfo.description;
		var descriptionPgh = document.createElement("p");
		descriptionPgh.textContent = description;
		descriptionPgh.setAttribute("class","description");
		divWords.append(descriptionPgh);

		div.appendChild(divWords);
		var overlay = document.getElementById("overlay_inner");
		overlay.appendChild(div);
	         }
          }

	slideIndex = 0;
	showSlides(slideIndex);
}

function showLastOne(){
	slideIndex = slideIndex -1;
	showSlides(slideIndex);
	document.getElementById("showNextOne").style.opacity = 1;
}

function showNextOne(){
	slideIndex = slideIndex +1;
	showSlides(slideIndex);
	document.getElementById("showLastOne").style.opacity = 1;
}

function showSlides(n){
	var slides = document.getElementsByClassName("slides");
	if(n > slides.length -1) {slideIndex = 0;}
    if(n < 0) {slideIndex = slides.length - 1;}
    for(i = 0; i < slides.length; i++){
		slides[i].style.display = "none";
	}
	slides[slideIndex].style.display = "flex";
	if(slideIndex == 0){
	   document.getElementById("showLastOne").style.opacity = 0.0001;;
	}
	if(slideIndex == totalBookNum -1){
		document.getElementById("showNextOne").style.opacity = 0.0001;
	}
}

var keepBookNum = 1;
function keepBook(){
	keepBookNum++;
	var id = keepBookNum;
    var book = bookListOutside[slideIndex];
    var bookDisplay = document.getElementById("bookDisplay");/* where to put the data on the Web page */

    var divDisplay = document.createElement("div");
    divDisplay.setAttribute("class","divDisplay");
    divDisplay.setAttribute("id",id);

    var image = document.createElement("IMG");
    image.setAttribute("src",book.volumeInfo.imageLinks.thumbnail);
    image.setAttribute("width","50%");
    image.setAttribute("height","50%");
    image.setAttribute("alt","no image");
    divDisplay.appendChild(image);

    var divDisplayWords = document.createElement("div");

	var title = book.volumeInfo.title;
	var titlePgh = document.createElement("p");
	titlePgh.textContent = title;/* ALWAYS AVOID using the innerHTML property */
	titlePgh.setAttribute("class","title");
	divDisplayWords.append(titlePgh);

	var publisher = book.volumeInfo.publisher;
	var publisherPgh = document.createElement("p");
	publisherPgh.textContent = publisher;
	publisherPgh.setAttribute("class","author");
	divDisplayWords.append(publisherPgh);

	var description = book.volumeInfo.description;
	var descriptionPgh = document.createElement("p");
	descriptionPgh.textContent = description;
	descriptionPgh.setAttribute("class","description");
	divDisplayWords.append(descriptionPgh);
	divDisplay.appendChild(divDisplayWords);

	var deleteButton = document.createElement("BUTTON");
	deleteButton.setAttribute("class","deleteButton");
	deleteButton.setAttribute("onclick","disappear("+id+")");
	deleteButton.textContent = "x";
	divDisplay.append(deleteButton);

	bookDisplay.appendChild(divDisplay);
	}

/* the action taken by a generic delete button */
function disappear(bookNum) {
	var BookDiv = document.getElementById(bookNum);
	BookDiv.style.display = "none";}
	// Note: in Assn 3 you need to actually remove the tile from the DOM,
	// not just give it 'display: "none"'.
