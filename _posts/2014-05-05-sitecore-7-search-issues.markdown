---
layout: post
title:  "Sitecore 7 Search Issues"
subtitle: "LINQ query against empty string"
date:   2014-05-05
tags: SQL
abstract: Issues performing Lucene searching in Sitecore 7.
---
I was working on a Sitecore 7 project, version 7.0 rev. 130424, and was trying to do a empty string compare using Sitecore's search LINQ to Lucene queries. The query was relatively simple and looked like this:

{% highlight C# %}
using (var context = ContentSearchManager.GetIndex(index).CreateSearchContext())
{
    enumerable = context.GetQueryable<RedirectSearchResult>().Where(i => !i.RedirectUrlExtension.Equals(string.Empty))                                                                                                                                         
                                                             .Select(i => i.GetItem());
               ...
}
{% endhighlight %}

After working with Sitecore Support, I found out that the only way to perform the search, which is how I was getting results initially, was to move the string comparison outside of the LINQ to Lucene query and put it in a foreach loop, like so:

{% highlight C# %}
 var index = Sitecore.ContentSearch.ContentSearchManager.GetIndex("sitecore_master_index");
 using (var context = index.CreateSearchContext())
 {
     enumerable = context.GetQueryable<RedirectSearchResult>();
     foreach (var r in enumerable) // Check the "redirecturlextension" field value outside the query.
     {
         if (r.RedirectUrlExtension == string.Empty)
         {
         ....
         } 
      .....
     }
 }
{% endhighlight %}

According to Support, this issue was resolved starting from Sitecore 7.0 Update 3 (rev. 131127), where you may use the query as follows:

{% highlight C# %}
IQueryable<RedirectSearchResult> enumerable = context.GetQueryable<RedirectSearchResult>().Where(d => d.TemplateName == "testTemplate" && d["Redirect Url Extension"] == "");
To resolve this issue, I needed to upgrade my Sitecore instance to Update-4. Here are the relevant Release Notes on SDN (http://sdn.sitecore.net/Products/Sitecore%20V5/Sitecore%20CMS%207/ReleaseNotes/ChangeLog.aspx)
{% endhighlight %}

Furthermore, starting from Update-3 you might see a different set of results returned when using Contains, StartsWith, EndsWith, Equals, Like, and MatchWildcard Linq operators.

Also, the EndsWith() operator now requires the specified field to be stored in the index with termvector offsets.