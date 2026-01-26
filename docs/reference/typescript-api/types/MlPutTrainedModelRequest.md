# MlPutTrainedModelRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `model_id` | [`Id`](Id.md) | The unique identifier of the trained model. |
| `defer_definition_decompression?` | `boolean` | If set to `true` and a `compressed_definition` is provided,
the request defers definition decompression and skips relevant
validations. |
| `wait_for_completion?` | `boolean` | Whether to wait for all child operations (e.g. model download)
to complete. |
| `compressed_definition?` | `string` | The compressed (GZipped and Base64 encoded) inference definition of the
model. If compressed_definition is specified, then definition cannot be
specified. |
| `definition?` | [`MlPutTrainedModelDefinition`](MlPutTrainedModelDefinition.md) | The inference definition for the model. If definition is specified, then
compressed_definition cannot be specified. |
| `description?` | `string` | A human-readable description of the inference trained model. |
| `inference_config?` | [`MlInferenceConfigCreateContainer`](MlInferenceConfigCreateContainer.md) | The default configuration for inference. This can be either a regression
or classification configuration. It must match the underlying
definition.trained_model's target_type. For pre-packaged models such as
ELSER the config is not required. |
| `input?` | [`MlPutTrainedModelInput`](MlPutTrainedModelInput.md) | The input field names for the model definition. |
| `metadata?` | `any` | An object map that contains metadata about the model. |
| `model_type?` | [`MlTrainedModelType`](MlTrainedModelType.md) | The model type. |
| `model_size_bytes?` | [`long`](long.md) | The estimated memory usage in bytes to keep the trained model in memory.
This property is supported only if defer_definition_decompression is true
or the model definition is not supplied. |
| `platform_architecture?` | `string` | The platform architecture (if applicable) of the trained mode. If the model
only works on one platform, because it is heavily optimized for a particular
processor architecture and OS combination, then this field specifies which.
The format of the string must match the platform identifiers used by Elasticsearch,
so one of, `linux-x86_64`, `linux-aarch64`, `darwin-x86_64`, `darwin-aarch64`,
or `windows-x86_64`. For portable models (those that work independent of processor
architecture or OS features), leave this field unset. |
| `tags?` | `string`[] | An array of tags to organize the model. |
| `prefix_strings?` | [`MlTrainedModelPrefixStrings`](MlTrainedModelPrefixStrings.md) | Optional prefix strings applied at inference |
| `body?` | `string | { [key: string]: any } & { model_id?: never, defer_definition_decompression?: never, wait_for_completion?: never, compressed_definition?: never, definition?: never, description?: never, inference_config?: never, input?: never, metadata?: never, model_type?: never, model_size_bytes?: never, platform_architecture?: never, tags?: never, prefix_strings?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { model_id?: never, defer_definition_decompression?: never, wait_for_completion?: never, compressed_definition?: never, definition?: never, description?: never, inference_config?: never, input?: never, metadata?: never, model_type?: never, model_size_bytes?: never, platform_architecture?: never, tags?: never, prefix_strings?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
