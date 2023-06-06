function start() {
  if (localStorage.login == "true") {
    document.querySelector(".loginNav").style.display = "none";
    document.querySelector(".logoutNav").style.display = "block";
  } else if (localStorage.login == "false") {
    document.querySelector(".loginNav").style.display = "block";
    document.querySelector(".logoutNav").style.display = "none";
    // console.log("와버렸당");
  }
  //   console.log(localStorage.login);
}
