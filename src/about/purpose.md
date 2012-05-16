MILSON is a specification (Military Simulation Objects Notation) managed by the MILSON Working Group, which defines the object notation and modes of transportation for data concerning spacial objects beteween integrated systems.

[Augmented Reality](http://en.wikipedia.org/wiki/Augmented_reality) (AR) is here.

As more technology and sensor devices formally only available to the military
become affordable and available to civilians (ex-mil, professionals, and hobbyists) participating in 
[MilSim](http://en.wikipedia.org/wiki/MilSim),
such as
[airsoft](http://en.wikipedia.org/wiki/Airsoft)
and
[paintball](http://en.wikipedia.org/wiki/Paintball) turnaments,
the need for a well defined standard to communicate between such systems has become increasingly apparent.

Unlike other working groups in the field MILSON is

  * Open and transparent (not classified or proprietary)
  * Developer-oriented (because we understand software and hardware)

### Goals

  * Cater to the speed of development in the commercial sector.

  * Provide easy integration between sensors and devices such as

    * [Motion Sensors](http://clipaday.com/videos/motion-sensor-paintball-gun)
    * [IR Cameras](http://dopepaintball.com/auction.php?QueryKeywords=ir%20camera)
    * Airsoft and Paintball [Turrets](http://www.youtube.com/watch?v=6QcfZGDvHU8) and [Sentry](http://www.paintballsentry.com/)
    * [Homebrew Radar](http://www.youtube.com/watch?v=MViVyocQhVw)
    * [AR Drones](http://ardrone.parrot.com/)

    to modern controllers such as

    * iPad, iPhone, iPod
    * Android tables, phones, and smart devices
    * Android TVs
    * Dev boards - Arduino, Raspberry Pi, Pandaboard
    * Game consoles (they're cheap, easy to hack, and powerful) - Wii, PlayStation, XBox

###Principles

  * Docs should be easy to understand
  * Docs and community should be easy to access
  * Specs should be easy to parse and easy to implement
  * Specs should rely on object notations (JSON), rather than document markups (\*ML) that are designed only to work with Java
  * Specs should lean on and draw from available open standards (and use them where it makes sense)
  * Data should be bandwidth friendly
  * MILSON should be adequate for use in actual military systems

###Specifications

  * Unattended Sensors
    * Cameras
    * Radars
    * IR
    * Sonar
    * etc
  * Object Notation
  * Unattended Sensor Observations
    * 3-d space
  * Unattended Sensor Capabilities
    * Movement
    * Media Streams
  * Network Transport
    * connection
    * resources
    * compression (zlib / gzip)
    * content-type (json, jpeg, png, raw binary, etc)

### Real Military Standars

These standards 

###Existing Standards

  * [Semantic Versioning](http://semver.org)
  * [W3C Geolocation Working Group](http://www.w3.org/2008/geolocation/)
    * [Geolocation Level 1](http://dev.w3.org/geo/api/spec-source.html)
    * [Geolocation Level 2](http://dev.w3.org/geo/api/spec-source-v2)
    * [Orientation Level 1](http://dev.w3.org/geo/api/spec-source-orientation.html)
  * [WebRTC](http://www.webrtc.org/)
    * [Real-Time Communication](http://dev.w3.org/2011/webrtc/editor/webrtc.html)
  * [W3C Augmented Reality](http://www.w3.org/community/ar/)
    * [AR standards](http://www.perey.com/ARStandards/existing-standards/)
  * [Open Geospatial Consortium](http://www.opengeospatial.org/)
    * [Standards for Defense and Intelligence](http://www.opengeospatial.org/domain/defense_and_intel) [Working Group](http://www.opengeospatial.org/projects/groups/dandidwg)
    * [Sensor Webs](http://www.opengeospatial.org/domain/swe) [Working Group](http://www.opengeospatial.org/projects/groups/sensorwebdwg)
