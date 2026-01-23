# MsearchTemplateRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `index?` | [`Indices`](Indices.md) | A comma-separated list of data streams, indices, and aliases to search.
It supports wildcards (`*`).
To search all data streams and indices, omit this parameter or use `*`. |
| `ccs_minimize_roundtrips?` | `boolean` | If `true`, network round-trips are minimized for cross-cluster search requests. |
| `max_concurrent_searches?` | [`long`](long.md) | The maximum number of concurrent searches the API can run. |
| `project_routing?` | [`ProjectRouting`](ProjectRouting.md) | Specifies a subset of projects to target for the search using project
metadata tags in a subset of Lucene query syntax.
Allowed Lucene queries: the _alias tag and a single value (possibly wildcarded).
Examples:
 _alias:my-project
 _alias:_origin
 _alias:*pr*
Supported in serverless only. |
| `search_type?` | [`SearchType`](SearchType.md) | The type of the search operation. |
| `rest_total_hits_as_int?` | `boolean` | If `true`, the response returns `hits.total` as an integer.
If `false`, it returns `hits.total` as an object. |
| `typed_keys?` | `boolean` | If `true`, the response prefixes aggregation and suggester names with their respective types. |
| `search_templates?` | [`MsearchTemplateRequestItem`](MsearchTemplateRequestItem.md)[] | - |
| `body?` | `string | { [key: string]: any } & { index?: never, ccs_minimize_roundtrips?: never, max_concurrent_searches?: never, project_routing?: never, search_type?: never, rest_total_hits_as_int?: never, typed_keys?: never, search_templates?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { index?: never, ccs_minimize_roundtrips?: never, max_concurrent_searches?: never, project_routing?: never, search_type?: never, rest_total_hits_as_int?: never, typed_keys?: never, search_templates?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
