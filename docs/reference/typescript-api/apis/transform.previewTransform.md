# Client.transform.previewTransform

Preview a transform. Generates a preview of the results that you will get when you create a transform with the same configuration. It returns a maximum of 100 results. The calculations are based on all the current data in the source index. It also generates a list of mappings and settings for the destination index. These values are determined based on the field types of the source index and the transform aggregations.

## Method Signature

```typescript
client.transform.previewTransform(this: That, params?: T.TransformPreviewTransformRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.TransformPreviewTransformResponse<TTransform>>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`TransformPreviewTransformRequest`](../types/TransformPreviewTransformRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.TransformPreviewTransformResponse<TTransform>>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
