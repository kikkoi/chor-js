import BaseModeler from 'bpmn-js/lib/Modeler';
import Diagram from 'diagram-js';

import inherits from 'inherits';

import CoreModule from './core';

import ContextPadModule from './features/context-pad';
import KeyboardModule from './features/keyboard';
import KeyboardMoveSelectionModule from './features/keyboard-move-selection';
import LabelEditingModule from './features/label-editing';
import ModelingModule from './features/modeling';
import PaletteModule from './features/palette';
import PopupMenuModule from './features/popup-menu';
import ResizeModule from './features/resize';
import RulesModule from './features/rules';
import CopyPasteModule from './features/copy-paste';
import SwitchModule from './features/switch';

import {
  setXML,
  setDefinitions,
  displayChoreography
} from './import/ImportHandler';


/**
 * A modeler for BPMN 2.0 choreography diagrams.
 */
export default function Modeler(options) {
  BaseModeler.call(this, options);
}

inherits(Modeler, BaseModeler);

Modeler.prototype.displayChoreography = function(options) {
  return displayChoreography(this, options);
};

Modeler.prototype.importXML = function(xml, options) {
  const self = this;
  return setXML(this, xml, options).then(() => {
    return displayChoreography(self, options);
  });
};

Modeler.prototype.importDefinitions = function(definitions, options) {
  const self = this;
  return setDefinitions(this, definitions, options).then(() => {
    return displayChoreography(self, options);
  });
};

Modeler.prototype.clear = function() {
  // Skip clearing of the DI references introduced in this commit by bpmn-js:
  // https://github.com/bpmn-io/bpmn-js/commit/0c71ad30a0c945679851e73b15647f634f2b9bb8
  // We need them remaining intact for later restoring the diagram from cache.
  Diagram.prototype.clear.call(this);
};

Modeler.prototype._modules = [].concat(
  Modeler.prototype._modules, [
    CoreModule
  ], [
    ContextPadModule,
    KeyboardModule,
    KeyboardMoveSelectionModule,
    LabelEditingModule,
    ModelingModule,
    PaletteModule,
    PopupMenuModule,
    ResizeModule,
    RulesModule,
    CopyPasteModule,
    SwitchModule
  ]
);

