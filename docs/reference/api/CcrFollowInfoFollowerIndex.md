## Interface `CcrFollowInfoFollowerIndex`

| Name | Type | Description |
| - | - | - |
| `follower_index` | [IndexName](./IndexName.md) | The name of the follower index. |
| `leader_index` | [IndexName](./IndexName.md) | The name of the index in the leader cluster that is followed. |
| `parameters` | [CcrFollowInfoFollowerIndexParameters](./CcrFollowInfoFollowerIndexParameters.md) | An object that encapsulates cross-cluster replication parameters. If the follower index's status is paused, this object is omitted. |
| `remote_cluster` | [Name](./Name.md) | The remote cluster that contains the leader index. |
| `status` | [CcrFollowInfoFollowerIndexStatus](./CcrFollowInfoFollowerIndexStatus.md) | The status of the index following: `active` or `paused`. |
