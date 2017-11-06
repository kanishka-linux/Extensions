



chrome.contextMenus.create({
      "id": 'mykcast',
    "title": "cast to kawaii-player",
    "contexts": ["page", "selection", "image", "link"]
  });

// add click event
chrome.contextMenus.onClicked.addListener(onClickHandler);

// The onClicked callback function.
function onClickHandler(info, tab) {
    console.log('context');
    console.log(tab.url);
    var url = info.linkUrl;
    console.log(url);
    chrome.storage.sync.get({
    server_id: 'http://127.0.0.1:9001',
    
	}, function(items) {
        
    var server_val = items.server_id;
			if (server_val.endsWith('/')){
				server_val = server_val.slice(0, -1);
			}
			var new_url = server_val+'/' +'youtube_quick='+info.linkUrl;
			console.log(new_url);
			if (server_val.startsWith('http') && tab.url){
            var client = new getRequest();
            client.get(new_url, function(response) {
            console.log(response);
            })
            }
  });
};

var getRequest = function() {
    this.get = function(url, callbak) {
        var http_req = new XMLHttpRequest();
        http_req.onreadystatechange = function() { 
            if (http_req.readyState == 4 && http_req.status == 200)
                {callbak(http_req.responseText);}
        }

        http_req.open( "GET", url, true );            
        http_req.send( null );
    }
};
