---
layout: post
title:  "Adding Delete Children to Context Menu in Sitecore"
date:   2013-03-05
tags: Sitecore
abstract: Adding "delete children" functionality to the Sitecore Context Menu using Sitecore commands.
---
Sometimes when I am cleaning up a Sitecore tree, I think to myself, "Wouldn't it be nice to remove all these children without having to delete this parent item?" Although there is the option to do this using the ribbon under the Home node, I prefer using the context menu since I am not always on the Home node and, mainly, I like customizing Sitecore to fit my personal preferences. Well there is an easy way to add that option to the Sitecore context menu using default functionality built into the Sitecore shell framework.

To start you will want to go into the Core database and go to the default context menu, which is here: */sitecore/content/Applications/Content Editor/Context Menues/Default*. Once you are there, find the delete option and copy it to the same location. You can order it however you like - I personally put it next to the current delete option for ease of use. Once you do that your tree should look like this:

<p class="center">
   <img src="/images/blog/delete-children.png" alt="Delete Children Context Menu Option" title="Delete Children Context Menu Option">
</p>

The important update to this item happens on the **Message** field. You will change it from the current delete action to the deletechildren action, so the field will end up looking like this: *item:deletechildren(id=$Target)*

By doing this we are now mapping this action to a predefined command in your command.config file. As you can see in the image below, you are using functionality that is already built into the framework.

<p class="center">
   <img src="/images/blog/commands.png" alt="Command.config" title="Command.config">
</p>

Now that you have linked up the command to the context menu action, if you go back into your master database and right-click on an item, you will see your new addition to the menu.

<p class="center">
   <img src="/images/blog/delete-children-menu.png" alt="Delete Children Menu Option" title="Delete Children Menu Option">
</p>

When you click it, you will be prompted just like a normal delete but with the number of children you will be deleting. Click OK and watch the children of that item disappear!