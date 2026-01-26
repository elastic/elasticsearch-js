# Client.indices.delete

Delete indices. Deleting an index deletes its documents, shards, and metadata. It does not delete related Kibana components, such as data views, visualizations, or dashboards. You cannot delete the current write index of a data stream. To delete the index, you must roll over the data stream so a new write index is created. You can then use the delete index API to delete the previous write index.

## Method Signature

```typescript
client.indices.delete(this: That, params: T.IndicesDeleteRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.IndicesDeleteResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`IndicesDeleteRequest`](../types/IndicesDeleteRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.IndicesDeleteResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
