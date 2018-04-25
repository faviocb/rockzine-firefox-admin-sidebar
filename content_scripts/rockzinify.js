(function () {

	/**
	 * Check and set a global guard variable.
	 * If this content script is injected into the same page again,
	 * it will do nothing next time.
	 */
	if (window.hasRun) {
		return;
	}
	window.hasRun = true;

	console.info('__________ Rockzine :) 		$$$$$$$$$$ rockzinifying now $$$$$$$$$$');


	//==============================================================================================================================
	//===============================================		Helpers		============================================================
	//==============================================================================================================================

	function sendData(data, url) {

		return new Promise(function (resolve, reject) {

			var XHR = new XMLHttpRequest();
			var urlEncodedData = "";
			var urlEncodedDataPairs = [];
			var name;

			// Turn the data object into an array of URL-encoded key/value pairs.
			for (name in data) {
				urlEncodedDataPairs.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
			}

			// Combine the pairs into a single string and replace all %-encoded spaces to 
			// the '+' character; matches the behaviour of browser form submissions.
			urlEncodedData = urlEncodedDataPairs.join('&').replace(/%20/g, '+');

			// Define what happens on successful data submission
			XHR.addEventListener('load', function (event) {

				if (this.status == 200) {
					resolve(this.response);					// Success :)
				}
				else {
					reject({
						errorStatus: this.status,
						errorStatusText: this.statusText,
						errorText: this.responseText,
						targetUrl: url
					});										// Failure returned by Server :(
				}
			});

			// Define what happens in case of error
			XHR.addEventListener('error', function (event) {

				reject({
					errorStatus: -1,
					errorStatusText: '',
					errorText: 'An error ocurred when trying to send data to server',
					targetUrl: url
				});											// Failure, God knows why :(
			});

			// Set up our request
			XHR.open('POST', url);

			// Add the required HTTP header for form data POST requests
			XHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

			// Finally, send our data.
			XHR.send(urlEncodedData);


		});

	}

	//==============================================================================================================================
	//==============================================================================================================================


	browser.runtime.onMessage.addListener((message) => {

		return new Promise(function (resolve, reject) {

			var url = message.facebookUrl + message.requestType + '&page_id=' + message.targetPageId + '&offset=0&limit=100&dpr=2';

			var data = {
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

			var facebookRequestPromise = sendData(data, url);

			facebookRequestPromise
				.then(function (response) {
					console.info('__________ Rockzine :) 	datos obtenidos de facebook con exito.');
					resolve(response)

				})
				.catch(function (err) {
					console.info('__________ Rockzine :( 	error al tratar de obtener datos de facebook');
					reject(new Error(JSON.stringify(err)))
				});

		});

	});

})();
