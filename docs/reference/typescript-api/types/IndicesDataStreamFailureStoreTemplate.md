# IndicesDataStreamFailureStoreTemplate

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `enabled?` | `boolean | null` | If defined, it turns the failure store on/off (`true`/`false`) for this data stream. A data stream failure store
that's disabled (enabled: `false`) will redirect no new failed indices to the failure store; however, it will
not remove any existing data from the failure store. |
| `lifecycle?` | `IndicesFailureStoreLifecycleTemplate | null` | If defined, it specifies the lifecycle configuration for the failure store of this data stream. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
