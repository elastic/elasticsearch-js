# Client.eql.delete

Delete an async EQL search. Delete an async EQL search or a stored synchronous EQL search. The API also deletes results for the search.

## Method Signature

```typescript
client.eql.delete(this: That, params: T.EqlDeleteRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.EqlDeleteResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`EqlDeleteRequest`](../types/EqlDeleteRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.EqlDeleteResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
