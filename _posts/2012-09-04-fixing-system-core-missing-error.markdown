---
layout: post
title:  "Could Not Load System.Core File"
date:   2012-09-04
tags: .NET, C#
abstract: Fixing 'Could not load file or assembly 'System.Core, Version=3.5.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089' or one of its dependencies.'
---
Has anyone else run into this issue and been stumped? Could not load file or assembly 'System.Core, Version=3.5.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089' or one of its dependencies. The system cannot find the file specified. 

Well there is a very simple solution to this issue. You need to install .NET 3.5 Framework SP1. This can be done by either downloading it [here][microsoft-download] or you can enable the feature on windows. If you are on Windows Server 2008 R2, all you need to do to enable it is:

1) go into the **Server Manager** (which can be found under Administrative Tools). 

2) Click on **Features** and go to **Add Features**

3) A wizard will pop up and will walk you through the steps to add a new feature. Select **.NET Framework 3.5.1 Features** and complete the wizard.

4) You are done, the .NET framework should now be installed. Try recycling your application in IIS and then browsing to the site again.

[microsoft-download]: http://www.microsoft.com/en-us/download/details.aspx?id=21