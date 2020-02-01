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

// //disable F12 & Ctr+U
// document.onkeydown = function(e) {
//   if (e.ctrlKey && 
//       (e.keyCode === 67 || 
//        e.keyCode === 86 || 
//        e.keyCode === 85 || 
//        e.keyCode === 117)) {
//       return false;
//   } else {
//       return true;
//   }
// };
// $(document).keypress("u",function(e) {
// if(e.ctrlKey)
// {
// return false;
// }
// else
// {
// return true;
// }
// });

// // With jQuery    disable right click
// $(document).on({
//   "contextmenu": function(e) {
//       console.log("ctx menu button:", e.which); 

//       // Stop the context menu
//       e.preventDefault();
//   },
//   "mousedown": function(e) { 
//       console.log("normal mouse down:", e.which); 
//   },
//   "mouseup": function(e) { 
//       console.log("normal mouse up:", e.which); 
//   }
// });

//disable auto model close for add / edit button
$(document).ready(function(){
	$('#btnAdd, #btnEdit').click(function(){
		$('#exampleModal').modal({
			backdrop: 'static'
		});
	}); 
});


function logout (){
  sessionStorage.clear();
  window.location = "\index.html";
}

function login() {

  var user = document.getElementById('emailLogin').value;
  var pass = document.getElementById('passLogin').value;
  
  if (user=="admin" && pass=="rahul"){
    sessionStorage.setItem("user", "Admin");
    window.location = "\dashboard.html";
  }
  else{
      alert("Incorrect Detail!!!!!");
  }
}

function loginCheck() {
  if(sessionStorage.getItem("user")!=="Admin"){
    window.location = "\index.html";
  }
}


$("#tbSearch").keyup(function () {
  var value = this.value.toLowerCase().trim();

  $("table tr").each(function (index) {
      if (!index) return;
      $(this).find("td").each(function () {
          var id = $(this).text().toLowerCase().trim();
          var not_found = (id.indexOf(value) == -1);
          $(this).closest('tr').toggle(!not_found);
          return not_found;
      });
  });
});