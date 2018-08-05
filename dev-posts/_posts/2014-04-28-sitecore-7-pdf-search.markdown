---
layout: post
title:  "Sitecore 7 PDF and Document Content Search"
date:   2015-04-28
tags: Sitecore, C#, PDFBox, Content Search
abstract: Working with PDF content search using Sitecore 7 and IFilters.
---
Recently I had to implement PDF content search for a project so content editors could find files stored in Sitecore easily. With Sitecore 7, since search is built in, you would think this would be a piece of cake. However, I ran into a number of issues. With Sitecore 7, you should be able to install an IFilter such as Adobe or Foxit, and search should work once your indexes are rebuilt. However, the [Foxit IFitler][foxit-ifilter] was not a free option, so that was out for me (this is the recommend IFilter from Sitecore). The Adobe IFilter presented issues on its own that Sitecore has identified as a defect. If you want to use the [Adobe IFilter][adobe-ifilter] you will need to follow these steps for content search to work:

1. Copy all the Adobe iFilter ".dll" files into the *\System32\Inetsrv* folder. This is the working directory for IIS on Windows Server. The Adobe iFilter ".dll" files are stored in the *C:\Program Files\Adobe\Adobe PDF iFilter 9 for 64-bit platforms\bin* folder by default. Also, you can use the "IFilter Explorer" tool to detect the folder where the ".dll" files are stored using this [IFilter Tool][ifitler-tool]. For more details please see [the screenshot][ifitler-screenshot].

2. Delete all the files under the *Website/App_Data/MediaCache* folder. 

3. Rebuild the Sitecore Search Indexes (Sitecore -> Control Panel -> Indexing -> Indexing Manager). 

4. Clear the Sitecore cache (the http://{hostname}/sitecore/admin/cache.aspx tool). 

5. Restart IIS.

Unfortunately, these steps did not work for me. When I would test using [Luke][luke-download] the _content field would keep coming in blank for all of my PDFs and documents. If you want more information on how to use Luke, check out John West's blog post: [Using Luke to Understand Sitecore 7 Search][luke-sitecore-7]. However, back to the issue at hand - So Both IFilters were not working for me, so I decided to write my own method for parsing the content using PDFBox.NET. To do that I first grabbed the most recent DLLs I could find for PDF Box. Here is the complete zip of the DLLs: [PDFBox.NET-1.7.0 DLLs][pdf-dll-download], but for the content search, all I needed to add was references to:

- bcmail-jdk15-1.44.dll
- bcprov-jdk15-1.44.dll
- commons-logging.dll
- EPocalipse.IFilter.dll (Document search)
- fontbox-1.7.0.dll
- IKVM.OpenJDK.Core
- IKVM.OpenJDK.SwingAWT
- IKVM.OpenJDK.Util
- IKVM.Runtime
- pdfbox-1.7.0.dll

Once you add those you should be all good to build out the computed field that will override the current _content computed field defined in your Sitecore.ContentSearch.Lucene.DefaultIndexConfiguration.config file. First let's create the computed field class:

{% highlight C# %}
using System;
using System.IO;
using EPocalipse.IFilter;
using ikvm.io;
using org.apache.pdfbox.pdmodel;
using org.apache.pdfbox.util;
using Sitecore.ContentSearch;
using Sitecore.ContentSearch.ComputedFields;
using Sitecore.ContentSearch.Diagnostics;
using Sitecore.Data.Items;
using Sitecore.Diagnostics;

namespace MyProject.Framework.Indexing.ComputedFields
{
    public class MediaContentExtractor : IComputedIndexField
    {

        public string FieldName
        {
            get;
            set;
        }
        public string ReturnType
        {
            get;
            set;
        }

        public object ComputeFieldValue(IIndexable indexable)
        {
            Item item = (SitecoreIndexableItem)indexable;
            Assert.ArgumentNotNull(item, "item");

            object result = null;
            if (item != null && item.Paths.IsMediaItem)
            {
                MediaItem _media = (MediaItem)item;
                string ext = _media.Extension.ToLower();
                if (ext == "pdf" || _media.MimeType == "application/pdf")
                {
                    result = ParsePDF(_media);
                }
                else if (ext.Contains("doc") || ext.Contains("xls") || ext.Contains("ppt"))
                {
                    result = ParseOfficeDoc(_media);
                }
            }

            return result;
        }

        /// <summary>
        /// Function to parse PDF content
        /// </summary>
        /// <param name="mediaItem"></param>
        /// <returns></returns>
        private string ParsePDF(MediaItem mediaItem)
        {
            PDDocument doc = null;
            string content = string.Empty;
            InputStreamWrapper wrapper = null;

            if (mediaItem != null)
            {
                try 
                {
                    wrapper = new InputStreamWrapper(mediaItem.GetMediaStream());
                    doc = PDDocument.load(wrapper);
                    content = new PDFTextStripper().getText(doc);
                }
                catch (Exception ex)
                {
                    CrawlingLog.Log.Error(ex.ToString(), ex);
                    return string.Empty;
                }
                finally
                {
                    if ((doc != null) && (wrapper != null))
                    {
                        doc.close();
                        wrapper.close();
                    }
                }
            }

            if (!string.IsNullOrWhiteSpace(content))
            {
                content = content.Replace("\r\n", string.Empty).ToLower();
            }

            return content;
        }

        /// <summary>
        /// Function to parse Office document
        /// </summary>
        /// <param name="mediaItem"></param>
        /// <returns></returns>
        private string ParseOfficeDoc(MediaItem mediaItem)
        {
            string content = string.Empty;
            try
            {
                Stream streamReader = mediaItem.GetMediaStream();
                TextReader reader = new FilterReader(((FileStream)streamReader).Name);
                using (reader)
                {
                    content = reader.ReadToEnd();
                }
            }
            catch (Exception ex)
            {
                CrawlingLog.Log.Error(ex.ToString(), ex);
            }

            if (!string.IsNullOrWhiteSpace(content))
            {
                content = content.Replace("\r\n", string.Empty).ToLower();
            }

            return content;
        }
    }
}
{% endhighlight %}

First we figure out the type of file we are indexing, and then pass it to the proper method to parse the content. In each function we pass the media item's stream to the proper text stripper or text reader and then have PDFBox handle getting the content of the document or PDF. If we get content out of the file, then we do a replace on \r\n, which represent carriage returns and line break, and lower the entire content so when we do a compare later, we don't run into any mismatches in case.

Now that we have our custom class, we need to update the _content computed field assembly reference:

{% highlight xml %}
<fields hint="raw:AddComputedIndexField">
   <field fieldName="_content" storageType="no" indexType="tokenized">MyProject.Framework.Indexing.ComputedFields.MediaContentExtractor, MyProject.Framework</field>
</fields>
{% endhighlight %}

Now we have all the ground work in place. Go into your Sitecore instance and rebuild your index. Once this finishes you should be all good to go with your content search.

Happy Coding!

[foxit-ifilter]: https://www.foxitsoftware.com/products/pdf-ifilter/
[adobe-ifilter]: http://www.adobe.com/support/downloads/detail.jsp?ftpID=4025
[luke-download]: https://code.google.com/archive/p/luke/downloads
[luke-sitecore-7]: http://www.sitecore.net/Community/Technical-Blogs/Getting-to-Know-Sitecore/Posts/2013/06/Using-Luke-to-Understand-Sitecore-7-Search.aspx
[ifitler-tool]: http://www.citeknet.com/Products/IFilters/IFilterExplorer/tabid/62/Default.aspx
[ifitler-screenshot]: http://screencast.com/t/xmWukanM 
[pdf-dll-download]: /images/blog/PDFBox.NET-1.7.0.zip
