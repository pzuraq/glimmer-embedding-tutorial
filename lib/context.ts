import { precompile } from "@glimmer/compiler";
import { Component, MINIMAL_CAPABILITIES } from "@glimmer/opcode-compiler";

// A map of helpers to runtime handles (that will be passed to the runtime resolver).
const HELPERS = {
  increment: 0
};

// A map of components to their source code and the runtime handle (that will be passed
// to the runtime resolver).
const COMPONENTS = {
  Second: {
    source: `<p> This is a test {{@hello}} {{@world}}{{@suffix}} ({{increment @num}})</p>`,
    handle: 1
  }
};

export const RESOLVER_DELEGATE: any = {
  lookupComponent(name) {
    let component = COMPONENTS[name];
    if (component === null) return null;

    let { handle, source } = component;

    return {
      handle,
      compilable: Compilable(source),
      capabilities: MINIMAL_CAPABILITIES
    };
  },

  lookupHelper(name) {
    if (name in HELPERS) return HELPERS[name];
  }
};

export function Compilable(source): any {
  return Component(precompile(source));
}
