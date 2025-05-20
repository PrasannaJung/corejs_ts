"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// type inference
const username = "Prasanna";
// type annotation
let age;
age = 22;
// age = "asdas"; // will result in an error
// defining types in functions
function addNums(n1, n2) {
    return n1 + n2;
}
function getValueFromKey(user, key) {
    return user[key];
}
// function with optional parameter
function greetUser(name) {
    if (name) {
        return "Hello " + name;
    }
    else {
        return "Hello, Guest!";
    }
}
// GENERIC -> fn or components that define a placeholder for a type and determine the type when value is passed and preserve type safety and the type is preserved as well
function identity(value) {
    return value;
}
const result1 = identity("prasanna");
const result2 = identity(22);
function getFirstElement(arr) {
    return arr[0];
}
const firstElOne = getFirstElement(["prasanna", "thapa"]);
const firstElTwo = getFirstElement([1, 10]);
function merge(obj1, obj2) {
    const mergedObject = Object.assign(Object.assign({}, obj1), obj2);
    return mergedObject;
}
const mergedObjOutput = merge({ username: "prasanna" }, { age: 22 });
function getProperty(obj, key) {
    return obj[key];
}
function getEntity(id, repo) {
    return __awaiter(this, void 0, void 0, function* () {
        return repo.getById(id);
    });
}
function addIdToObject(obj, id) {
    return Object.assign(Object.assign({}, obj), { id });
}
addIdToObject({ username: "prasanna" }, 22);
const data = 11;
let id;
id = 11;
const programmerObj = {
    username: "",
    language: "",
    age: 20,
};
const partialProgrammerObj = {};
const requiredProgrammerObj = {
    username: "",
    language: "",
    age: 0,
    gender: "",
};
const progOb = {
    username: "prasanna",
    role: "dev",
    gender: "male",
};
// ReturnType<T> -> extracts the return type of a function
function myFn() {
    return __awaiter(this, void 0, void 0, function* () {
        return "Hello";
    });
}
