function onLoad() {
  let id1Pattern = /^[a-zA-Z0-9._%+-]{2,}$/;
  let id2Pattern = /^@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  let pwPattern = /^[\w]{6,8}$/;
  let namePattern = /^[가-힣]{1,5}$/;
  let yearPattern = /^(19|20)\d{2}$/;
  let dayPattern = /^(?:[1-9]|[12][0-9]|3[01])$/;
  let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  let phonePattern = /^(01[016789]{1})[0-9]{3,4}[0-9]{4}$/;

  let id1 = document.querySelector("#id1");
  let id2 = document.querySelector("#id2");
  let idSpan = document.querySelector("#idSpan");
  let pw = document.querySelector("#pw");
  let pwSpan = document.querySelector("#pwSpan");
  let pwCheck = document.querySelector("#pwCheck");
  let pwCheckSpan = document.querySelector("#pwCheckSpan");
  let name = document.querySelector("#name");
  let nameSpan = document.querySelector("#nameSpan");
  let year = document.querySelector("#year");
  let day = document.querySelector("#day");
  let birthSpan = document.querySelector("#birthSpan");
  let email = document.querySelector("#email");
  let emailSpan = document.querySelector("#emailSpan");
  let phone = document.querySelector("#phone2");
  let phoneSpan = document.querySelector("#phoneSpan");
  let num = document.querySelector("#num");
  let numBtn = document.querySelector("#numBtn");
  let numSpan = document.querySelector("#numSpan");
  let submit = document.querySelector("#submit");
  let monthSelect = document.querySelector("#monthSelect");
  let gender = document.querySelector("#gender");
  let genderSpan = document.querySelector("#genderSpan");
  id2.addEventListener("blur", () => {
    if ((id1.value).match(id1Pattern)) {
      if ((id2.value).match(id2Pattern)) {
        idSpan.innerHTML = "성공";
        idSpan.style.color = "blue";
        return true;
      } else {
        idSpan.innerHTML = "이메일 형식이 잘못되었습니다. ex) abc123@naver.com";
        idSpan.style.color = "tomato";
        id1.value = "";
        id2.value = "";
        id1.focus();
        return false;
      }
    } else {
      idSpan.innerHTML = "이메일 형식이 잘못되었습니다. ex) abc123@naver.com";
      idSpan.style.color = "tomato";
      id1.value = "";
      id2.value = "";
      id1.focus();
      return false;
    }
  });
  pw.addEventListener("blur", () => {
    validate(pw, pwPattern, "영문자, 숫자, _만 입력 가능. 최소 6자이상 8자이하 입력하세요.", pwSpan);
  });
  pwCheck.addEventListener("blur", () => {
    if (pw.value === pwCheck.value) {
      pwCheckSpan.innerHTML = "패스워드 일치 성공";
      pwCheckSpan.style.color = "blue";
      return true;
    } else {
      pwCheckSpan.innerHTML = "패스워드 불일치";
      pwCheckSpan.style.color = "tomato";
      pwCheck.value = "";
      pwCheck.focus();
      return false;
    }
  });
  name.addEventListener("blur", () => {
    validate(name, namePattern, "공백없이 한글 1자이상 5자이하 입력하세요.", nameSpan);
  });
  year.addEventListener("blur", () => {
    validate(year, yearPattern, "1900 ~ 2099년중에 입력하세요.", birthSpan);
  });
  day.addEventListener("blur", () => {
    validate(day, dayPattern, "1 ~ 31일중에 입력하세요.", birthSpan);
  });
  email.addEventListener("blur", () => {
    validate(email, emailPattern, "이메일 형식이 잘못되었습니다. ex) abc123@naver.com", emailSpan);
  });
  phone.addEventListener("blur", () => {
    validate(phone, phonePattern, "-없이 입력해주세요. ex) 01012345678", phoneSpan);
  });
  let code;
  numBtn.addEventListener("click", () => {
    code = Math.floor(Math.random() * (9999 - 1111 + 1)) + 1111;
    alert(`인증번호는 ${code} 입니다.`);
  });
  num.addEventListener("blur", () => {
    if (num.value === code.toString()) {
      numSpan.innerHTML = "인증번호 일치 성공";
      numSpan.style.color = "blue";
      return true;
    } else {
      numSpan.innerHTML = "인증번호 불일치";
      numSpan.style.color = "tomato";
      num.value = "";
      num.focus();
      return false;
    }
  });
  // 회원가입 전송기능 점검
  submit.addEventListener("click", () => {
    // 회원에 전체 데이터 점검
    // 아이디
    let idReturn = validate(id1, id1Pattern, "값을 정확하게 입력 요청", idSpan);
    if (idReturn === false) return;
    // 패스워드
    let pwReturn = validate(pw, pwPattern, "값을 정확하게 입력 요청", pwSpan);
    if (pwReturn === false) return;
    // 이름
    let nameReturn = validate(name, namePattern, "값을 정확하게 입력 요청", nameSpan);
    if (nameReturn === false) return;
    // 생년월일
    let yearReturn = validate(year, yearPattern, "1900 ~ 2099년중에 입력하세요.", birthSpan);
    if (yearReturn === false) return;
    if (monthSelect.value === "month") {
      birthSpan.innerHTML = "월을 선택해주세요.";
      birthSpan.style.color = "tomato";
      monthSelect.focus();
      return;
    } else {
      birthSpan.innerHTML = "월 선택 완료";
      birthSpan.style.color = "blue";
    }
    let dayReturn = validate(day, dayPattern, "1 ~ 31일중에 입력하세요.", birthSpan);
    if (dayReturn === false) return;
    // 성별
    if (gender.value === "gender") {
      genderSpan.innerHTML = "성별을 선택해주세요.";
      genderSpan.style.color = "tomato";
      gender.focus();
      return;
    } else {
      genderSpan.innerHTML = "성별 선택 완료";
      genderSpan.style.color = "blue";
    }
    // 전화번호
    let phoneReturn = validate(phone, phonePattern, "값을 정확하게 입력 요청", phoneSpan);
    if (phoneReturn === false) return;
    // 인증번호 비교
    if (num.value === code?.toString()) {
      numSpan.innerHTML = "인증번호 일치 성공";
      numSpan.style.color = "blue";
    } else {
      numSpan.innerHTML = "인증번호를 받고 입력해주세요.";
      numSpan.style.color = "tomato";
      num.value = "";
      numBtn.focus();
      return;
    }
    alert("회원가입이 완료되었습니다.");
    let form = document.querySelector("form");
    form.submit();
  });

  // 공동으로 사용되는 함수
  function validate(inputObj, pattern, message, span) {
    if ((inputObj.value).match(pattern)) {
      span.innerHTML = "성공";
      span.style.color = "blue";
      return true;
    } else {
      span.innerHTML = message;
      span.style.color = "tomato";
      inputObj.value = "";
      inputObj.focus();
      return false;
    }
  };
  // 1. 객체 찾기
  const content = document.querySelector("#content"); // 회전목마 전체 레이아웃
  const imgList = document.querySelectorAll("#slide_show img"); // 회전목마 이미지배열리스트노드
  const navgateleft = document.querySelector("#navgateleft"); // 회전목마 왼쪽네비게이트
  const navgateright = document.querySelector("#navgateright"); // 회전목마 오른쪽네비게이트
  const indicatorList = document.querySelectorAll("#indicator > a"); // 회전목마 인디케이터 리스트

  // 2. 함수만들기 (시간에 따라서 이미지 화면 1, 인디게이터 1이 선택되어 화면에 보여진다.)
  let list = [1, 0, 0, 0];
  let timerId; // 타이머 핸들
  function listArray() {
    for (let i = 0; i < list.length; i++) {
      imgList[i].style.zIndex = list[i];
    }
    for (let i = 0; i < list.length; i++) {
      indicatorList[i].classList.remove("active");
    }
    let index = list.indexOf(1); // 값1이 들어있는 인덱스의 값을 리턴해줌 
    indicatorList[index].classList.add("active");
  }
  listArray();
  // 왼쪽네비게이터 클릭하면 왼쪽화면으로 이동
  navgateleft.addEventListener('click', () => {
    // list = [1, 0, 0, 0]; 왼쪽에서 빼서 오른쪽 입력 list = [0, 0, 0, 1];
    let value = list.shift();
    list.push(value);
    listArray();
  });
  // 오른쪽네비게이터 클릭하면 왼쪽화면으로 이동
  navgateright.addEventListener('click', () => {
    // list = [1, 0, 0, 0]; 오른쪽에서 빼서 왼쪽 입력 list = [0, 1, 0, 0];
    list.unshift(list.pop());
    listArray();
  });
  // 3초마다 navgateright 기능을 불러준다.
  function startTimer() {
    timerId = setInterval(() => {
      list.unshift(list.pop());
      listArray();
    }, 3000);
  }
  startTimer();
  // content영역에 마우스가 올라가면 타이머가 멈추게 한다.
  content.addEventListener("mouseenter", () => { clearInterval(timerId) });

  // content영역에 마우스가 빠져나가면 타이머가 작동하게 한다.
  content.addEventListener("mouseleave", () => { startTimer() });

  // indicator 클릭하면 해당되는 화면으로 이동해야된다.
  for (let i = 0; i < indicatorList.length; i++) {
    indicatorList[i].addEventListener('click', () => {
      let index = list.indexOf(1);
      list[index] = 0;
      list[i] = 1;
      listArray();
    });
  }

}