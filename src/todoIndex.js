const viewYear = date.getFullYear();
const viewMonth = date.getMonth();
const viewDate = date.getDate();

document.querySelector('.year-month-date').textContent = `${viewYear}년 ${viewMonth + 1}월 ${viewDate}일`
