---
layout: post
title:  "Request format is unrecognized for URL unexpectedly ending in [method]"
date:   2015-01-06
tags: .NET, C#
abstract: An easy configuration fix for the error, Request format is unrecognized for URL unexpectedly ending in [method]
---
Ever come across this error when making a web service call to a method?

*Request format is unrecognized for URL unexpectedly ending in /myMethodName*

Well, I recently ran into this issue and the fix is surprisingly simple. All you need to do is add the HttpGet and HttpPost protocols to the web.config.

{% highlight xml %}
<configuration>
    <system.web>
        <webServices>
            <protocols>
                <add name="HttpGet"/>
                <add name="HttpPost"/>
            </protocols>
        </webServices>
    </system.web>
</configuration>
{% endhighlight %}

Once you have added that to your section, you should be all good to go. Happy coding!