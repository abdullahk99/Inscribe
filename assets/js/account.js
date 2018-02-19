/*
-=+=-=+=-=+=-=+=-=+=-=+=-=+=-=+=-
            Inscribe
            ICS 4UR
  Last edited: January 10, 2017
-=+=-=+=-=+=-=+=-=+=-=+=-=+=-=+=-
          Profile Page
-=+=-=+=-=+=-=+=-=+=-=+=-=+=-=+=-
          Suchir Navalyal
          Varun Khatri
        Abdullah Khokhar
            Alay Shah
-=+=-=+=-=+=-=+=-=+=-=+=-=+=-=+=-
*/
function profilePageDisplay(){
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // Gets Variables
      var name = user.displayName;
      var photo = user.photoURL;
      var userId = user.uid;
      
      // Gets Bio
      firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
        var bio = snapshot.val().bio;
        $("#account-bio").text(bio);
      });
      
      // Posts Name Onto The Page
      $("#account-name").text(name);
      
      //Storage Reference
      var storage = firebase.storage();
      var pathReference = storage.ref(photo);
      
      //Downloads and Posts Image
      pathReference.getDownloadURL().then(function(url) {
        $("#account-img").attr("src", url);
      }).catch(function(error) {
        
      });
      
      
    }
  });
}

function countPosts(){
  // Declares Initial Post Numbers
  var postCounter = 0;
  
  //Firebase Reference
  firebase.database().ref("/posts").once("value", function(snapshot) {
    // Gets UserID
    var uid = firebase.auth().currentUser.uid;
    
    snapshot.forEach(function(childSnapshot) {
      // Posts Variables
      var data = childSnapshot.val();
      var key = childSnapshot.key;
      
      var userID = JSON.stringify(data.userID);
      var userIDParse = JSON.parse(userID);
    
      // If posts uid matches user uid
      if (uid == userIDParse){
        // Adds an extra post
        postCounter++;
      }
    })
    // Adds number to the page
    $("#number").text(postCounter);
  })
}

function updateInfo(){
  // Variables
  var name = $("#account-name").text();
  var bio = $("#account-bio").text();
  
  var user = firebase.auth().currentUser;
  var storageRef = firebase.storage().ref();
  var id = user.uid;
  
  // Firebase Update Method
  user.updateProfile({
    displayName: name,
  }).then(function() {
    firebase.database().ref('users/' + id + "/").update({
      bio: bio,
    });
    console.log('successful');
    successTimeout();
  }, function(error) {
    window.alert(error)
    // An error happened.
  });
}

function updatePassword(){
    // Variables
    var user = firebase.auth().currentUser;
    
    var newPassword = $('#newPassword').val();
    var confirm = $('#confirmNew').val();
    
    // Makes Sure Both Fields Match
    if(newPassword == confirm){
        // Firebase Update Password Method
        user.updatePassword(newPassword).then(function() {
            console.log('success');
            successTimeout();
        }, function(error) {
            window.alert(error)
        });
    }
}

function successTimeout() {
  var timer = setTimeout(successRedirect, 1000);
}

//Confirming Signup After Stored in User Storage
function successRedirect() {
    firebase.auth().onAuthStateChanged(firebaseUser =>{
    if(firebaseUser) {
      //Page redirect
      window.open("index.html", "_self");
      //Display btnLogout if Login
      //btnLogout.classList.remove('hide');
    } else {
      //Error Alert
      //No Display btnLogout if Logout
      //btnLogout.classList.add('hide');
    }
  });
}

// Checks if user is logged in 

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