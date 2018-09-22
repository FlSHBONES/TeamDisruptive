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

console.log("pass variables");

$(document).ready(function() {
  // Sign In
  $("#submit").on("click", function() {
      console.log("firing");

      userName = $("#inputEmail").val().trim();
      password = $("#inputPassword").val().trim();

      if (!userName || !password) {
        return console.log('userName and password required')
      }

      console.log(userName);
      console.log(password);

      database.ref("/userBase").on("value", function(snapshot) {
        console.log(snapshot.val());
        if (snapshot.child("userName").exists() && snapshot.child("password").exists()) {
          if (snapshot.child("password") == password) {
            console.log("Hell yeah man");
            window.location.href = "location.html";
          } else if (snapshot.child("password") != password) {
            console.log("No Login Fer YEH");
          }
          // EXAMPLE QUERYING OF FIREBASE:
          // var ratingRef = firebase.database().ref("ratings/");

          // ratingRef.orderByValue().on("value", function(data) {
             
          //    data.forEach(function(data) {
          //       console.log("The " + data.key + " rating is " + data.val());
          //    });
             
          // });
        }
      });
  });

  // Register User
  $("#submitReg").on("click", function() {

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

    console.log("user added");

  });
});

      // app.signOut = function() {
      //   //Sign out
      //   firebase.auth().signOut();
      // };
    // });
