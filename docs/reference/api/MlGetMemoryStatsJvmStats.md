## Interface `MlGetMemoryStatsJvmStats`

| Name | Type | Description |
| - | - | - |
| `heap_max_in_bytes` | [integer](./integer.md) | Maximum amount of memory, in bytes, available for use by the heap. |
| `heap_max` | [ByteSize](./ByteSize.md) | Maximum amount of memory available for use by the heap. |
| `java_inference_in_bytes` | [integer](./integer.md) | Amount of Java heap, in bytes, currently being used for caching inference models. |
| `java_inference_max_in_bytes` | [integer](./integer.md) | Maximum amount of Java heap, in bytes, to be used for caching inference models. |
| `java_inference_max` | [ByteSize](./ByteSize.md) | Maximum amount of Java heap to be used for caching inference models. |
| `java_inference` | [ByteSize](./ByteSize.md) | Amount of Java heap currently being used for caching inference models. |
