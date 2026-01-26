# Client.async_search.status

Get the async search status. Get the status of a previously submitted async search request given its identifier, without retrieving search results. If the Elasticsearch security features are enabled, the access to the status of a specific async search is restricted to: * The user or API key that submitted the original async search request. * Users that have the `monitor` cluster privilege or greater privileges.

## Method Signature

```typescript
client.async_search.status(this: That, params: T.AsyncSearchStatusRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.AsyncSearchStatusResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`AsyncSearchStatusRequest`](../types/AsyncSearchStatusRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.AsyncSearchStatusResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
