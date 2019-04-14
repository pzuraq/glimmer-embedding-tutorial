import { Cursor } from "@glimmer/interfaces";
import { Context } from "@glimmer/opcode-compiler";
import { artifacts } from "@glimmer/program";
import { renderAot, renderSync, AotRuntime } from "@glimmer/runtime";
import createHTMLDocument from "@simple-dom/document";
import { SimpleElement } from "@simple-dom/interface";
import Serializer from "@simple-dom/serializer";
import voidMap from "@simple-dom/void-map";
import { Compilable, RESOLVER_DELEGATE } from "./context";
import { RUNTIME_RESOLVER } from "./env";

let mainSource = `<FirstPage/>`;

let context = Context(RESOLVER_DELEGATE);
let main = Compilable(mainSource).compile(context);
let payload = artifacts(context);

let document = createHTMLDocument();
let runtime = AotRuntime(document, payload, RUNTIME_RESOLVER);
let element = document.createElement("main");
let cursor: Cursor = { element, nextSibling: null };

let iterator = renderAot(runtime, main, cursor);
let result = renderSync(runtime.env, iterator);

console.log(serialize(element));
setTimeout(function() {
  result.rerender();
  console.log(serialize(element));
}, 9000);

function serialize(element: SimpleElement) {
  return new Serializer(voidMap).serialize(element);
}
