# Client.indices.refresh

Refresh an index. A refresh makes recent operations performed on one or more indices available for search. For data streams, the API runs the refresh operation on the stream’s backing indices. By default, Elasticsearch periodically refreshes indices every second, but only on indices that have received one search request or more in the last 30 seconds. You can change this default interval with the `index.refresh_interval` setting. In Elastic Cloud Serverless, the default refresh interval is 5 seconds across all indices. Refresh requests are synchronous and do not return a response until the refresh operation completes. Refreshes are resource-intensive. To ensure good cluster performance, it's recommended to wait for Elasticsearch's periodic refresh rather than performing an explicit refresh when possible. If your application workflow indexes documents and then runs a search to retrieve the indexed document, it's recommended to use the index API's `refresh=wait_for` query parameter option. This option ensures the indexing operation waits for a periodic refresh before running the search.

## Method Signature

```typescript
client.indices.refresh(this: That, params?: T.IndicesRefreshRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.IndicesRefreshResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`IndicesRefreshRequest`](../types/IndicesRefreshRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.IndicesRefreshResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
