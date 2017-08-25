---
layout: post
title:  "Creating a Custom Editor Tab in Sitecore"
date:   2013-08-20
tags: Sitecore, .NET, C#
abstract: This post walks you through the steps you need to take to adding a custom editor tab in Sitecore.
---
First log into Desktop mode so that you have the Database selector tool. Go into the *Core* database and browse to the */sitecore/content/Applications/Content Editor/Editors* node.

![Core Editors Node](/images/blog/core-editors-node.png "Core Editors Node")

Create a new folder under here for all of your custom editor tabs. Rather than having to browse for the folder template and the children templates, it will be easier to just copy and paste an existing folder, and then rename it.

![Content Tab Item](/images/blog/content-tab-item.png "Content Tab Item")

You will be able to set the header, icon, and url fields for your tab. **The url field should map to the location of your custom layout for the editor tab**. Once those are set, you can leave the Core database and return to the Master database. Once you are back in the *Master* database, find the templates or items that you want to apply the editor tab to and set it in the *Editors* field under the Appearance section.

![Editor Field](/images/blog/editor-field.png "Editor Field")

Rather than storing your layout under the sitecore folder, I would keep it in a custom location so the url is simple and you can easily keep track of the customization.
