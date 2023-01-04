import React from 'react';

let name: string;
let age: number | undefined; // ユニオン型
let isStudent: boolean;
let hobbies: string[];
let role: [number, string];

// voidはundefinedを返すが、neverは何も返さない
let printName: (name: string) => never;

// function printName(name: string) {
//   console.log(name);
// }

// type Person = {
//   name: string;
//   age?: number;
// }

interface Person {
  name: string;
  age?: number;
};

interface Guy extends Person{
  profession: string;
}

type X = {
  a: string;
  b: number;
};

type Y = X & {
  c: string;
  d: number;
};

let y: Y = {
  a: 'g',
  b: 1,
  c: 'efdas',
  d: 42,
};

interface XPerson extends X{
  name: string;
  age?: number;
}

// let person: Person = {
//   name: "Piyush",
//   age: 22,
// };

// let lotsOfPeople: Person[];

// anyを使うなら、unknownの方が良い
let personName: unknown;