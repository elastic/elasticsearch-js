## Interface `NodesRepositoryMeteringInformation`

| Name | Type | Description |
| - | - | - |
| `archived` | boolean | A flag that tells whether or not this object has been archived. When a repository is closed or updated the repository metering information is archived and kept for a certain period of time. This allows retrieving the repository metering information of previous repository instantiations. |
| `cluster_version` | [VersionNumber](./VersionNumber.md) | The cluster state version when this object was archived, this field can be used as a logical timestamp to delete all the archived metrics up to an observed version. This field is only present for archived repository metering information objects. The main purpose of this field is to avoid possible race conditions during repository metering information deletions, i.e. deleting archived repositories metering information that we haven’t observed yet. |
| `repository_ephemeral_id` | [Id](./Id.md) | An identifier that changes every time the repository is updated. |
| `repository_location` | [NodesRepositoryLocation](./NodesRepositoryLocation.md) | Represents an unique location within the repository. |
| `repository_name` | [Name](./Name.md) | Repository name. |
| `repository_started_at` | [EpochTime](./EpochTime.md)<[UnitMillis](./UnitMillis.md)> | Time the repository was created or updated. Recorded in milliseconds since the Unix Epoch. |
| `repository_stopped_at` | [EpochTime](./EpochTime.md)<[UnitMillis](./UnitMillis.md)> | Time the repository was deleted or updated. Recorded in milliseconds since the Unix Epoch. |
| `repository_type` | string | Repository type. |
| `request_counts` | [NodesRequestCounts](./NodesRequestCounts.md) | An object with the number of request performed against the repository grouped by request type. |
