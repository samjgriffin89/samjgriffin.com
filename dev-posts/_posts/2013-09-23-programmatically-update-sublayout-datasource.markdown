---
layout: post
title:  "Programmatically Updating a Sublayout's Datasource"
date:   2013-09-23
tags: Sitecore, .NET, C#
abstract: This post walks you through programatically creating a sublayout's datasource.
---
Of course if you are updating a single instance of sublayout's data source or you can just make the change on a template level, the best approach would be to make the update in Sitecore manually. However, I came across a situation where I needed to update a few sublayouts' data sources throughout a new site in a multi-site solution, where I could not update the template standard values without effecting older sites and manually updating it could have taking days.

To remedy this situation, I put together a small script that takes in the sublayout's name you want to update, the new data source, and the item you will be updating. I also put in an option in the initial submit of the data to include all the items descendants so I did not have to go through each item myself, but could run the script from the home node.

To trigger my script, a submit button click is required once all the proper information has been entered.

{% highlight C# %}
void btnSubmit_Click(object sender, EventArgs e) {

    string itm_guid = txtItemToChange.Text.Trim();
    if (!string.IsNullOrEmpty(itm_guid)) {
        
        // Get the item we are updating
        Item itm = Sitecore.Context.Database.GetItem(itm_guid);
        if (chkIncludeDescendants.Checked) {

            // Get all the descendants
            Item[] descendants = itm.Axes.GetDescendants();

            // Add the current item
            descendants.ToList().Insert(0, itm);
         
            foreach (Item d in descendants) {
                UpdateItemDatasource(d);
            }
        }
        else {
            UpdateItemDatasource(itm);
        }
    }
}
{% endhighlight %}

Once the item is retrieved, either just update it or get all of its descendants and then loop over all of them and updating them as well. Here is what the actual update function looks like:

{% highlight C# %}
private void UpdateItemDatasource(Item itm) {
    if (itm != null) {                    
        // Get the sublayout to update
        string sublayout_name = txtSublayout.Text.Trim();
        if (!string.IsNullOrEmpty(sublayout_name)) {
            // Get the renderings on the item
            RenderingReference[] refs = itm.Visualization.GetRenderings(Sitecore.Context.Device, true);
            if (refs.Any()) {
                // Get the specified rendering
                RenderingReference rendering = refs.Where(r => r.RenderingItem.Name == sublayout_name)
                                                   .ToList()
                                                   .FirstOrDefault();
                if (rendering != null) {

                    string new_datasource = txtDatasource.Text.Trim();
                    if (!string.IsNullOrEmpty(new_datasource)) {

                        // Get the layout definitions and the device
                        LayoutField layoutField = new LayoutField(itm.Fields[Sitecore.FieldIDs.LayoutField]);
                        LayoutDefinition layoutDef = LayoutDefinition.Parse(layoutField.Value);
                        DeviceDefinition deviceDef = layoutDef.GetDevice(Sitecore.Context.Device.ID.ToString());

                        // Update the renderings datasource
                        deviceDef.GetRendering(rendering.RenderingID.ToString()).Datasource = new_datasource;

                        // Save the layout changes
                        itm.Editing.BeginEdit();
                        layoutField.Value = layoutDef.ToXml();
                        itm.Editing.EndEdit();

                    }
                }
            }
        }
    }
}
{% endhighlight %}

This goes through the current item's renderings and using LINQ to select the current sublayout we are targeting. Then we get the get the item's layout definition and device definition in order to get the specified rendering mapped on the layout definition and update its data source.

We have to do it this way because the RenderingReference will only provide properties to get the values of the properties, but not to set them. Additionally, it is important to reset the layout field's value once the update is complete, otherwise the changes will be lost.