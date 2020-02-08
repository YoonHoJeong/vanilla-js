const MILLISECONDS = 1000;
const MINUTE_MILLISECONDS = 60 * MILLISECONDS;
const HOUR_MILLISECONDS = MINUTE_MILLISECONDS * 60;
const DAY_MILLISECONDS = HOUR_MILLISECONDS * 24;

const yoloTime = document.querySelector(".js-yoloTime");

let date;
let tomorrow;

function getTomorrow() {
  tomorrow = new Date(
    (year = date.getFullYear()),
    (month = date.getMonth()),
    (day = date.getDate() + 1),
    (hour = 0),
    (minute = 0),
    (second = 0),
    (millisecond = 0)
  );
}

function getRemain() {
  let remainDate = tomorrow - date;
  const remainDay = Math.floor(remainDate / DAY_MILLISECONDS);
  remainDate -= remainDay * DAY_MILLISECONDS;
  const remainHour = Math.floor(remainDate / HOUR_MILLISECONDS);
  remainDate -= remainHour * HOUR_MILLISECONDS;
  const remainMinute = Math.floor(remainDate / MINUTE_MILLISECONDS);
  remainDate -= remainMinute * MINUTE_MILLISECONDS;
  const remainSecond = Math.floor(remainDate / MILLISECONDS);

  return {
    hour: remainHour,
    minute: remainMinute,
    second: remainSecond
  };
}

function getTime() {
  date = new Date();
  getTomorrow();
  const remainDate = getRemain();
  yoloTime.innerText = `${
    remainDate.hour < 10 ? `0${remainDate.hour}` : remainDate.hour
  }:${remainDate.minute < 10 ? `0${remainDate.minute}` : remainDate.minute}:${
    remainDate.second < 10 ? `0${remainDate.second}` : remainDate.second
  }`;
}

function init() {
  setInterval(getTime, 1000);
}

init();
