(function($) {
  "use strict"; // Start of use strict

  // Toggle the side navigation
  $("#sidebarToggle, #sidebarToggleTop").on('click', function(e) {
    $("body").toggleClass("sidebar-toggled");
    $(".sidebar").toggleClass("toggled");
    if ($(".sidebar").hasClass("toggled")) {
      $('.sidebar .collapse').collapse('hide');
    };
  });

  // Close any open menu accordions when window is resized below 768px
  $(window).resize(function() {
    if ($(window).width() < 768) {
      $('.sidebar .collapse').collapse('hide');
    };
  });

  // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
  $('body.fixed-nav .sidebar').on('mousewheel DOMMouseScroll wheel', function(e) {
    if ($(window).width() > 768) {
      var e0 = e.originalEvent,
        delta = e0.wheelDelta || -e0.detail;
      this.scrollTop += (delta < 0 ? 1 : -1) * 30;
      e.preventDefault();
    }
  });

  // Scroll to top button appear
  $(document).on('scroll', function() {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });

  // Smooth scrolling using jQuery easing
  $(document).on('click', 'a.scroll-to-top', function(e) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: ($($anchor.attr('href')).offset().top)
    }, 1000, 'easeInOutExpo');
    e.preventDefault();
  });

})(jQuery); // End of use strict

// Modal Javascript

$(document).ready(function () {
  $("#myBtn").click(function () {
    $('.modal').modal('show');
  });

  $("#modalLong").click(function () {
    $('.modal').modal('show');
  });

  $("#modalScroll").click(function () {
    $('.modal').modal('show');
  });

  $('#modalCenter').click(function () {
    $('.modal').modal('show');
  });
});

// Popover Javascript

$(function () {
  $('[data-toggle="popover"]').popover()
});
$('.popover-dismiss').popover({
  trigger: 'focus'
});


function logout (){
  sessionStorage.clear();
  window.location = "\login.html";
}

function login() {

  var user = document.getElementById('emailLogin').value;
  var pass = document.getElementById('passLogin').value;
  
  if (user=="admin" && pass=="rahul"){
    sessionStorage.setItem("user", "Admin");
    window.location = "\index.html";
  }
  else{
      alert("Incorrect Detail!!!!!");
  }
}

function loginCheck() {
  if(sessionStorage.getItem("user")!=="Admin"){
    window.location = "\login.html";
  }
}

function hideFirstColUserTable() {
  var col = "1";
  if (isNaN(col) || col == "") {
      alert("Invalid Column");
      return;
  }
  col = parseInt(col, 10);
  col = col - 1;
  var tbl = document.getElementById("userTable");
  if (tbl != null) {
      if (col < 0 || col >= tbl.rows.length - 1) {
          alert("Invalid Column");
          return;
      }
      for (var i = 0; i < tbl.rows.length; i++) {
          for (var j = 0; j < tbl.rows[i].cells.length; j++) {
              tbl.rows[i].cells[j].style.display = "";
              if (j == col)
                  tbl.rows[i].cells[j].style.display = "none";
          }
      }
  }
}