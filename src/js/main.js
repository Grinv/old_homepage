define(['jquery'], function ($) {
  $("#preload-box i").delay(10).fadeIn(2000);
});
//fullpage
define(['jquery', 'fullpage.js', 'animate.css'], function ($, fullpage) {
  $('#fullpage').fullpage({
    anchors:['main', 'about', 'portfolio', 'contacts'],
    menu: "#menu",
    loopBottom: true,
    afterLoad: function(link, index){
      if($(".section.active .wrapper").hasClass('novisible') && index !== 1){
        $(".section.active .wrapper").delay(2000).removeClass("novisible").addClass('visible animated fadeIn');
        $(".section.active .scrollDown").fadeIn(2000);
        if(index == 4){
          $("#links").removeClass("novisible").addClass('visible animated fadeIn');
        }
      }
    },
    afterRender: function(){
      $(".wrapper, #links").addClass('novisible');
      $(".section.active .wrapper, .section.active .scrollDown").fadeOut();
      $(window).ready(function() {
        $("#preload-box").delay(1000).fadeOut('slow');
        $(".section.active .wrapper").delay(1500).removeClass("novisible").fadeIn(3000);
        $(".section.active .scrollDown").delay(1000).fadeIn(6000);
      });
    }
  });
});
