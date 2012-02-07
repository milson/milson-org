`geolocation` describes the position and location of a sensor or detected object according to [WGS84/EGM96](http://en.wikipedia.org/wiki/World_Geodetic_System#A_new_World_Geodetic_System:_WGS_84) (aka GPS) coordinates 
and the [W3C Coordinates Interface](http://dev.w3.org/geo/api/spec-source.html#coordinates_interface).

Obviously not all sensors are capable of 3-dimenional detections, so irrelavent fields may be omitted or filled with `0` values.

### JSON Representation

    {
        "altitude": 14999.0009
      , "altitudeAccuracy": 0
      , "declination": 11.9
      , "latitude": 89.0009
      , "longitude": 179.0009
      , "heading": 12
      , "speed": 13
      , "accuracy": 0
    }

### Fields

Any unsupported values may be omitted or replaced with `0`.

  * `altitude` describes the height above sea level (more or less) in meters (aka HAE in WGS-84)
  * `declination` is the variance between magnetic north and true north at this location
  * `latitude` is in decimal format (`-90` to `90`)
  * `longitude` is in decimal format (`-180` to `180`)
  * `heading` refers to the 2-dimensional direction (`horizontalAngle`) the object is moving, not the direction that it faces (aka `compassHeading`)
  * `speed` refers to the 2-dimensional surface speed of the described object, (along the `horizantalAngle`)

### Custom Extensions

Any non-standard extension to the observation should be prefixed with `x_` and followed by a `camelCase` name.

Please bring the discussed to the mailing list, as the focus of MILSON is to create meaningful general purpose standards.

### Glossary

  * "HAE" expands to "height above ellipsoid" and refers to "altitude"
  * "WGS" expands to "World Geodetic System" and refers to common "GPS Coordinates" of lat, lon, hae.
