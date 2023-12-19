import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";

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

//sign out / logout event
let logoutUser = (evt) => {
  signOut(auth)
    .then(() => {
      document.location.href = "index.html";
      M.toast({ html: "Logout success" });
    })
    .catch((error) => {
      console.log(error);
      M.toast({ html: "Error encountered: " + error });
    });
};

$("#logoutBtn").click(logoutUser);

//Basic functions
let triggerPoint = $(".headNav").offset().top + $(".headNav").height();
let dateNow = new Date();
let monthNow = dateNow.getMonth() + 1;

$(document).ready(function () {
  $("body").hide(); //The body is hidden by default

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      //will redirect to login/signup page if not authenticated
      window.location.href = "index.html";
    } else {
      $("body").show(); //the body will be shown if the user is authenticated
    }
  });

  $(window).scroll(function () {
    if ($(window).scrollTop() >= triggerPoint) {
      $(".headNav").addClass("fixed-header");
      $(".collapsible").addClass("fixed-header toc-fixed");
    } else {
      $(".headNav").removeClass("fixed-header");
      $(".collapsible").removeClass("fixed-header toc-fixed");
    }
  });

  $("#dateNow").html(
    "Date published: " +
      monthNow +
      "/" +
      dateNow.getDate() +
      "/" +
      dateNow.getFullYear()
  );

  $(document).ready(function () {
    $(".collapsible").collapsible(); //by materiallize
    M.updateTextFields();
  });
});
