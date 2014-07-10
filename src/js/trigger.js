$(document).ready(function() {
    $('#inputWord').focus();

    // DEBUG
    // chrome.storage.sync.remove("apiKey", function(){});

    // WORKING MANAGEMENT FOR API KEY
    // sataniccrowNS.getOwnerApiKey();
    
    // chrome.storage.onChanged.addListener(function(changes, namespace) {
    //   if (changes["apiKey"]) {
    //     $('#mainBlock').removeClass('hidden');
    //     $('#settings').attr('class', 'hidden');
    //     $('#reset').removeClass('hidden');
    //   }
    // });

    // $('#resetOwnerApiKey').click(function(){
    //   sataniccrowNS.resetOwnerApiKey();
    // });

    // $('#setApiKey').click(function(){
    //   var apiKey = $("#apiKey").val();
    //   if(apiKey){
    //     sataniccrowNS.setApiKey(apiKey);
    //   }
    // });
    
    // HIDE API FORM(s)
    $('#settings').attr('class', 'hidden');
    $('#reset').attr('class', 'hidden');
    $('#loading').attr('class', 'hidden');
    
    $mainDiv = $("#mainDiv");
    $("#overlay").css({
      opacity : 0.5,
      top     : $mainDiv.offset().top,
      width   : $mainDiv.outerWidth(),
      height  : $mainDiv.outerHeight()
    });

    // $("#img-load").css({
    //   top  : ($mainDiv.height() / 2),
    //   left : (($mainDiv.width() / 2)-16)
    // });

    $('#inputWord').keydown(function( event ) {
        if(sataniccrowNS.sequenceManager(event.which)){
            // console.log("doodlin': " + event.which);
            $('#doodle').animate({opacity: 1.0},1000);
        }else{
            // console.log("array content: " + sataniccrowNS.keySequence + " - " +event.which);
        }
    });

  $('#translate').click(function(){
    // $("#overlay").fadeIn();
    $('#loading').removeClass('hidden');

    var inputWord = $("#inputWord").val();
    var lang = $("#dictselect").val();
        
    // sataniccrowNS.cleanHtmlNodes();
    
    // if(inputWord !== "" && lang !== ""){
    //   sataniccrowNS.translateIt(inputWord,lang);
    // }
    
    $("#mainDiv").html("");
    
    if(inputWord !== "" && lang !== ""){
      sataniccrowNS.translatePlaneHtml(inputWord,lang);
    }
  });
});