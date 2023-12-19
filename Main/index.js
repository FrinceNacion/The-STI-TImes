import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";

$(document).ready(function () {
  M.updateTextFields();
});

const firebaseConfig = {
  apiKey: "AIzaSyDpOll-ez9tjvZB8FHoQxyejgJ7FBDI4Ac",
  authDomain: "worddeluxe.firebaseapp.com",
  projectId: "worddeluxe",
  storageBucket: "worddeluxe.appspot.com",
  messagingSenderId: "152826277988",
  appId: "1:152826277988:web:d4557ace2140407e9aef71",
  measurementId: "G-C9NG0R9H82",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
M.AutoInit();

let em = $("#email-input").val();
console.log(em);

let RegisterUser = (evt) => {
  if ($("#email-input").val() == "" || $("#password-input").val() == "") {
    console.log("Please fill the inputs above");
    M.toast({ html: "Please fill the input" });
  } else {
    evt.preventDefault();

    createUserWithEmailAndPassword(
      auth,
      $("#email-input").val(),
      $("#password-input").val()
    )
      .then((userCredential) => {
        const user = userCredential.user;
        M.toast({ html: "Register success!" });
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        M.toast({ html: "Error encountered: " + errorMessage });
      });
  }
};

let loginUser = (evt) => {
  evt.preventDefault();
  if ($("#email-input").val() == "" || $("#password-input").val() == "") {
    console.log("Please fill the inputs above");
    M.toast({ html: "Please fill the input" });
  } else {
    signInWithEmailAndPassword(
      auth,
      $("#email-input").val(),
      $("#password-input").val()
    )
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        document.location.href = "main.html";
        M.toast({ html: "Login success!" });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        M.toast({ html: "Error encountered: " + errorMessage });
      });
  }
};

$("#loginBtn").click(loginUser);
$("#signUp").click(RegisterUser);
