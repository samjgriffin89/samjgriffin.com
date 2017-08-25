---
layout: post
title:  "Sitecore Item Date Modified Query"
date:   2013-10-01
tags: Sitecore
abstract: A simple query to get all the Sitecore items by modified date.
---
Recently I have gotten tired of trying to remember all the items I have updated and templates I have changed when I am trying to create a package, so I thought, why not use a Sitecore query to find all those items. By targeting the standard 'Updated' field, we can easily get all the items we have touch within a time frame:

{% highlight Sitecore %}
/sitecore/content/path/to/topnode/*[@__Updated >= '20130905T000000' and @__Updated < '20130911T000000']
{% endhighlight %}

I am just running this query in the Developer Center using the XPath builder and it gives me a quick and organize view of all the items I have touched between the two dates 09-05-2013 and 09-11-2013.