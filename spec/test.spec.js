var expect = require("expect")
var oFetch = require("../fetch.js")

describe("oFetch basics", function(){
    it("Can fetch one or more direct child properties from an object", function(){
        var exampleObject = {
            hello: "world",
            hi: "earth"
        };

        expect(oFetch(exampleObject, "hello")).toEqual("world");
        expect(oFetch(exampleObject, "hello", "hi")).toEqual(["world", "earth"]);
        expect(oFetch(exampleObject, "hi", "hello")).toEqual(["earth", "world"]);
    });

    it("Throws an exception if the requested property doesn't exist", function(){
        var exampleObject = {};
        expect(function(){
            oFetch(exampleObject, "test");
        }).toThrow("Property 'test' is undefined");
    });
});

describe("oFetch nested access support", function(){
    it("Can fetch a nested property value", function(){
        var deepObject = {
            parent: {
                child: {
                    grandchild: "cookie"
                }
            }
        }
        expect(oFetch(deepObject, "parent.child.grandchild")).toBe("cookie");
    });
})