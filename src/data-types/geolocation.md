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

### Custom Extensions

Any non-standard extension to the observation should be prefixed with `x_` and followed by a `camelCase` name.

Please bring the discussed to the mailing list, as the focus of MILSON is to create meaningful general purpose standards.
