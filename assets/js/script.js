const year = new Date().getFullYear();
const fourthOfJuly = new Date(year, 6,4).getTime();
const fourthOfJulyNextYear = new Date(year + 1, 6, 4).getTime();
const month = new Date().getMonth();

// countdown
let timer = setInterval(function() {

  // get today's date
  const today = new Date().getTime();

  // get the difference
  let diff;
  if(month > 6) {
    diff = fourthOfJulyNextYear - today;
  } else {
    diff = fourthOfJuly - today;
  }




  // math
  let days = Math.floor(diff / (1000 * 60 * 60 * 24));
  let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((diff % (1000 * 60)) / 1000);

  // display
  document.getElementById("timer").innerHTML =
    "<div class=\"days\"> \
  <div class=\"numbers\">" + days + "</div><p>ngày</p></div> \
<div class=\"hours\"> \
  <div class=\"numbers\">" + hours + "</div><p>giờ</p></div> \
<div class=\"minutes\"> \
  <div class=\"numbers\">" + minutes + "</div><p>phút</p></div> \
<div class=\"seconds\"> \
  <div class=\"numbers\">" + seconds + "</div><p>giây</p></div> \
</div>";

}

, 1000);