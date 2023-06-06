checkUser();
function checkUser() {
  let storageUser = sessionStorage.getItem("user");
  let userContent = "";
  console.log(storageUser);
  if (storageUser) {
    let user = JSON.parse(storageUser);
    console.log(user);
    let id = user.userid;
    let addr = user.useraddr;
    let email = user.useremail;
    let name = user.username;
    let password = user.userpassword;
    userContent += `
    <div class="form-item">
    <h3>아이디</h3>
    <p>${id}</p>
    </div>
    <div class="form-item">
    <h3>비밀번호</h3>
    <p>${password}</p>
    </div>
    <div class="form-item">
    <h3>이름</h3>
    <p>${name}</p>
    </div>
    <div class="form-item">
    <h3>주소</h3>
    <p>${addr}</p>
    </div>
    <div class="form-item">
    <h3>이메일</h3>
    <p>${email}</p>
    </div>
    `;
    console.log(userContent);
    document.querySelector("#profile-item").innerHTML = userContent;
  }
}


function makeWindow() {
	window.open("update.jsp", "width=500", "height = 500");
}


