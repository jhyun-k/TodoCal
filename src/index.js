let date = new Date();

const renderCalendar = () => {
  const viewYear = date.getFullYear();
  const viewMonth = date.getMonth();

  //현재 연도와 월 표시
  document.querySelector('.year-month').textContent = `${viewYear}년 ${
    viewMonth + 1
  }월`;

  //지난달 마지막날과 이번달 마지막날
  const prevLast = new Date(viewYear, viewMonth, 0); //2022 12 31 토
  const thisLast = new Date(viewYear, viewMonth + 1, 0); //2023 1 31 화

  const PLDate = prevLast.getDate(); // 지난달 마지막 날 31일
  const PLDay = prevLast.getDay(); // 지난달 마지막 요일 토요일(6)

  const TLDate = thisLast.getDate(); // 이번달 마지막 날 31일
  const TLDay = thisLast.getDay(); // 이번달 마지막 요일 화요일(2)

  const prevDates = [];
  const thisDates = [...Array(TLDate + 1).keys()].slice(1); // 0부터 시작하는걸 1부터 시작하게 해준다  1~31 (1월이니까)
  const nextDates = [];

  if (PLDay !== 6) {
    // 지난달 마지막 요일이 토요일이 아니면 (요일 시작이 일요일부터니까)
    for (let i = 0; i < PLDay + 1; i++) {
      prevDates.unshift(PLDate - i); //지난달 날짜들 넣어줌
    }
  }
  for (let i = 1; i < 7 - TLDay; i++) {
    nextDates.push(i);
  }

  const dates = prevDates.concat(thisDates, nextDates); //지난달이번달다음달 합쳐주기
  const firstDateIndex = dates.indexOf(1);
  const lastDateIndex = dates.lastIndexOf(TLDate);

  console.log(firstDateIndex);
  console.log(lastDateIndex);

  dates.forEach((date, i) => {
    const condition =
      i >= firstDateIndex && i < lastDateIndex + 1 ? 'this' : 'other';
    dates[
      i
    ] = `<div class="date"><span class=${condition}>${date}</span></div>`;
  });

  document.querySelector('.dates').innerHTML = dates.join('');

  const today = new Date();
  if (viewMonth === today.getMonth() && viewYear === today.getFullYear()) {
    for (let date of document.querySelectorAll('.this')) {
      if (+date.innerText === today.getDate()) {
        date.classList.add('today');
        break;
      }
    }
  }
};

renderCalendar();

const prevMonth = () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
};

const nextMonth = () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
};

const goToday = () => {
  date = new Date();
  renderCalendar();
};
