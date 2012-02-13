[`semver`](http://semver.org) (Semantic Versioning) is a formal specification for the *de facto* versioning convention that has been used for the past 15 years or so in the Open Source and Commercial communities.

All MILSON-compliant software must be versioned according to `semver`.

In short `semver` specifies that for a version `vX.Y.Z` (`major.minor.patch`)

  * Thou shalt place a `v` prefix as indication that such an string is an version string
  * Thou shalt bump the `major` version when introducing a backwards-incompatible change
  * Thou shalt bump the `minor` version when introducing a new feature
  * Thou shalt bump the `patch` version when fixing a bug / patching the code
  * Thou mayest use alphanumeric, period separated postfixes such as
    * `-rc.1`
    * `-alpha.15`
    * `-beta.3`
    * `+build.a24e52f8ac` (build postfixes must use `+` instead of `-`)

The [full specification](http://semver.org) is 12 very short paragraphs and is almost completely summarized in the few bullet points above.
