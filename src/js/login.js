function login() {
  let inputid = document.querySelector("#id").value;
  let inputpassword = document.querySelector("#password").value;

  console.log(inputid);
  console.log(inputpassword);

  if(inputid == ""){
	  alert("id를 입력하세요!");
  }else if(inputpassword == ""){
	  alert("password를 입력하세요!");
  }else{
	  let form = document.querySelector("#login-form");
	  form.submit();
  }
}
