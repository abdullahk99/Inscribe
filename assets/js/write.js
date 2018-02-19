/*
-=+=-=+=-=+=-=+=-=+=-=+=-=+=-=+=-
            Inscribe
            ICS 4UR
  Last edited: January 10, 2017
-=+=-=+=-=+=-=+=-=+=-=+=-=+=-=+=-
  Writing Storage Script V2.0
-=+=-=+=-=+=-=+=-=+=-=+=-=+=-=+=-
          Suchir Navalyal
          Varun Khatri
        Abdullah Khokhar
            Alay Shah
-=+=-=+=-=+=-=+=-=+=-=+=-=+=-=+=-
*/

/* V1.0
LOCAL STORAGE SETUP
window.onload = function() {
Run this function when the page finishes loading

document.getElementById('post-bttn').addEventListener("click", function() 
Add an event listener to the element 'yourmom', this event listener listens for a "click"
If the event listener gets a click, run the function()

{
Function starts here
    
var value = document.getElementById("textbox").value;
Take the value from the "textbox" element, and store it in the variable "value"
localStorage.setItem("post", value);
Store the data in localStorage, name it as "post", the value is the variable value
End all functions
*/

/*
document.getElementById('title').onkeypress = function(e) {
    if(e.keyCode == 13) {
        alert('You pressed enter!');
    }
}
*/

// Check if user is logged in 

function checkAuth() {
  // Realtime Listener State of Login is Changed
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser) {
      console.log(firebaseUser);
    } else {
      console.log('not logged in')
      //No Display btnLogout if Logout
      window.open("login.html", "_self");
    }
  });
}


// Check the authentication of user as it loads
window.onload = checkAuth();

function checkWrittenData() {
  body = document.getElementById('textbox').value;
  title = document.getElementById('title').value;
  country = document.getElementById('countries').value;
  if (body === "" || title === "" || country === "") {
    window.alert("You left one or more fields blank.");
  } else {
    writeUserData();
  }
}

//DO NOT DELETE



// Fire Base Setup- Write to Database//
var ref = new Firebase("https://inscribe-581cc.firebaseio.com");


function writeUserData(body, title, userId, tags) {
 
 
  body = document.getElementById('textbox').value;
  title = document.getElementById('title').value;
  var tagsCombined = $('.inline-tag').text();
  tags = tagsCombined.split(' ');
  tags.pop();
  console.log(tags);
  var userID = firebase.auth().currentUser;
  var uid = userID.uid;
  var seconds = 0 - Math.round(new Date().getTime() / 1000);
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();
  
  var country = document.getElementById('countries').value;

  if(dd<10) {
    dd='0'+dd
  } 
  
  if(mm<10) {
    mm='0'+mm
  } 
  
  today = mm+'/'+dd+'/'+yyyy;
//$('#textbox').html(myDate.toGMTString());
  firebase.database().ref('posts/' + seconds).set({
    title: title,
    epoch: seconds,
    body: body,
    tag: tags,
    userName: "@" + userID.displayName.split(' ').join(''),
    userPhoto: userID.photoURL,
    date: today,
    userID: uid,
    country: country,
// Function to be run when page is reloaded
  }, function() {
      location.reload();
  });
}



/*
function getPosts() {
  firebase.database().ref("posts/").once("value", function(snapshot) {
    var posts = snapshot.val()
    console.log(posts)
    document.getElementById('fbgm').innerHTML = posts.id
  })
}

*? 

//DO NOT USE

function writeUserData(body, title, userId) {
  body = document.getElementById('textbox').value;
  title = document.getElementById('title').value;
  var userID = firebase.auth().currentUser;
  firebase.database().ref('posts/' + userID.uid + "/" + title + "/").push({
      body: body,
// Function to be run when page is reloaded
  }, function() {
      location.reload();
  });
}
//Display User Data from Firebase
window.onload = readUserData()

function readUserData() {
 // console.log(postit);

  postit.on("value", function(snapshot) {
  console.log(snapshot.val());
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});

}

*

  
/*  
    // Test to see if everytime data is retrived 
    snapshot.forEach(function(childSnapshot){
      titlePost.value =  
    })
})}
})}
*/


//VIEW POSTS ON HTML
/*
var elements= document.getElementById('td')
//This loops through each tag and places a card in HTML
for (var i = 0;i < elements.length; i++)
//This generates a random number
*/



//Tag Entry
function makeTag() {
    var para = document.createElement("P");
    var t = document.getElementById('write-tag').value + " ";
    para.onclick = function() {this.parentNode.removeChild(this);};
    var parentlength = $("#tag-area p").length;
    if (t != "" && parentlength < 5) {
      var text = document.createTextNode(t);
      document.getElementById("write-tag").value = "";
      para.appendChild(text);
      document.getElementById("tag-area").appendChild(para);
      $("#tag-area p").addClass("inline-tag");
    } 
}

/*document.getElementById('write-tag').addEventListener("keydown", function (e) {
    if (e.keyCode === 13) { 
        makeTag();
    }
});*/


function readStory() {
  var title = firebase.database().ref(/posts/).value;
}

function closeModal(){
  $(".blacken").addClass("shrink");
  $(".blacken").removeClass("animateDarkness");
  $(".modal-box").removeClass("pop");
  $(".close").removeClass("pop2");
  $("#tag-area p").remove();
}

function animateModalIn(){
  $(".blacken").removeClass("initial");
  $(".blacken").removeClass("shrink");
  $(".blacken").addClass("animateDarkness");
  $(".modal-box").addClass("pop");
  $(".close").addClass("pop2");
}



