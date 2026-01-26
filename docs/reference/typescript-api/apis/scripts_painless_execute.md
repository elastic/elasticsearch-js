# Client.scripts_painless_execute

Run a script. Runs a script and returns a result. Use this API to build and test scripts, such as when defining a script for a runtime field. This API requires very few dependencies and is especially useful if you don't have permissions to write documents on a cluster. The API uses several _contexts_, which control how scripts are run, what variables are available at runtime, and what the return type is. Each context requires a script, but additional parameters depend on the context you're using for that script.

## Method Signature

```typescript
client.scripts_painless_execute(this: That, params?: T.ScriptsPainlessExecuteRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.ScriptsPainlessExecuteResponse<TResult>>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`ScriptsPainlessExecuteRequest`](../types/ScriptsPainlessExecuteRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.ScriptsPainlessExecuteResponse<TResult>>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
