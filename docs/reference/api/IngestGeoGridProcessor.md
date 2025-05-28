# `IngestGeoGridProcessor` [interface-IngestGeoGridProcessor]

| Name | Type | Description |
| - | - | - |
| `children_field` | [Field](./Field.md) | If specified and children tiles exist, save those tile addresses to this field as an array of strings. |
| `field` | string | The field to interpret as a geo-tile.= The field format is determined by the `tile_type`. |
| `ignore_missing` | boolean | If `true` and `field` does not exist, the processor quietly exits without modifying the document. |
| `non_children_field` | [Field](./Field.md) | If specified and intersecting non-child tiles exist, save their addresses to this field as an array of strings. |
| `parent_field` | [Field](./Field.md) | If specified and a parent tile exists, save that tile address to this field. |
| `precision_field` | [Field](./Field.md) | If specified, save the tile precision (zoom) as an integer to this field. |
| `target_field` | [Field](./Field.md) | The field to assign the polygon shape to, by default, the `field` is updated in-place. |
| `target_format` | [IngestGeoGridTargetFormat](./IngestGeoGridTargetFormat.md) | Which format to save the generated polygon in. |
| `tile_type` | [IngestGeoGridTileType](./IngestGeoGridTileType.md) | Three tile formats are understood: geohash, geotile and geohex. |
