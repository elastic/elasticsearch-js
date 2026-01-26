# Client.migration.deprecations

Get deprecation information. Get information about different cluster, node, and index level settings that use deprecated features that will be removed or changed in the next major version. TIP: This APIs is designed for indirect use by the Upgrade Assistant. You are strongly recommended to use the Upgrade Assistant.

## Method Signature

```typescript
client.migration.deprecations(this: That, params?: T.MigrationDeprecationsRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.MigrationDeprecationsResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`MigrationDeprecationsRequest`](../types/MigrationDeprecationsRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.MigrationDeprecationsResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
