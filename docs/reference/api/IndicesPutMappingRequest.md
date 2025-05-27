## Interface `IndicesPutMappingRequest`

| Name | Type | Description |
| - | - | - |
| `_field_names` | [MappingFieldNamesField](./MappingFieldNamesField.md) | Control whether field names are enabled for the index. |
| `_meta` | [Metadata](./Metadata.md) | A mapping type can have custom meta data associated with it. These are not used at all by Elasticsearch, but can be used to store application-specific metadata. |
| `_routing` | [MappingRoutingField](./MappingRoutingField.md) | Enable making a routing value required on indexed documents. |
| `_source` | [MappingSourceField](./MappingSourceField.md) | Control whether the _source field is enabled on the index. |
| `allow_no_indices` | boolean | If `false`, the request returns an error if any wildcard expression, index alias, or `_all` value targets only missing or closed indices. This behavior applies even if the request targets other open indices. |
| `body` | string | ({ [key: string]: any; } & { index?: never; allow_no_indices?: never; expand_wildcards?: never; ignore_unavailable?: never; master_timeout?: never; timeout?: never; write_index_only?: never; date_detection?: never; dynamic?: never; dynamic_date_formats?: never; dynamic_templates?: never; _field_names?: never; _meta?: never; numeric_detection?: never; properties?: never; _routing?: never; _source?: never; runtime?: never; }) | All values in `body` will be added to the request body. |
| `date_detection` | boolean | Controls whether dynamic date detection is enabled. |
| `dynamic_date_formats` | string[] | If date detection is enabled then new string fields are checked against 'dynamic_date_formats' and if the value matches then a new date field is added instead of string. |
| `dynamic_templates` | [Partial](./Partial.md)<Record<string, [MappingDynamicTemplate](./MappingDynamicTemplate.md)>>[] | Specify dynamic templates for the mapping. |
| `dynamic` | [MappingDynamicMapping](./MappingDynamicMapping.md) | Controls whether new fields are added dynamically. |
| `expand_wildcards` | [ExpandWildcards](./ExpandWildcards.md) | Type of index that wildcard patterns can match. If the request can target data streams, this argument determines whether wildcard expressions match hidden data streams. Supports comma-separated values, such as `open,hidden`. Valid values are: `all`, `open`, `closed`, `hidden`, `none`. |
| `ignore_unavailable` | boolean | If `false`, the request returns an error if it targets a missing or closed index. |
| `index` | [Indices](./Indices.md) | A comma-separated list of index names the mapping should be added to (supports wildcards); use `_all` or omit to add the mapping on all indices. |
| `master_timeout` | [Duration](./Duration.md) | Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error. |
| `numeric_detection` | boolean | Automatically map strings into numeric data types for all fields. |
| `properties` | Record<[PropertyName](./PropertyName.md), [MappingProperty](./MappingProperty.md)> | Mapping for a field. For new fields, this mapping can include: - Field name - Field data type - Mapping parameters |
| `querystring` | { [key: string]: any; } & { index?: never; allow_no_indices?: never; expand_wildcards?: never; ignore_unavailable?: never; master_timeout?: never; timeout?: never; write_index_only?: never; date_detection?: never; dynamic?: never; dynamic_date_formats?: never; dynamic_templates?: never; _field_names?: never; _meta?: never; numeric_detection?: never; properties?: never; _routing?: never; _source?: never; runtime?: never; } | All values in `querystring` will be added to the request querystring. |
| `runtime` | [MappingRuntimeFields](./MappingRuntimeFields.md) | Mapping of runtime fields for the index. |
| `timeout` | [Duration](./Duration.md) | Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error. |
| `write_index_only` | boolean | If `true`, the mappings are applied only to the current write index for the target. |
