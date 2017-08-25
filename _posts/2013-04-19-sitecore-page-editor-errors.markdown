---
layout: post
title:  "Sitecore Page Editor Errors"
subtitle: "Null Object Reference"
date:   2013-04-19
tags: Sitecore, .NET, C#
abstract: An issue with Sitecore's Page Editor where the entire header section was throwing a null reference exception.
---
Recently I ran into an issue with Sitecore's Page Editor where the entire header section was throwing a null reference exception. Now that makes it hard to do pretty much anything in Page Editor. When I dug into the issue, this was the error being thrown:

![WebEdit.Commands.OpenMyItems.GetHeader Null Exception](/images/blog/page-editor-header-issue.png "WebEdit.Commands.OpenMyItems.GetHeader Null Exception")

This clue lead me to the Sitecore.Client.dll and straight to the GetHeader function where the actual query for the locked items was being called:

![Sitecore.Client GetHeaders Method](/images/blog/sitecore.client-ilspy-view.png "Sitecore.Client GetHeaders Method")

Now when I looked further into the *ShowNumberOfLockedItemsOnButton* property, I noticed that it, by default, returned true. When I went and looked in my web.config and patch configs, the Sitecore setting wasn't there! So to prevent the query from running I added the setting to my web.config (or if you wanted to abstract it and keep you web.config cleaner, you could create a Sitecore patch config file for it).

{% highlight xml %}
<sitecore>
   <settings>
      <setting name="WebEdit.ShowNumberOfLockedItemsOnButton" value="false" />
   </settings>
</sitecore>
{% endhighlight %}

Once I added that Sitecore setting, the error no longer appeared and Page Editor returned to its normal functionality. Happy Coding!