---
layout: post
title:  "Reset Sitecore Admin Password"
date:   2012-06-03
tags: Sitecore, SQL
abstract: Forgot your Sitecore Admin password? Well there is a quick and easy way to reset your password to the default 'b' password
---
Forgot your Sitecore Admin password? Well there is a quick and easy way to reset your password to the default 'b' password. First part of the solution: 

1. Find your Admin user in your Core database that you set up.

2. Go to the **[aspnet_Users]** table and find your admin user's UserId. We will cross-reference this value when actually changing the password.

3. Go to the **[aspnet_Membership]** table. You can either search for your user using the UserId you just found, or you can execute this query to update the Sitecore Admin password: 

{% highlight SQL %}
UPDATE [Your Core Database].[dbo].[aspnet_Membership] 
SET Password = '8dC23rEIsvuttG3Np1L4hJmJAOA=', PasswordSalt = 'joeLPwcwMq6L7kyuVfVS7g=='
WHERE UserId = 'the UserId value you found in step 2'
And that is it! your done. Try to login with username Admin, password b. Good luck.
{% endhighlight %}