---
layout : post
title :  Ostosnero development blog 02 - Character Encoding Redux & SQL functions
categories : [blog]
---


##Character Encoding: Redux

Character encoding reared its ugly head again soon after my last apparent fix,
only to not be fixed at all in any way. I was forced to abandon my efforts to fix
it to focus attention on more pressing issues so it remained in the shadows,
though a persisting pain in my neck.
<!--more-->

However, due to increasing need for this to be a
resolved issue–namely the need for a website aimed at a
Finnish user-base who would expect accented characters to work flawlessly–I
resumed my efforts to fix this issue. After some time Googling the issues related
to UTF-8 encoding–of which there are many–I came upon the realization that not only
does the server need to be encoded properly, as well as each table in the database
(and each column within each of these) and the html charset, the very program used
to edit the files, or at least initially save them, must be set to the correct encoding as well.

While I was assured, again, that this was the solution I needed,
it wasn’t immediately the case. I was at a loss, I had simply ran out of things
that could influence the character encoding. There simply weren’t any more parties
that could be at fault, unless my computer itself was wrongly encoding everything, or
the planets were not correctly aligned. It was at this point that I was contemplating running
many longwinded and tedious test using different character sets at various levels in my system, though thankfully
this wasn’t required as divine intervention occurred. It seemed I simply needed to essentially re-build the files that were at fault. For the MySQL database, this meant backing the database contents up and dropping the whole thing, and re-importing it with UTF-8 set to default. Next, I needed to “re-build” my static content in the HTML by copying the content of the files and deleting the whole thing, then recreating it under UTF-8 encoding. The original content was pasted back in and saved as the original file name.

At last! Not only did the server return correct content, the static content was displaying the characters correctly and the various forms (bar one, much to my frustration) were sending the right content to the server, which was receiving it correctly.

##A Revelation in the Sorting Algorithm

This issue almost caused permanent brain damage and/or destruction of property due to it constantly failing at every corner. Either it be from my overestimating of the abilities of PHP, or an inability to comprehend the required logic. It all seemed so simple, just sort a few numbers, but it turned into a nightmare.

After all else failed, I came across something which pulled me from the abbess of frustration. To output a sorted value in MySQL was, as it turned out, very simple. Using the min() or max() functions in the SELECT region of the query, combined with grouping the outputted rows using a particular column, I could select the lowest price attached to each product.

Using min(table.column) along with GROUP BY anotherTable.column, an entire function was rendered redundant. This greatly simplified the logic of the whole thing and, much to my liking, made the whole thing much easier to comprehend.

After some testing it appears to work, though with only limited data in the database it remains unclear as to how effective it truly is.
