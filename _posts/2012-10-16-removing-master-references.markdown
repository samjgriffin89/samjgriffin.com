---
layout: post
title:  "Removing references to the 'Master' database"
subtitle: "Scaling your Sitecore site for Production"
date:   2012-10-16
tags: Sitecore, Scalability
abstract: If you are preparing your Sitecore environment for production and need to remove references to your Master database, there are two ways you can do it.
---
If you are preparing your Sitecore environment for production and need to remove references to your Master database, there are two ways you can do it.The first was is simply through including another config file that will make all the changes for you. The other was is to manually go through your web.config and a couple other files and remove all the references yourself. Personally, I like the second method, because it ends up with a cleaner solution, but the first option is definitely appealing since it is so easy.

For the first and easy method, all you need to do is download this file: [Master-to-Web configuration file][master-to-web-config-file]
Once you download that file, unzip it and move the configuration file to your */App_Config/Include* folder and comment out your Master database reference in your connection strings. That's it for this method - see very easy.

The other method, manually removing everything, is done by removing all of your references to the Master database. Here is how you do it:

In the **Web.config** file:

In the **sites** section:
Change the **content** attribute of the **shell** and **modules_shell** site nodes from 'master' to 'web'
If the **testing** site node is present, delete or comment it out
Next search for the **connectionStringName** attribute under the section. Change that attribute on the node from 'master' to 'web' 

For the next three changes, you can either comment out or delete these sections:
The 'master' node under the section
Under Search/Configuration/indexes/index/locations, remove or comment out the node.
Remove or comment out the **Sitecore.Tasks.DatabaseAgent** with the database parameter set to 'master'
Now onto the next configuration file -> In the */App_Config/Include/Sitecore.WebDAV.config* file:

Under the **Sitecore.Tasks.CleanupFDAObsoleteMediaData** agent, delete or comment out the node. 

Finally, remember to remove the references to the 'master' database from your connection strings files, and then you are done. Now that took longer then the other method, but you web.config will be less cluttered and won't have any confusing 'master' references stuck in there either. Hope this helps, happy coding!

[master-to-web-config-file]: http://sdn.sitecore.net/upload/sitecore6/64/switchmastertoweb.zip