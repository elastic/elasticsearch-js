# ProjectTagsRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `project_routing?` | `string` | A Lucene query using project metadata tags used to filter which projects are returned in the response, such as _alias:_origin or _alias:*pr*. |
| `body?` | `string | { [key: string]: any } & { project_routing?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { project_routing?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
