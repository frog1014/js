interface Object {
  let<T, R>(this: T, callback: (it: T) => R): R;
  also<T>(this: T, callback: (it: T) => void): T;
}

Object.prototype.let = function <T, R>(this: T, callback: (it: T) => R): R {
  return callback.call(this, filterPrimitive(this));
};

Object.prototype.also = function <T>(this: T, callback: (it: T) => void): T {
  callback.call(this, filterPrimitive(this));
  return this;
};

function filterPrimitive<T>(obj: T): T {
  if (obj instanceof Boolean || obj instanceof Number || obj instanceof String) {
    return obj.valueOf() as T;
  }
  return obj;
}

// Usage
const result = ({ name: "Alice", age: 30 } as any)
  .let((it) => ({ ...it, location: "Taipei" }))
  .also((it) => {
    console.log(`Name: ${it.name}, Age: ${it.age}, Location: ${it.location}`);
  });

console.log(result); // { name: "Alice", age: 30, location: "Taipei" }
