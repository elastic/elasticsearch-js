# Client.indices.flush

Flush data streams or indices. Flushing a data stream or index is the process of making sure that any data that is currently only stored in the transaction log is also permanently stored in the Lucene index. When restarting, Elasticsearch replays any unflushed operations from the transaction log into the Lucene index to bring it back into the state that it was in before the restart. Elasticsearch automatically triggers flushes as needed, using heuristics that trade off the size of the unflushed transaction log against the cost of performing each flush. After each operation has been flushed it is permanently stored in the Lucene index. This may mean that there is no need to maintain an additional copy of it in the transaction log. The transaction log is made up of multiple files, called generations, and Elasticsearch will delete any generation files when they are no longer needed, freeing up disk space. It is also possible to trigger a flush on one or more indices using the flush API, although it is rare for users to need to call this API directly. If you call the flush API after indexing some documents then a successful response indicates that Elasticsearch has flushed all the documents that were indexed before the flush API was called.

## Method Signature

```typescript
client.indices.flush(this: That, params?: T.IndicesFlushRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.IndicesFlushResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`IndicesFlushRequest`](../types/IndicesFlushRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.IndicesFlushResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
