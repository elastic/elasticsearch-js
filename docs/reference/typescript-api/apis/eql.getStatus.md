# Client.eql.getStatus

Get the async EQL status. Get the current status for an async EQL search or a stored synchronous EQL search without returning results.

## Method Signature

```typescript
client.eql.getStatus(this: That, params: T.EqlGetStatusRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.EqlGetStatusResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`EqlGetStatusRequest`](../types/EqlGetStatusRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.EqlGetStatusResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
