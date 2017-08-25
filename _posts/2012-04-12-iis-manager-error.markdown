---
layout: post
title:  "IIS Manager Error"
subtitle: The process cannot access the file because it is being used by another process.
date:   2012-04-12
tags: IIS, Windows
abstract: I ran into an issue tonight when I was setting up a new site. I had set up my hosts file entry and was adding my site to IIS 7 when I ran into an error.
---
Hey again. I ran into an issue tonight when I was setting up a new site. I had set up my hosts file entry and was adding my site to IIS 7 when I ran into this error when trying to start my site: 

> The process cannot access the file because it is being used by another process. (Exception from HRESULT: 0x80070020)

I was very confused at first. I tried to close out processes involving the site (really just Visual Studio) with the task manager, but that did not do anything. So After testing out a few different ideas in IIS, I found the solution. The issue was the default port for the site binding was set to 80. The site I setup was conflicting with an application that was already using that port. To solve the issue, I changed the port to 8080 on the binding. Tried starting my site again and it worked. 

Hope this helps!