// Initialize Firebase
var config = {
    apiKey: "AIzaSyCqacu6EO47QZ6_qmdHJW7suDGp9GLm9hQ",
    authDomain: "group-project1-480e1.firebaseapp.com",
    databaseURL: "https://group-project1-480e1.firebaseio.com",
    projectId: "group-project1-480e1",
    storageBucket: "group-project1-480e1.appspot.com",
    messagingSenderId: "642430124376"
  };
  firebase.initializeApp(config);
  
  console.log("Initial");
  
  var password = "";
  var firstName = "";
  var lastName = "";
  var userName = "";
  var verifyPassword = "";
  var database = firebase.database();
  var childData;
  var userAdded = false;
  var dupeUser = false;

  console.log("pass variables");
  
  $(document).ready(function() {
    // Sign In
    $("#submit").on("click", function() {
        console.log("firing");
  
        userName = $("#inputUserName").val().trim();
        password = $("#inputPassword").val().trim();
  
        if (!userName || !password) {
          console.log('userName and password required');
        }
  
        console.log(userName);
        console.log(password);
  
        var userRef = database.ref('userBase');
        userRef.on('value', function(snapshot) {
          snapshot.forEach(function(childSnapshot) {
            var childData = childSnapshot.val();
            console.log(childData);
            
            if (childData.userName === userName) {
              console.log("Username Located");
              if (childData.password === password) {
                console.log("Login Successful");
              } else if (childData.password != password) {
                console.log("Password is Incorrect");
              }
            } else {
              console.log("No User Match");
            }

          });
        })
    });
  
    // Register User
    $("#submitReg").on("click", function() {

      if (userAdded === false) {
        password = $("#inputPasswordReg").val().trim();
        verifyPassword = $("#inputConfirmPasswordReg").val().trim();
        firstName = $("#inputFirstNameReg").val().trim();
        lastName = $("#inputLastNameReg").val().trim();
        userName = $("#inputUserNameReg").val().trim();
        // verifyPassword = $("inputConfirmPasswordReg").val().trim();
    
        if (!userName || !password) {
            console.log('username and password required')
        }
       
          
         
        console.log(password);
        console.log(verifyPassword);
    
        if (password != verifyPassword) {
          console.log('passwords do not match')
        }
    
        if ((document.getElementById("ageCheck").checked) == true) {
          console.log('21+ age verify');
        } else {
          console.log('Please Verify Age')
        }

        var userRef2 = database.ref('userBase');
        userRef2.on('value', function(snapshot) {
          snapshot.forEach(function(childSnapshot) {
            var childData2 = childSnapshot.val();
            console.log(childData2);
            
            if (childData2.userName === userName) {
              dupeUser = true;
              console.log("Duplicate Username Detected");
            };
          });
        });

        // TO DO:
        //  1) Make dupeUser function properly
        //    - Make sure new users can be added while dupe users cannot
        //
        //
    
        console.log(userName);
        console.log(password);
        console.log(firstName);
        console.log(lastName);
        console.log(userName);
        console.log(verifyPassword);
    
        if (dupeUser = false) {
          database.ref("/userBase").push ({
            password: password,
            firstName: firstName,
            lastName: lastName,
            userName: userName
          });
        } else if (dupeUser = true) {
          console.log("User Add Prevented");
        }

        console.log("new user added");
        userAdded = true;
        
      } else if (userAdded === true) {
        console.log("Not today mofucka")
      }
  
    });
  });
  
// ADD SIGNOUT FUNCTION