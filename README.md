# Functional Core, Imperative Shell - refactoring kata

'Functional Core, Imperative Shell' is the name for a pattern coined by [Gary Bernhart in 2012](https://www.destroyallsoftware.com/screencasts/catalog/functional-core-imperative-shell). The idea is that rather than mixing functional (pure) and imperative (side-effectful) code in the same components, that we migrate all side-effectful (and [side-causeful]()) code into the outer-most shell of the program, and all of the inner modules and functions are kept pure, and thus easy to test, and easy to change.

In this kata we start with some code that calls away to a RESTful web API that returns some JSON. We then manipulate this code and write it to a file on our local filesystem. This could equally well be any call to an upstream service or system, and any call to a downstream service, system or persistance mechanism.

The code is a microcosm of much of the effectful code that we as programmers deal with on a day-to-day basis. This code is hard to test, because the code that has business functionality has been mixed in with the code that is responsible for reading from, and wrting to, external systems.

## Objective

The objective of this kata is to take the mixed-up code that we start with, and refactor it gradually, step-by-step, into code that implements the Functional Core, Imperative Shell pattern and is easier to test, and easier to change. Simples.

Starter code is provided in the following languages:

## Implementations

* [Go](./go) by @erdincmutlu
* [Java](./java) by @tumbarumba
* [JavaScript](./node)
* [Python 3](./python)
* [Ruby](.ruby)
* [Rust](./rust)

## Contributing

Contributions are welcome. If you would like to contribute an implementation of the base (unrefactored) code in another language, please send a PR, putting the new language code in its own folder as I have done with the Node example. The code should follow the same kind of naive, imperative, mixed together - i.e. unmodularised - style that the other implementations do.

I will link your implementation in this README and mention you as the author by git username, and any other identification you wish me to provide.

### Contributing - requirements

In order to help contributors with providing a compliant version of the base kata, here are the requirements that the original was developed against:

1. The summary report generator (GENERATOR) MUST get CMS data from the following URI: http://jsonplaceholder.typicode.com/posts 
1. The GENERATOR MUST calculate i) the number of posts, ii) the number of distinct users, iii) the mean number of posts per user (rounded to nearest whole number)
1. The summary report (REPORT) MUST be written to a file on disk with the name `cms-<date>.json` where date is today's date in the form YYYY-MM-DD
1. The REPORT MUST be formatted as a JSON object of the form '{ "posts": 0, "users": 0, "mean_posts_per_user": 0 }'
1. The GENERATOR MUST log the string 'Getting CMS data' when getting the data from the CMS
1. The GENERATOR MUST log the string 'CMS data has: <n> records', where n is the number of posts
1. The GENERATOR MUST log the string 'Wrote CMS report' after the REPORT is written to disk
1. If the GENERATOR cannot contact the CMS an error MUST be reported
1. If the GENERATOR does not recieve valid JSON data from the CMS an error MUST be reported
1. If the GENERATOR cannot write the report to disk an error MUST be reported
1. The summary report generator test suite (TESTS) MUST delete a previous run's REPORT before running the GENERATOR
1. The TESTS MUST test that a REPORT of the right name `cms-<date>.json` is written
1. The TESTS MUST test that the report correctly contains 100 posts and 10 users
1. The TESTS MUST test that the mean number of posts per user is correctly calculated to be 10

## License

This repository and its code is licensed under the Creative Commons, share-alike, attribution, non-commercial license, as specified in the [LICENSE file](./LICENSE).
