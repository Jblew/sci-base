# sci-base

Personal scientific database. Here I provide bibtex citation keys for my academic papers. They are available through the `jblewandowski-lib.bib` file. You can download contents of the file using the following url: `https://raw.githubusercontent.com/Jblew/sci-base/main/jblewandowski-lib.bib` (this also works in CICD scripts). Please [email me](https://cv.jblewandowski.com/) or open issue if you would like to learn how to setup a CICD pipeline for collaborative paper editing.

## Usage with automatic paper builder

This database can be used together with my [markdown2paper](https://github.com/Jblew/markdown2paper/) scientific paper builder. You just need to supply the url to raw file in github repository.

Here is an example I used for my upcoming chapter on gamification in medical simulation:

```yaml
bibPath: "https://raw.githubusercontent.com/Jblew/sci-base/main/jblewandowski-lib.bib"
outlinePath: index.md
outPath: README.md
```

More details is available in the [markdown2paper docs](https://github.com/Jblew/markdown2paper/).

***

With 😇 by [Jędrzej Bogumił Lewandowski](https://jblewandowski.com/)
