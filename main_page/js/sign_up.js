function onLoad(){
      // 1. 객체 찾기
      const content = document.querySelector("#content"); // 회전목마 전체 레이아웃
      const imgList = document.querySelectorAll("#slide_show img"); // 회전목마 이미지배열리스트노드
      const navgateleft = document.querySelector("#navgateleft"); // 회전목마 왼쪽네비게이트
      const navgateright = document.querySelector("#navgateright"); // 회전목마 오른쪽네비게이트
      const indicatorList = document.querySelectorAll("#indicator > a"); // 회전목마 인디케이터 리스트
      
      // 2. 함수만들기 (시간에 따라서 이미지 화면 1, 인디게이터 1이 선택되어 화면에 보여진다.)
      let list = [1, 0, 0, 0];
      let timerId; // 타이머 핸들
      function listArray(){
        for(let i = 0; i < list.length; i++){
          imgList[i].style.zIndex = list[i];
        }
        for(let i = 0; i < list.length; i++){
          indicatorList[i].classList.remove("active");
        }
        let index = list.indexOf(1); // 값1이 들어있는 인덱스의 값을 리턴해줌 
        indicatorList[index].classList.add("active"); 
      }
      listArray();
      // 왼쪽네비게이터 클릭하면 왼쪽화면으로 이동
      navgateleft.addEventListener('click',()=>{
        // list = [1, 0, 0, 0]; 왼쪽에서 빼서 오른쪽 입력 list = [0, 0, 0, 1];
        let value = list.shift();
        list.push(value);
        listArray();
      });
      // 오른쪽네비게이터 클릭하면 왼쪽화면으로 이동
      navgateright.addEventListener('click',()=>{
        // list = [1, 0, 0, 0]; 오른쪽에서 빼서 왼쪽 입력 list = [0, 1, 0, 0];
        list.unshift(list.pop());
        listArray();
      });
      // 3초마다 navgateright 기능을 불러준다.
      function startTimer(){
        timerId = setInterval(()=>{
          list.unshift(list.pop());
          listArray();
        }, 3000);
      }
      startTimer();      
      // content영역에 마우스가 올라가면 타이머가 멈추게 한다.
      content.addEventListener("mouseenter", ()=>{clearInterval(timerId)});
      
      // content영역에 마우스가 빠져나가면 타이머가 작동하게 한다.
      content.addEventListener("mouseleave", ()=>{startTimer()});
      
      // indicator 클릭하면 해당되는 화면으로 이동해야된다.
      for(let i = 0; i < indicatorList.length; i++){
        indicatorList[i].addEventListener('click',()=>{
          let index = list.indexOf(1);
          list[index] = 0;
          list[i] = 1;
          listArray();
        });
      }
  // id 패턴검색 이벤트 정의
  let idPattern = /^[\w]{3,12}$/;
  let pwPattern = /^[\w]{6,8}$/;
  let namePattern = /^[가-힣]{1,5}$/;
  let nickNamePattern = /^[a-zA-Z가-힣0-9]{1,6}$/;
  let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  let telPattern = /^(070|02|0[3-9]{1}[0-9]{1})[0-9]{3,4}[0-9]{4}$/;
  let phoneNumPattern = /^(01[016789]{1})[0-9]{3,4}[0-9]{4}$/;

}