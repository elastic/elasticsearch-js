# Client.transform.upgradeTransforms

Upgrade all transforms. Transforms are compatible across minor versions and between supported major versions. However, over time, the format of transform configuration information may change. This API identifies transforms that have a legacy configuration format and upgrades them to the latest version. It also cleans up the internal data structures that store the transform state and checkpoints. The upgrade does not affect the source and destination indices. The upgrade also does not affect the roles that transforms use when Elasticsearch security features are enabled; the role used to read source data and write to the destination index remains unchanged. If a transform upgrade step fails, the upgrade stops and an error is returned about the underlying issue. Resolve the issue then re-run the process again. A summary is returned when the upgrade is finished. To ensure continuous transforms remain running during a major version upgrade of the cluster – for example, from 7.16 to 8.0 – it is recommended to upgrade transforms before upgrading the cluster. You may want to perform a recent cluster backup prior to the upgrade.

## Method Signature

```typescript
client.transform.upgradeTransforms(this: That, params?: T.TransformUpgradeTransformsRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.TransformUpgradeTransformsResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`TransformUpgradeTransformsRequest`](../types/TransformUpgradeTransformsRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.TransformUpgradeTransformsResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
