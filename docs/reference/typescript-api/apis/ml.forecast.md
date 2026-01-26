# Client.ml.forecast

Predict future behavior of a time series. Forecasts are not supported for jobs that perform population analysis; an error occurs if you try to create a forecast for a job that has an `over_field_name` in its configuration. Forcasts predict future behavior based on historical data.

## Method Signature

```typescript
client.ml.forecast(this: That, params: T.MlForecastRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.MlForecastResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`MlForecastRequest`](../types/MlForecastRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.MlForecastResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
