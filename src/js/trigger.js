$(document).ready(function() {

    $mainDiv = $("#mainDiv")
    $("#overlay").css({
      opacity : 0.5,
      top     : $mainDiv.offset().top,
      width   : $mainDiv.outerWidth(),
      height  : $mainDiv.outerHeight()
    });

    $("#img-load").css({
      top  : ($mainDiv.height() / 2),
      left : (($mainDiv.width() / 2)-16)
    });

  $('#translate').click(function(){
    // $("#overlay").fadeIn();
    
    var inputWord = $("#inputWord").val()
    var lang = $("#dictselect").val()
        
    sataniccrowNS.cleanHtmlNodes()
    
    if(inputWord != "" && lang != ""){
      sataniccrowNS.translateIt(inputWord,lang)
    }
  })
})
