# `SearchCompletionContext` [interface-SearchCompletionContext]

| Name | Type | Description |
| - | - | - |
| `boost` | [double](./double.md) | The factor by which the score of the suggestion should be boosted. The score is computed by multiplying the boost with the suggestion weight. |
| `context` | [SearchContext](./SearchContext.md) | The value of the category to filter/boost on. |
| `neighbours` | [GeoHashPrecision](./GeoHashPrecision.md)[] | An array of precision values at which neighboring geohashes should be taken into account. Precision value can be a distance value ( `5m`, `10km`, etc.) or a raw geohash precision ( `1`.. `12`). Defaults to generating neighbors for index time precision level. |
| `precision` | [GeoHashPrecision](./GeoHashPrecision.md) | The precision of the geohash to encode the query geo point. Can be specified as a distance value ( `5m`, `10km`, etc.), or as a raw geohash precision ( `1`.. `12`). Defaults to index time precision level. |
| `prefix` | boolean | Whether the category value should be treated as a prefix or not. |
