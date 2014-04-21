---
layout : post
title :  Global Scope. Sharing data between controllers in Angular with services
categories : [blog]
---

Services in Angular are intended to be injected into controllers, the ``$scope`` and ``$http`` services are examples of this, and are very powerful and exceptionally useful things when it comes to making larger-scale applications using the framework. Essentially, they work by 'injecting' a collection of functions into a controller to be used when required, which makes for neater and DRYer code over all. Yet, it's not only functions that can be injected in this way, but also static objects. Basically you can have variables in there too which can be referred to and used in exactly the same way as you'd use functions. The advantage with using variables, for lack of a better description, in services is that their scope transcends that of the controller you inject them into. Hence, you can define a variable that can have a 'global' scope within your application.

<!--more-->

First, lets look at creating an angular service. A service is created thusly:

{% highlight javascript %}
var app = angular.module(fooBar', []);
    app.factory('myService', function() {
        return: {
                myFunction: function(foo) {
                	return foo + " bar";
				},
            anotherFunction: function(hello) {
                return hello + " world";
            }
        };
    });
{% endhighlight %}

as you can see, it's simply an array of functions. you can have as many as you please, all of which work exactly the same as you would typically use a function. You inject your newly made service into your controller as follows:

{% highlight javascript %}
app.controller('FooCtrl', function($scope, myService) {
		console.log(myService.myFunction('hello'));
	});
{% endhighlight %}


Simple!

However, now it gets interesting. You can defined a variable, so to speak, in exactly the same way you define a function. only without the function part. Basically just create an associative array instead of a function. It can have as much or as little data as you'd like. Such as:

{% highlight javascript %}
app.factory('myService', function() {
		return: {
			myFunction: function(foo) {
				return foo + " bar";
            },
            anotherFunction: function(hello) {
                return hello + " world";
            },
            aVariable: {
                foo: 'bar',
                hello: 'world
            },
            anotherVariable: 9001
        }
	});
{% endhighlight %}

You can refer to these variables as you would the functions. Just use the JSON style dot notation.


{% highlight javascript %}
app.controller("FooCtrl", function($scope, myService) {
		console.log(myService.myFunction('hello'));
		console.log("hello " + myService.aVaraible.hello);
		console.log(myService.anotherVariable);
	});
{% endhighlight %}

You can re-define them, add to them and modify their values as you would any other JSON array, or similar get-up. It serves as an effective and efficient way to share information around your app during run-time. An example usage that I have found most effective is populating them during an init phase from a value stored in localStorage, and syncing the two as they're altered. This itself gives good data-loss protection upon the event of a need to reload the page, whereby the information in the service is restored to its initial values. In any case, it has various uses, without you having to resort to the ``$rootScope``.

