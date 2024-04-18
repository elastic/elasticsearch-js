---
name: 💥 Regression Report
about: Report unexpected behavior that worked in previous versions
labels: ["Category: Bug"]
body:
  - type: markdown
    attributes:
      value: |
        It's not uncommon that somebody already opened an issue or in the best case it's already fixed but not merged. That's the reason why you should [search](https://github.com/elastic/elasticsearch-js/issues) at first before submitting a new one.

        **Please read this entire template before posting any issue. If you ignore these instructions
        and post an issue here that does not follow the instructions, your issue might be closed,
        locked, and assigned the `Category: Not an issue` label.**

  - type: textarea
    id: report
    attributes:
      label: Regression report
      description: A clear and concise description of what the regression is.
    validations:
      required: true

  - type: input
    id: last-working-version
    attributes:
      label: Last working version
      description: Version of `@elastic/elasticsearch` where this last worked.
    validations:
      required: true

  - type: textarea
    id: to-reproduce
    attributes:
      label: To reproduce
      description: |
        Paste your code here that shows how to reproduce the behavior.

        In some cases, it might be challenging to reproduce the bug in a few lines of code.
        You can fork the following repository, which contains all the configuration needed to spin up a three nodes Elasticsearch cluster with security enabled.
        [This repository](https://github.com/delvedor/es-reproduce-issue) also contains a preconfigured client instance that you can use to reproduce the issue.
    validations:
      required: true

  - type: textarea
    id: expected-behavior
    attributes:
      label: Expected behavior
      description: A clear and concise description of what you expected to happen.
    validations:
      required: true

  - type: input
    id: node-version
    attributes:
      label: Node.js version
      description: What version of Node.js you are using (`node --version`).
    validations:
      required: true

  - type: input
    id: typescript-version
    attributes:
      label: TypeScript version
      description: TypeScript version you are using, if applicable.

  - type: input
    id: elasticsearch-client-version
    attributes:
      label: Elasticsearch client version
      description: What version of `@elastic/elasticsearch` and `@elastic/transport` you are using (`npm ls -a | grep '@elastic'`).
    validations:
      required: true

  - type: input
    id: elasticsearch-version
    attributes:
      label: Elasticsearch server version
      description: What version of Elasticsearch you are using.
    validations:
      required: true

  - type: input
    id: operating-system
    attributes:
      label: Operating system
      description: What operating system you are running.
      placeholder: e.g. Linux, MacOS, Windows

  - type: textarea
    id: env-info
    attributes:
      label: Any other relevant environment information.
---
