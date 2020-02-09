const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  greeting = document.querySelector(".js-greetings"),
  nameContainer = document.querySelector(".name-container");
// 쿼리 셀렉터 : 찾은 첫번째 것을 가져옴.
// 쿼리 셀렉터 all : 모든 것을 list로 가져옴.
// get element by id

// local storage

const USER_LS = "currentUser",
  SHOWING_CN = "showing";

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
  // 이벤트가 root에서 일어나서 form에서 일어나게 됨. 모든 event에 반응
  //   event를 금지시키는 것 : preventDefault
  event.preventDefault();
  const currentValue = input.value;
  paintGreeting(currentValue); // 저장한 게 아니라 나를 기억 못함.
  saveName(currentValue);
}

function askForName() {
  // form을 제출하면 다른 곳으로 전송.
  nameContainer.classList.add(SHOWING_CN);
  form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
  nameContainer.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  greeting.innerText = `Welcome ${text} !!`;
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    //   she is not
    askForName();
  } else {
    //   she is
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();
}

init();
