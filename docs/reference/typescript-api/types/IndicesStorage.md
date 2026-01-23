# IndicesStorage

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `type` | [`IndicesStorageType`](IndicesStorageType.md) | - |
| `allow_mmap?` | `boolean` | You can restrict the use of the mmapfs and the related hybridfs store type via the setting node.store.allow_mmap.
This is a boolean setting indicating whether or not memory-mapping is allowed. The default is to allow it. This
setting is useful, for example, if you are in an environment where you can not control the ability to create a lot
of memory maps so you need disable the ability to use memory-mapping. |
| `stats_refresh_interval?` | [`Duration`](Duration.md) | How often store statistics are refreshed |

## See Also

- [All Types](./)
- [API Methods](../index.md)
