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

var email = "";
var password = "";
var firstName = "";
var lastName = "";
var userName = "";
var verifyPassword = "";
var database = firebase.database();

console.log("pass variables");

$(document).ready(function() {
  // Sign In
  $("#submit").on("click", function() {
      console.log("firing");

      email = $("#inputEmail").val().trim();
      password = $("#inputPassword").val().trim();

      if (!email || !password) {
        return console.log('email and password required')
      }

      console.log(email);
      console.log(password);

      // Sign in for User
      firebase.auth().signInWithEmailAndPassword(email, password)
        .catch(function(error) {
          // errors handled here
          var errorCode = error.code;
          var errorMessage = error.Message;
          console.log('signIn Error', error);
        }); 
    });

  // Register User
  $("#submitReg").on("click", function() {

    email = $("#inputEmailReg").val().trim();
    password = $("#inputPasswordReg").val().trim();
    firstName = $("#inputFirstNameReg").val().trim();
    lastName = $("#inputLastNameReg").val().trim();
    userName = $("#inputUserNameReg").val().trim();
    // verifyPassword = $("inputConfirmPasswordReg").val().trim();

    if (!email || !password) {
      return console.log('email and password required')
    }

    console.log(email);
    console.log(password);
    console.log(firstName);
    console.log(lastName);
    console.log(userName);
    console.log(verifyPassword);

  });
});
    // app.register = function() {
    //   var email = app.email;
    //   var password = app.password;


      // Register User
      // firebase.auth().createUserWithEmailAndPassword(email,password)
      //   .catch(function(error) {
      //     // errors handled here
      //     var errorCode = error.code;
      //     var errorMessage = error.Message;
      //     console.log('signIn Error, error');
      //   });
      // };

      // app.signOut = function() {
      //   //Sign out
      //   firebase.auth().signOut();
      // };
    // });
