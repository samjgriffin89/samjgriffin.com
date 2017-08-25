---
layout: post
title:  "Fixing Sitecore 6.x Bugs"
subtitle: "Sitecore issue with .NET Framework 4.5"
date:   2013-04-04
tags: IIS, .NET, Sitecore, Sitecore Defect
abstract: Fixing issues with Sitecore 6 using .NET Framework 4.5 with the potential usage of Sitecore 7.
---
If any of you have decided to try Sitecore 7 and have installed .NET framework 4.5, you probably ran into an issue try to load your older sites. This issue occurs because Sitecore 6.5 Update-4 and older do not support .NET framework 4.5 and when you update to the newer framework it overwrites the 4.0 framework rather than installing side-by-side. So when you try to log into the actual CMS of your older sites, you will receive this error:

{% highlight C# %}
[ArgumentException]: Object of type 'System.Int32' cannot be converted to type 'System.Web.Security.Cryptography.Purpose'.
   System.RuntimeType.TryChangeType(Object value, Binder binder, CultureInfo culture, Boolean needsSpecialCast)
   System.Reflection.MethodBase.CheckArguments(Object[] parameters, Binder binder, BindingFlags invokeAttr, CultureInfo culture, Signature sig)
   System.Reflection.RuntimeMethodInfo.Invoke(Object obj, BindingFlags invokeAttr, Binder binder, Object[] parameters, CultureInfo culture, Boolean skipVisibilityChecks)
   System.Reflection.RuntimeMethodInfo.Invoke(Object obj, BindingFlags invokeAttr, Binder binder, Object[] parameters, CultureInfo culture)
   Sitecore.SecurityModel.Cryptography.MachineKeyEncryption.CookieProtectionHelperWrapper.Encode(CookieProtection cookieProtection, Byte[] buf, Int32 count)
   ...
{% endhighlight %}

Luckily there are a couple of solutions you can implement:

1. If you would like to maintain your older sites while keeping .NET 4.5, you need to update the web.config of your older sites. Set the value of the *Login.RememberLastLoggedInUserName* to false. You may run into the exception again when subscribing to the Sitecore RSS feeds suing the client interface.

2. User .NET Framework 2.0 in Sitecore application pool configuration.

3. If you decide against using Sitecore 7, uninstall .NET framework 4.5.