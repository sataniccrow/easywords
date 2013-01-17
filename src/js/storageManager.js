function saveChanges(langFrom, langTo) {
  
  if(langFrom == "" || langTo == ""){
    alert('Invalid languages');
  }else{
    chrome.storage.sync.set({'langFrom': langFrom,'langTo' : langTo}, function(){
      alert('Default languages saved');
    });
  }
}


