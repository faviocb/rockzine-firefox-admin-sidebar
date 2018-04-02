const FACEBOOK_URL = "https://www.facebook.com/pages/admin/people_and_other_pages/entquery/?query_edge_key=";

const PEOPLE_WHO_LIKE_THIS_PAGE = "PEOPLE_WHO_LIKE_THIS_PAGE";
const PEOPLE_WHO_FOLLOW_THIS_PAGE = "PEOPLE_WHO_FOLLOW_THIS_PAGE";
const PAGES_THAT_LIKE_THIS_PAGE = "PAGES_THAT_LIKE_THIS_PAGE";
const PEOPLE_BANNED_FROM_PAGE = "PEOPLE_BANNED_FROM_PAGE";

const ZONAJOVEN_PAGE_ID = 165113237807;

var flagPEOPLE_WHO_LIKE_THIS_PAGE = false;
var flagPEOPLE_WHO_FOLLOW_THIS_PAGE = false;
var flagPAGES_THAT_LIKE_THIS_PAGE = false;
var flagPEOPLE_BANNED_FROM_PAGE = false;





    function reportErrorExport(error) {
      console.log(`Could not Export: ${error}`);
    }

	function captureFacebookParameters(e) {
		
		//console.log(e);
		

		if(!flagPEOPLE_WHO_LIKE_THIS_PAGE){
			if(e.url.includes(FACEBOOK_URL + PEOPLE_WHO_LIKE_THIS_PAGE )){
				flagPEOPLE_WHO_LIKE_THIS_PAGE = true;
				console.log('=====> ' + PEOPLE_WHO_LIKE_THIS_PAGE) ;
				//Export(PEOPLE_WHO_LIKE_THIS_PAGE);
				
				console.log(e);
				
				
				var formData = e.requestBody.formData;
				
				browser.tabs.query({active: true, currentWindow: true})
						  .then(
							  (tabs) => {
								          browser.tabs.sendMessage(tabs[0].id, {
											  requestType: PEOPLE_WHO_LIKE_THIS_PAGE,
											  targetPageId :ZONAJOVEN_PAGE_ID,
											  facebookUrl: FACEBOOK_URL,
											  
											  __a : formData.__a[0],
											  __be : formData.__be[0],
											  __dyn : formData.__dyn[0],
											  __pc : formData.__pc[0],
											  __req : formData.__req[0],
											  __rev : formData.__rev[0],
											  __spin_b : formData.__spin_b[0],
											  __spin_r : formData.__spin_r[0],
											  __spin_t : formData.__spin_t[0],
											  __user : formData.__user[0],
											  fb_dtsg : formData.fb_dtsg[0],
											  jazoest : formData.jazoest[0]											  
											  
											});
								}
						  )
						.catch(reportErrorExport);				
				
				
			}
		}
		
		

		if(!flagPEOPLE_WHO_FOLLOW_THIS_PAGE){
			if(e.url.includes(FACEBOOK_URL + PEOPLE_WHO_FOLLOW_THIS_PAGE )){
				flagPEOPLE_WHO_FOLLOW_THIS_PAGE = true;
				console.log('=====> ' + PEOPLE_WHO_FOLLOW_THIS_PAGE) ;
				//Export(PEOPLE_WHO_FOLLOW_THIS_PAGE);
				
				browser.tabs.query({active: true, currentWindow: true})
						  .then(
							  (tabs) => {
								          browser.tabs.sendMessage(tabs[0].id, {
											  requestType: PEOPLE_WHO_FOLLOW_THIS_PAGE,
											});
								}
						  )
						.catch(reportErrorExport);								

						
			}
		}


		if(!flagPAGES_THAT_LIKE_THIS_PAGE){
			if(e.url.includes(FACEBOOK_URL + PAGES_THAT_LIKE_THIS_PAGE )){
				flagPAGES_THAT_LIKE_THIS_PAGE = true;
				console.log('=====> ' + PAGES_THAT_LIKE_THIS_PAGE) ;
				//Export(PAGES_THAT_LIKE_THIS_PAGE);
				
				browser.tabs.query({active: true, currentWindow: true})
						  .then(
							  (tabs) => {
								          browser.tabs.sendMessage(tabs[0].id, {
											  requestType: PAGES_THAT_LIKE_THIS_PAGE,
											});
								}
						  )
						.catch(reportErrorExport);							
						
			}
		}


		if(!flagPEOPLE_BANNED_FROM_PAGE){
			if(e.url.includes(FACEBOOK_URL + PEOPLE_BANNED_FROM_PAGE )){
				flagPEOPLE_BANNED_FROM_PAGE = true;
				console.log('=====> ' + PEOPLE_BANNED_FROM_PAGE) ;
				//Export(PEOPLE_BANNED_FROM_PAGE);
				
				browser.tabs.query({active: true, currentWindow: true})
						  .then(
							  (tabs) => {
								          browser.tabs.sendMessage(tabs[0].id, {
											  requestType: PEOPLE_BANNED_FROM_PAGE,
											});
								}
						  )
						.catch(reportErrorExport);							
						
			}
		}
		
		
	}

function listenForEvents() {
	
	
	
	console.log('02) __________ Listening');
	
	
	 browser.webRequest.onBeforeRequest.addListener(
	  captureFacebookParameters,
	  {urls: ["<all_urls>"]},
	  ["blocking", "requestBody"]
	);	

	//================================================================
}






function reportExecuteScriptError(error) {
	
  document.querySelector("#sidebar-content").classList.add("hidden");
  document.querySelector("#error-content").classList.remove("hidden");	
	
  console.log(`99) __________ Error al rockzinify: ${error.message}`);
}



console.log('01) __________ Begin');

 
browser.tabs.executeScript({file: "/content_scripts/rockzinify.js"})
 .then(listenForEvents, reportExecuteScriptError)


 
