---
layout: post
title:  "Tricks for ASP .NET Checkboxes"
date:   2012-08-20
tags: Javascript, .NET, C#
abstract: Recently I have been dealing with situations where I need to implement functionality involving ASP .NET checkboxes. I'm sure if you are reading this, then you have had your fair share of annoyances with these fun controls. Here are a few tricks that I've learned from dealing with .NET checkboxes.
---
Recently I have been dealing with situations where I need to implement functionality involving ASP .NET checkboxes. I'm sure if you are reading this, then you have had your fair share of annoyances with these fun controls. Here are a few tricks that I've learned from dealing with them:

[1] This is how an ASP .NET checkbox actually renders as HTML

{% highlight html %}
<span class="any_classes">
     <input id="id_of_your_control" type="checkbox" name="name_of_your_control" />
     <label for="id_of_your_control">text associated with checkbox</label>
</span>
{% endhighlight %}

This can make it a pain to work with instead of just having the input control. So I'm sure you have dealt with issues of trying to add attributes or wanted to add attributes to the actual input control and not that wrapping span tag. That brings us to trick 2:

[2] If you are using C# and want to add attributes to the actual input control and not the span, here is how you do it:

{% highlight C# %}
id_of_your_control.InputAttributes.Add("attribute_name", "attribute_value");
{% endhighlight %}

By doing that, you are telling the control to add the attribute to the input tag and not the span wrapper tag.

[3] Something I just found out today: if you want to filter by visibility using jQuery, you either need to use the ID of your control, make sure your class is added to the input control, or customize the filter function to target the CSS properties. Here is how you can do it any of the ways:

Using the ID:

{% highlight javascript %}
var checkboxes = $(<%= your_control_id.ClientID %>).filter(':visible');
{% endhighlight %}

Adding your class to the input control:

Here you will just follow the advice of trick 2 by adding the attribute in the code behind

{% highlight javascript %}
id_of_your_control.InputAttributes.Add("class", "input_class");
{% endhighlight %}

And now using that class to filter with jQuery:

{% highlight javascript %}
var checkboxes = $('.input_class').filter(':visible');
{% endhighlight %}

Or with the last options, you can do it all using jQuery by customizing the filter function to look at the CSS:

{% highlight javascript %}
var visible = $('input[type=checkbox]').filter(function() {
   return !($(this).css('visibility') == 'hidden' || $(this).css('display') == 'none');
});

var checkboxes = $('.input_class').filter(visible);
{% endhighlight %}

Those are the tricks I've come across so far. If you have any of your own, I would be very interested to here. Will update if I find anymore helpful tips.