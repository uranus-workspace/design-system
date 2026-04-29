# [@uranus-workspace/design-system-v2.0.1](https://github.com/uranus-workspace/design-system/compare/@uranus-workspace/design-system@2.0.0...@uranus-workspace/design-system@2.0.1) (2026-04-29)


### Bug Fixes

* **design-system:** preserve hover/focus text contrast across compound primitives ([#7](https://github.com/uranus-workspace/design-system/issues/7)) ([078964c](https://github.com/uranus-workspace/design-system/commit/078964ce4efc22ee51b93490e470dabbb3ce4ca2))

# [@uranus-workspace/design-system-v2.0.0](https://github.com/uranus-workspace/design-system/compare/@uranus-workspace/design-system@1.0.2...@uranus-workspace/design-system@2.0.0) (2026-04-13)


* feat(tokens)!: drop Lexend Exa, standardize on Poppins everywhere ([8f07539](https://github.com/uranus-workspace/design-system/commit/8f07539f1de8ecb7f1e459b96ba1cb48ab0d31ae))


### Features

* **design-system:** re-export toast helper from sonner module ([032bcd1](https://github.com/uranus-workspace/design-system/commit/032bcd1ff40cd2c8e2c6dc652efd6d8f71d6c8b9))


### BREAKING CHANGES

* consumers that explicitly imported or relied on
Lexend Exa being loaded by @uranus-workspace/design-system need to
load it themselves. The design system no longer ships or references
the Lexend Exa family.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>

# [@uranus-workspace/design-system-v1.0.2](https://github.com/uranus-workspace/design-system/compare/@uranus-workspace/design-system@1.0.1...@uranus-workspace/design-system@1.0.2) (2026-04-13)


### Bug Fixes

* **design-system:** publish to public npm registry ([adc2797](https://github.com/uranus-workspace/design-system/commit/adc27971232d609ddc56e7867da07bfe7f87d2f7))

# [@uranus-workspace/design-system-v1.0.1](https://github.com/uranus-workspace/design-system/compare/@uranus-workspace/design-system@1.0.0...@uranus-workspace/design-system@1.0.1) (2026-04-13)


### Bug Fixes

* **release:** stop committing package.json back through @semantic-release/git ([e1cbb19](https://github.com/uranus-workspace/design-system/commit/e1cbb193ffc368139eaba59fe7f961778adce7bf))

# @uranus-workspace/design-system-v1.0.0 (2026-04-13)


### Features

* **design-system:** install full shadcn/ui primitive catalog ([7425aea](https://github.com/uranus-workspace/design-system/commit/7425aea5501d2b4f0b64c7224e658b996567d6fe))
* scaffold design-system package with Button, Input, and Card ([30d3fbd](https://github.com/uranus-workspace/design-system/commit/30d3fbd510f60c5bab4073202420509cdcb65167))
* **storybook:** add baseline stories for every shadcn primitive ([3c8a2a8](https://github.com/uranus-workspace/design-system/commit/3c8a2a851eab7fc9918a1c2dc530cdd8f7693a23))
