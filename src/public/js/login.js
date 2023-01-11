/* Cookie for Remember Me function */
function setCookie(){
    var u = document.getElementById('email').value;
    var p = document.getElementById('password').value;

    document.cookie = "myusername="+u+";path=http://localhost:8080/";
    document.cookie = "mypswd="+p+";path=http://localhost:8080/"; 
}


function getCookieData(){
    var user = getCookie('myusername');
    var pswd = getCookie('mypswd');

    document.getElementById('email').value = user;
    document.getElementById('password').value = pswd;
    
}

function getCookie(cname){
    var name = cname + "=";
    var decodeCookie = decodeURIComponent(document.cookie);
    var ca = decodeCookie.split(';');
    for (var i = 0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

var attempts = 3;

function resetAlltAttempts(){
    var attempts = 3;
    document.getElementById("username").disabled=false;
	document.getElementById("password").disabled=false;
	document.getElementById("loginBtn").disabled=false;
}

function handleLoginBtn(){
    $("#loginBtn").on("click", function(event) {
        event.preventDefault();
        let email = $("#email").val();
        let password = $("#password").val();

        $.ajax({
            url: `${window.location.origin}/login`,
            method: "POST",
            data: {email: email, password: password},
            success: function(data) {
                window.location.href = "/homepage";
                resetAlltAttempts();
            },
            error: function(err) {
                attempts --;
                alert("Your email or password entered is incorrect, or user is locked. Please try again! Attempts: "+attempts);
                if (attempts == 0) {
                    alert("Access denied! Contact the admin");
                    document.getElementById("email").disabled=true;
                    document.getElementById("password").disabled=true;
                    document.getElementById("loginBtn").disabled=true;
                }
            }
        })
    });
}
$(document).ready(function() {
    handleLoginBtn();
});