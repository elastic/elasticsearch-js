## Interface `GraphExploreRequest`

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { index?: never; routing?: never; timeout?: never; connections?: never; controls?: never; query?: never; vertices?: never; }) | All values in `body` will be added to the request body. |
| `connections` | [GraphHop](./GraphHop.md) | Specifies or more fields from which you want to extract terms that are associated with the specified vertices. |
| `controls` | [GraphExploreControls](./GraphExploreControls.md) | Direct the Graph API how to build the graph. |
| `index` | [Indices](./Indices.md) | Name of the index. |
| `query` | [QueryDslQueryContainer](./QueryDslQueryContainer.md) | A seed query that identifies the documents of interest. Can be any valid Elasticsearch query. |
| `querystring` | { [key: string]: any; } & { index?: never; routing?: never; timeout?: never; connections?: never; controls?: never; query?: never; vertices?: never; } | All values in `querystring` will be added to the request querystring. |
| `routing` | [Routing](./Routing.md) | Custom value used to route operations to a specific shard. |
| `timeout` | [Duration](./Duration.md) | Specifies the period of time to wait for a response from each shard. If no response is received before the timeout expires, the request fails and returns an error. Defaults to no timeout. |
| `vertices` | [GraphVertexDefinition](./GraphVertexDefinition.md)[] | Specifies one or more fields that contain the terms you want to include in the graph as vertices. |
