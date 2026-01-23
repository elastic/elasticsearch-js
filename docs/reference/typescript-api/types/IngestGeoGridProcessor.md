# IngestGeoGridProcessor

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `field` | `string` | The field to interpret as a geo-tile.=
The field format is determined by the `tile_type`. |
| `tile_type` | [`IngestGeoGridTileType`](IngestGeoGridTileType.md) | Three tile formats are understood: geohash, geotile and geohex. |
| `target_field?` | [`Field`](Field.md) | The field to assign the polygon shape to, by default, the `field` is updated in-place. |
| `parent_field?` | [`Field`](Field.md) | If specified and a parent tile exists, save that tile address to this field. |
| `children_field?` | [`Field`](Field.md) | If specified and children tiles exist, save those tile addresses to this field as an array of strings. |
| `non_children_field?` | [`Field`](Field.md) | If specified and intersecting non-child tiles exist, save their addresses to this field as an array of strings. |
| `precision_field?` | [`Field`](Field.md) | If specified, save the tile precision (zoom) as an integer to this field. |
| `ignore_missing?` | `boolean` | If `true` and `field` does not exist, the processor quietly exits without modifying the document. |
| `target_format?` | [`IngestGeoGridTargetFormat`](IngestGeoGridTargetFormat.md) | Which format to save the generated polygon in. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
