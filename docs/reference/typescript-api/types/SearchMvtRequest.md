# SearchMvtRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `index` | [`Indices`](Indices.md) | A list of indices, data streams, or aliases to search.
It supports wildcards (`*`).
To search all data streams and indices, omit this parameter or use `*` or `_all`.
To search a remote cluster, use the `<cluster>:<target>` syntax. |
| `field` | [`Field`](Field.md) | A field that contains the geospatial data to return.
It must be a `geo_point` or `geo_shape` field.
The field must have doc values enabled. It cannot be a nested field.

NOTE: Vector tiles do not natively support geometry collections.
For `geometrycollection` values in a `geo_shape` field, the API returns a hits layer feature for each element of the collection.
This behavior may change in a future release. |
| `zoom` | [`SearchMvtZoomLevel`](SearchMvtZoomLevel.md) | The zoom level of the vector tile to search. It accepts `0` to `29`. |
| `x` | [`SearchMvtCoordinate`](SearchMvtCoordinate.md) | The X coordinate for the vector tile to search. |
| `y` | [`SearchMvtCoordinate`](SearchMvtCoordinate.md) | The Y coordinate for the vector tile to search. |
| `aggs?` | `Record<string, AggregationsAggregationContainer>` | Sub-aggregations for the geotile_grid.

It supports the following aggregation types:

- `avg`
- `boxplot`
- `cardinality`
- `extended stats`
- `max`
- `median absolute deviation`
- `min`
- `percentile`
- `percentile-rank`
- `stats`
- `sum`
- `value count`

The aggregation names can't start with `_mvt_`. The `_mvt_` prefix is reserved for internal aggregations. |
| `buffer?` | [`integer`](integer.md) | The size, in pixels, of a clipping buffer outside the tile. This allows renderers
to avoid outline artifacts from geometries that extend past the extent of the tile. |
| `exact_bounds?` | `boolean` | If `false`, the meta layer's feature is the bounding box of the tile.
If `true`, the meta layer's feature is a bounding box resulting from a
`geo_bounds` aggregation. The aggregation runs on <field> values that intersect
the `<zoom>/<x>/<y>` tile with `wrap_longitude` set to `false`. The resulting
bounding box may be larger than the vector tile. |
| `extent?` | [`integer`](integer.md) | The size, in pixels, of a side of the tile. Vector tiles are square with equal sides. |
| `fields?` | [`Fields`](Fields.md) | The fields to return in the `hits` layer.
It supports wildcards (`*`).
This parameter does not support fields with array values. Fields with array
values may return inconsistent results. |
| `grid_agg?` | [`SearchMvtGridAggregationType`](SearchMvtGridAggregationType.md) | The aggregation used to create a grid for the `field`. |
| `grid_precision?` | [`integer`](integer.md) | Additional zoom levels available through the aggs layer. For example, if `<zoom>` is `7`
and `grid_precision` is `8`, you can zoom in up to level 15. Accepts 0-8. If 0, results
don't include the aggs layer. |
| `grid_type?` | [`SearchMvtGridType`](SearchMvtGridType.md) | Determines the geometry type for features in the aggs layer. In the aggs layer,
each feature represents a `geotile_grid` cell. If `grid, each feature is a polygon
of the cells bounding box. If `point`, each feature is a Point that is the centroid
of the cell. |
| `query?` | [`QueryDslQueryContainer`](QueryDslQueryContainer.md) | The query DSL used to filter documents for the search. |
| `runtime_mappings?` | [`MappingRuntimeFields`](MappingRuntimeFields.md) | Defines one or more runtime fields in the search request. These fields take
precedence over mapped fields with the same name. |
| `size?` | [`integer`](integer.md) | The maximum number of features to return in the hits layer. Accepts 0-10000.
If 0, results don't include the hits layer. |
| `sort?` | [`Sort`](Sort.md) | Sort the features in the hits layer. By default, the API calculates a bounding
box for each feature. It sorts features based on this box's diagonal length,
from longest to shortest. |
| `track_total_hits?` | [`SearchTrackHits`](SearchTrackHits.md) | The number of hits matching the query to count accurately. If `true`, the exact number
of hits is returned at the cost of some performance. If `false`, the response does
not include the total number of hits matching the query. |
| `with_labels?` | `boolean` | If `true`, the hits and aggs layers will contain additional point features representing
suggested label positions for the original features.

* `Point` and `MultiPoint` features will have one of the points selected.
* `Polygon` and `MultiPolygon` features will have a single point generated, either the centroid, if it is within the polygon, or another point within the polygon selected from the sorted triangle-tree.
* `LineString` features will likewise provide a roughly central point selected from the triangle-tree.
* The aggregation results will provide one central point for each aggregation bucket.

All attributes from the original features will also be copied to the new label features.
In addition, the new features will be distinguishable using the tag `_mvt_label_position`. |
| `project_routing?` | [`ProjectRouting`](ProjectRouting.md) | Specifies a subset of projects to target for the search using project
metadata tags in a subset of Lucene query syntax.
Allowed Lucene queries: the _alias tag and a single value (possibly wildcarded).
Examples:
 _alias:my-project
 _alias:_origin
 _alias:*pr*
Supported in serverless only. |
| `body?` | `string | { [key: string]: any } & { index?: never, field?: never, zoom?: never, x?: never, y?: never, aggs?: never, buffer?: never, exact_bounds?: never, extent?: never, fields?: never, grid_agg?: never, grid_precision?: never, grid_type?: never, query?: never, runtime_mappings?: never, size?: never, sort?: never, track_total_hits?: never, with_labels?: never, project_routing?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { index?: never, field?: never, zoom?: never, x?: never, y?: never, aggs?: never, buffer?: never, exact_bounds?: never, extent?: never, fields?: never, grid_agg?: never, grid_precision?: never, grid_type?: never, query?: never, runtime_mappings?: never, size?: never, sort?: never, track_total_hits?: never, with_labels?: never, project_routing?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
