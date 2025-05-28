# `ClusterStatsRuntimeFieldTypes` [interface-ClusterStatsRuntimeFieldTypes]

| Name | Type | Description |
| - | - | - |
| `chars_max` | [integer](./integer.md) | Maximum number of characters for a single runtime field script. |
| `chars_total` | [integer](./integer.md) | Total number of characters for the scripts that define the current runtime field data type. |
| `count` | [integer](./integer.md) | Number of runtime fields mapped to the field data type in selected nodes. |
| `doc_max` | [integer](./integer.md) | Maximum number of accesses to doc_values for a single runtime field script |
| `doc_total` | [integer](./integer.md) | Total number of accesses to doc_values for the scripts that define the current runtime field data type. |
| `index_count` | [integer](./integer.md) | Number of indices containing a mapping of the runtime field data type in selected nodes. |
| `lang` | string[] | Script languages used for the runtime fields scripts. |
| `lines_max` | [integer](./integer.md) | Maximum number of lines for a single runtime field script. |
| `lines_total` | [integer](./integer.md) | Total number of lines for the scripts that define the current runtime field data type. |
| `name` | [Name](./Name.md) | Field data type used in selected nodes. |
| `scriptless_count` | [integer](./integer.md) | Number of runtime fields that don’t declare a script. |
| `shadowed_count` | [integer](./integer.md) | Number of runtime fields that shadow an indexed field. |
| `source_max` | [integer](./integer.md) | Maximum number of accesses to _source for a single runtime field script. |
| `source_total` | [integer](./integer.md) | Total number of accesses to _source for the scripts that define the current runtime field data type. |
