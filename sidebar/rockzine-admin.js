const FACEBOOK_URL = "https://www.facebook.com/pages/admin/people_and_other_pages/entquery/?query_edge_key=";

const PEOPLE_WHO_LIKE_THIS_PAGE = "PEOPLE_WHO_LIKE_THIS_PAGE";
const PEOPLE_WHO_FOLLOW_THIS_PAGE = "PEOPLE_WHO_FOLLOW_THIS_PAGE";
const PAGES_THAT_LIKE_THIS_PAGE = "PAGES_THAT_LIKE_THIS_PAGE";
const PEOPLE_BANNED_FROM_PAGE = "PEOPLE_BANNED_FROM_PAGE";

const ZONAJOVEN_PAGE_ID = 165113237807;

var flagFacebookParametersCaptured = false;


//==================================================================================================

function reportErrorBeforeImport(error) {
	console.info('98) __________ Rockzine :(		error before connecting to Facebook page');
	console.info(error);
}

function reportImportError(error) {
	console.info('97) __________ Rockzine :(		error getting data from Facebook');
	console.info(error);
}

function reportImportSuccess(result) {
	console.info('04) __________ Rockzine :)		Success getting data from Facebook');
	console.info(result);
}

//==================================================================================================

function ImportAndSave(usersPool, formData){

	browser.tabs.query({ active: true, currentWindow: true })
	.then(
		(tabs) => {
			browser.tabs.sendMessage(tabs[0].id, {
				requestType: usersPool,
				targetPageId: ZONAJOVEN_PAGE_ID,
				facebookUrl: FACEBOOK_URL,

				__a: formData.__a[0],
				__be: formData.__be[0],
				__dyn: formData.__dyn[0],
				__pc: formData.__pc[0],
				__req: formData.__req[0],
				__rev: formData.__rev[0],
				__spin_b: formData.__spin_b[0],
				__spin_r: formData.__spin_r[0],
				__spin_t: formData.__spin_t[0],
				__user: formData.__user[0],
				fb_dtsg: formData.fb_dtsg[0],
				jazoest: formData.jazoest[0]

			})
				.then(reportImportSuccess)
				.catch(reportImportError);
		}
	)
	.catch(reportErrorBeforeImport);
}

//==================================================================================================

function captureFacebookParameters(e) {

	if (!flagFacebookParametersCaptured) 
	{
		if (	e.url.includes(FACEBOOK_URL + PEOPLE_WHO_LIKE_THIS_PAGE) ||
				e.url.includes(FACEBOOK_URL + PEOPLE_WHO_FOLLOW_THIS_PAGE) ||
				e.url.includes(FACEBOOK_URL + PAGES_THAT_LIKE_THIS_PAGE) ||
				e.url.includes(FACEBOOK_URL + PEOPLE_BANNED_FROM_PAGE)
			) 
		{

			flagFacebookParametersCaptured = true;

			console.info('03) __________ Rockzine :)	Facebook parameters captured!');

			var formData = e.requestBody.formData;

			ImportAndSave(PEOPLE_WHO_LIKE_THIS_PAGE, formData);
			// ImportAndSave(PEOPLE_WHO_FOLLOW_THIS_PAGE, formData);
			// ImportAndSave(PAGES_THAT_LIKE_THIS_PAGE, formData);
			// ImportAndSave(PEOPLE_BANNED_FROM_PAGE, formData);

		}
	}

}

function listenForEvents() {

	console.info('02) __________ Rockzine :)	Listening');

	browser.webRequest.onBeforeRequest.addListener(
		captureFacebookParameters,
		{ urls: ["<all_urls>"] },
		["blocking", "requestBody"]
	);

}






function reportExecuteScriptError(error) {

	document.querySelector("#sidebar-content").classList.add("hidden");
	document.querySelector("#error-content").classList.remove("hidden");

	console.info(`99) __________ Rockzine :( 		Error al rockzinify: ${error.message}`);
}



console.info('01) __________ Rockzine :)	Begin');


browser.tabs.executeScript({ file: "/content_scripts/rockzinify.js" })
	.then(listenForEvents, reportExecuteScriptError)

