---
layout: post
title:  "Concatenate column values into a single string text row in SQL"
date:   2015-06-01
tags: SQL
abstract: Using SQL's XML PATH method to Concatenate column values into a single string text row.
---
Recently I was working on a SQL script that would pull values for a one-to-many relationship when joining two tables. Rather than having the many row values map to the identifier multiple times, it needed to be formated so there was a single row identifier with a pipe delimited list of the values. So we start with this with:


| Identifier | | | | | Values |
| 1 | | | | | Value1 |
| 1 | | | | | Value2 |
| 1 | | | | | Value3 |
| 2 | | | | | Value4 |
| 2 | | | | | Value5 |

And we will end up with:

|Identifier | | | | | Values|
|----------|------|
|1| | | | | Value1, Value2, Value3|
|2| | | | | Value4, Value5|

In order to do that, we are going to select the value we want with the delimiter and use SQL's XML PATH method to combine the rows together from the two tables

{% highlight sql %}
SELECT DISTINCT Identifier,
		substring(
			(
				SELECT '|' + YT1.Value AS [text()]
				FROM [dbo].[YourTable2] YT2
				WHERE YT1.Identifier = YT2.Identifier
				ORDER BY YT1.Identifier
				FOR XML PATH(''), TYPE
			).value('.[1]', 'VARCHAR(MAX)'), 
		2, 1000) AS Values
		FROM [dbo].[YourTable1] YT1
{% endhighlight %}

It is important to note the **.value('.[1]', 'VARCHAR(MAX)')** because that is what will perform the XML encoding and allow for special characters such as &, <, and >.