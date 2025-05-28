# `QueryDslGeoBoundingBoxQueryKeys` [interface-QueryDslGeoBoundingBoxQueryKeys]

| Name | Type | Description |
| - | - | - |
| `ignore_unmapped` | boolean | Set to `true` to ignore an unmapped field and not match any documents for this query. Set to `false` to throw an exception if the field is not mapped. |
| `type` | [QueryDslGeoExecution](./QueryDslGeoExecution.md) | &nbsp; |
| `validation_method` | [QueryDslGeoValidationMethod](./QueryDslGeoValidationMethod.md) | Set to `IGNORE_MALFORMED` to accept geo points with invalid latitude or longitude. Set to `COERCE` to also try to infer correct latitude or longitude. |
