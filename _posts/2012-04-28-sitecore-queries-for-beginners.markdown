---
layout: post
title:  "Sitecore Queries for Beginners"
date:   2012-04-28
tags: Sitecore
abstract: Just starting out developing using Sitecore? Here are some super basic queries and facts to get you started.
---
Hi everyone. So I'm here to talk a bit about Sitecore queries, filtering, and best practices. Let's assume that we have a basic tree that looks something like this:

<p class="center">
   <img src="/images/blog/sample-tree.png" alt="sample tree" title="Sample Tree">
</p>

So let's review first how to query an item in the Sitecore tree. All you will be doing is querying the path of the item. For example, let's get the Blizzard video game item:

{% highlight Sitecore %}
"query:/sitecore/content/Home/Products/Video Games/Blizzard"
{% endhighlight %}

That's it, very easy. Now if you wanted to get all of the video game items you can get the children of an item like this:

{% highlight Sitecore %}
"query:/sitecore/content/Home/Products/Video Games/*"
{% endhighlight %}

The /* means to get all the children of the target item. Additionally we can get all of the descendants of the item by doing //*, however, this will be a significantly slower query and should be avoided if possible. Now you must be thinking, if I can get all the children, and even the descendants, there must be a way I can filter through all of the data. Well there is. There are two ways to filter items when using a Sitecore query: by attribute and by field.

Let's talk about how to filter by attribute first. There are a number of attributes that you can filter items by. Here is a list of some that might help you out:

{% highlight text %}
  @@name
  @@key
  @@id
  @@templateid
  @@tempaltename
  @@templatekey
  @@masterid
  @@parentid
{% endhighlight %}

So you're probably wondering what that @@ is on the front. That tells the Sitecore query that you will be filtering by an attribute. So how does this query actually look? Here is what a basic query filtering by attribute could look like (using our example tree from above):

{% highlight Sitecore %}
"query:/sitecore/content/Home/Products/Video Games/*[@@name == 'Blizzard']
{% endhighlight %}

Pretty simple. If you want more complex filtering, you can add in AND or OR statements to include or exclude items in the tree. Now that we understand filtering by attribute, let's talk about filtering by field.

If you thought filtering by attribute was easy, then you will like filtering by field because it is the same idea. Instead of filtering by the attribute, we will be using the fields of the particular item. So let's say our product template has a field, price. So we want to filter for items that have the price of $10. We would use the price field, @price, like so:

{% highlight Sitecore %}
"query:/sitecore/content/Home/Products/Video Games/*[@price == '10']
{% endhighlight %}

This will search all the items under the video game node and find all the items with the price field set to 10. Now this is pretty precious, so if we want to be more general with our search, we can use wildcard filtering on item fields like so:

{% highlight Sitecore %}
"query:/sitecore/content/Home/Products/Video Games/*[@title == '%basketball%']
{% endhighlight %}

By surrounding the keyword, basketball, with % signs, we are telling Sitecore to find all the items under the video game node with the title field containing the word basketball.

So that's all about querying for now. Before I leave you, here are some best practices to use when implementing Sitecore queries:

## Query Approach
{% highlight text %}
Sitecore Query: 100 Items or less
Fast Query: 1000 Items or less
Lucene Search: 1000+ Items
{% endhighlight %}

Now I know we haven't covered fast queries or Lucene search. That will have to wait until next time.Until then, I hope this was helpful, and stay tuned for more beginner tips as well as more advanced topics.