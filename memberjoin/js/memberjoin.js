// 전체 document 메모리의 모두 로드 되었을 때 onLoad() 함수를 call한다.
function onLoad(){
  // id 패턴검색 이벤트 정의
  let idPattern = /^[\w]{3,12}$/;
  let pwPattern = /^[\w]{6,8}$/;
  let namePattern = /^[가-힣]{1,5}$/;
  let nickNamePattern = /^[a-zA-Z가-힣0-9]{1,6}$/;
  let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  let telPattern = /^(070|02|0[3-9]{1}[0-9]{1})[0-9]{3,4}[0-9]{4}$/;
  let phoneNumPattern = /^(01[016789]{1})[0-9]{3,4}[0-9]{4}$/;

  let id = document.querySelector("#id");
  let pw = document.querySelector("#pw");
  let pwCheck = document.querySelector("#pwCheck");
  let submit = document.querySelector("#submit");
  let name = document.querySelector("#name");
  let nickName = document.querySelector("#nickname");
  let email = document.querySelector("#email");
  let radioGroup = document.querySelectorAll('.radio-group > input[name="path"]');
  let radioSpan = document.querySelector(".radio-group > span");
  let tel = document.querySelector("#tel");
  let phoneNum = document.querySelector("#phoneNum");
  let birthDay = document.querySelector("#birthDay");
  let addrSeach = document.querySelector("#addrSeach");
  let zipcode = document.querySelector("#zipcode");
  let addr1 = document.querySelector("#addr1");
  let addr2 = document.querySelector("#addr2");
  let reset = document.querySelector(".btn-secondary");
  let checkHuman = document.querySelector("#checkHuman");
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
    validate(name, namePattern, "공백없이 한글 1자이상 5자이하 입력하세요.")
  });
  nickName.addEventListener("blur",()=>{
    validate(nickName, nickNamePattern, "공백없이 한글, 영문, 숫자만 입력 가능(한글2자, 영문4자 이상)")
  });
  email.addEventListener("blur",()=>{
    validate(email, emailPattern, "<br>이메일 형식이 잘못되었습니다. ex) abc123@naver.com")
  });
  tel.addEventListener("blur",()=>{
    validate(tel, telPattern, "-없이 입력해주세요. ex) 021231234")
  });
  phoneNum.addEventListener("blur",()=>{
    validate(phoneNum, phoneNumPattern, "-없이 입력해주세요. ex) 01012345678")
  });
  checkHuman.addEventListener("blur",()=>{
    if(checkHuman.value === "RCAP"){
        checkHuman.nextSibling.style.color = "blue";
        checkHuman.nextSibling.innerHTML = "성공";
      }else{
        checkHuman.nextSibling.style.color = "tomato";
        checkHuman.nextSibling.innerHTML = "다시 입력해주세요.";
        checkHuman.focus();
      }
  }); 
  birthDay.addEventListener("blur",()=>{
    if(birthDay.value === ""){
        birthDay.nextSibling.style.color = "tomato";
        birthDay.nextSibling.innerHTML = "필수로 선택해주세요.";
        birthDay.focus();
        return;
      }else{
        birthDay.nextSibling.style.color = "blue";
        birthDay.nextSibling.innerHTML = "입력완료";
      }
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
    // 닉네임
    let nickNameReturn = validate(nickName, nickNamePattern, "값을 정확하게 입력 요청");
    if(nickNameReturn === false)return;
    // email
    let emailReturn = validate(email, emailPattern, "값을 정확하게 입력 요청");
    if(emailReturn === false)return;
    // 전화번호
    let telReturn = validate(tel, telPattern, "값을 정확하게 입력 요청");
    if(telReturn === false)return;
    // 휴대전화번호
    let phoneNumReturn = validate(phoneNum, phoneNumPattern, "값을 정확하게 입력 요청");
    if(phoneNumReturn === false)return;
    // 라디오박스
    let radioGroupReturn = false;
    for(let i = 0; i < radioGroup.length; i++){
      if(radioGroup[i].checked){
        radioSpan.style.color = "blue";
        radioSpan.innerHTML = "";
        radioGroupReturn = true;
      }
    }
    if(radioGroupReturn === false){
      radioSpan.style.color = "tomato";
      radioSpan.innerHTML = "필수로 선택해주세요.";
      radioSpan.focus();
      return;
    }
    // 생년월일
    let birthDayReturn = false;
    if(birthDay.value === ""){
      birthDayReturn = false;
      birthDay.nextSibling.style.color = "tomato";
      birthDay.nextSibling.innerHTML = "필수로 선택해주세요.";
      birthDay.focus();
      return;
    }else{
      birthDayReturn = true;
      birthDay.nextSibling.style.color = "blue";
      birthDay.nextSibling.innerHTML = "입력완료";
    }
    // 주소
    let addrReturn = false;
    if(zipcode.value !== '' && addr1.value !== '' && addr2.value !== ''){
      addrSeach.nextSibling.style.color = "blue";
      addrSeach.nextSibling.innerHTML = "입력완료";
      addrReturn = true;
    }else{
      addrReturn = false;
      addrSeach.nextSibling.style.color = "tomato";
      addrSeach.nextSibling.innerHTML = "주소선택 및 상세주소를 입력해주세요.";
      addrSeach.focus();
    }
    if(addrReturn === false)return;

    // 자동등록방지
    let checkHumanReturn = false;
    if(checkHuman.value === "RCAP"){
      checkHuman.nextSibling.style.color = "blue";
      checkHuman.nextSibling.innerHTML = "성공";
      checkHumanReturn = true;
    }else{
      checkHuman.nextSibling.style.color = "tomato";
      checkHuman.nextSibling.innerHTML = "다시 입력해주세요.";
      checkHumanReturn = false;
    }
    if(checkHumanReturn === false)return;
    alert("회원가입이 완료되었습니다.");
    let form = document.querySelector("form");
    form.submit();
  });

  // 취소버튼
  reset.addEventListener('click', ()=>{
    let spanGroup = document.querySelectorAll("span");
    for(let i = 0; spanGroup.length; i++){
      spanGroup[i].innerHTML = "";
    }
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
