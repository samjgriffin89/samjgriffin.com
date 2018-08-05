---
layout: post
title:  "Sitecore Add/Edit Renderings"
subtitle: "Presentation Details Issue: Please select a rendering item"
date:   2012-11-16
tags: Sitecore, Sitecore Defect
abstract: I recently performed an upgrade to Sitecore 6.5 rev 120706 and ran into an issue where I could not add or edit any renderings in the presentation details of an item.
---
So I recently performed an upgrade to Sitecore 6.5 rev 120706 and ran into an issue where I could not add or edit any renderings in the presentation details of an item. Whenever I tried to add a rendering, I would get this lovely message:

<p class="center">
   <img src="/images/blog/please-select-a-rendering.png" alt="Please select a rendering">
</p>

After digging around for a bit, I found that I was missing a key template: Rendering Options, which the Sublayout template needs to inherit. The rendering options template can be found here: */sitecore/templates/System/Layout/Sections/Rendering Options*.

To resolve this issue, download [this zip][rendering-template-zip], which contains the rendering options script. Install the package in Sitecore and then make sure you go to the sublayout template, which can be found here: */sitecore/templates/System/Layout/Renderings/Sublayout*, and add the rendering options template to its inheritance.

Once you do that, try going into an item's presentation details again and adding or editing a rendering, and it should work now! Although this definitely is not a frequent issue, I hope this helps the few who run into this.

[rendering-template-zip]: /images/rendering_options_template.zip