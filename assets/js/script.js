// const year = new Date().getFullYear();
// const fourthOfJuly = new Date(year, 6,4).getTime();
// const fourthOfJulyNextYear = new Date(year + 1, 6, 4).getTime();
// const month = new Date().getMonth();

// // countdown
// let timer = setInterval(function() {

//   // get today's date
//   const today = new Date().getTime();

//   // get the difference
//   let diff;
//   if(month > 6) {
//     diff = fourthOfJulyNextYear - today;
//   } else {
//     diff = fourthOfJuly - today;
//   }




//   // math
//   let days = Math.floor(diff / (1000 * 60 * 60 * 24));
//   let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//   let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
//   let seconds = Math.floor((diff % (1000 * 60)) / 1000);

//   // display
//   document.getElementById("timer").innerHTML =
//     "<div class=\"days\"> \
//   <div class=\"numbers\">" + days + "</div><p>ngày</p></div> \
// <div class=\"hours\"> \
//   <div class=\"numbers\">" + hours + "</div><p>giờ</p></div> \
// <div class=\"minutes\"> \
//   <div class=\"numbers\">" + minutes + "</div><p>phút</p></div> \
// <div class=\"seconds\"> \
//   <div class=\"numbers\">" + seconds + "</div><p>giây</p></div> \
// </div>";

// }

// , 1000);



(function($) {
  var 	_originalY,
        _transitionDurations = {};

  $(document).ready(function() {
    
    // expand item
    $('body').on('click', '.item:not(.active)', function() {
      $('body').addClass('noscroll');

      _originalY = parseInt($(this).css('top'));

      var _timeFactor = (_originalY - $('.content').scrollTop()) / 667 + 1; // is a responsive enviroment window's height should not be fixed
      _transitionDurations['0.1'] = 0.1 * _timeFactor;
      _transitionDurations['0.225'] = 0.225 * _timeFactor;
      _transitionDurations['0.3'] = 0.3 * _timeFactor;

      var _classes = 'active';

      var _css = {
        'position': 'fixed',
        'top': '80px',
        'bottom': '0px',
        'left': '0px',
        'transition': 'top ' + _transitionDurations['0.225'] + 's, width ' + _transitionDurations['0.3'] + 's, height ' + _transitionDurations['0.3'] + 's'
      };

      if ($('.content').scrollTop() < _originalY) {
        _classes += ' bounce';
        _css['animation-duration'] = _transitionDurations['0.3'] + 's';
      }

      $(".overlay").css({'display': 'block'});
      $(this).addClass(_classes);
      $(this).css(_css);
      $(this).find('.item-content').css('transition-delay', _transitionDurations['0.3'] + 's');
    })

    // collapse item
    $('body').on('click', '.item .close', function() {
      $(this).siblings('.item-content').removeAttr('style');

      var _css = {
        'position': 'inherit',
        'top': 					_originalY,
        'transition': 			'top ' + _transitionDurations['0.225'] + 's, width ' + _transitionDurations['0.1'] + 's, height ' + _transitionDurations['0.1'] + 's',
        'animation-duration': 	_transitionDurations['0.225'] + 's',
      };
      $('.item.active').removeClass('active').addClass('collapsing').css(_css); 

      $('body').removeClass('noscroll');

      setTimeout(function() {
        $('.item.collapsing').removeClass('collapsing bounce').css({
          'transition': '',
          'animation-duration': '',
        });
      }, _transitionDurations['0.3']*1000);
      $(".overlay").css({'display': 'none'});
    })
    
  })

  $(window).on('load', function() {
    // set items' initial position and container's height (should be called also on resize in a responsive enviroment)
    var _top = 32;
    $('.item').each(function(i, el) {
      $(el).css('top', _top);
      _top += $(el).outerHeight() + 16;
    })
    $('.app-container').css('height', _top + 16);
  })

})(jQuery);

$(".notice-alert").click(function (e) { 
  e.preventDefault();
  notifyMe();
});

// noti
function notifyMe() {

  Notification.requestPermission().then((permission) => {
    // If the user accepts, let's create a notification
    if (permission === "granted") {
      const notification = new Notification("Hi there!");
      // …
    }
  });

  if (!("Notification" in window)) {
    // Check if the browser supports notifications
    alert("This browser does not support desktop notification");
  } else if (Notification.permission === "granted") {
    // Check whether notification permissions have already been granted;
    // if so, create a notification
    const notification = new Notification("Hi there!");
    // …
  } else if (Notification.permission !== "denied") {
    // We need to ask the user for permission
    Notification.requestPermission().then((permission) => {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        const notification = new Notification("Hi there!");
        // …
      }
    });
  }
}



console.clear();


function CountdownTracker(label, value){

  var el = document.createElement('span');

  el.className = 'flip-clock__piece';
  el.innerHTML = '<b class="flip-clock__card card"><b class="card__top"></b><b class="card__bottom"></b><b class="card__back"><b class="card__bottom"></b></b></b>' + 
    '<span class="flip-clock__slot">' + label + '</span>';

  this.el = el;

  var top = el.querySelector('.card__top'),
      bottom = el.querySelector('.card__bottom'),
      back = el.querySelector('.card__back'),
      backBottom = el.querySelector('.card__back .card__bottom');

  this.update = function(val){
    val = ( '0' + val ).slice(-2);
    if ( val !== this.currentValue ) {
      
      if ( this.currentValue >= 0 ) {
        back.setAttribute('data-value', this.currentValue);
        bottom.setAttribute('data-value', this.currentValue);
      }
      this.currentValue = val;
      top.innerText = this.currentValue;
      backBottom.setAttribute('data-value', this.currentValue);

      this.el.classList.remove('flip');
      void this.el.offsetWidth;
      this.el.classList.add('flip');
    }
  }
  
  this.update(value);
}

// Calculation adapted from https://www.sitepoint.com/build-javascript-countdown-timer-no-dependencies/

function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  return {
    'Total': t,
    'Ngày': Math.floor(t / (1000 * 60 * 60 * 24)),
    'Giờ': Math.floor((t / (1000 * 60 * 60)) % 24),
    'Phút': Math.floor((t / 1000 / 60) % 60),
    'Giây': Math.floor((t / 1000) % 60)
  };
}

function getTime() {
  var t = new Date();
  return {
    'Ngày': t,
    'Giờ': t.getHours() % 12,
    'Phút': t.getMinutes(),
    'Giây': t.getSeconds()
  };
}

function Clock(countdown,callback) {
  
  countdown = countdown ? new Date(Date.parse(countdown)) : false;
  callback = callback || function(){};
  
  var updateFn = countdown ? getTimeRemaining : getTime;

  this.el = document.createElement('div');
  this.el.className = 'flip-clock';

  var trackers = {},
      t = updateFn(countdown),
      key, timeinterval;

  for ( key in t ){
    if ( key === 'Total' ) { continue; }
    trackers[key] = new CountdownTracker(key, t[key]);
    this.el.appendChild(trackers[key].el);
  }

  var i = 0;
  function updateClock() {
    timeinterval = requestAnimationFrame(updateClock);
    
    // throttle so it's not constantly updating the time.
    if ( i++ % 10 ) { return; }
    
    var t = updateFn(countdown);
    if ( t.Total < 0 ) {
      cancelAnimationFrame(timeinterval);
      for ( key in trackers ){
        trackers[key].update( 0 );
      }
      callback();
      return;
    }
    
    for ( key in trackers ){
      trackers[key].update( t[key] );
    }
  }

  setTimeout(updateClock,500);
}

var deadline = new Date(Date.parse(new Date()) + 89 * 24 * 60 * 60 * 1000);
var c = new Clock(deadline, function(){
  
});
document.getElementById("timer").appendChild(c.el);
