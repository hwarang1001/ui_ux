// 전체 document 메모리의 모두 로드 되었을 때 onLoad() 함수를 call한다.
function onLoad(){
  // id 패턴검색 이벤트 정의
  let id = document.querySelector("#id");
  let pw = document.querySelector("#pw");
  let loginBtn = document.querySelector("#loginBtnTd > a")
  let match = document.querySelector("#match");
  loginBtn.addEventListener('click', () =>{
    let idReturn = false;
    if(id.value === "k123"){
      idReturn = true;
    }else{
      match.style.visibility = "visible";
      match.innerHTML = "아이디가 틀렸습니다."
      match.style.color = "tomato";
      return;
    }
    let pwReturn = false;
    if(pw.value === "123456"){
      pwReturn = true;
    }else{
      match.style.visibility = "visible";
      match.innerHTML = "비밀번호가 틀렸습니다."
      match.style.color = "tomato";
      return;
    }
    if(idReturn === true && pwReturn === true){
      match.style.visibility = "visible";
      match.innerHTML = "로그인성공"
      match.style.color = "blue";
      alert("로그인 성공");
      form.submit();
    }else{
      return;
    }
  });
}