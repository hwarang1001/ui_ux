// 전체 document 메모리의 모두 로드 되었을 때 onLoad() 함수를 call한다.
function onLoad(){
  // id 패턴검색 이벤트 정의
  let idPattern = /^[\w]{3,12}$/;
  let pwPattern = /^[\w]{6,8}$/;
  let namePattern = /^[가-힣]{1,4}|[a-zA-Z]{1}[a-zA-Z\x20]{1,10}$/;
  let nicNamePattern = /^[가-힣]{2,4}|[a-zA-Z]{1}[a-zA-Z\x20]{1,10}$/;

  let id = document.querySelector("#id");
  let pw = document.querySelector("#pw");
  let pwCheck = document.querySelector("#pwCheck");
  let submit = document.querySelector("#submit");
  let name = document.querySelector("#name");
  let addrSeach = document.querySelector("#addrSeach");
  let zipcode = document.querySelector("#zipcode");
  let addr1 = document.querySelector("#addr1");


  id.addEventListener("blur", ()=>{
    validate(id, idPattern, "영문자, 숫자, _만 입력 가능. 최소 3자이상 12자이하 입력하세요.")
  });
  pw.addEventListener("blur", ()=>{
    validate(pw, pwPattern, "영문자, 숫자, _만 입력 가능. 최소 6자이상 8자이하 입력하세요.")
  });
  pwCheck.addEventListener("blur", ()=>{
    if(pw.value === pwCheck.value){
      pwCheck.nextSibling.innerHTML = "패스워드 일치 성공";
      pw.nextSibling.innerHTML = "";
      pwCheck.nextSibling.style.color = "blue";
      return true;
    }else{
      pwCheck.nextSibling.innerHTML = "패스워드 불일치";
      pwCheck.nextSibling.style.color = "tomato"; 
      pwCheck.value = "";
      pwCheck.focus();
      return false;
    }
  });
  name.addEventListener("blur",()=>{
    validate(name, namePattern, "공백없이 한글,영문,숫자만 입력 가능 (한글2자, 영문4자 이상)")
  });
  // 우편번호 이벤트처리
  addrSeach.addEventListener("click",()=>{
    new daum.Postcode({
      oncomplete: function(data) {
        // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드
        if(data !== null && data !== undefined){
          console.log('zipcode', data.zonecode); 
          console.log('data.roadAddress', data.roadAddress); 
          zipcode.value = data.zonecode;
          addr1.value = data.roadAddress;
        }else{
          addrSeach.nextSibling.innerHTML = "daum API 오류발생으로 직접입력바람"
          zipcode.focus();
        }
      }
    }).open();
  });
  // 회원가입 전송기능 점검
  submit.addEventListener("click",()=>{
    // 회원에 전체 데이터 점검
    // 아이디
    let idReturn = validate(id, idPattern, "값을 정확하게 입력 요청");
    if(idReturn === false)return;
    // 패스워드
    let pwReturn = validate(pw, pwPattern, "값을 정확하게 입력 요청");
    if(pwReturn === false)return;
    // 이름
    let nameReturn = validate(name, namePattern, "값을 정확하게 입력 요청");
    if(nameReturn === false)return;
    alert("회원가입이 완료되었습니다.");
    let form = document.querySelector("form");
    form.submit();
  });
  
  // 공동으로 사용되는 함수
  function validate(inputObj, pattern, message){
    if((inputObj.value).match(pattern)){
      inputObj.nextSibling.innerHTML = "성공";
      inputObj.nextSibling.style.color = "blue";
      return true;
    }else{
      inputObj.nextSibling.innerHTML = message;
      inputObj.nextSibling.style.color = "tomato";
      inputObj.value = "";
      inputObj.focus();
      return false;
    }
  };
}
