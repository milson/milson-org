The `orientation` of a sensor describes its angle about the x, y, and z axis in absolute, magnetic, and relative fashion.

### JSON Representation

    {
        "alpha": 218,
        "beta": -92,
        "gamma": 0,
        "compassHeading": 142,
        "compassAccuracy": 1,
        "bearing": 134,
        "declination": -8,
        "absolute": true,
    }

### Fields

  * `alpha` - rotation about the Z axis
    * positive when rotated counterclockwise, facing the front of the sensor
    * from 0 to 359.9 degrees
  * `beta` - rotation about the X axis
    * positive when tipping the top of the sensor towards the observer
    * from -180 to 179.9 degrees
  * `gamma` - rotation about the Y axis
    * positive when rotated counterclockwise looking down at the top of the sensor
    * from -90 to 89.9 degrees
  * `compassHeading` - what bearing the front of the sensor is facing relative to **true** north, -360 to 360 degrees
  * `absolute` - `true` if the sensor has a compass module as well
  * `compassNeedsCalibration`

### Notes

  * If no compass module is present, then `useDeclination`, `getNewOrientation` and `acquireOrientationOnBoot` will have no effect. `compassHeading` will keep its user-defined value.
  * Measurements are updated once a second.
  * Rotations are applied according to the W3C Device Orientation specification using the front of the sensor as the "screen." 
  * All properties are set to `null` when data for them is not available, **notably when the compass module is absent**.
  * With the exception of the device configuration fields, data is provided in the format described by the W3C Device Orientation specification:
    * [Apple's summary of the W3C specification](http://developer.apple.com/library/safari/#documentation/SafariDOMAdditions/Reference/DeviceOrientationEventClassRef/DeviceOrientationEvent/DeviceOrientationEvent.html), including their `compassHeading` specification
    * [Google's tutorial on using DeviceMotionEvent data](http://www.html5rocks.com/en/tutorials/device/orientation/)
    * [The W3C DeviceOrientation Specification](http://dev.w3.org/geo/api/spec-source-orientation.html#deviceorientation)
    * [Discussion between W3C and Apple](http://lists.w3.org/Archives/Public/public-geolocation/2011Jul/0014.html)

### Discussion

  * How to consolidate `compassHeading`, `bearing`, `azimuthAngle`, and `altitudeAngle`
