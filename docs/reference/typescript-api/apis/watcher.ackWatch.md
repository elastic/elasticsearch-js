# Client.watcher.ackWatch

Acknowledge a watch. Acknowledging a watch enables you to manually throttle the execution of the watch's actions. The acknowledgement state of an action is stored in the `status.actions.<id>.ack.state` structure. IMPORTANT: If the specified watch is currently being executed, this API will return an error The reason for this behavior is to prevent overwriting the watch status from a watch execution. Acknowledging an action throttles further executions of that action until its `ack.state` is reset to `awaits_successful_execution`. This happens when the condition of the watch is not met (the condition evaluates to false). To demonstrate how throttling works in practice and how it can be configured for individual actions within a watch, refer to External documentation.

## Method Signature

```typescript
client.watcher.ackWatch(this: That, params: T.WatcherAckWatchRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.WatcherAckWatchResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`WatcherAckWatchRequest`](../types/WatcherAckWatchRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.WatcherAckWatchResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
