/* Set up context menu at install time. */
chrome.runtime.onInstalled.addListener(function() {
	var context = "all";
	var title = "Open Current Page in Helium"; /* just change */
	var id = chrome.contextMenus.create({
  		"title": title, 
  		"contexts":[context],
        "id": "context" + context
    });  
});

/* add click event */
chrome.contextMenus.onClicked.addListener(onClickHandler);

function onClickHandler(info, tab) {
	var url = "helium://" + tab.url; 
	window.open(url);

	setTimeout(function() { /* delay 800 ms */
		chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
			var tab = tabs[0]; /* get the current tab (i.e the new one) */
			chrome.tabs.remove(tab.id); /* remove it */
		});
	}, 800);
};
