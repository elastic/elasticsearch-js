# QueryDslGeoDistanceQueryKeys

## Interface

### Extends

- [`QueryDslQueryBase`](QueryDslQueryBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `distance` | [`Distance`](Distance.md) | The radius of the circle centred on the specified location.
Points which fall into this circle are considered to be matches. |
| `distance_type?` | [`GeoDistanceType`](GeoDistanceType.md) | How to compute the distance.
Set to `plane` for a faster calculation that's inaccurate on long distances and close to the poles. |
| `validation_method?` | [`QueryDslGeoValidationMethod`](QueryDslGeoValidationMethod.md) | Set to `IGNORE_MALFORMED` to accept geo points with invalid latitude or longitude.
Set to `COERCE` to also try to infer correct latitude or longitude. |
| `ignore_unmapped?` | `boolean` | Set to `true` to ignore an unmapped field and not match any documents for this query.
Set to `false` to throw an exception if the field is not mapped. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
