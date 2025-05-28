# `AggregationsGeoDistanceAggregation` [interface-AggregationsGeoDistanceAggregation]

| Name | Type | Description |
| - | - | - |
| `distance_type` | [GeoDistanceType](./GeoDistanceType.md) | The distance calculation type. |
| `field` | [Field](./Field.md) | A field of type `geo_point` used to evaluate the distance. |
| `origin` | [GeoLocation](./GeoLocation.md) | The origin used to evaluate the distance. |
| `ranges` | [AggregationsAggregationRange](./AggregationsAggregationRange.md)[] | An array of ranges used to bucket documents. |
| `unit` | [DistanceUnit](./DistanceUnit.md) | The distance unit. |
