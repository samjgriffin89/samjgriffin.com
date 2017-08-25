---
layout: post
title:  "Adding a Media Item to the Sitecore Media Library"
date:   2012-12-21
tags: .NET, C#
abstract: To upload a file to the Sitecore media library is a fairly simple task. There are three things you need to have.
---
To upload a file to the Sitecore media library is a fairly simple task. There are three things you need to have: the file path to the file you want to upload, the target path in Sitecore where you want the item to live, and the database you want to upload it to. To do this, you can put together a function, let's call it UploadFile:

{% highlight C# %}
private string UploadFile(string file_path, string target_path, Database db) {

     using (new SecurityDisabler()) {
          MediaCreatorOptions mco = new MediaCreatorOptions();
          mco.Database = db;
          mco.Language = Sitecore.Context.Language;
          mco.Versioned = false;
          mco.Destination = target_path;

          //now create the media item
          MediaCreator creator = new MediaCreator();
          MediaItem mediaItem = creator.CreateFromFile(file_path, mco);
     }
     return mediaItem.ID.ToString();
}
{% endhighlight %}

Let's step through this function line by line to make sure you fully understand what is going on here. First you may note the **SecurityDisabler**. This is to get around any pesky security issues that Sitecore may throw your way. One of the most important steps is setting up the **MediaCreatorOptions**. This is where you will set the database you want the item to go in, the destination of the item (item path), and other options like language or it if will be versioned or not.

It is important to note that if you are setting the Database option to the web database, you will need to clear the Sitecore cache in order to see the items in the tree. Normally when you publish an item from the master to web, the cache is automatically cleared; however, since you will be directly creating the item in the web database, you by-pass the cache clearing the publish action normally triggers.

If you do not know how to clear the Sitecore cache, simply go to this page: *http://(your-host-name)/sitecore/admin/cache.aspx* and login with your credentials. You will be given a display with the current cache information and two buttons at the top. Click on the "clear" button, which as you suspected, clears the cache.

Anyway, back to creating a media item. The next step is to create and instance of the **MediaCreator**, which is what we need to actually create the media item from the file. All you need to do is pass it the full file path of the file you are uploading and the media creator options and it will return your new media item.

Happy coding!