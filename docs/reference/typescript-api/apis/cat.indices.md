# Client.cat.indices

Get index information. Get high-level information about indices in a cluster, including backing indices for data streams. Use this request to get the following information for each index in a cluster: - shard count - document count - deleted document count - primary store size - total store size of all shards, including shard replicas These metrics are retrieved directly from Lucene, which Elasticsearch uses internally to power indexing and search. As a result, all document counts include hidden nested documents. To get an accurate count of Elasticsearch documents, use the cat count or count APIs. CAT APIs are only intended for human consumption using the command line or Kibana console. They are not intended for use by applications. For application consumption, use an index endpoint.

## Method Signature

```typescript
client.cat.indices(this: That, params?: T.CatIndicesRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.CatIndicesResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`CatIndicesRequest`](../types/CatIndicesRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.CatIndicesResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
