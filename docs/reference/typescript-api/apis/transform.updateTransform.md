# Client.transform.updateTransform

Update a transform. Updates certain properties of a transform. All updated properties except `description` do not take effect until after the transform starts the next checkpoint, thus there is data consistency in each checkpoint. To use this API, you must have `read` and `view_index_metadata` privileges for the source indices. You must also have `index` and `read` privileges for the destination index. When Elasticsearch security features are enabled, the transform remembers which roles the user who updated it had at the time of update and runs with those privileges.

## Method Signature

```typescript
client.transform.updateTransform(this: That, params: T.TransformUpdateTransformRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.TransformUpdateTransformResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`TransformUpdateTransformRequest`](../types/TransformUpdateTransformRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.TransformUpdateTransformResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
