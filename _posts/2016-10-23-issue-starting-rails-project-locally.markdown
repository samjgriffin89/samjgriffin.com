---
layout: post
title:  "Issue Starting Rails Project Locally"
subtitle: "A Server is already running"
date:   2016-10-23
categories: Rails
abstract: Recently ran into an issue where I was getting an error starting a rails project locally after my terminal crashed.
---
Recently ran into an issue where I was getting an error starting a rails project locally after my terminal crashed.

A server is already running. Check /Users/{username}/Documents/dev/{your-project}/tmp/pids/server.pid. Exiting. Easy quick solution to kill the existing process

{% highlight bash %}
kill -9 $(lsof -i tcp:3000 -t)
{% endhighlight %}

Happy coding!