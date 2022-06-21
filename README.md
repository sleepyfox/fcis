# Functional Core, Imperative Shell - refactoring kata

'Functional Core, Imperative Shell' is the name for a pattern coined by [Gary Bernhart in 2012](https://www.destroyallsoftware.com/screencasts/catalog/functional-core-imperative-shell). The idea is that rather than mixing functional (pure) and imperative (side-effectful) code in the same components, that we migrate all side-effectful (and [side-causeful]()) code into the outer-most shell of the program, and all of the inner modules and functions are kept pure, and thus easy to test, and easy to change.

In this kata we start with some code that calls away to a RESTful web API that returns some JSON. We then manipulate this code and write it to a file on our local filesystem. This could equally well be any call to an upstream service or system, and any call to a downstream service, system or persistance mechanism.

The code is a microcosm of much of the effectful code that we as programmers deal with on a day-to-day basis. This code is hard to test, because the code that has business functionality has been mixed in with the code that is responsible for reading from, and wrting to, external systems.

## Objective

The objective of this kata is to take the mixed-up code that we start with, and refactor it gradually, step-by-step, into code that implements the Functional Core, Imperative Shell pattern and is easier to test, and easier to change. Simples.

Starter code is provided in Javascript, with other languages to come.

## Implementations

* [JavaScript](./node)

## Contributing

Contributions are welcome. If you would like to contribute an implementation of the base (unrefactored) code in another language, please send a PR, putting the new language code in its own folder as I have done with the Node example. The code should follow the same kind of naive, imperative, mixed together - i.e. unmodularised - style that the JavaScript version does.

I will link your implementation in this README and mention you as the author by git username, and any other identification you wish me to provide.

## License

This repository and its code is licensed under the Creative Commons, share-alike, attribution, non-commercial license, as specified in the [LICENSE file](./LICENSE).
