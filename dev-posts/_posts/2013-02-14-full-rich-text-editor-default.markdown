---
layout: post
title:  "Set Full Rich Text Editor as Default for Sitecore"
date:   2013-04-04
tags: Sitecore
abstract: Setting up the Sitecore default text editor as the full rich text editor.
---
For the default Sitecore installations, the most bare bones rich text editor is chosen for the default. I'm sure if you have any experience with Sitecore, then you have seen this simple text editor:

<p class="center">
	<img src="/images/blog/default-rich-text-editor.png" alt="Default Rich Text Editor" title="Default Rich Text Editor">
</p>

Now some people may be fine with this, especially if the majority of the time they are using the HTML editor. However, most people that want to use the rich text editor want a full set of tools to use when entering content. There are two ways to give the user this experience:

When you are creating the rich text field on the data template, put this path in the Source field: */sitecore/system/Settings/Html Editor Profiles/Rich Text Full*

<p class="center">
   <img src="/images/blog/data-template-source-field.png" alt="Data template Source" title="Data template Source">
</p>

Instead of adding that source to every single rich text field you want to add to data templates, you can change a Sitecore setting in the web.config. The current setting is set to the **Rich Text Default**, and like above, you would just want to change that to point to the **Rich Text Full** editor.

{% highlight xml %}
<configuration>
  <sitecore>
    <settings>
      <!-- Old Setting -->
      <setting name="HtmlEditor.DefaultProfile" value="/sitecore/system/Settings/Html Editor Profiles/Rich Text Default">
      <!-- New Setting -->
      <setting name="HtmlEditor.DefaultProfile" value="/sitecore/system/Settings/Html Editor Profiles/Rich Text Full">
    </setting>
  </sitecore>
</configuration>
{% endhighlight %}

When you do that, your end result is a rich text editor with significantly more capabilities.

<p class="center">
   <img src="/images/blog/full-toolbar.png" alt="Full Rich Text Editor Toolbar" title="Full Rich Text Editor Toolbar">
</p>