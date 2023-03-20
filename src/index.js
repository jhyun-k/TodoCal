let date = new Date();

let todoDate = 0;

const renderCalendar = () => {
  //달력 보여주는 함수-------
  const viewYear = date.getFullYear();
  const viewMonth = date.getMonth();
  const viewDate = date.getDate();

  //현재 연도와 월 표시-------
  document.querySelector('.year-month').textContent = `${viewYear}년 ${
    viewMonth + 1
  }월`;

  //지난달 마지막날과 이번달 마지막날 ------
  const prevLast = new Date(viewYear, viewMonth, 0); //2022 12 31 토
  const thisLast = new Date(viewYear, viewMonth + 1, 0); //2023 1 31 화

  const PLDate = prevLast.getDate(); // 지난달 마지막 날 31일
  const PLDay = prevLast.getDay(); // 지난달 마지막 요일 토요일(6)

  const TLDate = thisLast.getDate(); // 이번달 마지막 날 31일
  const TLDay = thisLast.getDay(); // 이번달 마지막 요일 화요일(2)

  const prevDates = [];
  const thisDates = [...Array(TLDate + 1).keys()].slice(1); // 인덱스는 0부터 시작하므로 TLDate에 +1 해주어 하나가 추가된 배열을 만들고, `slice(1)` 을 이용해 1일부터 마지막날까지의 배열로 만든다. 1~31 (1월이니까)
  const nextDates = [];

  //달력 합치기 ----------
  if (PLDay !== 6) {
    // 지난달 마지막 요일이 토요일이 아니면 (요일 시작이 일요일부터니까)
    for (let i = 0; i < PLDay + 1; i++) {
      prevDates.unshift(PLDate - i); //지난달 날짜들 넣어줌
    }
  }
  for (let i = 1; i < 7 - TLDay; i++) {
    nextDates.push(i); // 다음달 날짜 넣어줌
  }

  const dates = prevDates.concat(thisDates, nextDates); //지난달이번달다음달 합쳐주기

  const firstDateIndex = dates.indexOf(1); //이번달 1일의 인덱스 찾기
  const lastDateIndex = dates.lastIndexOf(TLDate); //이번달 막날의 인덱스 찾기

  dates.forEach((date, i) => {
    const condition =
      i >= firstDateIndex && i < lastDateIndex + 1 ? 'this' : 'other'; //date의 인덱스가 이번달 1일 인덱스보다 크거나 같고 막날 인덱스보다 작으면 이번달! 아니면 다른달! 다른달은 opacity 흐리게 해주기 위함
    dates[
      i
    ] = `<div class="date"><span class=${condition}>${date}</span></div>`;
    const dateInner = date;
    console.log(dateInner);
  });

  document.querySelector('.dates').innerHTML = dates.join('');

  //오늘날짜 표시하기 -----------
  const today = new Date();

  if (viewMonth === today.getMonth() && viewYear === today.getFullYear()) {
    //지금 보고있는 달력이 이번년 이번달 달력이면
    for (let date of document.querySelectorAll('.this')) {
      //this라는 클래스를 갖고있는 값을 돌려서
      if (+date.innerText === today.getDate()) {
        //date의 text가 오늘 날짜와 같으면 (string에 + 붙여줘서 type을 number로 바꿔줌)
        date.classList.add('today'); // today라는 클래스를 붙여준다
        break; // 그러고 빠져나와라
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

/* Date.prototype.setMonth() : setMonth () 메서드는 현재 설정된 연도에 따라 지정된 날짜의 월을 설정할 수 있다 */
