$(document).ready(function() {
  $("#preload-box i, .scrollDown").hide();
  $("#preload-box i").delay(10).fadeIn(2000);
  $(".wrapper, #links").addClass('novisible');
  //fullpage
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
      $(".section.active .wrapper, .section.active .scrollDown").fadeOut();
      $(window).ready(function() {
        $("#preload-box").delay(2000).fadeOut('slow');
        $(".section.active .wrapper").delay(2500).removeClass("novisible").fadeIn(3000);
        $(".section.active .scrollDown").delay(2000).fadeIn(6000);
      });
    }
  });
});
