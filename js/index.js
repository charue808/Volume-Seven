/*!
 * index.js JavaSctipt v0.1.0
 *
 *
 * VOLUNTEER REGISTRATION AND SCHEDULER WEB APP
 * Developed by team VOLUME 7 as a demo for HACC17
 *
 * Copyright 2017 Spencer Young, Holger H-Ray Heine
 * contact: spencerpjy@gmail.com, hh57@toposmedia.com
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, blend, trade,
 * bake, hack, scramble, difiburlate, digest and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */


// CLEAR SESSION STORAGE VARS
sessionStorage.clear();


// DECLARE VARS
var currentForm;


// REGISTRATION FORM INDEX.HTML TRANSITIONS

$( document ).ready(function() {
  currentForm = 'account_setup';

  $('#personal-info1').click((e) => {
    e.preventDefault();

  });

  $('#personal-info-next').click((e) => {
    e.preventDefault();
    $('#personal-info').addClass('hideForm');
    $('#address-info').removeClass('hideForm');
    currentForm = 'address-info';
  });

  $('#address-info-next').click((e) => {
    e.preventDefault();
    $('#address-info').addClass('hideForm');
    $('#other-info').removeClass('hideForm');
    currentForm = 'other-info';
  });

});






// FUNCTIONS

function create_account() {
    "use strict";

    var hr = new XMLHttpRequest(),
        url = "lib/create_account.php",
        userEmail = document.getElementById("userEmail").value,
        userEmailConf = document.getElementById("userEmailConf").value,
        userPW = document.getElementById("userPW").value,
        vars = "userEmail=" + userEmail + "&userPW=" + userPW;

    //TEST EMAIL ADDRESS IS VALID
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/.test(userEmail)) {
        } else {
        alert("You have entered an invalid email address! Please check and confirm your email address.")
        return false;
        }

    //TEST EMAIL AND EMAIL CONF MATCH
    if(userEmail !== userEmailConf) {
        alert("Please confirm your email address! Email and email confirmation addresses do not match.");
        return false;
    }

    //TEST PW HAS BEEN ENTERED
    if(userPW == "") {
        alert("Please enter a password for your account.");
        return false;
    }


    //PROCESS ACCOUNT CREATION
    //$.mobile.loading( "show" );
    hr.open("POST", url, true);
    hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    hr.onreadystatechange = function (){
        if (hr.readyState === 4 && hr.status === 200){
            //$.mobile.loading( "hide" );

            var data = JSON.parse(hr.responseText);

            if(data.result == "OK") {

              // WRITE USER DATA TO sessionStorage
              sessionStorage.v7userID = data.userID;
              sessionStorage.v7userEmail = data.userEmail;
              sessionStorage.v7userStatus = data.userStatus;
              sessionStorage.v7userCreated = data.userCreated;
              sessionStorage.v7userCC = data.userCC;

              console.log('userCC = ' + sessionStorage.v7userCC);

              document.getElementById("emailSub").innerHTML = sessionStorage.v7userEmail;

              $('#account_setup').addClass('hideForm');
              $('#confirm-email').removeClass('hideForm');
              currentForm = 'confirm-email';

              } else {
              console.log("query error: " + data.result);
              //if data.result begins with: "query error: Duplicate entry"
              //alert ("The email address " + userEmail + "belongs to an existing account. Please login with your password.");
              alert("Oops, something went wrong!");
		        }
         }
    };

    hr.send(vars);

}



function confirm_account(){
  "use strict";
  var userCCinput = document.getElementById("userCC").value;
  if(userCCinput == sessionStorage.v7userCC){
    $('#confirm-email').addClass('hideForm');
    $('#personal-info').removeClass('hideForm');
    currentForm = 'personal-info';
  } else {
    alert("Oops! The code you entered is incorrect. Please check carefully and try again.")
  }
}