---
layout: post
title:  "Adding Sitecore.Context to Custom Controllers"
date:   2014-01-08
tags: MVC, Sitecore, C#
abstract: If you are building out a Sitecore MVC project or are just integrating Web API into your web forms project, you are going to want to expose the Sitecore Context to your controllers.
---
If you are building out a Sitecore MVC project or are just integrating Web API into your web forms project, you are going to want to expose the Sitecore Context to your controllers. An easy way to do this is to add a Route Pipeline in your httpRequestBegin section that will expose the Context. To do this, we will need to set up a patch config and a custom class that will actually expose the Sitecore Context.

## Patch Config
{% highlight xml %}
<configuration xmlns:patch="http://www.sitecore.net/xmlconfig/" xmlns:x="http://www.sitecore.net/xmlconfig/">
  <sitecore>
    <pipelines>
      <httpRequestBegin>
        <processor x:before="*[7]" type="Your.Framework.Pipelines.RoutePipeline, Your.Framework" />
      </httpRequestBegin>
    </pipelines>
  </sitecore>
</configuration>
{% endhighlight %}

## Your.Framework.Pipelines.RoutePipeline - Custom Class

{% highlight C# %}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Routing;
using Sitecore.Pipelines.HttpRequest;

namespace Your.Framework.Pipelines
{
    public class RoutePipeline : HttpRequestProcessor
    {
         public override void Process(HttpRequestArgs args)
         {
             RouteData routeData = RouteTable.Routes.GetRouteData(new HttpContextWrapper(args.Context));

             if (routeData != null)
             {
                 HttpContext.Current.RemapHandler(routeData.RouteHandler.GetHttpHandler(HttpContext.Current.Request.RequestContext));
                 args.AbortPipeline();
             }
         }
    }
}
{% endhighlight %}

Once you link these up the Sitecore Context will be exposed. You can confirm that the pipeline is being added to the config by going to */sitecore/admin/showConfig.aspx*.