---
layout: post
title: 'Avoiding mystery: Missing UX in password fields on mobile devices'
categories: ['blog']
---

Mobile keyboard interaction should be a process done as little as possible, when not writing for content such as a text message or the odd email. Keyboards on a mobile device, particularly phones and particularly touch interfaces at that, are clumsy affairs and are almost entirely dependant on the use of auto-correct in some form or another to return the intended result. Such a function is, however, not available in certain cases such as writing a url in the browser and perhaps most frustratingly in forms. Password inputs are by far the most irritating thing to have to deal with on a mobile device, and while lengthy cookie expiration times or applications retaining your login session indefinitely, they are still an unavoidable thing.
<!--more-->
Making mistakes with touch keyboard is common and expected, the issue is with a masked input is you can't see these mistakes until it’s too late, by which time a user is going to be huffing and puffing and generally unnecessarily frustrated by the experience. Yet while password forms are masked, this performs no added security function. It simply masks the text with another character to prevent prying eyes from grabbing your sensitive information. While this is indeed important, it is not necessary all the time, and by removing this mask you can ensure what you have blindly typed is actually correct, before you go and submit. Not only does this remove the rage of having to retype your password over and over, it gives a user a certain comfort.

Why not then add an ability to reveal your password, if only temporarily? One would only need a moment to check their password is correct before they hide it again. Or if they so choose, they can simply input it as visual text. It’s all dependant on their situation, which changes as they go from place to place. Even still, due to the size of a mobile screen, particularly a phone, it would require an onlooker to sport a camera with a telescopic lens to grab your sensitive information.

Adding this single feature to a login or sign-in form would be majorly beneficial. It has been for me in applications I have developed and now I can't help but fail to understand the lack of it anywhere else. Microsoft has indeed added such a function to password forms, both HTML and in-app and I think it works rather well.
