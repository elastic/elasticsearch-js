# Client.ml.deleteForecast

Delete forecasts from a job. By default, forecasts are retained for 14 days. You can specify a different retention period with the `expires_in` parameter in the forecast jobs API. The delete forecast API enables you to delete one or more forecasts before they expire.

## Method Signature

```typescript
client.ml.deleteForecast(this: That, params: T.MlDeleteForecastRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.MlDeleteForecastResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`MlDeleteForecastRequest`](../types/MlDeleteForecastRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.MlDeleteForecastResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
