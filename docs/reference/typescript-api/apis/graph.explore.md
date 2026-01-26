# Client.graph.explore

Explore graph analytics. Extract and summarize information about the documents and terms in an Elasticsearch data stream or index. The easiest way to understand the behavior of this API is to use the Graph UI to explore connections. An initial request to the `_explore` API contains a seed query that identifies the documents of interest and specifies the fields that define the vertices and connections you want to include in the graph. Subsequent requests enable you to spider out from one more vertices of interest. You can exclude vertices that have already been returned.

## Method Signature

```typescript
client.graph.explore(this: That, params: T.GraphExploreRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.GraphExploreResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`GraphExploreRequest`](../types/GraphExploreRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.GraphExploreResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
