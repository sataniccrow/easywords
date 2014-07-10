function setApiKey(val) {
    var result = false;
    var API_KEY = "apiKey";

    if(!val){
        return result;
    }else{
        chrome.storage.sync.set({API_KEY: val}, function() {
            result = true;
            return result;
        });
    }
}