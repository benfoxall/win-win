Possible names:

* escaping out of the window
* win-win communication
* getting out of the window
* exit through the window
* out of the window
* jumping out the window



Structure

# Hello/Welcome
	- name etc
	- I'm here to talk about sending stuff between windows in js
	- Client side js doesn't have to be constrained to one window.  Or even device,  or even type of device.  I'd like to briefly cover the tools that make this possible


# what we are covering
	- we have windows,  we know this; we know how to throw events around, how to get more data into this.
	- we've got referenced windows,  like frames or via window.open.  Quite often used in anger,  but there are a lot of possibilities from this
	- different windows on same device
	- we've got windows on different devices entirely
	- I'm going to add two subgorups more teniously:
		- devices that are "close by", require a different level of communication
		- devices that are different (phones and tablets can be used)


#? should i put the twon video in here? or later on

# postmessage
	- so first we have postmessage,  this is what you can use when you have a reference to the window that you're wanting to send messages to.  Examples of this are frames, or window.open,  though there are vaguely similiar methods when you're using webworkers and chrome extensions

	- I was looking round for an example of this,  then I realised that a good one was the reveal.js helper.  So I'm going to go all meta and explain this using the presentation itself.

## postmessage - code
	- sending a message is kind of as you would expect. Get get a window, post a message to it. There's also an extra parameter which is the origin.  Which is actually a really huge awesome part of this,  you can send cross origin messages - so I can provide you an iframe and send messages to that by providing a url. (it might be worth mentioning that )

	- on the other side,  you just add an event listener to that window and the data will come up

	- handly little tip,  if you're using chrome dev tools, you can change the context of your console with this button.

	[-] you might be thinking "where can I use this"…  The answer is "everywhere",  there is a slight limitation in old-ie where you can only pass a string object.


# local windows
	- persist state using local storage (what kind of storage will depend on your data)
	- possibly to some clever things with blur / focus visibilty for when to reload, again (data)
	- can be combined with iframe / postmessage to allow cross-domain things
		- this is possibly the reason for FB channel url

## local windows - sww
	- if you want to send events between windows - it *is* possible, and a way of doing this is with shared web workers.
	- demo
	- support, only Chrome so don't really use it.  Though I'm partly showing you becuase of the whole postMessage thing!


# remote windows!
	- All the stuff that I've said so far has been on one machine,  but this starts to get particularly cool when you share stuff between devices.
	-? image of TWon?
	- so (diagram) - we've got a webserver and two clients, they both request a page,  then the state changes, so we push it up in a request.  But how does it come back down?
	- there are a few ways to do this xhr polling, longpolling, sse, websockets






# ending?
	- https://twitter.com/benjaminbenben/status/204181073138163712/photo/1


----

https://twitter.com/benjaminbenben/status/204181073138163712/photo/1