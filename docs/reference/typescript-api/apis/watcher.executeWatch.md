# Client.watcher.executeWatch

Run a watch. This API can be used to force execution of the watch outside of its triggering logic or to simulate the watch execution for debugging purposes. For testing and debugging purposes, you also have fine-grained control on how the watch runs. You can run the watch without running all of its actions or alternatively by simulating them. You can also force execution by ignoring the watch condition and control whether a watch record would be written to the watch history after it runs. You can use the run watch API to run watches that are not yet registered by specifying the watch definition inline. This serves as great tool for testing and debugging your watches prior to adding them to Watcher. When Elasticsearch security features are enabled on your cluster, watches are run with the privileges of the user that stored the watches. If your user is allowed to read index `a`, but not index `b`, then the exact same set of rules will apply during execution of a watch. When using the run watch API, the authorization data of the user that called the API will be used as a base, instead of the information who stored the watch. Refer to the external documentation for examples of watch execution requests, including existing, customized, and inline watches.

## Method Signature

```typescript
client.watcher.executeWatch(this: That, params?: T.WatcherExecuteWatchRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.WatcherExecuteWatchResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`WatcherExecuteWatchRequest`](../types/WatcherExecuteWatchRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.WatcherExecuteWatchResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
