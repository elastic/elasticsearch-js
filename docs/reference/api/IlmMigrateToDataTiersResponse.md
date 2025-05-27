## Interface `IlmMigrateToDataTiersResponse`

| Name | Type | Description |
| - | - | - |
| `dry_run` | boolean | &nbsp; |
| `migrated_component_templates` | string[] | The component templates that were updated to not contain custom routing settings for the provided data attribute. |
| `migrated_composable_templates` | string[] | The composable index templates that were updated to not contain custom routing settings for the provided data attribute. |
| `migrated_ilm_policies` | string[] | The ILM policies that were updated. |
| `migrated_indices` | [Indices](./Indices.md) | The indices that were migrated to tier preference routing. |
| `migrated_legacy_templates` | string[] | The legacy index templates that were updated to not contain custom routing settings for the provided data attribute. |
| `removed_legacy_template` | string | The name of the legacy index template that was deleted. This information is missing if no legacy index templates were deleted. |
