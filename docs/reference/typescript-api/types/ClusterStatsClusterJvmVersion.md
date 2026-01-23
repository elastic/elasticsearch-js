# ClusterStatsClusterJvmVersion

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `bundled_jdk` | `boolean` | Always `true`. All distributions come with a bundled Java Development Kit (JDK). |
| `count` | [`integer`](integer.md) | Total number of selected nodes using JVM. |
| `using_bundled_jdk` | `boolean` | If `true`, a bundled JDK is in use by JVM. |
| `version` | [`VersionString`](VersionString.md) | Version of JVM used by one or more selected nodes. |
| `vm_name` | `string` | Name of the JVM. |
| `vm_vendor` | `string` | Vendor of the JVM. |
| `vm_version` | [`VersionString`](VersionString.md) | Full version number of JVM.
The full version number includes a plus sign (+) followed by the build number. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
