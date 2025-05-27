## Interface `RollupGetJobsRollupJob`

| Name | Type | Description |
| - | - | - |
| `config` | [RollupGetJobsRollupJobConfiguration](./RollupGetJobsRollupJobConfiguration.md) | The rollup job configuration. |
| `stats` | [RollupGetJobsRollupJobStats](./RollupGetJobsRollupJobStats.md) | Transient statistics about the rollup job, such as how many documents have been processed and how many rollup summary docs have been indexed. These stats are not persisted. If a node is restarted, these stats are reset. |
| `status` | [RollupGetJobsRollupJobStatus](./RollupGetJobsRollupJobStatus.md) | The current status of the indexer for the rollup job. |
