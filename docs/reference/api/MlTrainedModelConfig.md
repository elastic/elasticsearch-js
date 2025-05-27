## Interface `MlTrainedModelConfig`

| Name | Type | Description |
| - | - | - |
| `compressed_definition` | string | &nbsp; |
| `create_time` | [DateTime](./DateTime.md) | The time when the trained model was created. |
| `created_by` | string | Information on the creator of the trained model. |
| `default_field_map` | Record<string, string> | Any field map described in the inference configuration takes precedence. |
| `description` | string | The free-text description of the trained model. |
| `estimated_heap_memory_usage_bytes` | [integer](./integer.md) | The estimated heap usage in bytes to keep the trained model in memory. |
| `estimated_operations` | [integer](./integer.md) | The estimated number of operations to use the trained model. |
| `fully_defined` | boolean | True if the full model definition is present. |
| `inference_config` | [MlInferenceConfigCreateContainer](./MlInferenceConfigCreateContainer.md) | The default configuration for inference. This can be either a regression, classification, or one of the many NLP focused configurations. It must match the underlying definition.trained_model's target_type. For pre-packaged models such as ELSER the config is not required. |
| `input` | [MlTrainedModelConfigInput](./MlTrainedModelConfigInput.md) | The input field names for the model definition. |
| `license_level` | string | The license level of the trained model. |
| `location` | [MlTrainedModelLocation](./MlTrainedModelLocation.md) | &nbsp; |
| `metadata` | [MlTrainedModelConfigMetadata](./MlTrainedModelConfigMetadata.md) | An object containing metadata about the trained model. For example, models created by data frame analytics contain analysis_config and input objects. |
| `model_id` | [Id](./Id.md) | Identifier for the trained model. |
| `model_package` | [MlModelPackageConfig](./MlModelPackageConfig.md) | &nbsp; |
| `model_size_bytes` | [ByteSize](./ByteSize.md) | &nbsp; |
| `model_type` | [MlTrainedModelType](./MlTrainedModelType.md) | The model type |
| `platform_architecture` | string | &nbsp; |
| `prefix_strings` | [MlTrainedModelPrefixStrings](./MlTrainedModelPrefixStrings.md) | &nbsp; |
| `tags` | string[] | A comma delimited string of tags. A trained model can have many tags, or none. |
| `version` | [VersionString](./VersionString.md) | The Elasticsearch version number in which the trained model was created. |
