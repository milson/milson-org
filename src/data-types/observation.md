An `observation` describes a detection from an Unattended (Ground) Sensor (aka UGS) in 3-dimensional space according to the sensor's position and point-of-view.

Obviously not all sensors are capable of 3-dimenional detections, so irrelavent fields may be omitted or filled with `0` values.

If the sensor has no clearly defined external "face", an arbitrary (but contstant) "face" should still be chosen.

### JSON Representation

    {
        "azimuthAngle": 186.869295
      , "altitudeAngle": 0
      , "speed": -17.678
      , "range": 384
      , "horizontalAngle": -43.130705
      , "verticalAngle": 0
      , "radialVelocity": -13.190949
    }

### Fields

All of these fields are given in decimal as degrees or meters per second.

The sensor should, if possible, limit the number of decimal places to the accuracy of the device.

`0` is an invalid value and as such it is excusable to misreprent a true zero reading as `0.00001`.

  * `altitudeAngle` describes the angle of the detection relative to the zenith (straight up), which is 90 degrees perpendicular to the horizon
  * `azimuthAngle` describes the angle of the detection relative to true north (azimuth)
  * `speed` describes the true instantaneous speed, in meters per second, of the detection

  * `range` describes the number of meters (line of sight, meaning relative to `altitudeAngle` and `azimuthAngle`) of the detection

  * `horizontalAngle` is analogous to `azimuthAngle`, but relative only to the "face" of the sensor, not true north.
  * `verticalAngle` is analogous to `altitudeAngle`, but relative only to the "top" of the sensor, not zenith.
  * `radialVelocity` is analogous to `speed`, but relative only to the component of velocity directed toward the sensor.

### Custom Extensions

Any non-standard extension to the observation should be prefixed with `x_` and followed by a `camelCase` name.

Please bring the discussed to the mailing list, as the focus of MILSON is to create meaningful general purpose standards.

### Resources

  * [Wikipedia: Zenith](http://en.wikipedia.org/wiki/Zenith)
  * [Wikipedia: Horizontal Coordinate System](http://en.wikipedia.org/wiki/Horizontal_coordinate_system)

### Discussion

  * What about radians?
  * Why not represent the data in relative or absolute format rather than both?

### TODO

  * *TODO video*
  * *TODO figure*
