# action-rm-labels

Github action that remove a label or a list of labels on an issue or a PR

Inputs:

- github_token {string, mandatory}: A github token. You can use regular secrets.GITHUB_TOKEN provided by default

- labels {string, mandatory}: The label(s) name(s) that will be remove. If several, separate with comma

```yaml
name: Clean Closed Issues

on:
  issues:
    types: [closed, deleted]

jobs:
  job1:
    name: Remove Labels
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - uses: Jallegre/action-rm-labels@v1
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          labels: "status: in progress,status: review,status: blocked"
```
