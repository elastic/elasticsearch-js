# Client.search_application.delete

Delete a search application. Remove a search application and its associated alias. Indices attached to the search application are not removed.

## Method Signature

```typescript
client.search_application.delete(this: That, params: T.SearchApplicationDeleteRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SearchApplicationDeleteResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`SearchApplicationDeleteRequest`](../types/SearchApplicationDeleteRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.SearchApplicationDeleteResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
