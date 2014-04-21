---
layout : post
title :  Ostosnero development blog 01

categories : [blog]
---


##utf-8 encoding and drama

After many hours of trouble, I have finally figured out the issue with encoding using UTF-8 Unicode on the HTML-rendered pages.
While the ISO Latin1 encoding worked partially, it only encoded static or pre-rendered content, not dynamic
content such as that added through AJAX. I troubleshooted this at various points, changing the collation in
the database to be uniform, first as latin1, then as Unicode.
<!--more-->

I then attempted to change the default encoding of the jQuery AJAX calls to latin1, again to no avail.
Finally, I stumbled across a Stack Overflow post saying it was a case of mis-encoding the information
on the database, and it was not being interpreted on the browser correctly no matter what I did. It would
seem that it is required that there be a universally, and initially, set form of encoding that will apply,
perhaps in the background, to all the text information stored in it. In any case, using

    mysql_set_charset("utf8");

seemed to fix it for all the text rendered thereafter. This also included the text sent via
POST or GET protocols, though this turned out to be a non-issue, as it was my own ineptitude
that did not realize it was being properly encoded though serialization and interpretation by the POST array in PHP.

##ajax loading animations

Loading a “spinner” as a gif or animated PNG, which I only recently learned existed, as the page loads, preloading with:

    $.fn.preload = function() {
                        this.each(function(){
                            $('')[0].src = this;
                        });
                    }

Used via:

	$(['./img/loading.png']).preload();

Then, use the .html() function (important so it overrides what ever residual content is in there from the last search)
in jQuery on the popup window or container you want to have stuff loaded in, insert the HTML for an image with the
animated image file as the src field. This will also act as an initial ‘show’ function. When the AJAX call is completed,
 put a call to hide (with optional fading) in the success function. It then shows the spinner until there is something
 returned from the PHP backend, or wherever it is calling to, after which it disappears.

##jquery effect chaining

Adding chains of methods on a single selector works to make complex effects.
Such as adding delay(value) before a fadeout(value) function, to delay the effect.
Also having the effects put one after the other, with delays and so forth delayed properly
creates intricate effects that make everything look a lot more visually appealing.
Such as, changing the plus icon to a tick, then fading the background to green to indicate
success, then fading the whole element out completely.
