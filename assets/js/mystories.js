/*
-=+=-=+=-=+=-=+=-=+=-=+=-=+=-=+=-
            Inscribe
            ICS 4UR
  Last edited: January 10, 2017
-=+=-=+=-=+=-=+=-=+=-=+=-=+=-=+=-
  Post Function (OWN POSTS) V1.0
-=+=-=+=-=+=-=+=-=+=-=+=-=+=-=+=-
          Suchir Navalyal
-=+=-=+=-=+=-=+=-=+=-=+=-=+=-=+=-
*/

firebase.database().ref("/posts").once("value", function(snapshot) {
  var postCounter = 0;
  var uid = firebase.auth().currentUser.uid;
  
  snapshot.forEach(function(childSnapshot) {
      
    // POST VARIABLES
    var data = childSnapshot.val();
    var key = childSnapshot.key;
    var title = JSON.stringify(data.title);
    var titleParse = JSON.parse(title);
    var body = JSON.stringify(data.body);
    var bodyParse = JSON.parse(body);
    var date = JSON.stringify(data.date);
    var dateParse = JSON.parse(date);
    var profileName = JSON.stringify(data.userName);
    var profileNameParse = JSON.parse(profileName);
    var profilePhoto = JSON.stringify(data.userPhoto);
    var profilePhotoParse = JSON.parse(profilePhoto);
    var userID = JSON.stringify(data.userID);
    var userIDParse = JSON.parse(userID);
    
    // UID MATCH IF STATEMENT
    if (uid == userIDParse){
        var storage = firebase.storage();
        var pathReference = storage.ref(profilePhotoParse);
          
        console.log(postCounter)
        
        var i = postCounter;
        
        pathReference.getDownloadURL().then(function(url) {
          // Appending Post
          $("#data").append("<div class='index-post'> <h3>" + titleParse + "</h3>" + "<p>" + bodyParse + "</p>" + "<p>" + dateParse + "</p>" + "<p class='right'> <img class='imgPost' id='imgPost" + i + "'></img>" + profileNameParse  + "</p> </div>");
          
          // Gives Image Source
          $("#imgPost" + i).attr("src", url);
        }).catch(function(error) {
          
        });
        
        postCounter++;
    }
  })
})