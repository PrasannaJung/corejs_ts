// type inference
const username = "Prasanna";

// type annotation
let age: number;
age = 22;
// age = "asdas"; // will result in an error

// defining types in functions
function addNums(n1: number, n2: number) {
  return n1 + n2;
}

// defining object types in typescript
// type TypeName = {} or interface TypeName {}
type UserInfoType = {
  [key: string]: string | number;
  username: string;
  age: number;
};

function getValueFromKey(user: UserInfoType, key: string) {
  return user[key];
}

// defining objects with optional parameters
interface Person {
  name: string;
  age: number;
  phone?: string;
}

// function with optional parameter
function greetUser(name?: string): string {
  if (name) {
    return "Hello " + name;
  } else {
    return "Hello, Guest!";
  }
}

// GENERIC -> fn or components that define a placeholder for a type and determine the type when value is passed and preserve type safety and the type is preserved as well

function identity<T>(value: T): T {
  return value;
}

const result1 = identity<string>("prasanna");
const result2 = identity<number>(22);

function getFirstElement<T>(arr: T[]): T {
  return arr[0];
}

const firstElOne = getFirstElement(["prasanna", "thapa"]);
const firstElTwo = getFirstElement([1, 10]);

function merge<T, U>(obj1: T, obj2: U): T & U {
  const mergedObject = { ...obj1, ...obj2 };
  return mergedObject;
}

const mergedObjOutput = merge({ username: "prasanna" }, { age: 22 });

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

// Generic interfaces
interface Repository<T, K> {
  getById(id: K): Promise<T>;
}

async function getEntity<T, K>(id: K, repo: Repository<T, K>): Promise<T> {
  return repo.getById(id);
}

function addIdToObject<T>(obj: T, id: number): T & { id: number } {
  return { ...obj, id };
}

addIdToObject({ username: "prasanna" }, 22);

type ObjType = {
  [key: string]: string | number;
  username: string;
  age: number;
  role: string;
};

type KType = keyof ObjType;

const data: KType = 11;

// indexed access type
type ID = ObjType["age"];

let id: ID;

id = 11;
