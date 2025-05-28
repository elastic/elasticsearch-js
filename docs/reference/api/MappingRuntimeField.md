# `MappingRuntimeField` [interface-MappingRuntimeField]

| Name | Type | Description |
| - | - | - |
| `fetch_fields` | ([MappingRuntimeFieldFetchFields](./MappingRuntimeFieldFetchFields.md) | [Field](./Field.md))[] | For type `lookup` |
| `fields` | Record<string, [MappingCompositeSubField](./MappingCompositeSubField.md)> | For type `composite` |
| `format` | string | A custom format for `date` type runtime fields. |
| `input_field` | [Field](./Field.md) | For type `lookup` |
| `script` | [Script](./Script.md) | [ScriptSource](./ScriptSource.md) | Painless script executed at query time. |
| `target_field` | [Field](./Field.md) | For type `lookup` |
| `target_index` | [IndexName](./IndexName.md) | For type `lookup` |
| `type` | [MappingRuntimeFieldType](./MappingRuntimeFieldType.md) | Field type, which can be: `boolean`, `composite`, `date`, `double`, `geo_point`, `ip`, `keyword`, `long`, or `lookup`. |
