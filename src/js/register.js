function regist() {

  let userid = document.querySelector("#id").value;
  let userpassword = document.querySelector("#password").value;
  let useremail = document.querySelector("#email").value;
  let username = document.querySelector("#name").value;
  let useraddr = document.querySelector("#addr").value;
  let user = {
    userid,
    userpassword,
    useremail,
    username,
    useraddr,
  };
  console.log(user);
  location.href = "index.html";
}
