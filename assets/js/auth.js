/*
-=+=-=+=-=+=-=+=-=+=-=+=-=+=-=+=-
           Inscribe
            ICS 4UR
  Last edited: January 10, 2017
-=+=-=+=-=+=-=+=-=+=-=+=-=+=-=+=-
    Authentication Script V1.0
-=+=-=+=-=+=-=+=-=+=-=+=-=+=-=+=-
         Suchir Navalyal
          Varun Khatri
        Abdullah Khokhar
            Alay Shah
-=+=-=+=-=+=-=+=-=+=-=+=-=+=-=+=-
*/

/*-=+=-=+=-=+=-=+=-=+=-=+=-=+=-=+=-
            LOGIN
-=+=-=+=-=+=-=+=-=+=-=+=-=+=-=+=-*/
//Intializes Firebase Storage
var storage = firebase.storage();

// Login function
function login() {
  // Define Variables
  const txtEmail = document.getElementById('txtEmail');
  const txtPassword = document.getElementById('txtPassword');
  const btnLogin = document.getElementById('btnLogin');
  
  // Login Event if Button Clicked
  btnLogin.addEventListener('click', e => {
    //Get email and pass
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    
    // Sign In
    //Checks with the firebase
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => window.alert(e.message));
    loginTimeout();
  });


  // Login Event if Enter is Pressed  
  var btnDown = document.getElementById("txtPassword");
  btnDown.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {  
      const email = txtEmail.value;
      const pass = txtPassword.value;
      const auth = firebase.auth();

      const promise = auth.signInWithEmailAndPassword(email, pass);
      promise.catch(e => window.alert(e.message));   
      loginTimeout();
    }
  });
}

// Login Timer
function loginTimeout() {
  var timer = setTimeout(confirmedLogin, 1000);
}

//Confirming Login After Stored in User Storage
function confirmedLogin() {
    firebase.auth().onAuthStateChanged(firebaseUser =>{
    if(firebaseUser) {
      //Page redirect
      window.open("index.html", "_self");
      //Display btnLogout if Login
      //btnLogout.classList.remove('hide');
    } else {
      //Error Alert
      window.alert('Error, Login Not Successful. Try Again.');
      //No Display btnLogout if Logout
      //btnLogout.classList.add('hide');
      }
      
    });
  
}

/*-=+=-=+=-=+=-=+=-=+=-=+=-=+=-=+=-
          GOOGLE LOGIN
-=+=-=+=-=+=-=+=-=+=-=+=-=+=-=+=-*/
function onSignIn(googleUser) {
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/plus.login');
  firebase.auth().signInWithPopup(provider).then(function(result) {
    console.log(result);
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    console.log("currentUser", firebase.auth().currentUser);
    if (firebase.auth().currentUser.photoURL.length > 50) {
      signUptimeout();
    } else {
      loginTimeout();
    }
  }).catch(function(error) {
    console.log(error);
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    
  });
  
}
/*-=+=-=+=-=+=-=+=-=+=-=+=-=+=-=+=-
            LOGOUT
-=+=-=+=-=+=-=+=-=+=-=+=-=+=-=+=-*/
function logout() {
  const btnLogout = document.getElementById('btnLogout');
  //Logout Event
  //Logout button is connected to firebase
  
  btnLogout.addEventListener('click', e =>{
    firebase.auth().signOut();
  });
  
}

/*-=+=-=+=-=+=-=+=-=+=-=+=-=+=-=+=-
            SIGNUP
-=+=-=+=-=+=-=+=-=+=-=+=-=+=-=+=-*/
function signUp() {
  //Get elements
  const txtEmail = document.getElementById('txtEmail');
  const txtPassword = document.getElementById('txtPassword');
  const btnSignUp = document.getElementById('btnSignUp');

  // Signup Event if Button Clicked 
  btnSignUp.addEventListener('click', e => {
    //Get email and pass
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    // SignUp
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(e => window.alert(e.message));
    signUptimeout();
  });
  
  // Signup Event if Enter is Pressed 
  txtPassword.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {  
      const email = txtEmail.value;
      const pass = txtPassword.value;
      const auth = firebase.auth();
      // SignUp
      const promise = auth.createUserWithEmailAndPassword(email, pass);
      promise.catch(e => window.alert(e.message));
      signUptimeout();
    }
  });
}


// Signup Timer
function signUptimeout() {
  var timer = setTimeout(confirmedSignUp, 1000);
}

//Confirming Signup After Stored in User Storage
function confirmedSignUp() {
  firebase.auth().onAuthStateChanged(firebaseUser =>{
    if(firebaseUser) {
      //Page redirect
      window.open("account-creation.html", "_self");
      //Display btnLogout if Login
      //btnLogout.classList.remove('hide');
    } else {
      //Error Alert
      window.alert('Error, Sign Up Not Successful. Try Again.');
      //No Display btnLogout if Logout
      //btnLogout.classList.add('hide');
    }
  });
}

//Remove Header Write Link if not signed up
window.onload = removeHeader();
function removeHeader() {
  var writeHeader = document.getElementById('writeHeader');
  firebase.auth().onAuthStateChanged(firebaseUser =>{
    if(firebaseUser) {
      //Page redirect
      //Display write Text in header if Logged In
      writeHeader.classList.remove('hide');
    } else {
      //Error Alert
      //window.alert('Error, Sign Up Not Successful. Try Again.');
      //No Display btnLogout if Logout
      writeHeader.classList.add('hide');
    }
  });
}

/*-=+=-=+=-=+=-=+=-=+=-=+=-=+=-=+=-
            MAIL RESET
-=+=-=+=-=+=-=+=-=+=-=+=-=+=-=+=-*/
function mailReset(){
  // Gets Variables Such as Email
  var auth = firebase.auth();
  var email = document.getElementById("pwReset").value;
  
  //Firebase Send Email
  auth.sendPasswordResetEmail(email).then(function() {
    //Confirmed Sent
    console.log("Email Sent");
    $("#pw-error").addClass("hidden");
    $("#email-sent").removeClass("hidden");
    $(".login-form").addClass("hidden")
  }, function(error) {
    //Failed Send
    console.log("Email didn't send");
    $("#pwReset").addClass("animated shake");
    $("#pw-error").removeClass("hidden");
  });
}

/*-=+=-=+=-=+=-=+=-=+=-=+=-=+=-=+=-
        ACCOUNT CREATION PAGE
-=+=-=+=-=+=-=+=-=+=-=+=-=+=-=+=-*/

function uploadImg(){
  
  // File Reader Opens
  var readURL = function(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        //$('.upload-button-img').addClass("hidden");
        $('.upload-button-img').attr('src', e.target.result).removeClass("upload-button-img").addClass("upload-button-img-1");
      }
      
      reader.readAsDataURL(input.files[0]);
    }
  }
  // Change Event Listener
  $(".file-upload").on('change', function(){
    readURL(this);
  });
  
  // Click Event Listener  
  $(".upload-button").on('click', function() {
     $(".file-upload").click();
  });
}

function storeImg(){
  //Declare Variables
  var uploader = document.getElementById('uploader');
  var fileButton = document.getElementById('fileButton');
  
  //Event Listener Change
  fileButton.addEventListener('change', function(e){
    //Firebase Variables
    var user = firebase.auth().currentUser;
    var uid = user.uid;
    
    // Gets File previous function
    var file = e.target.files[0];
    // Create a storage reference
    var storageRef = firebase.storage().ref('profile_img/' + uid + "/" + "profile");
    // Upload File onto Firebase
    var task = storageRef.put(file);
    // Update Progress Bar 
    task.on('state_changed',
      function progress(snapshot){
        var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        uploader.value = percentage;
      },
      function error(err){
      },
      function complete(){
      }
    );
  });
}

function createProfile(){
  // Initializes Variables (includes current user, display name, profile image, etc.)
  var user = firebase.auth().currentUser;
  var storageRef = firebase.storage().ref();
  var id = user.uid;
  var name = document.getElementById("profileName").value;
  var bioIn = document.getElementById("profileBio").value;
  var profileImg = storageRef.child('profile_img/' + id + "/profile");
  
  // Sets Bio
  firebase.database().ref('users/' + id + "/").set({
      bio: bioIn,
    });

  //Firebase Update Profile
  user.updateProfile({
    displayName: name,
    photoURL: profileImg.fullPath,
  }).then(function() { 
    
    // Creation Successful
    // Page Relocation
    window.location="index.html";
  }, function(error) {
    // An error happened.
  });
}

// Manipulates Navbar to Match User
function userNav(){
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      $(".nav-login").addClass("hidden");
      var photoURL = user.photoURL;
      var storage = firebase.storage();
      var pathReference = storage.ref(photoURL);
      
      pathReference.getDownloadURL().then(function(url) {
        $(".photo").removeClass("hidden");
        $(".photo img").attr("src", url);
      }).catch(function(error) {
        
      });
    }
  });
}


/*-=+=-=+=-=+=-=+=-=+=-=+=-=+=-=+=-
         NAVBAR LOGOUT
-=+=-=+=-=+=-=+=-=+=-=+=-=+=-=+=-*/
window.onload = userNav();

// Logout From The Navbar
function navLogout() {
  firebase.auth().signOut().then(function() {
    window.location = "logoutSuccess.html";
  }, function(error) {
    
  });
}

/*-=+=-=+=-=+=-=+=-=+=-=+=-=+=-=+=-
            LOGO HOVER
-=+=-=+=-=+=-=+=-=+=-=+=-=+=-=+=-*/

$( "#logo-main" ).hover(
  function() {
    $( this ).attr('src', 'assets/img/Inscribe-Pink.png');
  }, function() {
    $( this ).attr('src', 'assets/img/Inscribe.png');
  }
);