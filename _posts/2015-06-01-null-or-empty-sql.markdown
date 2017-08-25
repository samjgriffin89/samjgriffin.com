---
layout: post
title:  "How to check if a string is null or empty in SQL Server"
date:   2015-06-01
tags: SQL
abstract: The most elegant and simple solution I have come across to check if a string is null or empty in SQL
---
The most elegant and simple solution I have come across and use is:

{% highlight sql %}
SELECT 
  ISNULL(NULLIF(VALUE_TO_CHECK, ''), FAILED_VALUE) AS [Your Alias]
FROM ...
{% endhighlight %}

VALUE_TO_CHECK is used if the string is not null or empty and the FAILED_VALUE is used if it is.