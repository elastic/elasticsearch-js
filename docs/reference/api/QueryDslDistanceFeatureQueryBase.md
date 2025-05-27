## Interface `QueryDslDistanceFeatureQueryBase`

| Name | Type | Description |
| - | - | - |
| `field` | [Field](./Field.md) | Name of the field used to calculate distances. This field must meet the following criteria: be a `date`, `date_nanos` or `geo_point` field; have an `index` mapping parameter value of `true`, which is the default; have an `doc_values` mapping parameter value of `true`, which is the default. |
| `origin` | TOrigin | Date or point of origin used to calculate distances. If the `field` value is a `date` or `date_nanos` field, the `origin` value must be a date. Date Math, such as `now-1h`, is supported. If the field value is a `geo_point` field, the `origin` value must be a geopoint. |
| `pivot` | TDistance | Distance from the `origin` at which relevance scores receive half of the `boost` value. If the `field` value is a `date` or `date_nanos` field, the `pivot` value must be a time unit, such as `1h` or `10d`. If the `field` value is a `geo_point` field, the `pivot` value must be a distance unit, such as `1km` or `12m`. |
