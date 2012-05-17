An `observation` describes a detection from a *sensor* in 3-dimensional space according to the *sensor*'s position and point-of-view.

Obviously not all sensors are capable of 3-dimenional detections, so irrelavent fields may be omitted or filled with `null` values.

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
