# IngestInferenceProcessor

## Interface

### Extends

- [`IngestProcessorBase`](IngestProcessorBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `model_id` | [`Id`](Id.md) | The ID or alias for the trained model, or the ID of the deployment. |
| `target_field?` | [`Field`](Field.md) | Field added to incoming documents to contain results objects. |
| `field_map?` | `Record<Field, any>` | Maps the document field names to the known field names of the model.
This mapping takes precedence over any default mappings provided in the model configuration. |
| `inference_config?` | [`IngestInferenceConfig`](IngestInferenceConfig.md) | Contains the inference type and its options. |
| `input_output?` | `IngestInputConfig | IngestInputConfig`[] | Input fields for inference and output (destination) fields for the inference results.
This option is incompatible with the target_field and field_map options. |
| `ignore_missing?` | `boolean` | If true and any of the input fields defined in input_ouput are missing
then those missing fields are quietly ignored, otherwise a missing field causes a failure.
Only applies when using input_output configurations to explicitly list the input fields. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
