---
layout: post
title:  "Deleting a Branch with Git"
date:   2016-10-23
tags: Git
abstract: If you want need to delete your remote branch using Git, you can write it out fully or shorthand.
---
If you want need to delete your remote branch using Git, you can write it out fully: 

{% highlight bash %}
git push origin --delete {branchName} 
{% endhighlight %}

Or you can use the shorthand: 

{% highlight bash %}
git push origin :{branchName}
{% endhighlight %}