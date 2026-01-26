# Client.async_search.delete

Delete an async search. If the asynchronous search is still running, it is cancelled. Otherwise, the saved search results are deleted. If the Elasticsearch security features are enabled, the deletion of a specific async search is restricted to: the authenticated user that submitted the original search request; users that have the `cancel_task` cluster privilege.

## Method Signature

```typescript
client.async_search.delete(this: That, params: T.AsyncSearchDeleteRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.AsyncSearchDeleteResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`AsyncSearchDeleteRequest`](../types/AsyncSearchDeleteRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.AsyncSearchDeleteResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
