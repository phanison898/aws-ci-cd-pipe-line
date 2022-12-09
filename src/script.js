console.log("hey there");

function login() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  if (username == "") {
    alert("Please enter username ");
    return;
  } else if (password == "") {
    alert("Please enter password ");
  } else {
    alert("Hello, " + username);
  }
}
