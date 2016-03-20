# oFetch

Add type-safety to your function calls, but only when you feel like it.

`oFetch(person, "firstName")` is the same as `person.firstName`, except that it will throw an exception if `person.firstName` is undefined.

(I don't think I'll be adding support for checking specific types, but you can try using [Joi](https://github.com/hapijs/joi).)

## Installation:

Install oFetch using NPM: `npm install o-fetch --save`

## More examples

    var oFetch = require("o-fetch");

    // Fetch multiple keys (using ES2015 destructuring syntax)
    var [firstName, lastName] = oFetch(person, "firstName", "lastName");

    // Fetch a nested value
    var countryCode = oFetch(person, "address.country.countryCode"); 

## Contributing

Install jasmine-node (`npm install -g jasmine-node`), then run `jasmine-node spec/`.

