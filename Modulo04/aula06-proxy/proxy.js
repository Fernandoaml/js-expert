"use strict";

const Event = require("events");

const event = new Event();
const eventName = "counter";

event.on(eventName, (msg) => console.log("counter updated", msg));

// event.emit(eventName, "Oi");
const myCounter = {
  counter: 0,
};

const proxy = new Proxy(myCounter, {
  set: (target, propertyKey, newValue) => {
    // console.log(target);
    // console.log(propertyKey);
    // console.log(newValue);
    // console.log((target[propertyKey] = newValue));

    event.emit(eventName, { newValue, key: target[propertyKey] });
    target[propertyKey] = newValue;
    return true;
  },
  get(target, p, receiver) {
    // console.log("Target[p]: ", target[p]);
    return target[p];
  },
});

// SetInterval vai executar a tarefa no futuro em um loop infinito de acordo
// com o intervalkor inserido.
setInterval(function () {
  proxy.counter < 10 ? (proxy.counter += 1) : clearInterval(this);
}, 2000);

// Má pratica inserir o setTimeout com o valor 0 para executar a função
// naquele momento. Ele deve ser algo a ser executado no futuro.
// Ordem de prioridade maior que o setInterval
setTimeout(() => {
  proxy.counter = 4;
  console.log("[2]: TimeOut.");
}, 100);

// Para executar agora, utilizando boas práticas:
setImmediate(() => {
  console.log("[1]: setImmediate", proxy.counter);
});

// Para executar agora, mas acabando com o ciclo de vida do Node:
// Interrompe o fluxo de execução da pilha do Js e insere essa execução no
// meio, e com prioridade total.
// MÁ PRATICA...
process.nextTick(() => {
  proxy.counter = 2;
  console.log("[0]: NextTick");
});
