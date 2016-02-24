
window.fetch = oFetch;
var exampleObject = {
    hello: "world",
    hi: "earth"
}

function expectEqual(value, expected){
    value = JSON.stringify(value);
    expected=JSON.stringify(expected);
    if (value !== expected) {
        throw "No :(, " + value + " should have been " + expected;
    }
}

expectEqual(fetch(exampleObject, "hello"), "world");
expectEqual(fetch(exampleObject, "hello", "hi"), ["world", "earth"]);
expectEqual(fetch(exampleObject, "hi", "hello"), ["earth", "world"]);

var didThrow = false;
try {
    fetch(exampleObject, "good-day");
} catch (err) {
    didThrow = true;
}
expectEqual(didThrow, true);

var deepObject = {
    parent: {
        child: {
            grandchild: "cookie"
        }
    }
}

expectEqual(fetch(deepObject, "parent.child.grandchild"), "cookie")