---
layout: post
title:  "Rebuilding Indexes in Sitecore 7"
date:   2014-03-15
tags: Sitecore
abstract: A walk through for rebuilding your Sitecore 7 search indexes.
---
Sitecore 7 makes it very easy to rebuild your lucene index! Rather than using a module or programmatically rebuilding your indexes, you can now do it through the control panel. Here are the steps:

Go into the Start Menu and open the control panel.

<p class="center">
	<img src="/images/blog/start-menu-control-panel.png" title="Start Menu Control Panel" alt="Start Menu Control Panel" />
</p>

Once you have the control panel open, click on the Indexing icon. That will bring you to a wizard with two options. Select the option for rebuilding the indexes. 

<p class="center">
	<img src="/images/blog/control-panel-indexing.png" title="Control Panel Indexing" alt="Control Panel Indexing" />
</p>

This will pop open the wizard with your core, master, and web indexes. You can select which indexes to rebuild by checking the box next to the respective name and then click *Rebuild* to rebuild them.

<p class="center">
	<img src="/images/blog/rebuild-wizard.png" title="Rebuild Wizard" alt="Rebuild Wizard" />
</p>

Once the wizard finishes, your indexes will be rebuild and you are all set!