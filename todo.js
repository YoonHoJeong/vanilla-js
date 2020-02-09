const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

// function filterFn(toDo) {
//   // li에 없는 id를 갖는 element를 체크하고 싶음.
//   return toDo.id === 1;
// }

// const -> let으로 변경.
let toDos = [];

function deleteToDo(event) {
  // 클릭이 된 버튼의 부모 클래스를 알고 싶음. - 클릭이 된 대상 : event.target
  // console.dir(event.target);
  // 위 함수를 통해서 부모 클래스 이름을 찾았음. -> 'parentNode'
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  // filterFn 에서 통과하는 list의 모든 요소들에서 true를 반환하는 값만.
  // array(todos)의 모든 아이템을 통해 함수(filterFn)를 실행
  // true로 반환되는 아이템들만 array로 만들고 반환.
  const cleanToDos = toDos.filter(function(toDo) {
    // li.id는 string이라 int로 변경해서 넣어줌.
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}

// 로컬에 저장.
function saveToDos() {
  // JSON.stirngify: js의 오브젝트를 스트링으로 변경.
  //   Js object notation
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
  // element 생성.
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;

  delBtn.innerText = "X";
  delBtn.addEventListener("click", deleteToDo);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId
  };
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    // 불러온게 string 이라서 string을 object로 반환.
    const parsedToDos = JSON.parse(loadedToDos);
    // forEach : 배열의 각 요소별로 실행시켜줌.
    // 밖에다 함수를 선언해도 상관 없음.
    parsedToDos.forEach(function(toDo) {
      paintToDo(toDo.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
