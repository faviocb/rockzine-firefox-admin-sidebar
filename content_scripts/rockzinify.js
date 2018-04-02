(function() {

	  
  /**
   * Check and set a global guard variable.
   * If this content script is injected into the same page again,
   * it will do nothing next time.
   */
  if (window.hasRun) {
    return;
  }
  
  window.hasRun = true;
  
  
 
  console.log('$$$$$$$$$$ rockzinifying now $$$$$$$$$$');

  
  
	const PEOPLE_WHO_LIKE_THIS_PAGE = "PEOPLE_WHO_LIKE_THIS_PAGE";
	const PEOPLE_WHO_FOLLOW_THIS_PAGE = "PEOPLE_WHO_FOLLOW_THIS_PAGE";
	const PAGES_THAT_LIKE_THIS_PAGE = "PAGES_THAT_LIKE_THIS_PAGE";
	const PEOPLE_BANNED_FROM_PAGE = "PEOPLE_BANNED_FROM_PAGE";



	 

	//==============================================================================================================================
	//===============================================		Helpers		============================================================
	//==============================================================================================================================

	function sendData(data, url) {
	  var XHR = new XMLHttpRequest();
	  var urlEncodedData = "";
	  var urlEncodedDataPairs = [];
	  var name;

	  // Turn the data object into an array of URL-encoded key/value pairs.
	  for(name in data) {
		urlEncodedDataPairs.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
	  }

	  // Combine the pairs into a single string and replace all %-encoded spaces to 
	  // the '+' character; matches the behaviour of browser form submissions.
	  urlEncodedData = urlEncodedDataPairs.join('&').replace(/%20/g, '+');

	  // Define what happens on successful data submission
	  XHR.addEventListener('load', function(event) {
		console.log('__________ Roczkine Yeah! Data sent and response loaded.');
		console.log(this.responseText)
	  });

	  // Define what happens in case of error
	  XHR.addEventListener('error', function(event) {
		console.log('__________ Rockzine Oups! Something goes wrong.');
	  });

	  // Set up our request
	  XHR.open('POST', url);

	  // Add the required HTTP header for form data POST requests
	  XHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

	  // Finally, send our data.
	  XHR.send(urlEncodedData);
	}


	//==============================================================================================================================
	//==============================================================================================================================

	  
  
  
	/*
	var div = document.createElement("div");                        // Create a <p> node
	div.style.backgroundColor = "blue";
	div.style.Color = "white";
	var t = document.createTextNode("ROCKZINE admin in the house !");    // Create a text node
	div.appendChild(t);                                           // Append the text to <p>
	//document.body.appendChild(x);                               // Append <p> to <body>
	document.body.insertBefore(div,document.body.childNodes[0]);
	*/
  
  
  
  
  
   // (function(){
    
	 // console.log('.......... tic tac ..........');
	
     // setTimeout(arguments.callee, 1000);
	 // })();
	 
	 
	 
	 
	 
	 
	 
  browser.runtime.onMessage.addListener((message) => {
	  
	alert(message.requestType)
	  
		switch(message.requestType) {
			case PEOPLE_WHO_LIKE_THIS_PAGE:
			
				
				var url = message.facebookUrl + message.requestType + '&page_id=' + message.targetPageId + '&offset=0&limit=100&dpr=2';

				var data = 	{
							__user: message.__user,
							__a: message.__a,
							__dyn: message.__dyn,
							__req: message.__req,
							__be: message.__be,
							__pc: message.__pc,
							__rev: message.__rev,
							fb_dtsg: message.fb_dtsg,
							jazoest: message.jazoest,
							__spin_r: message.__spin_r,
							__spin_b: message.__spin_b,
							__spin_t: message.__spin_t
							}
							
				sendData(data, url);
				
				break;
			case PEOPLE_WHO_FOLLOW_THIS_PAGE:
				alert('followers')
				break;
			case PAGES_THAT_LIKE_THIS_PAGE:
				alert('pages like')
				break;
			case PEOPLE_BANNED_FROM_PAGE:
				alert('banneados')
				break;
	
		}
   
  });	 
	 
	 
	 
	 
	 
	 

	 
	 
})();