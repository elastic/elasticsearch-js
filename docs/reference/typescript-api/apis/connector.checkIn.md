# Client.connector.checkIn

Check in a connector. Update the `last_seen` field in the connector and set it to the current timestamp.

## Method Signature

```typescript
client.connector.checkIn(this: That, params: T.ConnectorCheckInRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.ConnectorCheckInResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`ConnectorCheckInRequest`](../types/ConnectorCheckInRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.ConnectorCheckInResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
