---
layout: post
title:  "Sitecore Null ids are not allowed error"
date:   2012-03-26
tags: Sitecore
abstract: I attempted to view the presentation details of an item or preview the item, a Sitecore error would throw stating, Null ids are not allowed.
---
So I ran into an issue today when trying to set up a new project with Sitecore 6.3.1 (110112) on Windows XP with IIS 5. The project ran locally and after installing Sitecore, I was able to browse through the content tree as well. However, when I attempted to view the presentation details of an item or preview the item, a Sitecore error would throw stating: Null ids are not allowed. Here is what the error looks like below

<p class="center">
	<img src="/images/blog/sitecore_error_001.jpg">
</p>

After doing some research I came across a handful of solutions:

1. Make sure your web.config is configured correctly and strip out custom code to ensure that it is not causing any additional issues

2. One suggestion was to upgrade to Windows 7 (luckily I did not have to do this)

3. Make sure that your project is configured to point to .NET Framework 3.5 and not 4.0

These were all good suggestions, but none of them worked for me. After digging more into the issue I found that not only do you need your project to point to the .NET Framework 3.5, but IIS needs to also be pointing to 2.0 and not 4.0. After switching the version in IIS, the null ids error was fixed!

I hope that this helps because I know that it was a pain to debug.
