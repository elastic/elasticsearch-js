# Client.info

Get cluster info. Get basic build, version, and cluster information. ::: In Serverless, this API is retained for backward compatibility only. Some response fields, such as the version number, should be ignored.

## Method Signature

```typescript
client.info(this: That, params?: T.InfoRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.InfoResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`InfoRequest`](../types/InfoRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.InfoResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
