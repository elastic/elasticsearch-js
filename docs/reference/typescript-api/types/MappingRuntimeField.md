# MappingRuntimeField

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `fields?` | `Record<string, MappingCompositeSubField>` | For type `composite` |
| `fetch_fields?` | `(MappingRuntimeFieldFetchFields | Field)`[] | For type `lookup` |
| `format?` | `string` | A custom format for `date` type runtime fields. |
| `input_field?` | [`Field`](Field.md) | For type `lookup` |
| `target_field?` | [`Field`](Field.md) | For type `lookup` |
| `target_index?` | [`IndexName`](IndexName.md) | For type `lookup` |
| `script?` | `Script | ScriptSource` | Painless script executed at query time. |
| `type` | [`MappingRuntimeFieldType`](MappingRuntimeFieldType.md) | Field type, which can be: `boolean`, `composite`, `date`, `double`, `geo_point`, `ip`,`keyword`, `long`, or `lookup`. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
