/*
-=+=-=+=-=+=-=+=-=+=-=+=-=+=-=+=-
           Inscribe
            ICS 4UR
  Last edited: November 9, 2016
-=+=-=+=-=+=-=+=-=+=-=+=-=+=-=+=-
    Post Script V1.0
-=+=-=+=-=+=-=+=-=+=-=+=-=+=-=+=-
         Suchir Navalyal
          Varun Khatri
        Abdullah Khokhar
            Alay Shah
-=+=-=+=-=+=-=+=-=+=-=+=-=+=-=+=-
*/


//  Read Data

firebase.database().ref("/posts").once("value", function(snapshot) {
  var postCounter = 0;
  
  snapshot.forEach(function(childSnapshot) {
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
    var country = JSON.stringify(data.country);
    var countryParse = JSON.parse(country);
    
    var length = data.tag.length;
    var tags = "Tags: "
    
    for(var t = 0; t < length; t++){
              
      if(t == length - 1){
        var s = JSON.stringify(data.tag[t]);
        var p = JSON.parse(s);
        tags += "#" + p;
      } else {
        var s = JSON.stringify(data.tag[t]);
        var p = JSON.parse(s);
        console.log(p);
        tags += "#" + p + ", ";
      }
    }
    
    var storage = firebase.storage();
    var pathReference = storage.ref(profilePhotoParse);
      
    //console.log(postCounter)
    
    var i = postCounter;
    
    pathReference.getDownloadURL().then(function(url) {
      //JQuerry used to give ID to space in which data is displayed
      $("#data").append("<div class='index-post'> <h3>" + titleParse + "</h3>" + "<p>" + bodyParse + "</p>" + "<p>" + dateParse + " in " + countryParse  + "</p>" + "<p>" + tags + "</p>" + "<p class='right'> <img class='imgPost' id='imgPost" + i + "'></img>" + profileNameParse  + "</p> </div>");

      $("#imgPost" + i).attr("src", url);
    }).catch(function(error) {
      
    });
    
    postCounter++;
  })
})



function searchFilter(){
  var postCounter = 0;
  $('#data').html('');
  
  var searchTerm = document.getElementById("searchBar").value;
  
  
  //Go back to defult page
  if (searchTerm == ''){
    location.reload()
  }

  firebase.database().ref("/posts").once("value", function(snapshot) {
    snapshot.forEach(function(childSnapshot) {

      
      var data = childSnapshot.val();
      var key = childSnapshot.key;
      var title = JSON.stringify(data.title);
      var titleParse = JSON.parse(title);
      
      var splitTitle = [];
      splitTitle = titleParse.split(' ');
      
      
      if(searchTerm.charAt(0) == "#"){
        for(var j = 0; j < data.tag.length; j++){
          var current = JSON.stringify(data.tag[j]);
          var currentParse = JSON.parse(current);
          
          if(currentParse.toLowerCase() == searchTerm.toLowerCase().substr(1)){
            
            var body = JSON.stringify(data.body);
            var bodyParse = JSON.parse(body);
            var date = JSON.stringify(data.date);
            var dateParse = JSON.parse(date);
            var profileName = JSON.stringify(data.userName);
            var profileNameParse = JSON.parse(profileName);
            var profilePhoto = JSON.stringify(data.userPhoto);
            var profilePhotoParse = JSON.parse(profilePhoto);
            var country = JSON.stringify(data.country);
            var countryParse = JSON.parse(country);
            
            var length = data.tag.length;
            var tags = "Tags: "
            
            for(var t = 0; t < length; t++){
              
              if(t == length - 1){
                var s = JSON.stringify(data.tag[t]);
                var p = JSON.parse(s);
                tags += "#" + p;
              } else {
                var s = JSON.stringify(data.tag[t]);
                var p = JSON.parse(s);
                console.log(p);
                tags += "#" + p + ", ";
              }
            }
            
            var storage = firebase.storage();
            var pathReference = storage.ref(profilePhotoParse);
            
            
            var k = postCounter;
            
            pathReference.getDownloadURL().then(function(url) {
              //JQuerry used to give ID to space in which data is displayed
              $("#data").append("<div class='index-post'> <h3>" + titleParse + "</h3>" + "<p>" + bodyParse + "</p>" + "<p>" + dateParse + " in " + countryParse  + "</p>" + "<p>" + tags + "</p>" + "<p class='right'> <img class='imgPost' id='imgPost" + k + "'></img>" + profileNameParse  + "</p> </div>");
        
              $("#imgPost" + k).attr("src", url);
              
            }).catch(function(error) {
              
            });
            
            postCounter++; 
            
          }
        }
      } else if(searchTerm.charAt(0) == "@") {
        
        var profileName = JSON.stringify(data.userName);
        var profileNameParse = JSON.parse(profileName);
        
        if(profileNameParse.toLowerCase() == searchTerm.toLowerCase().split(' ').join('')){
          
          var body = JSON.stringify(data.body);
          var bodyParse = JSON.parse(body);
          var date = JSON.stringify(data.date);
          var dateParse = JSON.parse(date);
          var profilePhoto = JSON.stringify(data.userPhoto);
          var profilePhotoParse = JSON.parse(profilePhoto);
          var country = JSON.stringify(data.country);
          var countryParse = JSON.parse(country);
          
          var length = data.tag.length;
          var tags = "Tags: "
          
          for(var t = 0; t < length; t++){
              
            if(t == length - 1){
              var s = JSON.stringify(data.tag[t]);
              var p = JSON.parse(s);
              tags += "#" + p;
            } else {
              var s = JSON.stringify(data.tag[t]);
              var p = JSON.parse(s);
              console.log(p);
              tags += "#" + p + ", ";
            }
          }
          
          var storage = firebase.storage();
          var pathReference = storage.ref(profilePhotoParse);

          var k = postCounter;
          
          pathReference.getDownloadURL().then(function(url) {
            //JQuerry used to give ID to space in which data is displayed
            $("#data").append("<div class='index-post'> <h3>" + titleParse + "</h3>" + "<p>" + bodyParse + "</p>" + "<p>" + dateParse + " in " + countryParse  + "</p>" + "<p>" + tags + "</p>" + "<p class='right'> <img class='imgPost' id='imgPost" + k + "'></img>" + profileNameParse  + "</p> </div>");
      
            $("#imgPost" + k).attr("src", url);
            
          }).catch(function(error) {
            
          });
          
          postCounter++; 
          
        }
      } else {
        for(var i = 0; i < splitTitle.length; i++){
          if(splitTitle[i].toLowerCase() == searchTerm.toLowerCase() ){
            
            var body = JSON.stringify(data.body);
            var bodyParse = JSON.parse(body);
            var date = JSON.stringify(data.date);
            var dateParse = JSON.parse(date);
            var profileName = JSON.stringify(data.userName);
            var profileNameParse = JSON.parse(profileName);
            var profilePhoto = JSON.stringify(data.userPhoto);
            var profilePhotoParse = JSON.parse(profilePhoto);
            var country = JSON.stringify(data.country);
            var countryParse = JSON.parse(country);
            
            var length = data.tag.length;
            var tags = "Tags: "
            
            for(var t = 0; t < length; t++){
              
              if(t == length - 1){
                var s = JSON.stringify(data.tag[t]);
                var p = JSON.parse(s);
                tags += "#" + p;
              } else {
                var s = JSON.stringify(data.tag[t]);
                var p = JSON.parse(s);
                console.log(p);
                tags += "#" + p + ", ";
              }
            }
            
            var storage = firebase.storage();
            var pathReference = storage.ref(profilePhotoParse);
              
            console.log(postCounter)
            
            var k = postCounter;
            
            pathReference.getDownloadURL().then(function(url) {
              //JQuerry used to give ID to space in which data is displayed
              $("#data").append("<div class='index-post'> <h3>" + titleParse + "</h3>" + "<p>" + bodyParse + "</p>" + "<p>" + dateParse + " in " + countryParse  + "</p>" + "<p>" + tags + "</p>" + "<p class='right'> <img class='imgPost' id='imgPost" + i + "'></img>" + profileNameParse  + "</p> </div>");
        
              $("#imgPost" + k).attr("src", url);
              
            }).catch(function(error) {
              
            });
            
            postCounter++; 
            
          }
        }
      }
    })
  })
}

document.getElementById('searchBar').addEventListener("keydown", function (e) {
    if (e.keyCode === 13) { 
        searchFilter();
    }
});