### Generally speaking

This is a glossary of all properties defined by MILSON, especially those related to 3D space.

All properties are used to describe an *observation* of a *target* as either **relative to a *sensor* ** or **absolute** (relative to *known constants*).

  * standard units, not imperial units
  * degrees, not radians
  * meters, not yards
  * transmit strictly to spec
  * *sensor*s SHOULD limit the number of decimal places to the accuracy of the device
  * `null` values indicate an error and or lack of information
  * receive loosely to spec (ignore whitespace, accept accidental -90 when spec is 0 - 180)
  * all numbers are of type `Number`, meaning `double` or `BIGDECIMAL`
  * a *sensor* is an *observer*
  * a *target* is an *observation*
  * an *object* is any object in 3-d space

#### Examples of *sensors* (*observers*)

  * person
  * camera
  * sonar
  * radar
  * ir sensor
  
#### Examples of *absolute constants*

  * north
  * zenith
  * ground (according to gravity)



### Primitive Types

The types are very exactly defined at [json.org](http://json.org/). In summary:

  * `Array`
    * a list of 0-indexed items
    * `[ <value0>, <value1>, ... ]`
    * in practice arrays are typed (implicitly by the receiving system), but the specification doesn't require it

  * `Boolean`
    * `true`
    * `false`

  * `null`
    * often included for completeness or to signify an error

  * `Number`
    * signed decimals (64-bit float)
    * scientific notation (i.e. `1.23e+10`)

  * `Object`
    * key/value pairs
    * keynames must be surrounded by quotes
    * example: `{ "key": <value> }`
    * in practice objects are either typed (implicitly by the receiving system) or used as a HashMap

  * `String`
    * uses double quotes, escaped with `\`
    * example: `"a string with a \" and a \\"`
    * allows unicode and utf8
    * disallows some control characters
    * see [json.org](http://json.org) for escape sequences

  * `value` is any of `Array`, `Boolean`, `null`, `Number`, `Object`, or `String`

Here's a quick list of every property and it's meaning:

  * `alpha` (orientation)
    * rotation about the Z axis relative to "reset position"
    * loosely analogous to descriptions such as *side-to-side*, *tilt*, and *roll*
    * positive when rotated counter-clockwise, facing the front of the *sensor*
    * transmitters SHOULD transmit such that **0° ≤ alpha < 360°**
    * receivers MUST accept -360° ≤ alpha ≤ 360° and adjust accordingly
    * in degrees
    * `null` on error or unavailable

  * `altitude` (geolocation)
    * distance above sea level
    * WGS-84 HAE (altitude)
    * associated with GPS, Geolocation
    * in meters
    * `null` on error or unavailable

  * `altitudeAngle` (lob)
    * depracated. see `elevationAngle`
    
  * `azimuthAngle` (lob)
    * direction used to draw an absolute *line of bearing* from a *sensor* to a *target*
    * relative to *true north*
    * transmitters SHOULD transmit such that **0° ≤ azimuthAngle < 360°**
    * receivers MUST accept -360° ≤ azimuthAngle ≤ 360° and adjust accordingly
    * in degrees
    * `null` on error or unavailable

  * `bearing` (orientation)
    * relative to *true north*
    * includes `declination` if read from magnetic compass
    * the direction the object is **facing**
    * NOT the direction of travel
    * If I'm walking backwards, moving south with my face and chest facing due north, my `bearing` is north
    * in degrees
    * `null` on error or unavailable

  * `beta` (orientation)
    * rotation about the X axis relative to "reset position"
    * loosely analogous to descriptions such as *front-to-back*, *vertical angle*, and *pitch*
    * positive when tipping the top of the *sensor* towards its front
    * transmitters SHOULD transmit such that **-90° ≤ beta ≤ 90°**
    * receivers MUST accept -180° ≤ beta ≤ 180° and adjust accordingly
    * in degrees
    * `null` on error or unavailable

  * `compassHeading` (orientation)
    * bearing relative to magnetic north (excuse the heading / bearing mismatch, blame Apple and W3C)
    * angle between the *face* of the device and magnetic north
    * a "normal" 1-axis reading
    * based on magnetic reading from a compass
    * does NOT correct for or include `declination`
    * transmitters SHOULD transmit such that **0° ≤ compassHeading < 360°**
    * receivers MUST accept -360° ≤ compassHeading ≤ 360° and adjust accordingly
    * in degrees
    * `null` on error or unavailable

  * `declination` (geolocation)
    * expected error between a magnetic compass reading and true north at the *sensor*'s location.
    * Acquired along with other GPS data when available
    * in decimal degrees
    * `null` on error or unavailable

  * `elevationAngle` (lob)
    * direction used to draw an absolute *line of bearing* from a *sensor* to a *target*
    * relative to zenith (90°) and ground (0°)
    * transmitters SHOULD transmit such that **-90° ≤ elevationAngle ≤ 90°**
    * receivers MUST accept -360° ≤ elevationAngle ≤ 360° and adjust accordingly
    * in decimal degrees
    * `null` on error or unavailable

  * `gamma` (orientation)
    * rotation about the Y axis relative to "reset position"
    * loosely analogous to descriptions such as *left-to-right*, *horizontal angle*, and *yaw*
    * positive when rotated counterclockwise looking down at the top of the *sensor*
    * transmitters SHOULD transmit such that **-180° ≤ gamma ≤ 180°**
    * receivers MUST accept -360° ≤ gamma ≤ 360° and adjust accordingly
    * in degrees
    * `null` on error or unavailable

  * `geolocation`
    * a set of absolute coordinates referencing GPS and true north
    * designed to comply with the [W3C Geolocation standard](http://www.w3.org/TR/geolocation-API/)
    * [nsIDOMGeoPositionCoords object](https://developer.mozilla.org/en/XPCOM_Interface_Reference/NsIDOMGeoPositionCoords)


  * `HAE` (reference)
    * height above ellipsoid
    * WGS-84 altitude

  * `heading` (geolocation)
    * relative to *true north*
    * includes `declination` if read from magnetic compass
    * the direction of travel
    * the direction it is **moving**
    * NOT the direction it is facing
    * If I'm walking backwards, moving south, with my face and chest facing due north, I'm `heading` south
    * in degrees
    * `null` on error or unavailable

  * `horizontalAngle`
    * angle to the detection side-to-side from the *sensor*'s line of sight (positive is to the right)
    * direction used to draw a relative *line of bearing* from a *sensor* to a *target*
    * relative to *face of sensor*
    * IDEALLY the same as *azimuthAngle*, if the *sensor* is equipped with a magnetometer
    * in degrees
    * `null` on error or unavailable

  * `latitude` (geolocation)
    * WGS-84 (GPS) latitude
    * concentric circles running continuously from east to west
    * parallel to the equator
    * transmitters SHOULD transmit such that -180° ≤ latitude < 180°
    * receivers MUST accept -360° ≤ latitude ≤ 360° and adjust accordingly
    * in decimal degrees
    * `null` on error or unavailable

  * *line of bearing* (lob)
    * a line from a *sensor* to a *target*

  * `longitude` - Longitude in decimal format (`-180` to `180`)
    * WGS-84 (GPS) longitude
    * straight lines running from north to south
    * perpendicular to the equator
    * transmitters systems SHOULD transmit such that -180° ≤ longitude < 180°
    * receivers MUST accept -360° ≤ latitude ≤ 360° and adjust accordingly
    * receivers MUST accept -180° ≤ beta ≤ 180° and adjust accordingly
    * in decimal degrees
    * `null` on error or unavailable

  * *magnetic north*
    * north as read by a magnetic compass, not the north pole

  * *natural position* - the position at which relative and absolute descriptions happen to be the same and still make sense
    * the front of the object is towards north
    * the object is standing straight, with its bottom towards the ground
    * the sides of the object are level, the way you want a picture-frame
    * if the object is a ball... arbitrarily sharpy a dot perpendicular to each axis and call it good

  * *north*
    * deprecated. see *true north* or *magnetic north*

  * `observation`
    * a set of relative coordinates
    * point of reference is the face of a *sensor*
    * directs to a *target*

  * `pitch` (orientation)
    * `beta` translated from the unit circle to coordinates more familiar to most people

  * `radialVelocity`
    * component of *target*'s velocity directed towards the *sensor*
    * positive (+) means the *target* is moving towards the *sensor*
    * negative (-) means the *target* is moving away from the *sensor*
    * if I'm walking 1m/s perpendicular to a *sensor*'s line-of-sight, this number is 0 (because none of my movement is towards the *sensor*)
    * if I'm walking 1m/s at 45° to a *sensor*'s line-of-sight, this number will change as I walk (due to the radial nature of the measurement)
    * in meters per second (m/s)
    * `null` on error or unavailable

  * `range` (lob)
    * distance from *target* to *sensor*
    * in meters
    * `null` on error or unavailable

  * *reset position* - When a device is powered on or reset, it generally believes that it is in this position, even if it's upside-down, backwards, and skewed.
    * The position at which `alpha`, `betta`, and `gamma` are 0
    * All other positions are relative to this position
    * If the object is level with the ground, pointed towards north, and standing straight, then it is also in *natural position*
    * If a device is capable of doing so (i.e. it has magnetometer, accelerometer, gyro, etc), it SHOULD orient its *reset position* the same as *natural position*

  * `roll`
    * `alpha` translated from the unit circle to coordinates more familiar to most people

  * `semver` (version)
    * see [semver.org](http://semver.org)
    * example: 1.0.4-alpha.17
    * `String`

  * `serial` (product)
    * unique identifier for a product line by a vendor
    * made unique by `vendorId`, `productId`, and `serial`
    * some vendors may fudge model information into `serial` if `serial`s are not unique across products
    * String

  * `speed`
    * positive measure of speed
    * if I'm walking 1m/s perpendicular to a *sensor*'s line-of-sight, this number is 1m/s
    * in meters per second (m/s)
    * `null` on error or unavailable
      
  * `timestamp`
    * milliseconds since unix epoch
    * in milliseconds

  * *true north*
    * the north pole, not magnetic north

  * `vendor` (product)
    * an alphanumeric representation of the vendor's name
    * case insensitive
    * whitespace insensitive
    * receivers MUST allow for utf-8 and escaped unicode names

  * `verticalAngle` (lob)
    * the angle above horizontal to the detection relative to the *sensor*'s line of sight
    * direction used to draw a relative *line of bearing* from a *sensor* to a *target*
    * relative to *base of sensor* (it's bottom)
    * IDEALLY the same as *altitudeAngle*, if the *sensor* is equipped with an accelerometer
    * in degrees
    * `null` on error or unavailable

  * `yaw` (orientation)
    * `gamma` translated from the unit circle to coordinates more familiar to most people
