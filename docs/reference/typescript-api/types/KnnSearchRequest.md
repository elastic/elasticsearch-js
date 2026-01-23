# KnnSearchRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `index` | [`Indices`](Indices.md) | A comma-separated list of index names to search;
use `_all` or to perform the operation on all indices. |
| `routing?` | [`Routing`](Routing.md) | A comma-separated list of specific routing values. |
| `_source?` | [`SearchSourceConfig`](SearchSourceConfig.md) | Indicates which source fields are returned for matching documents. These
fields are returned in the `hits._source` property of the search response. |
| `docvalue_fields?` | `(QueryDslFieldAndFormat | Field)[]` | The request returns doc values for field names matching these patterns
in the `hits.fields` property of the response.
It accepts wildcard (`*`) patterns. |
| `stored_fields?` | [`Fields`](Fields.md) | A list of stored fields to return as part of a hit. If no fields are specified,
no stored fields are included in the response. If this field is specified, the `_source`
parameter defaults to `false`. You can pass `_source: true` to return both source fields
and stored fields in the search response. |
| `fields?` | [`Fields`](Fields.md) | The request returns values for field names matching these patterns
in the `hits.fields` property of the response.
It accepts wildcard (`*`) patterns. |
| `filter?` | `QueryDslQueryContainer | QueryDslQueryContainer[]` | A query to filter the documents that can match. The kNN search will return the top
`k` documents that also match this filter. The value can be a single query or a
list of queries. If `filter` isn't provided, all documents are allowed to match. |
| `knn` | [`KnnSearchKnnSearchQuery`](KnnSearchKnnSearchQuery.md) | The kNN query to run. |
| `body?` | `string | { [key: string]: any } & { index?: never, routing?: never, _source?: never, docvalue_fields?: never, stored_fields?: never, fields?: never, filter?: never, knn?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { index?: never, routing?: never, _source?: never, docvalue_fields?: never, stored_fields?: never, fields?: never, filter?: never, knn?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
