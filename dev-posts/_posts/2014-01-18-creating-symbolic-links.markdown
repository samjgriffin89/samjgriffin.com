---
layout: post
title:  "Network Sharing using Symbolic Links"
date:   2014-01-18
tags: Windows
abstract: How to create symbolic links and map your IP address.
---
For one of my projects we needed to pull in log files for tracking purposes from 7 (some times 14) different servers. To do that, on each of the servers we set up a shared folder so we could access it from the one server where we were aggregating all the log files. Then we set up symbolic links so we could have access to each of those directories. Now you may be wondering, what is a Symbolic Link? Symbolic links, otherwise known as symlinks, are basically advanced shortcuts. You can create symbolic links to individual files or folders, and then these will appear like they are stored in the folder with the symbolic link.

To create a symbolic link, you go into the command prompt, find your directory, and run this command:

<p class="center">
   <img src="/images/blog/mklink-info.png" alt="mklink options" title="mklink options">
</p>

which can look something like this:

<p class="center">
   <img src="/images/blog/cmd-mklink.png" alt="CMD mklink Example" title="CMD mklink Example">
</p>

This would create a symbolic link to a directory from the shared logs folder on 192.168.1.19 and link it to my_folder. Then when you browse into the symbolic link directory, my_folder, you will see all the log files from the shared folder on that server (192.168.1.19).