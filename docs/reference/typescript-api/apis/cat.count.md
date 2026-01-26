# Client.cat.count

Get a document count. Get quick access to a document count for a data stream, an index, or an entire cluster. The document count only includes live documents, not deleted documents which have not yet been removed by the merge process. IMPORTANT: CAT APIs are only intended for human consumption using the command line or Kibana console. They are not intended for use by applications. For application consumption, use the count API.

## Method Signature

```typescript
client.cat.count(this: That, params?: T.CatCountRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.CatCountResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`CatCountRequest`](../types/CatCountRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.CatCountResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
