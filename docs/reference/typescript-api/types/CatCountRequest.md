# CatCountRequest

## Interface

### Extends

- [`CatCatRequestBase`](CatCatRequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `index?` | [`Indices`](Indices.md) | A comma-separated list of data streams, indices, and aliases used to limit the request.
It supports wildcards (`*`).
To target all data streams and indices, omit this parameter or use `*` or `_all`. |
| `h?` | [`CatCatCountColumns`](CatCatCountColumns.md) | A comma-separated list of columns names to display. It supports simple wildcards. |
| `s?` | [`Names`](Names.md) | List of columns that determine how the table should be sorted.
Sorting defaults to ascending and can be changed by setting `:asc`
or `:desc` as a suffix to the column name. |
| `project_routing?` | [`ProjectRouting`](ProjectRouting.md) | Specifies a subset of projects to target using project
metadata tags in a subset of Lucene query syntax.
Allowed Lucene queries: the _alias tag and a single value (possibly wildcarded).
Examples:
 _alias:my-project
 _alias:_origin
 _alias:*pr*
Supported in serverless only. |
| `body?` | `string | { [key: string]: any } & { index?: never, h?: never, s?: never, project_routing?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { index?: never, h?: never, s?: never, project_routing?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
