# `QueryDslShapeFieldQuery` [interface-QueryDslShapeFieldQuery]

| Name | Type | Description |
| - | - | - |
| `indexed_shape` | [QueryDslFieldLookup](./QueryDslFieldLookup.md) | Queries using a pre-indexed shape. |
| `relation` | [GeoShapeRelation](./GeoShapeRelation.md) | Spatial relation between the query shape and the document shape. |
| `shape` | [GeoShape](./GeoShape.md) | Queries using an inline shape definition in GeoJSON or Well Known Text (WKT) format. |
