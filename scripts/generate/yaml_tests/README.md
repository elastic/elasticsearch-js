Download the yaml suite's test specs, runs before each run of the suite to ensure they are up to date, and will re-downloaded every day.

to run, call `grunt` or for this specific task, `grunt generate:yaml_suite`.

To force a regen, delete the old `test/integration/yaml_suite/tests` directory.
