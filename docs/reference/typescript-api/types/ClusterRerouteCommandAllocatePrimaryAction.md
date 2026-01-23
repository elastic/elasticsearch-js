# ClusterRerouteCommandAllocatePrimaryAction

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `index` | [`IndexName`](IndexName.md) | - |
| `shard` | `integer` | - |
| `node` | `string` | - |
| `accept_data_loss` | `boolean` | If a node which has a copy of the data rejoins the cluster later on, that data will be deleted. To ensure that these implications are well-understood, this command requires the flag accept_data_loss to be explicitly set to true |

## See Also

- [All Types](./)
- [API Methods](../index.md)
