---
layout: post
title:  "Display Issues Upgrading to Ubuntu 12.04"
date:   2012-07-03
tags: Linux, OS Installation
abstract: Adding a full featured .NET Framwork to fix 'Handler “PageHandlerFactory-Integrated” has a bad module “ManagedPipelineHandler” in its module list'
---
I recently upgraded my MSI wind u110 netbook to Ubuntu 12.04 and ran into a few issues along that way. First, and most annoying was the fact that my display was either, only half the screen or completely blank on start up. This made it very difficult to proceed with my install. So before continuing, I had to address this. 

In order to remedy this, I had to get into ubuntu's safe mode by hitting the *left shift key* during the boot/start up process. Once in there I could load the terminal through the shortcut key: ctrl + alt + F1. It will ask you for your username and password, and then you will have access to your terminal. 

Once you are in the terminal, the command you need to run is: *sudo service lightdm restart*. This will restart Ubuntu and you will have your display back and correct! 

The next issue I ran into was the display of my mouse. Once Ubuntu started, my mouse was no where to be found. So once again, back to the terminal. In order to get your mouse back, you need to make your way to */etc/modprobe.d/* and then create a file called psmouse.conf, which you can do by executing this command: *sudo nano psmouse.conf*. Once you enter this you will be brought into the nano editor with administrative rights (which will allow you to save the file). 

Once in the editor, put this line: *psmouse proto=imps*. After you put that line in the file, exit and save the file by hitting ctrl + X and then y for yes. Once you do that you are done. Restart your computer and you should have gained mouse control back. I hope this helps and if you have any more helpful hints, please comment.