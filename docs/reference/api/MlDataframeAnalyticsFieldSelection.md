# `MlDataframeAnalyticsFieldSelection` [interface-MlDataframeAnalyticsFieldSelection]

| Name | Type | Description |
| - | - | - |
| `feature_type` | string | The feature type of this field for the analysis. May be categorical or numerical. |
| `is_included` | boolean | Whether the field is selected to be included in the analysis. |
| `is_required` | boolean | Whether the field is required. |
| `mapping_types` | string[] | The mapping types of the field. |
| `name` | [Field](./Field.md) | The field name. |
| `reason` | string | The reason a field is not selected to be included in the analysis. |
