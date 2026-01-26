# Client.transform.startTransform

Start a transform. When you start a transform, it creates the destination index if it does not already exist. The `number_of_shards` is set to `1` and the `auto_expand_replicas` is set to `0-1`. If it is a pivot transform, it deduces the mapping definitions for the destination index from the source indices and the transform aggregations. If fields in the destination index are derived from scripts (as in the case of `scripted_metric` or `bucket_script` aggregations), the transform uses dynamic mappings unless an index template exists. If it is a latest transform, it does not deduce mapping definitions; it uses dynamic mappings. To use explicit mappings, create the destination index before you start the transform. Alternatively, you can create an index template, though it does not affect the deduced mappings in a pivot transform. When the transform starts, a series of validations occur to ensure its success. If you deferred validation when you created the transform, they occur when you start the transform—with the exception of privilege checks. When Elasticsearch security features are enabled, the transform remembers which roles the user that created it had at the time of creation and uses those same roles. If those roles do not have the required privileges on the source and destination indices, the transform fails when it attempts unauthorized operations.

## Method Signature

```typescript
client.transform.startTransform(this: That, params: T.TransformStartTransformRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.TransformStartTransformResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`TransformStartTransformRequest`](../types/TransformStartTransformRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.TransformStartTransformResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
