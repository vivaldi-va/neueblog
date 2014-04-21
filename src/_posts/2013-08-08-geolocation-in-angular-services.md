---
layout: post
title: Using promises to return geopositioning data from an angular service
categories: ['blog']
---

Due to an issue with the way angular handles dom changes, there is an interesting problem when
attempting to send a position object from an angular service using a deferred promise.
If you treated the geolocation API as an asynchronous function&mdash;which it is in practice&mdash;and
used the $q service to return a deferred promise from an angular service, nothing will happen when you
enact the .then() method in your controller.

<!--more-->

If one were to use the geolocation functions within a controller, and is not intending to use the callback directly to handle the returned information – which in my opinion is the right way to do it –  one must use the $apply method, which is a method within the $scope service, to let angular know that the information has actually been retrieved from the API.

However, since you can not use $scope within a service, you must use $rootScope instead, then use $apply from that.

e.g.


{% highlight javascript %}
	navigator.geolocation.getCurrentLocation(
		function(position) {
			$rootScope.$apply(function(){
				deferred.resolve(position);
			});
		}
	);
{% endhighlight %}