var sataniccrowNS = {
  getSections: function() {
    var sections = ['PrincipalTranslations', 'AdditionalTranslations', 'Entries', 'Compounds'];
    return sections;
  },
  getErrorSections: function() {
    var sections = ['Error', 'Note'];
    return sections;
  },
  getOwnerApiKey: function() {
    var ownerApiKey = "d397f";
    return ownerApiKey;
  },
  translateIt: function(word, lang) {
    var ownerApiKey = sataniccrowNS.getOwnerApiKey();
    var isResult = 0;
    var ptArray = [];
    var errorArray = [];
    $.ajax({
      type: "GET",
      url: "http://api.wordreference.com/"+ ownerApiKey+"/json/"+lang +"/"+word,
      contentType: "application/json",
      dataType: "json",
      success: onSuccess
    });

    // $.ajax({
    //   type: "GET",
    //   url: "http://api.wordreference.com/" + ownerApiKey + "/json/" + lang + "/" + word,
    //   contentType: "application/json",
    //   success: parseJsonImpl
    // });

    function parseJsonImpl(data, status) {
      try {

        var parsedJson = $.parseJSON(correctJson(data));
        onSuccess(parsedJson, "my parsedJson");
      } catch (err) {
        alert('error: ' + err);
      }
    }

    function onSuccess(data, status) {
      var sections = sataniccrowNS.getSections();
      var errorSections = sataniccrowNS.getErrorSections();

      errorArray = sataniccrowNS.errorFinder(data, errorSections);
      
      if(errorArray.length > 0){
        var clone   = '';
        clone = $('.error_m').clone(false);

        clone.find('.errorTitle').text(errorArray[0]);
        if(errorArray.length > 1){
          clone.find('.errorDescription').text(errorArray[1]);
        }
        clone.removeClass('hidden');
        clone.removeClass('error_m');
        clone.attr('class', 'error');

        $('#Error').append(clone);
        $('#Error').removeClass('hidden');
        $('#Error').show();

      }else{
        for (var section in sections) {
          ptArray = [];

          sataniccrowNS.recursiveGetProp(data, sections[section], function(obj) {
            for (var prop in obj) {
              if (obj.hasOwnProperty(prop)) {
                ptArray.push(obj[prop]);
              }
            }
          });

          isResult += (ptArray.length > 0) ? 1 : 0;

          sataniccrowNS.createHtmlNode(ptArray, sections[section]);
        }
      }
    }

    function correctJson(data) {
      var regex_removeBackslash = /\\'/g;
      var regex_removeConcat = /"\s*\+\s*"/g;

      data = data.replace(regex_removeBackslash, "'");
      data = data.replace(regex_removeConcat, "");

      return data;
    }
  },

  createHtmlNode: function(array, section) {
    // console.debug(section + ": length =>" + array.length)

    for (var i = 0; i < array.length; i++) {
      var clone   = '';
      var result  = 0;

      if (i % 2 === 0) {
        clone = $('.even_m').clone(false);
      } else {
        clone = $('.odd_m').clone(false);
      }

      if (array[i]["OriginalTerm"]) {

        clone.find('.FrW2').text(array[i]["OriginalTerm"]["term"]);
        //clone.find('.FrW2').text("loop #"+ i + " " + array[i]["OriginalTerm"]["term"])
        clone.find('.POS').text(array[i]["OriginalTerm"]["POS"]);
        clone.find('.FrCN2').text(
          (array[i]["OriginalTerm"]["sense"] === "") ? "" : "(" + array[i]["OriginalTerm"]["sense"] + ")"
        );
        //clone.find('.Fr2').text(array[i]["OriginalTerm"]["usage"])
        result++;
      } else {

      }

      if (array[i]["FirstTranslation"]) {
        clone.find('.ToWrd').text(array[i]["FirstTranslation"]["term"]);
        clone.find('.POS2').text(array[i]["FirstTranslation"]["POS"]);
        clone.find('.To2').text(array[i]["FirstTranslation"]["sense"]);
        //clone.find('.Fr2').text(array[i]["FirstTranslation"]["usage"]);
        result++;
      } else {

      }

      if (result == 2) {
        if (i % 2 === 0) {
          clone.removeClass('even_m');
          clone.attr('class', 'even');

        } else {
          clone.removeClass('odd_m');
          clone.attr('class', 'odd');
        }
        clone.removeClass('hidden');

        $('#' + section).append(clone);
        $('#' + section).removeClass('hidden');
        $('#' + section).show();
      }
    }
  },

  recursiveGetProp: function(obj, lookup, callback) {
    for (var property in obj) {
      if (property == lookup) {
        callback(obj[property]);
      } else if (obj[property] instanceof Object) {
        sataniccrowNS.recursiveGetProp(obj[property], lookup, callback);
      }
    }
  },

  errorFinder: function(data, sections){
      var errors = [];

      for (var errorSection in sections){
          if(typeof data[sections[errorSection]] !== 'undefined'){
          errors.push(data[sections[errorSection]]);
        }
      }

     return errors;
  },

  cleanHtmlNodes: function() {
    var sections = sataniccrowNS.getSections();

    $('.even').remove();
    $('.odd').remove();
    $('.error').remove();

    for (var section in sections) {
      $('#' + sections[section]).attr('class', 'hidden');
      // console.debug("adding hidden class to section: " + sections[section])
    }

    $('#Error').attr('class', 'hidden');

    $('html').attr('style','height:101px');

  }

};