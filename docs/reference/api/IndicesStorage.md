## Interface `IndicesStorage`

| Name | Type | Description |
| - | - | - |
| `allow_mmap` | boolean | You can restrict the use of the mmapfs and the related hybridfs store type via the setting node.store.allow_mmap. This is a boolean setting indicating whether or not memory-mapping is allowed. The default is to allow it. This setting is useful, for example, if you are in an environment where you can not control the ability to create a lot of memory maps so you need disable the ability to use memory-mapping. |
| `type` | [IndicesStorageType](./IndicesStorageType.md) | &nbsp; |
