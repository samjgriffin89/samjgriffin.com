---
layout: post
title:  "RSA Encryption using X509 Certificates"
date:   2016-10-23
tags: C#, MMC, RSA, Encyrption, X509Certificate, PFX, Windows
abstract: If you want need to delete your remote branch using Git, you can write it out fully or shorthand.
---
Recently I had to implement RSA encryption for a project at work and thought I'd share the end result since it looked simple at first, and ended up being a bit more of a pain. Our approach was to import a pfx certificate into the MMC, and then to use the X509Certificate to handle producing our public and private keys.

The first step is to get your pfx certificate into the MMC. Run the console and under File, go to "Add/Remove Snap-in". Add "Certificates" and when prompted make sure it is a "Computer Account" on your "Local Computer". Now you should see a Certificates child under the Console root.

Now that you have that, go under Certificates (in the left browsing sidebar) and click into Personal > Certificates. Right-click, and under "All tasks" click "Import" and browse to your pfx certificate. If there is a password associated with the certificate, you will be prompted for it in the wizard that shows for the import process.

Now that the certificate is in the MMC, you can reference it in your code through the X509Store. When you find your certificate, the PrivateKey and PublicKey.Key can be cast as the RSACryptoServiceProvider used for encryption/decryption. You can refer to the code on my [RSA code snippet][rsa-gist-link] on Gist.

[rsa-gist-link]: https://gist.github.com/samjgriffin89/22d2ab13ec9403614468