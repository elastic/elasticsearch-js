# Client.exists_source

Check for a document source. Check whether a document source exists in an index. For example: ``` HEAD my-index-000001/_source/1 ``` A document's source is not available if it is disabled in the mapping.

## Method Signature

```typescript
client.exists_source(this: That, params: T.ExistsSourceRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.ExistsSourceResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`ExistsSourceRequest`](../types/ExistsSourceRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.ExistsSourceResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
