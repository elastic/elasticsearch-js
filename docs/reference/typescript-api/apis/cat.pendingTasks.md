# Client.cat.pendingTasks

Get pending task information. Get information about cluster-level changes that have not yet taken effect. IMPORTANT: cat APIs are only intended for human consumption using the command line or Kibana console. They are not intended for use by applications. For application consumption, use the pending cluster tasks API.

## Method Signature

```typescript
client.cat.pendingTasks(this: That, params?: T.CatPendingTasksRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.CatPendingTasksResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`CatPendingTasksRequest`](../types/CatPendingTasksRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.CatPendingTasksResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
