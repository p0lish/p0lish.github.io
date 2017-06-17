---
layout: post
title: "Commands for networking in linux"
date: 2017-06-18
excerpt: "What if ifconfig is not available"
tags: [linux, networking, commands, depricated]
comments: true
---

Some years ago the linux networking got deprecated and unmaintained for years.
There are the alternatives for: **arp**, **ifconfig**, **iptunnel**, **iwconfig**, **nameif**, **netstat**, **route**.

     arp > ip n
     ifconfig > ip a, ip link ip -s
     iptunnel > ip tunnel
     iwconfig > iw
     nameif > ip link, ifrename
     netstat > ss, ip route, ip -s link, ip maddr
     route > ip r   
     

For more info pleade visit this article: 

[Replacing ifconfing with ip](https://www.linux.com/learn/replacing-ifconfig-ip)
