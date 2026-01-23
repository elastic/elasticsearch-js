# IngestCircleProcessor

## Interface

### Extends

- [`IngestProcessorBase`](IngestProcessorBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `error_distance` | [`double`](double.md) | The difference between the resulting inscribed distance from center to side and the circle’s radius (measured in meters for `geo_shape`, unit-less for `shape`). |
| `field` | [`Field`](Field.md) | The field to interpret as a circle. Either a string in WKT format or a map for GeoJSON. |
| `ignore_missing?` | `boolean` | If `true` and `field` does not exist, the processor quietly exits without modifying the document. |
| `shape_type` | [`IngestShapeType`](IngestShapeType.md) | Which field mapping type is to be used when processing the circle: `geo_shape` or `shape`. |
| `target_field?` | [`Field`](Field.md) | The field to assign the polygon shape to
By default, the field is updated in-place. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
