---
layout: post
title:  "Moving Items Between Sitecore Databases"
date:   2013-01-23
tags: Sitecore
abstract: There are a couple ways to move items between Sitecore databases, but one of the easier ways to do it is to use the "Transfer Item to Another Database" feature.
---
So one easy way to move your items from one database to another is to create a package of the items and install them on the target database. When you are creating the package, just make sure to select the database you want the items from, like so:

<p class="center">
   <img src="/images/blog/package-db-selection.png" alt="Package Database Selector" title="package-db-selection">
</p>

Recently I found a faster and easier way. You can use the "Transfer Item to Another Database" feature, which you can find in the "Control Panel" -> "Database" menu. Just login to the Sitecore desktop, switch to the web database and open the mentioned dialog. It will ask you for the source items/node and a destination and that's it!

If you are new to this, then here is a quick step-by-step tutorial:

First, you need to open the control panel. Then select the "Database" menu link.

<p class="center">
	<img src="/images/blog/control-panel.png" alt="Sitecore Control Panel" title="control panel">
</p>

Then select the "Transfer Item to Another Database" feature. This will pop open the wizard which will walk you through the each of the steps for the transfer.

<p class="center">
    <img src="/images/blog/transfer-to-another-database.png" alt="Transfer to another database feature" title="transfer-to-another-database">
</p>

The first step of the process is to select the items that you want to transfer from the current database you are in.

<p class="center">
   <img src="/images/blog/select-item-to-transfer.png" alt="Select items to transfer" title="select-item-to-transfer">
</p>

Then you need to specify the database you would like to transfer the items to and where in that tree you want the items to live.

<p class="center">
	<img src="/images/blog/select-where-to-transfer.png" alt="Select where the items transfer to" title="select-where-to-transfer">
</p>

The final window of the wizard will show you a short summary of which items you are transferring and where they are going. It will also give you the option to include the subitems if you need to move them as well.

<p class="center">
   <img src="/images/blog/summary-transfer-items.png" alt="Transfer items summary" title="summary-transfer-items">
</p>

Hope that helps. Happy coding!