## Interface `IngestInferenceProcessor`

| Name | Type | Description |
| - | - | - |
| `field_map` | Record<[Field](./Field.md), any> | Maps the document field names to the known field names of the model. This mapping takes precedence over any default mappings provided in the model configuration. |
| `ignore_missing` | boolean | If true and any of the input fields defined in input_ouput are missing then those missing fields are quietly ignored, otherwise a missing field causes a failure. Only applies when using input_output configurations to explicitly list the input fields. |
| `inference_config` | [IngestInferenceConfig](./IngestInferenceConfig.md) | Contains the inference type and its options. |
| `input_output` | [IngestInputConfig](./IngestInputConfig.md) | [IngestInputConfig](./IngestInputConfig.md)[] | Input fields for inference and output (destination) fields for the inference results. This option is incompatible with the target_field and field_map options. |
| `model_id` | [Id](./Id.md) | The ID or alias for the trained model, or the ID of the deployment. |
| `target_field` | [Field](./Field.md) | Field added to incoming documents to contain results objects. |
