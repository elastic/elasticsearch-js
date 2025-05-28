# `QueryDslGeoDistanceQueryKeys` [interface-QueryDslGeoDistanceQueryKeys]

| Name | Type | Description |
| - | - | - |
| `distance_type` | [GeoDistanceType](./GeoDistanceType.md) | How to compute the distance. Set to `plane` for a faster calculation that's inaccurate on long distances and close to the poles. |
| `distance` | [Distance](./Distance.md) | The radius of the circle centred on the specified location. Points which fall into this circle are considered to be matches. |
| `ignore_unmapped` | boolean | Set to `true` to ignore an unmapped field and not match any documents for this query. Set to `false` to throw an exception if the field is not mapped. |
| `validation_method` | [QueryDslGeoValidationMethod](./QueryDslGeoValidationMethod.md) | Set to `IGNORE_MALFORMED` to accept geo points with invalid latitude or longitude. Set to `COERCE` to also try to infer correct latitude or longitude. |
