# Client.close_point_in_time

Close a point in time. A point in time must be opened explicitly before being used in search requests. The `keep_alive` parameter tells Elasticsearch how long it should persist. A point in time is automatically closed when the `keep_alive` period has elapsed. However, keeping points in time has a cost; close them as soon as they are no longer required for search requests.

## Method Signature

```typescript
client.close_point_in_time(this: That, params: T.ClosePointInTimeRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.ClosePointInTimeResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`ClosePointInTimeRequest`](../types/ClosePointInTimeRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.ClosePointInTimeResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
