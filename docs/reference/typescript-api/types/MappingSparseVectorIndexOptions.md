# MappingSparseVectorIndexOptions

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `prune?` | `boolean` | Whether to perform pruning, omitting the non-significant tokens from the query to improve query performance.
If prune is true but the pruning_config is not specified, pruning will occur but default values will be used.
Default: false |
| `pruning_config?` | [`TokenPruningConfig`](TokenPruningConfig.md) | Optional pruning configuration.
If enabled, this will omit non-significant tokens from the query in order to improve query performance.
This is only used if prune is set to true.
If prune is set to true but pruning_config is not specified, default values will be used. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
