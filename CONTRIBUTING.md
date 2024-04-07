# Contributing

Want to contribute?
Here are a couple of ways you can help us:

-   Reporting bugs
-   Submitting a fix
-   Translating
-   Proposing new features
-   Becoming a maintainer

## Translation

Currently, we only support English and Persian. You can help us add other languages. Take a look at our translation files as an example, located [here](src/i18n/en/translation.ts).
Feel free to report any mistakes we have made in translations!

## Bug Reports
You can report bugs from the [issues](https://github.com/vahidtvj/DoseBot/issues/) section. Please fill out the pre-made issue template and try to include as much information as possible. 
If you have found a solution or a fix for a bug, please include that in the report as well.

If a bug report does not contain enough information it will be closed. Duplicates are not allowed either.

For Feature Requests please read [use cases](docs/useCases.md) before opening a new issue. If it is there, we will implement it.

## Pull Requests

If you are submitting a pull request consider the following:
- Discuss the issue or feature with us first
- Use a Consistent coding style
- Fix and re-upload if you get a CI error
- Test your code for errors before submitting
- Be patient. It will take some time for us to review and merge your PR

## Coding Style

We use `Biome` to both format and lint our code.

There are a couple of additional rules that we also ask you to respect:
- Do not hardcode Text. Everything should be in translation files
- Add comments if a function or code is ambiguous
