---
layout: post
title:  "NuGet Add Reference Error While Installing Package"
subtitle: "Package requires NuGet client version 'x.x.x'"
date:   2016-10-23
tags: Visual Studio, NuGet
abstract: One quick thing to check is that your NuGet Visual Studio Extension (Tools > Extenstions and Update) is up to date.
---
One quick thing to check is that your NuGet Visual Studio Extension (Tools > Extenstions and Update) is up to date.

However, it probably is up to date and is not the cause of the issue. For me, the error persisted despite having an up to date extension. Just because your extension is up to date, does **NOT** mean that your nuget.exe inside the solution is. Even when you explicitly update NuGet inside VS, the solution's copy stays old.

Go into the .nuget folder and do: 
{% highlight bash %}
nuget.exe update -self.
{% endhighlight %}