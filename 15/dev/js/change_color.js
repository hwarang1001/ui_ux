// 1 객체를찾는다. Student stu = new Student(); => 객체배열 => Collection Framework
// document(화면에 있는 모든 UI객체를 다 가지고 있다.) => css 선택자기능을 가지고 찾는다.
// 한개만 찾고 싶을 때 id를 줘야된다. class 이름으로 찾으면 => 객체 참조 배열 [첨자] 반복문을 이용하면 된다.
let h1obj = document.querySelector('#heading');

//2. 객체를 내마음대로 설정(기본속성, style속성, 이벤트속성:on, content): 이벤트설정
h1obj.onclick = () => {
  h1obj.style.color = "#ff0000";
  window.alert("h1 클릭 이벤트 발생!");
};