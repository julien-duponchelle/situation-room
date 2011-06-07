# Situation Room

Situation Room allows you to display multiple web resources on a single monitor.

Possible use cases:

* Create ersatz tactical overviews for display; for example, a combination of [Graphite](http://graphite.wikidot.com/) and [Nagios](http://www.nagios.org/) views that can provide a rapid, real-time overview of your ecosystem.
* Display advertisements or other information across multiple monitors in a retail setting.

## Screenshots

Console view:

<img src="http://github.com/noplay/situation-room/blob/master/images/console.png?raw=true"/>

Sample monitor view with a video at top left, two graph images, and a webpage:

<img src="http://github.com/noplay/situation-room/blob/master/images/monitor.png?raw=true"/>

## Features

* Simple web interface to control which resources are being displayed.
* Support for web pages, individual images, and videos.
* Multiple monitor support (mirroring _or_ individual displays).
* Auto-refresh feature, configurable per resource.

## Pre-requisites

* [Node.js](http://nodejs.org/)
* [NPM](http://npmjs.org/)
* [Socket.io](http://socket.io/)
* A modern browser such as [Chrome](http://www.google.com/chrome)

## Download

* 0.3.1: http://github.com/noplay/situation-room/zipball/0.3.1

## Configure

* Play with `config.js` as necessary.

## Usage

* `node server.js`
* By default, the tactical view will be available at `http://127.0.0.1:4001`
* By default, the second tactical view will be available at `http://127.0.0.1:4001#1`
* By default, the control console will be available at `http://127.0.0.1:4000`

## Changelog

0.3.1:

* Fix a little parse error thanks to Nico.

0.3:

* Support videos.

0.2:

* Support multiple display.

0.1:

* Initial version.

## Thanks

The following projects :

* [node.js](http://nodejs.org)
* [socket.io](http://socket.io)
* [jQuery](http://www.jquery.org)
* [jLayout](http://www.bramstein.com/projects/jlayout/)
* [fullScreenBG](http://github.com/conzett/jquery.fullScreenBG)

The following people :

* [pyr](http://github.com/pyr/)
* [Daniel](http://github.com/phrawzty/)
* Sclo
* [Nico](https://twitter.com/#!/warpdesign_)

## Licence

This software is distributed under an MIT licence.

Copyright 2011 © Julien Duponchelle

> Permission is hereby granted, free of charge, to any person obtaining a copy of this software
> and associated documentation files (the "Software"), to deal in the Software without
> restriction, including without limitation the rights to use, copy, modify, merge, publish,
> distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the
> Software is furnished to do so, subject to the following conditions:
> The above copyright notice and this permission notice shall be included in all copies or
> substantial portions of the Software.
> The Software is provided "as is", without warranty of any kind, express or implied, including
> but not limited to the warranties of merchantability, fitness for a particular purpose and
> noninfringement. In no event shall the authors or copyright holders be liable for any claim,
> damages or other liability, whether in an action of contract, tort or otherwise, arising from,
> out of or in connection with the software or the use or other dealings in the Software.
