---
layout: post
title:  "Issue starting Apache Service on Windows"
date:   2012-05-18
tags: Apache, IIS, Windows
abstract: Here are a couple fixes for when you run into issues running apache and IIS concurrently.
---
I have been happily running Apache locally and today decided to also install Internet Information Services (IIS). So I stopped the Apache Service in order to test that I successfully installed IIS and when I tried to start my Apache Service again, I got this issue: 

> Windows could not start the Apache2.2 on Local Computer. For more 
information, review the System Event Log. If this is a non-Microsoft 
service, contact the service vendor, and refer to service-specific error
code 1

So after seeing this, I figured that there must be another process using port 80. In order to track down who is using the port, I went to the command prompt. To see all the diferent active connections, just type: 

{% highlight bash %}
netstat -ao -p tcp
{% endhighlight %}

This let me know that it was *PID 4* that was using the port. After doing a quick search, I found this [blog post][blog-post] on Stackoverflow. Thanks to infocyde's response, I figured out that Server Reporting Services (MSSQLSERVER) was the issue. Once I stopped the service, I was able to successfully start the Apache Service again. Hopefully this will help some people with having both IIS and Apache locally. Here is the link that initially tipped me off: [Stackoverflow Post][stack-post]

[blog-post]: http://stackoverflow.com/questions/1430141/port-80-is-being-used-by-system-pid-4-what-is-that
[stack-post]: http://stackoverflow.com/questions/195641/windows-could-not-start-the-apache2-on-local-computer-problem