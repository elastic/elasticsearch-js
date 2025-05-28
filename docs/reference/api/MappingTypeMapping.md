# `MappingTypeMapping` [interface-MappingTypeMapping]

| Name | Type | Description |
| - | - | - |
| `_data_stream_timestamp` | [MappingDataStreamTimestamp](./MappingDataStreamTimestamp.md) | &nbsp; |
| `_field_names` | [MappingFieldNamesField](./MappingFieldNamesField.md) | &nbsp; |
| `_meta` | [Metadata](./Metadata.md) | &nbsp; |
| `_routing` | [MappingRoutingField](./MappingRoutingField.md) | &nbsp; |
| `_size` | [MappingSizeField](./MappingSizeField.md) | &nbsp; |
| `_source` | [MappingSourceField](./MappingSourceField.md) | &nbsp; |
| `all_field` | [MappingAllField](./MappingAllField.md) | &nbsp; |
| `date_detection` | boolean | &nbsp; |
| `dynamic_date_formats` | string[] | &nbsp; |
| `dynamic_templates` | [Partial](./Partial.md)<Record<string, [MappingDynamicTemplate](./MappingDynamicTemplate.md)>>[] | &nbsp; |
| `dynamic` | [MappingDynamicMapping](./MappingDynamicMapping.md) | &nbsp; |
| `enabled` | boolean | &nbsp; |
| `index_field` | [MappingIndexField](./MappingIndexField.md) | &nbsp; |
| `numeric_detection` | boolean | &nbsp; |
| `properties` | Record<[PropertyName](./PropertyName.md), [MappingProperty](./MappingProperty.md)> | &nbsp; |
| `runtime` | Record<string, [MappingRuntimeField](./MappingRuntimeField.md)> | &nbsp; |
| `subobjects` | [MappingSubobjects](./MappingSubobjects.md) | &nbsp; |
