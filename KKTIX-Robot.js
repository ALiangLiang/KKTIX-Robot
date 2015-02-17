var m = setInterval(function () {
	var xhr = new XMLHttpRequest;
	xhr.open("GET", "https://kktix.com/g/events/sitcon2015/base_info");
	xhr.onload = function () {
		var a = JSON.parse(xhr.responseText)["eventData"]["tickets"];
		if (a[0]["available_capacity"] != 0 || a[1]["available_capacity"] != 0) {
			var getLocation = function (href) {
				var l = document.createElement("a");
				l.href = href;
				return l;
			};

			var ticket = {
				"tickets" : [{
						"id" : (a[0]["available_capacity"] != 0) ? a[0]["id"] : a[1]["id"],
						"quantity" : 1
					}
				],
				"currency" : "TWD",
				"recaptcha" : {
					"responseField" : document.getElementById("recaptcha_response_field").value,
					"responseChallenge" : getLocation(document.querySelector("head > script:nth-child(32)").src).search.split("&")[0].slice(3)
				},
				"agreeTerm" : true
			};

			var xhr2 = new XMLHttpRequest;
			xhr2.open("POST", "https://kktix.com/g/events/sitcon2015/registrations");
			xhr2.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
			xhr2.onload = function () {
        location.href = "https://kktix.com/events/sitcon2015/registrations/" + JSON.parse(xhr2.responseText)["to_param"];
      };
			xhr2.send(ticket);
		} else {
			console.log("NO")
		}
	}
	xhr.send();
}, 1000)
