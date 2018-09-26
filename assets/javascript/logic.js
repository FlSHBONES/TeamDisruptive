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
  
  console.log("pass variables");
  
  $(document).ready(function() {
    // Sign In
    $("#submit").on("click", function() {
        console.log("firing");
  
        userName = $("#inputUserName").val().trim();
        password = $("#inputPassword").val().trim();
  
        if (!userName || !password) {
          return console.log('userName and password required')
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
              }
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
          return console.log('username and password required')
        }
    
        console.log(password);
        console.log(verifyPassword);
    
        if (password != verifyPassword) {
          return console.log('passwords do not match')
        }
    
        if ((document.getElementById("ageCheck").checked) == true) {
          console.log('21+ age verify');
        } else {
          return console.log('Please Verify Age')
        }
    
        console.log(userName);
        console.log(password);
        console.log(firstName);
        console.log(lastName);
        console.log(userName);
        console.log(verifyPassword);
    
        database.ref("/userBase").push ({
          password: password,
          firstName: firstName,
          lastName: lastName,
          userName: userName
        });

        console.log("new user added");
        userAdded = true;

      } else if (userAdded === true) {
        console.log("Not today mofucka")
      }
  
    });
  });
  
// ADD SIGNOUT FUNCTION