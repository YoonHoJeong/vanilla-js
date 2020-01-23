// html에선 html, css파일에선 css, js에선 로직만 담당하도록 변경.

const title = document.querySelector("#title");

const CLICKED_CLASS = "clicked";

function handleClick() {
  // 클래스 자체를 변경시켜서
  // const currentClass = title.className;

  // class name을 받아옴.
  // console.log(currentClass);
  // if (currentClass !== CLICKED_CLASS) {
  //   // class를 변경시킴.
  //   title.className = CLICKED_CLASS;
  // } else {
  //   title.className = "";
  // }
  // const hasClass = title.classList.contains(CLICKED_CLASS);

  // if (hasClass) {
  //   // class를 삭제시킴.
  //   title.classList.remove(CLICKED_CLASS);
  // } else {
  //   // class를 추가.
  //   title.classList.add(CLICKED_CLASS);
  // }

  // 위와 같은 기능을 똑같이 수행.
  title.classList.toggle(CLICKED_CLASS);
}

function init() {
  window.addEventListener("click", handleClick);
}

init();
