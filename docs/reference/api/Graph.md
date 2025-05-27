## `Graph`

### Constructor

:::
new Graph(transport: [Transport](./Transport.md));
:::

### Properties

| Name | Type | Description |
| - | - | - |
| `acceptedParams` | Record<string, { path: string[]; body: string[]; query: string[]; }> | &nbsp; |
| `transport` | [Transport](./Transport.md) | &nbsp; |

### Methods

| Name | Signature | Description |
| - | - | - |
| `explore` | `explore(this: [That](./That.md), params: [GraphExploreRequest](./GraphExploreRequest.md), options?: [TransportRequestOptionsWithOutMeta](./TransportRequestOptionsWithOutMeta.md)): Promise<[GraphExploreResponse](./GraphExploreResponse.md)>;` | Explore graph analytics. Extract and summarize information about the documents and terms in an Elasticsearch data stream or index. The easiest way to understand the behavior of this API is to use the Graph UI to explore connections. An initial request to the `_explore` API contains a seed query that identifies the documents of interest and specifies the fields that define the vertices and connections you want to include in the graph. Subsequent requests enable you to spider out from one more vertices of interest. You can exclude vertices that have already been returned. |
| `explore` | `explore(this: [That](./That.md), params: [GraphExploreRequest](./GraphExploreRequest.md), options?: [TransportRequestOptionsWithMeta](./TransportRequestOptionsWithMeta.md)): Promise<[TransportResult](./TransportResult.md)<[GraphExploreResponse](./GraphExploreResponse.md), unknown>>;` | &nbsp; |
| `explore` | `explore(this: [That](./That.md), params: [GraphExploreRequest](./GraphExploreRequest.md), options?: [TransportRequestOptions](./TransportRequestOptions.md)): Promise<[GraphExploreResponse](./GraphExploreResponse.md)>;` | &nbsp; |
