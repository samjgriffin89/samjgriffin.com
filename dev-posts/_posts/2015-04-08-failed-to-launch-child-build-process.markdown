---
layout: post
title:  "Failed to successfully launch or connect to a child MSBuild.exe process"
date:   2015-04-08
tags: Visual Studio, .NET, C#
abstract: BuildAbortedException while rebuilting your solution in Visual Studio.
---
Quick post here with a quick solution. If you have ever tried to build and got this error:

{% highlight bash %}
Error 1 The build stopped unexpectedly because of an internal failure. Microsoft.Build.Exceptions.BuildAbortedException: Build was canceled. Failed to successfully launch or connect to a child MSBuild.exe process. Verify that the MSBuild.exe "C:\Windows\Microsoft.NET\Framework\v4.0.30319\MSBuild.exe" launches successfully, and that it is loading the same microsoft.build.dll that the launching process loaded. If the location seems incorrect, try specifying the correct location in the BuildParameters object, or with the MSBUILD_EXE_PATH environment variable. at Microsoft.Build.BackEnd.NodeProviderOutOfProc.CreateNode(Int32 nodeId, INodePacketFactory factory, NodeConfiguration configuration) at Microsoft.Build.BackEnd.NodeManager.AttemptCreateNode(INodeProvider nodeProvider, NodeConfiguration nodeConfiguration) at Microsoft.Build.BackEnd.NodeManager.CreateNode(NodeConfiguration configuration, NodeAffinity nodeAffinity) at Microsoft.Build.Execution.BuildManager.PerformSchedulingActions(IEnumerable`1 responses) at Microsoft.Build.Execution.BuildManager.HandleNewRequest(Int32 node, BuildRequestBlocker blocker) at Microsoft.Build.Execution.BuildManager.IssueRequestToScheduler(BuildSubmission submission, Boolean allowMainThreadBuild, BuildRequestBlocker blocker) D:\MaM\Server\ClientServices\Dev\ClientService 1.4\Conduit.Mam.ClientServices.Common.Initizliaer\Conduit.Mam.ClientServices.Common.Initizliaer.csproj Conduit.Mam.ClientServices.Common.Initizliaer
{% endhighlight %}

Then you are probably a bit stumped right now. Easy solution that has worked every time for me: quit Visual Studio and restart the application. Try rebuilding - you should be all set. Some people have said they needed to log out and log back in before it will work - I have not experienced that though.