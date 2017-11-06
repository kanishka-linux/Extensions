

document.addEventListener('DOMContentLoaded', function(){
    var _cast = document.getElementById('cast');
    var _server_ip = document.getElementById('server_ip');
    chrome.storage.sync.get({
    server_id: 'http://127.0.0.1:9001',
    
	}, function(items) {
    document.getElementById('server_ip').value = items.server_id;
    
  });
  _cast.addEventListener('click', function() {
	  console.log('hello');
      var mytab = browser.tabs.query({currentWindow: true, active: true});;
      mytab.then(ongot, onerror);
  }); 
   
});

function ongot(tabs){
    for (let tab of tabs){
        cast_function(tab);
    }
    console.log(tabs);
}

function onerror(error){
    console.log(error);
}

function cast_function(tab){
    var _cast = document.getElementById('cast');
    var _server_ip = document.getElementById('server_ip');
    console.log(tab.url);
          console.log(_server_ip.value);
          chrome.storage.sync.set({
			server_id: server_ip.value,
			}, function() {
			console.log('saved');
			});
			server_val = _server_ip.value;
			if (server_val.endsWith('/')){
				server_val = server_val.slice(0, -1);
			}
			var new_url = server_val+'/' +'youtube_quick='+tab.url;
			console.log(new_url);
			if (server_val.startsWith('http') && tab.url){
            var client = new getRequest();
            client.get(new_url, function(response) {
            console.log(response);
            })
            }
}

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
