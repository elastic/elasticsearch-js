# Client.transform.scheduleNowTransform

Schedule a transform to start now. Instantly run a transform to process data. If you run this API, the transform will process the new data instantly, without waiting for the configured frequency interval. After the API is called, the transform will be processed again at `now + frequency` unless the API is called again in the meantime.

## Method Signature

```typescript
client.transform.scheduleNowTransform(this: That, params: T.TransformScheduleNowTransformRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.TransformScheduleNowTransformResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`TransformScheduleNowTransformRequest`](../types/TransformScheduleNowTransformRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.TransformScheduleNowTransformResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
