"use strict";

var _events = require("events");
/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

/* eslint-disable */
// transpiled typescript->javascript from
// https://github.com/aurelia/pal-nodejs/blob/master/src/polyfills/mutation-observer.ts

/*
 * Based on Shim for MutationObserver interface
 * Author: Graeme Yeates (github.com/megawac)
 * Repository: https://github.com/megawac/MutationObserver.js
 */

var __extends = void 0 && (void 0).__extends || function () {
  var extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
  };
  return function (d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
module.exports = {};
Object.defineProperty(module.exports, "__esModule", {
  value: true
});
var Util = /** @class */function () {
  function Util() {}
  Util.clone = function ($target, config) {
    var recurse = true; // set true so childList we'll always check the first level
    return function copy($target) {
      var elestruct = {
        /** @type {Node} */
        node: $target,
        charData: null,
        attr: null,
        kids: null
      };
      // Store current character data of target text or comment node if the config requests
      // those properties to be observed.
      if (config.charData && ($target.nodeType === 3 || $target.nodeType === 8)) {
        elestruct.charData = $target.nodeValue;
      } else {
        // Add attr only if subtree is specified or top level and avoid if
        // attributes is a document object (#13).
        if (config.attr && recurse && $target.nodeType === 1) {
          /**
           * clone live attribute list to an object structure {name: val}
           * @type {Object.<string, string>}
           */
          elestruct.attr = Util.reduce($target.attributes, function (memo, attr) {
            if (!config.afilter || config.afilter[attr.name]) {
              memo[attr.name] = attr.value;
            }
            return memo;
          }, {});
        }
        // whether we should iterate the children of $target node
        if (recurse && (config.kids || config.charData || config.attr && config.descendents)) {
          /** @type {Array.<!Object>} : Array of custom clone */
          elestruct.kids = Util.map($target.childNodes, copy);
        }
        recurse = config.descendents;
      }
      return elestruct;
    }($target);
  };
  /**
   * indexOf an element in a collection of custom nodes
   *
   * @param {NodeList} set
   * @param {!Object} $node : A custom cloned nodeg333
   * @param {number} idx : index to start the loop
   * @return {number}
   */
  Util.indexOfCustomNode = function (set, $node, idx) {
    var JSCompiler_renameProperty = function (a) {
      return a;
    };
    return this.indexOf(set, $node, idx, JSCompiler_renameProperty("node"));
  };
  /**
   * Attempt to uniquely id an element for hashing. We could optimize this for legacy browsers but it hopefully wont be called enough to be a concern
   *
   * @param {Node} $ele
   * @return {(string|number)}
   */
  Util.getElementId = function ($ele) {
    try {
      return $ele.id || ($ele[this.expando] = $ele[this.expando] || this.counter++);
    } catch (e) {
      // ie <8 will throw if you set an unknown property on a text node
      try {
        return $ele.nodeValue; // naive
      } catch (shitie) {
        // when text node is removed: https://gist.github.com/megawac/8355978 :(
        return this.counter++;
      }
    }
  };
  /**
   * **map** Apply a mapping function to each item of a set
   * @param {Array|NodeList} set
   * @param {Function} iterator
   */
  Util.map = function (set, iterator) {
    var results = [];
    for (var index = 0; index < set.length; index++) {
      results[index] = iterator(set[index], index, set);
    }
    return results;
  };
  /**
   * **Reduce** builds up a single result from a list of values
   * @param {Array|NodeList|NamedNodeMap} set
   * @param {Function} iterator
   * @param {*} [memo] Initial value of the memo.
   */
  Util.reduce = function (set, iterator, memo) {
    for (var index = 0; index < set.length; index++) {
      memo = iterator(memo, set[index], index, set);
    }
    return memo;
  };
  /**
   * **indexOf** find index of item in collection.
   * @param {Array|NodeList} set
   * @param {Object} item
   * @param {number} idx
   * @param {string} [prop] Property on set item to compare to item
   */
  Util.indexOf = function (set, item, idx, prop) {
    for (; /*idx = ~~idx*/idx < set.length; idx++) {
      // start idx is always given as this is internal
      if ((prop ? set[idx][prop] : set[idx]) === item) return idx;
    }
    return -1;
  };
  /**
   * @param {Object} obj
   * @param {(string|number)} prop
   * @return {boolean}
   */
  Util.has = function (obj, prop) {
    return obj[prop] !== undefined; // will be nicely inlined by gcc
  };

  Util.counter = 1;
  Util.expando = "mo_id";
  return Util;
}();
module.exports.Util = Util;
var MutationObserver = /** @class */function () {
  function MutationObserver(listener) {
    var _this = this;
    this._watched = [];
    this._listener = null;
    this._period = 30;
    this._timeout = null;
    this._disposed = false;
    this._notifyListener = null;
    this._watched = [];
    this._listener = listener;
    this._period = 30;
    this._notifyListener = function () {
      _this.scheduleMutationCheck(_this);
    };
  }
  MutationObserver.prototype.observe = function ($target, config) {
    var settings = {
      attr: !!(config.attributes || config.attributeFilter || config.attributeOldValue),
      // some browsers enforce that subtree must be set with childList, attributes or characterData.
      // We don't care as spec doesn't specify this rule.
      kids: !!config.childList,
      descendents: !!config.subtree,
      charData: !!(config.characterData || config.characterDataOldValue),
      afilter: null
    };
    MutationNotifier.getInstance().on("changed", this._notifyListener);
    var watched = this._watched;
    // remove already observed target element from pool
    for (var i = 0; i < watched.length; i++) {
      if (watched[i].tar === $target) watched.splice(i, 1);
    }
    if (config.attributeFilter) {
      /**
       * converts to a {key: true} dict for faster lookup
       * @type {Object.<String,Boolean>}
       */
      settings.afilter = Util.reduce(config.attributeFilter, function (a, b) {
        a[b] = true;
        return a;
      }, {});
    }
    watched.push({
      tar: $target,
      fn: this.createMutationSearcher($target, settings)
    });
  };
  MutationObserver.prototype.takeRecords = function () {
    var mutations = [];
    var watched = this._watched;
    for (var i = 0; i < watched.length; i++) {
      watched[i].fn(mutations);
    }
    return mutations;
  };
  MutationObserver.prototype.disconnect = function () {
    this._watched = []; // clear the stuff being observed
    MutationNotifier.getInstance().removeListener("changed", this._notifyListener);
    this._disposed = true;
    clearTimeout(this._timeout); // ready for garbage collection
    this._timeout = null;
  };
  MutationObserver.prototype.createMutationSearcher = function ($target, config) {
    var _this = this;
    /** type {Elestuct} */
    var $oldstate = Util.clone($target, config); // create the cloned datastructure
    /**
     * consumes array of mutations we can push to
     *
     * @param {Array.<MutationRecord>} mutations
     */
    return function (mutations) {
      var olen = mutations.length;
      var dirty;
      if (config.charData && $target.nodeType === 3 && $target.nodeValue !== $oldstate.charData) {
        mutations.push(new MutationRecord({
          type: "characterData",
          target: $target,
          oldValue: $oldstate.charData
        }));
      }
      // Alright we check base level changes in attributes... easy
      if (config.attr && $oldstate.attr) {
        _this.findAttributeMutations(mutations, $target, $oldstate.attr, config.afilter);
      }
      // check childlist or subtree for mutations
      if (config.kids || config.descendents) {
        dirty = _this.searchSubtree(mutations, $target, $oldstate, config);
      }
      // reclone data structure if theres changes
      if (dirty || mutations.length !== olen) {
        /** type {Elestuct} */
        $oldstate = Util.clone($target, config);
      }
    };
  };
  MutationObserver.prototype.scheduleMutationCheck = function (observer) {
    var _this = this;
    // Only schedule if there isn't already a timer.
    if (!observer._timeout) {
      observer._timeout = setTimeout(function () {
        return _this.mutationChecker(observer);
      }, this._period);
    }
  };
  MutationObserver.prototype.mutationChecker = function (observer) {
    // allow scheduling a new timer.
    observer._timeout = null;
    var mutations = observer.takeRecords();
    if (mutations.length) {
      // fire away
      // calling the listener with context is not spec but currently consistent with FF and WebKit
      observer._listener(mutations, observer);
    }
  };
  MutationObserver.prototype.searchSubtree = function (mutations, $target, $oldstate, config) {
    var _this = this;
    // Track if the tree is dirty and has to be recomputed (#14).
    var dirty;
    /*
     * Helper to identify node rearrangment and stuff...
     * There is no gaurentee that the same node will be identified for both added and removed nodes
     * if the positions have been shuffled.
     * conflicts array will be emptied by end of operation
     */
    var _resolveConflicts = function (conflicts, node, $kids, $oldkids, numAddedNodes) {
      // the distance between the first conflicting node and the last
      var distance = conflicts.length - 1;
      // prevents same conflict being resolved twice consider when two nodes switch places.
      // only one should be given a mutation event (note -~ is used as a math.ceil shorthand)
      var counter = -~((distance - numAddedNodes) / 2);
      var $cur;
      var oldstruct;
      var conflict;
      while (conflict = conflicts.pop()) {
        $cur = $kids[conflict.i];
        oldstruct = $oldkids[conflict.j];
        // attempt to determine if there was node rearrangement... won't gaurentee all matches
        // also handles case where added/removed nodes cause nodes to be identified as conflicts
        if (config.kids && counter && Math.abs(conflict.i - conflict.j) >= distance) {
          mutations.push(new MutationRecord({
            type: "childList",
            target: node,
            addedNodes: [$cur],
            removedNodes: [$cur],
            // haha don't rely on this please
            nextSibling: $cur.nextSibling,
            previousSibling: $cur.previousSibling
          }));
          counter--; // found conflict
        }
        // Alright we found the resorted nodes now check for other types of mutations
        if (config.attr && oldstruct.attr) _this.findAttributeMutations(mutations, $cur, oldstruct.attr, config.afilter);
        if (config.charData && $cur.nodeType === 3 && $cur.nodeValue !== oldstruct.charData) {
          mutations.push(new MutationRecord({
            type: "characterData",
            target: $cur,
            oldValue: oldstruct.charData
          }));
        }
        // now look @ subtree
        if (config.descendents) _findMutations($cur, oldstruct);
      }
    };
    /**
     * Main worker. Finds and adds mutations if there are any
     * @param {Node} node
     * @param {!Object} old : A cloned data structure using internal clone
     */
    var _findMutations = function (node, old) {
      var $kids = node.childNodes;
      var $oldkids = old.kids;
      var klen = $kids.length;
      // $oldkids will be undefined for text and comment nodes
      var olen = $oldkids ? $oldkids.length : 0;
      // if (!olen && !klen) return; // both empty; clearly no changes
      // we delay the intialization of these for marginal performance in the expected case (actually quite signficant on large subtrees when these would be otherwise unused)
      // map of checked element of ids to prevent registering the same conflict twice
      var map;
      // array of potential conflicts (ie nodes that may have been re arranged)
      var conflicts;
      var id; // element id from getElementId helper
      var idx; // index of a moved or inserted element
      var oldstruct;
      // current and old nodes
      var $cur;
      var $old;
      // track the number of added nodes so we can resolve conflicts more accurately
      var numAddedNodes = 0;
      // iterate over both old and current child nodes at the same time
      var i = 0;
      var j = 0;
      // while there is still anything left in $kids or $oldkids (same as i < $kids.length || j < $oldkids.length;)
      while (i < klen || j < olen) {
        // current and old nodes at the indexs
        $cur = $kids[i];
        oldstruct = $oldkids[j];
        $old = oldstruct && oldstruct.node;
        if ($cur === $old) {
          // expected case - optimized for this case
          // check attributes as specified by config
          if (config.attr && oldstruct.attr) {
            /* oldstruct.attr instead of textnode check */
            _this.findAttributeMutations(mutations, $cur, oldstruct.attr, config.afilter);
          }
          // check character data if node is a comment or textNode and it's being observed
          if (config.charData && oldstruct.charData !== undefined && $cur.nodeValue !== oldstruct.charData) {
            mutations.push(new MutationRecord({
              type: "characterData",
              target: $cur
            }));
          }
          // resolve conflicts; it will be undefined if there are no conflicts - otherwise an array
          if (conflicts) _resolveConflicts(conflicts, node, $kids, $oldkids, numAddedNodes);
          // recurse on next level of children. Avoids the recursive call when there are no children left to iterate
          if (config.descendents && ($cur.childNodes.length || oldstruct.kids && oldstruct.kids.length)) _findMutations($cur, oldstruct);
          i++;
          j++;
        } else {
          // (uncommon case) lookahead until they are the same again or the end of children
          dirty = true;
          if (!map) {
            // delayed initalization (big perf benefit)
            map = {};
            conflicts = [];
          }
          if ($cur) {
            // check id is in the location map otherwise do a indexOf search
            if (!map[id = Util.getElementId($cur)]) {
              // to prevent double checking
              // mark id as found
              map[id] = true;
              // custom indexOf using comparitor checking oldkids[i].node === $cur
              if ((idx = Util.indexOfCustomNode($oldkids, $cur, j)) === -1) {
                if (config.kids) {
                  mutations.push(new MutationRecord({
                    type: "childList",
                    target: node,
                    addedNodes: [$cur],
                    nextSibling: $cur.nextSibling,
                    previousSibling: $cur.previousSibling
                  }));
                  numAddedNodes++;
                }
              } else {
                conflicts.push({
                  i: i,
                  j: idx
                });
              }
            }
            i++;
          }
          if ($old &&
          // special case: the changes may have been resolved: i and j appear congurent so we can continue using the expected case
          $old !== $kids[i]) {
            if (!map[id = Util.getElementId($old)]) {
              map[id] = true;
              if ((idx = Util.indexOf($kids, $old, i)) === -1) {
                if (config.kids) {
                  mutations.push(new MutationRecord({
                    type: "childList",
                    target: old.node,
                    removedNodes: [$old],
                    nextSibling: $oldkids[j + 1],
                    previousSibling: $oldkids[j - 1]
                  }));
                  numAddedNodes--;
                }
              } else {
                conflicts.push({
                  i: idx,
                  j: j
                });
              }
            }
            j++;
          }
        } // end uncommon case
      } // end loop
      // resolve any remaining conflicts
      if (conflicts) _resolveConflicts(conflicts, node, $kids, $oldkids, numAddedNodes);
    };
    _findMutations($target, $oldstate);
    return dirty;
  };
  MutationObserver.prototype.findAttributeMutations = function (mutations, $target, $oldstate, filter) {
    var checked = {};
    var attributes = $target.attributes;
    var attr;
    var name;
    var i = attributes.length;
    while (i--) {
      attr = attributes[i];
      name = attr.name;
      if (!filter || Util.has(filter, name)) {
        if (attr.value !== $oldstate[name]) {
          // The pushing is redundant but gzips very nicely
          mutations.push(new MutationRecord({
            type: "attributes",
            target: $target,
            attributeName: name,
            oldValue: $oldstate[name],
            attributeNamespace: attr.namespaceURI // in ie<8 it incorrectly will return undefined
          }));
        }

        checked[name] = true;
      }
    }
    for (name in $oldstate) {
      if (!checked[name]) {
        mutations.push(new MutationRecord({
          target: $target,
          type: "attributes",
          attributeName: name,
          oldValue: $oldstate[name]
        }));
      }
    }
  };
  return MutationObserver;
}();
module.exports.MutationObserver = MutationObserver;
var MutationRecord = /** @class */function () {
  function MutationRecord(data) {
    var settings = {
      type: null,
      target: null,
      addedNodes: [],
      removedNodes: [],
      previousSibling: null,
      nextSibling: null,
      attributeName: null,
      attributeNamespace: null,
      oldValue: null
    };
    for (var prop in data) {
      if (Util.has(settings, prop) && data[prop] !== undefined) settings[prop] = data[prop];
    }
    return settings;
  }
  return MutationRecord;
}();
module.exports.MutationRecord = MutationRecord;
var MutationNotifier = /** @class */function (_super) {
  __extends(MutationNotifier, _super);
  function MutationNotifier() {
    var _this = _super.call(this) || this;
    _this.setMaxListeners(100);
    return _this;
  }
  MutationNotifier.getInstance = function () {
    if (!MutationNotifier._instance) {
      MutationNotifier._instance = new MutationNotifier();
    }
    return MutationNotifier._instance;
  };
  MutationNotifier.prototype.destruct = function () {
    this.removeAllListeners("changed");
  };
  MutationNotifier.prototype.notifyChanged = function (node) {
    this.emit("changed", node);
  };
  MutationNotifier._instance = null;
  return MutationNotifier;
}(_events.EventEmitter);
module.exports.MutationNotifier = MutationNotifier;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfZXZlbnRzIiwicmVxdWlyZSIsIl9fZXh0ZW5kcyIsImV4dGVuZFN0YXRpY3MiLCJPYmplY3QiLCJzZXRQcm90b3R5cGVPZiIsIl9fcHJvdG9fXyIsIkFycmF5IiwiZCIsImIiLCJwIiwiaGFzT3duUHJvcGVydHkiLCJfXyIsImNvbnN0cnVjdG9yIiwicHJvdG90eXBlIiwiY3JlYXRlIiwibW9kdWxlIiwiZXhwb3J0cyIsImRlZmluZVByb3BlcnR5IiwidmFsdWUiLCJVdGlsIiwiY2xvbmUiLCIkdGFyZ2V0IiwiY29uZmlnIiwicmVjdXJzZSIsImNvcHkiLCJlbGVzdHJ1Y3QiLCJub2RlIiwiY2hhckRhdGEiLCJhdHRyIiwia2lkcyIsIm5vZGVUeXBlIiwibm9kZVZhbHVlIiwicmVkdWNlIiwiYXR0cmlidXRlcyIsIm1lbW8iLCJhZmlsdGVyIiwibmFtZSIsImRlc2NlbmRlbnRzIiwibWFwIiwiY2hpbGROb2RlcyIsImluZGV4T2ZDdXN0b21Ob2RlIiwic2V0IiwiJG5vZGUiLCJpZHgiLCJKU0NvbXBpbGVyX3JlbmFtZVByb3BlcnR5IiwiYSIsImluZGV4T2YiLCJnZXRFbGVtZW50SWQiLCIkZWxlIiwiaWQiLCJleHBhbmRvIiwiY291bnRlciIsImUiLCJzaGl0aWUiLCJpdGVyYXRvciIsInJlc3VsdHMiLCJpbmRleCIsImxlbmd0aCIsIml0ZW0iLCJwcm9wIiwiaGFzIiwib2JqIiwidW5kZWZpbmVkIiwiTXV0YXRpb25PYnNlcnZlciIsImxpc3RlbmVyIiwiX3RoaXMiLCJfd2F0Y2hlZCIsIl9saXN0ZW5lciIsIl9wZXJpb2QiLCJfdGltZW91dCIsIl9kaXNwb3NlZCIsIl9ub3RpZnlMaXN0ZW5lciIsInNjaGVkdWxlTXV0YXRpb25DaGVjayIsIm9ic2VydmUiLCJzZXR0aW5ncyIsImF0dHJpYnV0ZUZpbHRlciIsImF0dHJpYnV0ZU9sZFZhbHVlIiwiY2hpbGRMaXN0Iiwic3VidHJlZSIsImNoYXJhY3RlckRhdGEiLCJjaGFyYWN0ZXJEYXRhT2xkVmFsdWUiLCJNdXRhdGlvbk5vdGlmaWVyIiwiZ2V0SW5zdGFuY2UiLCJvbiIsIndhdGNoZWQiLCJpIiwidGFyIiwic3BsaWNlIiwicHVzaCIsImZuIiwiY3JlYXRlTXV0YXRpb25TZWFyY2hlciIsInRha2VSZWNvcmRzIiwibXV0YXRpb25zIiwiZGlzY29ubmVjdCIsInJlbW92ZUxpc3RlbmVyIiwiY2xlYXJUaW1lb3V0IiwiJG9sZHN0YXRlIiwib2xlbiIsImRpcnR5IiwiTXV0YXRpb25SZWNvcmQiLCJ0eXBlIiwidGFyZ2V0Iiwib2xkVmFsdWUiLCJmaW5kQXR0cmlidXRlTXV0YXRpb25zIiwic2VhcmNoU3VidHJlZSIsIm9ic2VydmVyIiwic2V0VGltZW91dCIsIm11dGF0aW9uQ2hlY2tlciIsIl9yZXNvbHZlQ29uZmxpY3RzIiwiY29uZmxpY3RzIiwiJGtpZHMiLCIkb2xka2lkcyIsIm51bUFkZGVkTm9kZXMiLCJkaXN0YW5jZSIsIiRjdXIiLCJvbGRzdHJ1Y3QiLCJjb25mbGljdCIsInBvcCIsImoiLCJNYXRoIiwiYWJzIiwiYWRkZWROb2RlcyIsInJlbW92ZWROb2RlcyIsIm5leHRTaWJsaW5nIiwicHJldmlvdXNTaWJsaW5nIiwiX2ZpbmRNdXRhdGlvbnMiLCJvbGQiLCJrbGVuIiwiJG9sZCIsImZpbHRlciIsImNoZWNrZWQiLCJhdHRyaWJ1dGVOYW1lIiwiYXR0cmlidXRlTmFtZXNwYWNlIiwibmFtZXNwYWNlVVJJIiwiZGF0YSIsIl9zdXBlciIsImNhbGwiLCJzZXRNYXhMaXN0ZW5lcnMiLCJfaW5zdGFuY2UiLCJkZXN0cnVjdCIsInJlbW92ZUFsbExpc3RlbmVycyIsIm5vdGlmeUNoYW5nZWQiLCJlbWl0IiwiRXZlbnRFbWl0dGVyIl0sInNvdXJjZXMiOlsibXV0YXRpb25PYnNlcnZlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IE9wZW5TZWFyY2ggQ29udHJpYnV0b3JzXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbi8qIGVzbGludC1kaXNhYmxlICovXG4vLyB0cmFuc3BpbGVkIHR5cGVzY3JpcHQtPmphdmFzY3JpcHQgZnJvbVxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2F1cmVsaWEvcGFsLW5vZGVqcy9ibG9iL21hc3Rlci9zcmMvcG9seWZpbGxzL211dGF0aW9uLW9ic2VydmVyLnRzXG5cbi8qXG4gKiBCYXNlZCBvbiBTaGltIGZvciBNdXRhdGlvbk9ic2VydmVyIGludGVyZmFjZVxuICogQXV0aG9yOiBHcmFlbWUgWWVhdGVzIChnaXRodWIuY29tL21lZ2F3YWMpXG4gKiBSZXBvc2l0b3J5OiBodHRwczovL2dpdGh1Yi5jb20vbWVnYXdhYy9NdXRhdGlvbk9ic2VydmVyLmpzXG4gKi9cbmltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gXCJldmVudHNcIjtcblxudmFyIF9fZXh0ZW5kcyA9XG4gICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fFxuICAoZnVuY3Rpb24oKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPVxuICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJlxuICAgICAgICBmdW5jdGlvbihkLCBiKSB7XG4gICAgICAgICAgZC5fX3Byb3RvX18gPSBiO1xuICAgICAgICB9KSB8fFxuICAgICAgZnVuY3Rpb24oZCwgYikge1xuICAgICAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcbiAgICAgIH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGQsIGIpIHtcbiAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICBmdW5jdGlvbiBfXygpIHtcbiAgICAgICAgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7XG4gICAgICB9XG4gICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSksIG5ldyBfXygpKTtcbiAgICB9O1xuICB9KSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLmV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIFV0aWwgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbigpIHtcbiAgZnVuY3Rpb24gVXRpbCgpIHt9XG4gIFV0aWwuY2xvbmUgPSBmdW5jdGlvbigkdGFyZ2V0LCBjb25maWcpIHtcbiAgICB2YXIgcmVjdXJzZSA9IHRydWU7IC8vIHNldCB0cnVlIHNvIGNoaWxkTGlzdCB3ZSdsbCBhbHdheXMgY2hlY2sgdGhlIGZpcnN0IGxldmVsXG4gICAgcmV0dXJuIChmdW5jdGlvbiBjb3B5KCR0YXJnZXQpIHtcbiAgICAgIHZhciBlbGVzdHJ1Y3QgPSB7XG4gICAgICAgIC8qKiBAdHlwZSB7Tm9kZX0gKi9cbiAgICAgICAgbm9kZTogJHRhcmdldCxcbiAgICAgICAgY2hhckRhdGE6IG51bGwsXG4gICAgICAgIGF0dHI6IG51bGwsXG4gICAgICAgIGtpZHM6IG51bGwsXG4gICAgICB9O1xuICAgICAgLy8gU3RvcmUgY3VycmVudCBjaGFyYWN0ZXIgZGF0YSBvZiB0YXJnZXQgdGV4dCBvciBjb21tZW50IG5vZGUgaWYgdGhlIGNvbmZpZyByZXF1ZXN0c1xuICAgICAgLy8gdGhvc2UgcHJvcGVydGllcyB0byBiZSBvYnNlcnZlZC5cbiAgICAgIGlmIChjb25maWcuY2hhckRhdGEgJiYgKCR0YXJnZXQubm9kZVR5cGUgPT09IDMgfHwgJHRhcmdldC5ub2RlVHlwZSA9PT0gOCkpIHtcbiAgICAgICAgZWxlc3RydWN0LmNoYXJEYXRhID0gJHRhcmdldC5ub2RlVmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBBZGQgYXR0ciBvbmx5IGlmIHN1YnRyZWUgaXMgc3BlY2lmaWVkIG9yIHRvcCBsZXZlbCBhbmQgYXZvaWQgaWZcbiAgICAgICAgLy8gYXR0cmlidXRlcyBpcyBhIGRvY3VtZW50IG9iamVjdCAoIzEzKS5cbiAgICAgICAgaWYgKGNvbmZpZy5hdHRyICYmIHJlY3Vyc2UgJiYgJHRhcmdldC5ub2RlVHlwZSA9PT0gMSkge1xuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIGNsb25lIGxpdmUgYXR0cmlidXRlIGxpc3QgdG8gYW4gb2JqZWN0IHN0cnVjdHVyZSB7bmFtZTogdmFsfVxuICAgICAgICAgICAqIEB0eXBlIHtPYmplY3QuPHN0cmluZywgc3RyaW5nPn1cbiAgICAgICAgICAgKi9cbiAgICAgICAgICBlbGVzdHJ1Y3QuYXR0ciA9IFV0aWwucmVkdWNlKFxuICAgICAgICAgICAgJHRhcmdldC5hdHRyaWJ1dGVzLFxuICAgICAgICAgICAgZnVuY3Rpb24obWVtbywgYXR0cikge1xuICAgICAgICAgICAgICBpZiAoIWNvbmZpZy5hZmlsdGVyIHx8IGNvbmZpZy5hZmlsdGVyW2F0dHIubmFtZV0pIHtcbiAgICAgICAgICAgICAgICBtZW1vW2F0dHIubmFtZV0gPSBhdHRyLnZhbHVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiBtZW1vO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHt9XG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICAvLyB3aGV0aGVyIHdlIHNob3VsZCBpdGVyYXRlIHRoZSBjaGlsZHJlbiBvZiAkdGFyZ2V0IG5vZGVcbiAgICAgICAgaWYgKHJlY3Vyc2UgJiYgKGNvbmZpZy5raWRzIHx8IGNvbmZpZy5jaGFyRGF0YSB8fCAoY29uZmlnLmF0dHIgJiYgY29uZmlnLmRlc2NlbmRlbnRzKSkpIHtcbiAgICAgICAgICAvKiogQHR5cGUge0FycmF5LjwhT2JqZWN0Pn0gOiBBcnJheSBvZiBjdXN0b20gY2xvbmUgKi9cbiAgICAgICAgICBlbGVzdHJ1Y3Qua2lkcyA9IFV0aWwubWFwKCR0YXJnZXQuY2hpbGROb2RlcywgY29weSk7XG4gICAgICAgIH1cbiAgICAgICAgcmVjdXJzZSA9IGNvbmZpZy5kZXNjZW5kZW50cztcbiAgICAgIH1cbiAgICAgIHJldHVybiBlbGVzdHJ1Y3Q7XG4gICAgfSkoJHRhcmdldCk7XG4gIH07XG4gIC8qKlxuICAgKiBpbmRleE9mIGFuIGVsZW1lbnQgaW4gYSBjb2xsZWN0aW9uIG9mIGN1c3RvbSBub2Rlc1xuICAgKlxuICAgKiBAcGFyYW0ge05vZGVMaXN0fSBzZXRcbiAgICogQHBhcmFtIHshT2JqZWN0fSAkbm9kZSA6IEEgY3VzdG9tIGNsb25lZCBub2RlZzMzM1xuICAgKiBAcGFyYW0ge251bWJlcn0gaWR4IDogaW5kZXggdG8gc3RhcnQgdGhlIGxvb3BcbiAgICogQHJldHVybiB7bnVtYmVyfVxuICAgKi9cbiAgVXRpbC5pbmRleE9mQ3VzdG9tTm9kZSA9IGZ1bmN0aW9uKHNldCwgJG5vZGUsIGlkeCkge1xuICAgIHZhciBKU0NvbXBpbGVyX3JlbmFtZVByb3BlcnR5ID0gZnVuY3Rpb24oYSkge1xuICAgICAgcmV0dXJuIGE7XG4gICAgfTtcbiAgICByZXR1cm4gdGhpcy5pbmRleE9mKHNldCwgJG5vZGUsIGlkeCwgSlNDb21waWxlcl9yZW5hbWVQcm9wZXJ0eShcIm5vZGVcIikpO1xuICB9O1xuICAvKipcbiAgICogQXR0ZW1wdCB0byB1bmlxdWVseSBpZCBhbiBlbGVtZW50IGZvciBoYXNoaW5nLiBXZSBjb3VsZCBvcHRpbWl6ZSB0aGlzIGZvciBsZWdhY3kgYnJvd3NlcnMgYnV0IGl0IGhvcGVmdWxseSB3b250IGJlIGNhbGxlZCBlbm91Z2ggdG8gYmUgYSBjb25jZXJuXG4gICAqXG4gICAqIEBwYXJhbSB7Tm9kZX0gJGVsZVxuICAgKiBAcmV0dXJuIHsoc3RyaW5nfG51bWJlcil9XG4gICAqL1xuICBVdGlsLmdldEVsZW1lbnRJZCA9IGZ1bmN0aW9uKCRlbGUpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuICRlbGUuaWQgfHwgKCRlbGVbdGhpcy5leHBhbmRvXSA9ICRlbGVbdGhpcy5leHBhbmRvXSB8fCB0aGlzLmNvdW50ZXIrKyk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLy8gaWUgPDggd2lsbCB0aHJvdyBpZiB5b3Ugc2V0IGFuIHVua25vd24gcHJvcGVydHkgb24gYSB0ZXh0IG5vZGVcbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiAkZWxlLm5vZGVWYWx1ZTsgLy8gbmFpdmVcbiAgICAgIH0gY2F0Y2ggKHNoaXRpZSkge1xuICAgICAgICAvLyB3aGVuIHRleHQgbm9kZSBpcyByZW1vdmVkOiBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9tZWdhd2FjLzgzNTU5NzggOihcbiAgICAgICAgcmV0dXJuIHRoaXMuY291bnRlcisrO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbiAgLyoqXG4gICAqICoqbWFwKiogQXBwbHkgYSBtYXBwaW5nIGZ1bmN0aW9uIHRvIGVhY2ggaXRlbSBvZiBhIHNldFxuICAgKiBAcGFyYW0ge0FycmF5fE5vZGVMaXN0fSBzZXRcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0b3JcbiAgICovXG4gIFV0aWwubWFwID0gZnVuY3Rpb24oc2V0LCBpdGVyYXRvcikge1xuICAgIHZhciByZXN1bHRzID0gW107XG4gICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IHNldC5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIHJlc3VsdHNbaW5kZXhdID0gaXRlcmF0b3Ioc2V0W2luZGV4XSwgaW5kZXgsIHNldCk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHRzO1xuICB9O1xuICAvKipcbiAgICogKipSZWR1Y2UqKiBidWlsZHMgdXAgYSBzaW5nbGUgcmVzdWx0IGZyb20gYSBsaXN0IG9mIHZhbHVlc1xuICAgKiBAcGFyYW0ge0FycmF5fE5vZGVMaXN0fE5hbWVkTm9kZU1hcH0gc2V0XG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdG9yXG4gICAqIEBwYXJhbSB7Kn0gW21lbW9dIEluaXRpYWwgdmFsdWUgb2YgdGhlIG1lbW8uXG4gICAqL1xuICBVdGlsLnJlZHVjZSA9IGZ1bmN0aW9uKHNldCwgaXRlcmF0b3IsIG1lbW8pIHtcbiAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgc2V0Lmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgbWVtbyA9IGl0ZXJhdG9yKG1lbW8sIHNldFtpbmRleF0sIGluZGV4LCBzZXQpO1xuICAgIH1cbiAgICByZXR1cm4gbWVtbztcbiAgfTtcbiAgLyoqXG4gICAqICoqaW5kZXhPZioqIGZpbmQgaW5kZXggb2YgaXRlbSBpbiBjb2xsZWN0aW9uLlxuICAgKiBAcGFyYW0ge0FycmF5fE5vZGVMaXN0fSBzZXRcbiAgICogQHBhcmFtIHtPYmplY3R9IGl0ZW1cbiAgICogQHBhcmFtIHtudW1iZXJ9IGlkeFxuICAgKiBAcGFyYW0ge3N0cmluZ30gW3Byb3BdIFByb3BlcnR5IG9uIHNldCBpdGVtIHRvIGNvbXBhcmUgdG8gaXRlbVxuICAgKi9cbiAgVXRpbC5pbmRleE9mID0gZnVuY3Rpb24oc2V0LCBpdGVtLCBpZHgsIHByb3ApIHtcbiAgICBmb3IgKDsgLyppZHggPSB+fmlkeCovIGlkeCA8IHNldC5sZW5ndGg7IGlkeCsrKSB7XG4gICAgICAvLyBzdGFydCBpZHggaXMgYWx3YXlzIGdpdmVuIGFzIHRoaXMgaXMgaW50ZXJuYWxcbiAgICAgIGlmICgocHJvcCA/IHNldFtpZHhdW3Byb3BdIDogc2V0W2lkeF0pID09PSBpdGVtKSByZXR1cm4gaWR4O1xuICAgIH1cbiAgICByZXR1cm4gLTE7XG4gIH07XG4gIC8qKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gICAqIEBwYXJhbSB7KHN0cmluZ3xudW1iZXIpfSBwcm9wXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqL1xuICBVdGlsLmhhcyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkge1xuICAgIHJldHVybiBvYmpbcHJvcF0gIT09IHVuZGVmaW5lZDsgLy8gd2lsbCBiZSBuaWNlbHkgaW5saW5lZCBieSBnY2NcbiAgfTtcbiAgVXRpbC5jb3VudGVyID0gMTtcbiAgVXRpbC5leHBhbmRvID0gXCJtb19pZFwiO1xuICByZXR1cm4gVXRpbDtcbn0pKCk7XG5tb2R1bGUuZXhwb3J0cy5VdGlsID0gVXRpbDtcbnZhciBNdXRhdGlvbk9ic2VydmVyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24oKSB7XG4gIGZ1bmN0aW9uIE11dGF0aW9uT2JzZXJ2ZXIobGlzdGVuZXIpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIHRoaXMuX3dhdGNoZWQgPSBbXTtcbiAgICB0aGlzLl9saXN0ZW5lciA9IG51bGw7XG4gICAgdGhpcy5fcGVyaW9kID0gMzA7XG4gICAgdGhpcy5fdGltZW91dCA9IG51bGw7XG4gICAgdGhpcy5fZGlzcG9zZWQgPSBmYWxzZTtcbiAgICB0aGlzLl9ub3RpZnlMaXN0ZW5lciA9IG51bGw7XG4gICAgdGhpcy5fd2F0Y2hlZCA9IFtdO1xuICAgIHRoaXMuX2xpc3RlbmVyID0gbGlzdGVuZXI7XG4gICAgdGhpcy5fcGVyaW9kID0gMzA7XG4gICAgdGhpcy5fbm90aWZ5TGlzdGVuZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgIF90aGlzLnNjaGVkdWxlTXV0YXRpb25DaGVjayhfdGhpcyk7XG4gICAgfTtcbiAgfVxuICBNdXRhdGlvbk9ic2VydmVyLnByb3RvdHlwZS5vYnNlcnZlID0gZnVuY3Rpb24oJHRhcmdldCwgY29uZmlnKSB7XG4gICAgdmFyIHNldHRpbmdzID0ge1xuICAgICAgYXR0cjogISEoY29uZmlnLmF0dHJpYnV0ZXMgfHwgY29uZmlnLmF0dHJpYnV0ZUZpbHRlciB8fCBjb25maWcuYXR0cmlidXRlT2xkVmFsdWUpLFxuICAgICAgLy8gc29tZSBicm93c2VycyBlbmZvcmNlIHRoYXQgc3VidHJlZSBtdXN0IGJlIHNldCB3aXRoIGNoaWxkTGlzdCwgYXR0cmlidXRlcyBvciBjaGFyYWN0ZXJEYXRhLlxuICAgICAgLy8gV2UgZG9uJ3QgY2FyZSBhcyBzcGVjIGRvZXNuJ3Qgc3BlY2lmeSB0aGlzIHJ1bGUuXG4gICAgICBraWRzOiAhIWNvbmZpZy5jaGlsZExpc3QsXG4gICAgICBkZXNjZW5kZW50czogISFjb25maWcuc3VidHJlZSxcbiAgICAgIGNoYXJEYXRhOiAhIShjb25maWcuY2hhcmFjdGVyRGF0YSB8fCBjb25maWcuY2hhcmFjdGVyRGF0YU9sZFZhbHVlKSxcbiAgICAgIGFmaWx0ZXI6IG51bGwsXG4gICAgfTtcbiAgICBNdXRhdGlvbk5vdGlmaWVyLmdldEluc3RhbmNlKCkub24oXCJjaGFuZ2VkXCIsIHRoaXMuX25vdGlmeUxpc3RlbmVyKTtcbiAgICB2YXIgd2F0Y2hlZCA9IHRoaXMuX3dhdGNoZWQ7XG4gICAgLy8gcmVtb3ZlIGFscmVhZHkgb2JzZXJ2ZWQgdGFyZ2V0IGVsZW1lbnQgZnJvbSBwb29sXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB3YXRjaGVkLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAod2F0Y2hlZFtpXS50YXIgPT09ICR0YXJnZXQpIHdhdGNoZWQuc3BsaWNlKGksIDEpO1xuICAgIH1cbiAgICBpZiAoY29uZmlnLmF0dHJpYnV0ZUZpbHRlcikge1xuICAgICAgLyoqXG4gICAgICAgKiBjb252ZXJ0cyB0byBhIHtrZXk6IHRydWV9IGRpY3QgZm9yIGZhc3RlciBsb29rdXBcbiAgICAgICAqIEB0eXBlIHtPYmplY3QuPFN0cmluZyxCb29sZWFuPn1cbiAgICAgICAqL1xuICAgICAgc2V0dGluZ3MuYWZpbHRlciA9IFV0aWwucmVkdWNlKFxuICAgICAgICBjb25maWcuYXR0cmlidXRlRmlsdGVyLFxuICAgICAgICBmdW5jdGlvbihhLCBiKSB7XG4gICAgICAgICAgYVtiXSA9IHRydWU7XG4gICAgICAgICAgcmV0dXJuIGE7XG4gICAgICAgIH0sXG4gICAgICAgIHt9XG4gICAgICApO1xuICAgIH1cbiAgICB3YXRjaGVkLnB1c2goe1xuICAgICAgdGFyOiAkdGFyZ2V0LFxuICAgICAgZm46IHRoaXMuY3JlYXRlTXV0YXRpb25TZWFyY2hlcigkdGFyZ2V0LCBzZXR0aW5ncyksXG4gICAgfSk7XG4gIH07XG4gIE11dGF0aW9uT2JzZXJ2ZXIucHJvdG90eXBlLnRha2VSZWNvcmRzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIG11dGF0aW9ucyA9IFtdO1xuICAgIHZhciB3YXRjaGVkID0gdGhpcy5fd2F0Y2hlZDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHdhdGNoZWQubGVuZ3RoOyBpKyspIHtcbiAgICAgIHdhdGNoZWRbaV0uZm4obXV0YXRpb25zKTtcbiAgICB9XG4gICAgcmV0dXJuIG11dGF0aW9ucztcbiAgfTtcbiAgTXV0YXRpb25PYnNlcnZlci5wcm90b3R5cGUuZGlzY29ubmVjdCA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuX3dhdGNoZWQgPSBbXTsgLy8gY2xlYXIgdGhlIHN0dWZmIGJlaW5nIG9ic2VydmVkXG4gICAgTXV0YXRpb25Ob3RpZmllci5nZXRJbnN0YW5jZSgpLnJlbW92ZUxpc3RlbmVyKFwiY2hhbmdlZFwiLCB0aGlzLl9ub3RpZnlMaXN0ZW5lcik7XG4gICAgdGhpcy5fZGlzcG9zZWQgPSB0cnVlO1xuICAgIGNsZWFyVGltZW91dCh0aGlzLl90aW1lb3V0KTsgLy8gcmVhZHkgZm9yIGdhcmJhZ2UgY29sbGVjdGlvblxuICAgIHRoaXMuX3RpbWVvdXQgPSBudWxsO1xuICB9O1xuICBNdXRhdGlvbk9ic2VydmVyLnByb3RvdHlwZS5jcmVhdGVNdXRhdGlvblNlYXJjaGVyID0gZnVuY3Rpb24oJHRhcmdldCwgY29uZmlnKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAvKiogdHlwZSB7RWxlc3R1Y3R9ICovXG4gICAgdmFyICRvbGRzdGF0ZSA9IFV0aWwuY2xvbmUoJHRhcmdldCwgY29uZmlnKTsgLy8gY3JlYXRlIHRoZSBjbG9uZWQgZGF0YXN0cnVjdHVyZVxuICAgIC8qKlxuICAgICAqIGNvbnN1bWVzIGFycmF5IG9mIG11dGF0aW9ucyB3ZSBjYW4gcHVzaCB0b1xuICAgICAqXG4gICAgICogQHBhcmFtIHtBcnJheS48TXV0YXRpb25SZWNvcmQ+fSBtdXRhdGlvbnNcbiAgICAgKi9cbiAgICByZXR1cm4gZnVuY3Rpb24obXV0YXRpb25zKSB7XG4gICAgICB2YXIgb2xlbiA9IG11dGF0aW9ucy5sZW5ndGg7XG4gICAgICB2YXIgZGlydHk7XG4gICAgICBpZiAoY29uZmlnLmNoYXJEYXRhICYmICR0YXJnZXQubm9kZVR5cGUgPT09IDMgJiYgJHRhcmdldC5ub2RlVmFsdWUgIT09ICRvbGRzdGF0ZS5jaGFyRGF0YSkge1xuICAgICAgICBtdXRhdGlvbnMucHVzaChcbiAgICAgICAgICBuZXcgTXV0YXRpb25SZWNvcmQoe1xuICAgICAgICAgICAgdHlwZTogXCJjaGFyYWN0ZXJEYXRhXCIsXG4gICAgICAgICAgICB0YXJnZXQ6ICR0YXJnZXQsXG4gICAgICAgICAgICBvbGRWYWx1ZTogJG9sZHN0YXRlLmNoYXJEYXRhLFxuICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICAvLyBBbHJpZ2h0IHdlIGNoZWNrIGJhc2UgbGV2ZWwgY2hhbmdlcyBpbiBhdHRyaWJ1dGVzLi4uIGVhc3lcbiAgICAgIGlmIChjb25maWcuYXR0ciAmJiAkb2xkc3RhdGUuYXR0cikge1xuICAgICAgICBfdGhpcy5maW5kQXR0cmlidXRlTXV0YXRpb25zKG11dGF0aW9ucywgJHRhcmdldCwgJG9sZHN0YXRlLmF0dHIsIGNvbmZpZy5hZmlsdGVyKTtcbiAgICAgIH1cbiAgICAgIC8vIGNoZWNrIGNoaWxkbGlzdCBvciBzdWJ0cmVlIGZvciBtdXRhdGlvbnNcbiAgICAgIGlmIChjb25maWcua2lkcyB8fCBjb25maWcuZGVzY2VuZGVudHMpIHtcbiAgICAgICAgZGlydHkgPSBfdGhpcy5zZWFyY2hTdWJ0cmVlKG11dGF0aW9ucywgJHRhcmdldCwgJG9sZHN0YXRlLCBjb25maWcpO1xuICAgICAgfVxuICAgICAgLy8gcmVjbG9uZSBkYXRhIHN0cnVjdHVyZSBpZiB0aGVyZXMgY2hhbmdlc1xuICAgICAgaWYgKGRpcnR5IHx8IG11dGF0aW9ucy5sZW5ndGggIT09IG9sZW4pIHtcbiAgICAgICAgLyoqIHR5cGUge0VsZXN0dWN0fSAqL1xuICAgICAgICAkb2xkc3RhdGUgPSBVdGlsLmNsb25lKCR0YXJnZXQsIGNvbmZpZyk7XG4gICAgICB9XG4gICAgfTtcbiAgfTtcbiAgTXV0YXRpb25PYnNlcnZlci5wcm90b3R5cGUuc2NoZWR1bGVNdXRhdGlvbkNoZWNrID0gZnVuY3Rpb24ob2JzZXJ2ZXIpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIC8vIE9ubHkgc2NoZWR1bGUgaWYgdGhlcmUgaXNuJ3QgYWxyZWFkeSBhIHRpbWVyLlxuICAgIGlmICghb2JzZXJ2ZXIuX3RpbWVvdXQpIHtcbiAgICAgIG9ic2VydmVyLl90aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIF90aGlzLm11dGF0aW9uQ2hlY2tlcihvYnNlcnZlcik7XG4gICAgICB9LCB0aGlzLl9wZXJpb2QpO1xuICAgIH1cbiAgfTtcbiAgTXV0YXRpb25PYnNlcnZlci5wcm90b3R5cGUubXV0YXRpb25DaGVja2VyID0gZnVuY3Rpb24ob2JzZXJ2ZXIpIHtcbiAgICAvLyBhbGxvdyBzY2hlZHVsaW5nIGEgbmV3IHRpbWVyLlxuICAgIG9ic2VydmVyLl90aW1lb3V0ID0gbnVsbDtcbiAgICB2YXIgbXV0YXRpb25zID0gb2JzZXJ2ZXIudGFrZVJlY29yZHMoKTtcbiAgICBpZiAobXV0YXRpb25zLmxlbmd0aCkge1xuICAgICAgLy8gZmlyZSBhd2F5XG4gICAgICAvLyBjYWxsaW5nIHRoZSBsaXN0ZW5lciB3aXRoIGNvbnRleHQgaXMgbm90IHNwZWMgYnV0IGN1cnJlbnRseSBjb25zaXN0ZW50IHdpdGggRkYgYW5kIFdlYktpdFxuICAgICAgb2JzZXJ2ZXIuX2xpc3RlbmVyKG11dGF0aW9ucywgb2JzZXJ2ZXIpO1xuICAgIH1cbiAgfTtcbiAgTXV0YXRpb25PYnNlcnZlci5wcm90b3R5cGUuc2VhcmNoU3VidHJlZSA9IGZ1bmN0aW9uKG11dGF0aW9ucywgJHRhcmdldCwgJG9sZHN0YXRlLCBjb25maWcpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIC8vIFRyYWNrIGlmIHRoZSB0cmVlIGlzIGRpcnR5IGFuZCBoYXMgdG8gYmUgcmVjb21wdXRlZCAoIzE0KS5cbiAgICB2YXIgZGlydHk7XG4gICAgLypcbiAgICAgKiBIZWxwZXIgdG8gaWRlbnRpZnkgbm9kZSByZWFycmFuZ21lbnQgYW5kIHN0dWZmLi4uXG4gICAgICogVGhlcmUgaXMgbm8gZ2F1cmVudGVlIHRoYXQgdGhlIHNhbWUgbm9kZSB3aWxsIGJlIGlkZW50aWZpZWQgZm9yIGJvdGggYWRkZWQgYW5kIHJlbW92ZWQgbm9kZXNcbiAgICAgKiBpZiB0aGUgcG9zaXRpb25zIGhhdmUgYmVlbiBzaHVmZmxlZC5cbiAgICAgKiBjb25mbGljdHMgYXJyYXkgd2lsbCBiZSBlbXB0aWVkIGJ5IGVuZCBvZiBvcGVyYXRpb25cbiAgICAgKi9cbiAgICB2YXIgX3Jlc29sdmVDb25mbGljdHMgPSBmdW5jdGlvbihjb25mbGljdHMsIG5vZGUsICRraWRzLCAkb2xka2lkcywgbnVtQWRkZWROb2Rlcykge1xuICAgICAgLy8gdGhlIGRpc3RhbmNlIGJldHdlZW4gdGhlIGZpcnN0IGNvbmZsaWN0aW5nIG5vZGUgYW5kIHRoZSBsYXN0XG4gICAgICB2YXIgZGlzdGFuY2UgPSBjb25mbGljdHMubGVuZ3RoIC0gMTtcbiAgICAgIC8vIHByZXZlbnRzIHNhbWUgY29uZmxpY3QgYmVpbmcgcmVzb2x2ZWQgdHdpY2UgY29uc2lkZXIgd2hlbiB0d28gbm9kZXMgc3dpdGNoIHBsYWNlcy5cbiAgICAgIC8vIG9ubHkgb25lIHNob3VsZCBiZSBnaXZlbiBhIG11dGF0aW9uIGV2ZW50IChub3RlIC1+IGlzIHVzZWQgYXMgYSBtYXRoLmNlaWwgc2hvcnRoYW5kKVxuICAgICAgdmFyIGNvdW50ZXIgPSAtfigoZGlzdGFuY2UgLSBudW1BZGRlZE5vZGVzKSAvIDIpO1xuICAgICAgdmFyICRjdXI7XG4gICAgICB2YXIgb2xkc3RydWN0O1xuICAgICAgdmFyIGNvbmZsaWN0O1xuICAgICAgd2hpbGUgKChjb25mbGljdCA9IGNvbmZsaWN0cy5wb3AoKSkpIHtcbiAgICAgICAgJGN1ciA9ICRraWRzW2NvbmZsaWN0LmldO1xuICAgICAgICBvbGRzdHJ1Y3QgPSAkb2xka2lkc1tjb25mbGljdC5qXTtcbiAgICAgICAgLy8gYXR0ZW1wdCB0byBkZXRlcm1pbmUgaWYgdGhlcmUgd2FzIG5vZGUgcmVhcnJhbmdlbWVudC4uLiB3b24ndCBnYXVyZW50ZWUgYWxsIG1hdGNoZXNcbiAgICAgICAgLy8gYWxzbyBoYW5kbGVzIGNhc2Ugd2hlcmUgYWRkZWQvcmVtb3ZlZCBub2RlcyBjYXVzZSBub2RlcyB0byBiZSBpZGVudGlmaWVkIGFzIGNvbmZsaWN0c1xuICAgICAgICBpZiAoY29uZmlnLmtpZHMgJiYgY291bnRlciAmJiBNYXRoLmFicyhjb25mbGljdC5pIC0gY29uZmxpY3QuaikgPj0gZGlzdGFuY2UpIHtcbiAgICAgICAgICBtdXRhdGlvbnMucHVzaChcbiAgICAgICAgICAgIG5ldyBNdXRhdGlvblJlY29yZCh7XG4gICAgICAgICAgICAgIHR5cGU6IFwiY2hpbGRMaXN0XCIsXG4gICAgICAgICAgICAgIHRhcmdldDogbm9kZSxcbiAgICAgICAgICAgICAgYWRkZWROb2RlczogWyRjdXJdLFxuICAgICAgICAgICAgICByZW1vdmVkTm9kZXM6IFskY3VyXSxcbiAgICAgICAgICAgICAgLy8gaGFoYSBkb24ndCByZWx5IG9uIHRoaXMgcGxlYXNlXG4gICAgICAgICAgICAgIG5leHRTaWJsaW5nOiAkY3VyLm5leHRTaWJsaW5nLFxuICAgICAgICAgICAgICBwcmV2aW91c1NpYmxpbmc6ICRjdXIucHJldmlvdXNTaWJsaW5nLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICApO1xuICAgICAgICAgIGNvdW50ZXItLTsgLy8gZm91bmQgY29uZmxpY3RcbiAgICAgICAgfVxuICAgICAgICAvLyBBbHJpZ2h0IHdlIGZvdW5kIHRoZSByZXNvcnRlZCBub2RlcyBub3cgY2hlY2sgZm9yIG90aGVyIHR5cGVzIG9mIG11dGF0aW9uc1xuICAgICAgICBpZiAoY29uZmlnLmF0dHIgJiYgb2xkc3RydWN0LmF0dHIpIF90aGlzLmZpbmRBdHRyaWJ1dGVNdXRhdGlvbnMobXV0YXRpb25zLCAkY3VyLCBvbGRzdHJ1Y3QuYXR0ciwgY29uZmlnLmFmaWx0ZXIpO1xuICAgICAgICBpZiAoY29uZmlnLmNoYXJEYXRhICYmICRjdXIubm9kZVR5cGUgPT09IDMgJiYgJGN1ci5ub2RlVmFsdWUgIT09IG9sZHN0cnVjdC5jaGFyRGF0YSkge1xuICAgICAgICAgIG11dGF0aW9ucy5wdXNoKFxuICAgICAgICAgICAgbmV3IE11dGF0aW9uUmVjb3JkKHtcbiAgICAgICAgICAgICAgdHlwZTogXCJjaGFyYWN0ZXJEYXRhXCIsXG4gICAgICAgICAgICAgIHRhcmdldDogJGN1cixcbiAgICAgICAgICAgICAgb2xkVmFsdWU6IG9sZHN0cnVjdC5jaGFyRGF0YSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBub3cgbG9vayBAIHN1YnRyZWVcbiAgICAgICAgaWYgKGNvbmZpZy5kZXNjZW5kZW50cykgX2ZpbmRNdXRhdGlvbnMoJGN1ciwgb2xkc3RydWN0KTtcbiAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIE1haW4gd29ya2VyLiBGaW5kcyBhbmQgYWRkcyBtdXRhdGlvbnMgaWYgdGhlcmUgYXJlIGFueVxuICAgICAqIEBwYXJhbSB7Tm9kZX0gbm9kZVxuICAgICAqIEBwYXJhbSB7IU9iamVjdH0gb2xkIDogQSBjbG9uZWQgZGF0YSBzdHJ1Y3R1cmUgdXNpbmcgaW50ZXJuYWwgY2xvbmVcbiAgICAgKi9cbiAgICB2YXIgX2ZpbmRNdXRhdGlvbnMgPSBmdW5jdGlvbihub2RlLCBvbGQpIHtcbiAgICAgIHZhciAka2lkcyA9IG5vZGUuY2hpbGROb2RlcztcbiAgICAgIHZhciAkb2xka2lkcyA9IG9sZC5raWRzO1xuICAgICAgdmFyIGtsZW4gPSAka2lkcy5sZW5ndGg7XG4gICAgICAvLyAkb2xka2lkcyB3aWxsIGJlIHVuZGVmaW5lZCBmb3IgdGV4dCBhbmQgY29tbWVudCBub2Rlc1xuICAgICAgdmFyIG9sZW4gPSAkb2xka2lkcyA/ICRvbGRraWRzLmxlbmd0aCA6IDA7XG4gICAgICAvLyBpZiAoIW9sZW4gJiYgIWtsZW4pIHJldHVybjsgLy8gYm90aCBlbXB0eTsgY2xlYXJseSBubyBjaGFuZ2VzXG4gICAgICAvLyB3ZSBkZWxheSB0aGUgaW50aWFsaXphdGlvbiBvZiB0aGVzZSBmb3IgbWFyZ2luYWwgcGVyZm9ybWFuY2UgaW4gdGhlIGV4cGVjdGVkIGNhc2UgKGFjdHVhbGx5IHF1aXRlIHNpZ25maWNhbnQgb24gbGFyZ2Ugc3VidHJlZXMgd2hlbiB0aGVzZSB3b3VsZCBiZSBvdGhlcndpc2UgdW51c2VkKVxuICAgICAgLy8gbWFwIG9mIGNoZWNrZWQgZWxlbWVudCBvZiBpZHMgdG8gcHJldmVudCByZWdpc3RlcmluZyB0aGUgc2FtZSBjb25mbGljdCB0d2ljZVxuICAgICAgdmFyIG1hcDtcbiAgICAgIC8vIGFycmF5IG9mIHBvdGVudGlhbCBjb25mbGljdHMgKGllIG5vZGVzIHRoYXQgbWF5IGhhdmUgYmVlbiByZSBhcnJhbmdlZClcbiAgICAgIHZhciBjb25mbGljdHM7XG4gICAgICB2YXIgaWQ7IC8vIGVsZW1lbnQgaWQgZnJvbSBnZXRFbGVtZW50SWQgaGVscGVyXG4gICAgICB2YXIgaWR4OyAvLyBpbmRleCBvZiBhIG1vdmVkIG9yIGluc2VydGVkIGVsZW1lbnRcbiAgICAgIHZhciBvbGRzdHJ1Y3Q7XG4gICAgICAvLyBjdXJyZW50IGFuZCBvbGQgbm9kZXNcbiAgICAgIHZhciAkY3VyO1xuICAgICAgdmFyICRvbGQ7XG4gICAgICAvLyB0cmFjayB0aGUgbnVtYmVyIG9mIGFkZGVkIG5vZGVzIHNvIHdlIGNhbiByZXNvbHZlIGNvbmZsaWN0cyBtb3JlIGFjY3VyYXRlbHlcbiAgICAgIHZhciBudW1BZGRlZE5vZGVzID0gMDtcbiAgICAgIC8vIGl0ZXJhdGUgb3ZlciBib3RoIG9sZCBhbmQgY3VycmVudCBjaGlsZCBub2RlcyBhdCB0aGUgc2FtZSB0aW1lXG4gICAgICB2YXIgaSA9IDA7XG4gICAgICB2YXIgaiA9IDA7XG4gICAgICAvLyB3aGlsZSB0aGVyZSBpcyBzdGlsbCBhbnl0aGluZyBsZWZ0IGluICRraWRzIG9yICRvbGRraWRzIChzYW1lIGFzIGkgPCAka2lkcy5sZW5ndGggfHwgaiA8ICRvbGRraWRzLmxlbmd0aDspXG4gICAgICB3aGlsZSAoaSA8IGtsZW4gfHwgaiA8IG9sZW4pIHtcbiAgICAgICAgLy8gY3VycmVudCBhbmQgb2xkIG5vZGVzIGF0IHRoZSBpbmRleHNcbiAgICAgICAgJGN1ciA9ICRraWRzW2ldO1xuICAgICAgICBvbGRzdHJ1Y3QgPSAkb2xka2lkc1tqXTtcbiAgICAgICAgJG9sZCA9IG9sZHN0cnVjdCAmJiBvbGRzdHJ1Y3Qubm9kZTtcbiAgICAgICAgaWYgKCRjdXIgPT09ICRvbGQpIHtcbiAgICAgICAgICAvLyBleHBlY3RlZCBjYXNlIC0gb3B0aW1pemVkIGZvciB0aGlzIGNhc2VcbiAgICAgICAgICAvLyBjaGVjayBhdHRyaWJ1dGVzIGFzIHNwZWNpZmllZCBieSBjb25maWdcbiAgICAgICAgICBpZiAoY29uZmlnLmF0dHIgJiYgb2xkc3RydWN0LmF0dHIpIHtcbiAgICAgICAgICAgIC8qIG9sZHN0cnVjdC5hdHRyIGluc3RlYWQgb2YgdGV4dG5vZGUgY2hlY2sgKi9cbiAgICAgICAgICAgIF90aGlzLmZpbmRBdHRyaWJ1dGVNdXRhdGlvbnMobXV0YXRpb25zLCAkY3VyLCBvbGRzdHJ1Y3QuYXR0ciwgY29uZmlnLmFmaWx0ZXIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBjaGVjayBjaGFyYWN0ZXIgZGF0YSBpZiBub2RlIGlzIGEgY29tbWVudCBvciB0ZXh0Tm9kZSBhbmQgaXQncyBiZWluZyBvYnNlcnZlZFxuICAgICAgICAgIGlmIChjb25maWcuY2hhckRhdGEgJiYgb2xkc3RydWN0LmNoYXJEYXRhICE9PSB1bmRlZmluZWQgJiYgJGN1ci5ub2RlVmFsdWUgIT09IG9sZHN0cnVjdC5jaGFyRGF0YSkge1xuICAgICAgICAgICAgbXV0YXRpb25zLnB1c2goXG4gICAgICAgICAgICAgIG5ldyBNdXRhdGlvblJlY29yZCh7XG4gICAgICAgICAgICAgICAgdHlwZTogXCJjaGFyYWN0ZXJEYXRhXCIsXG4gICAgICAgICAgICAgICAgdGFyZ2V0OiAkY3VyLFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gcmVzb2x2ZSBjb25mbGljdHM7IGl0IHdpbGwgYmUgdW5kZWZpbmVkIGlmIHRoZXJlIGFyZSBubyBjb25mbGljdHMgLSBvdGhlcndpc2UgYW4gYXJyYXlcbiAgICAgICAgICBpZiAoY29uZmxpY3RzKSBfcmVzb2x2ZUNvbmZsaWN0cyhjb25mbGljdHMsIG5vZGUsICRraWRzLCAkb2xka2lkcywgbnVtQWRkZWROb2Rlcyk7XG4gICAgICAgICAgLy8gcmVjdXJzZSBvbiBuZXh0IGxldmVsIG9mIGNoaWxkcmVuLiBBdm9pZHMgdGhlIHJlY3Vyc2l2ZSBjYWxsIHdoZW4gdGhlcmUgYXJlIG5vIGNoaWxkcmVuIGxlZnQgdG8gaXRlcmF0ZVxuICAgICAgICAgIGlmIChjb25maWcuZGVzY2VuZGVudHMgJiYgKCRjdXIuY2hpbGROb2Rlcy5sZW5ndGggfHwgKG9sZHN0cnVjdC5raWRzICYmIG9sZHN0cnVjdC5raWRzLmxlbmd0aCkpKSBfZmluZE11dGF0aW9ucygkY3VyLCBvbGRzdHJ1Y3QpO1xuICAgICAgICAgIGkrKztcbiAgICAgICAgICBqKys7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gKHVuY29tbW9uIGNhc2UpIGxvb2thaGVhZCB1bnRpbCB0aGV5IGFyZSB0aGUgc2FtZSBhZ2FpbiBvciB0aGUgZW5kIG9mIGNoaWxkcmVuXG4gICAgICAgICAgZGlydHkgPSB0cnVlO1xuICAgICAgICAgIGlmICghbWFwKSB7XG4gICAgICAgICAgICAvLyBkZWxheWVkIGluaXRhbGl6YXRpb24gKGJpZyBwZXJmIGJlbmVmaXQpXG4gICAgICAgICAgICBtYXAgPSB7fTtcbiAgICAgICAgICAgIGNvbmZsaWN0cyA9IFtdO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoJGN1cikge1xuICAgICAgICAgICAgLy8gY2hlY2sgaWQgaXMgaW4gdGhlIGxvY2F0aW9uIG1hcCBvdGhlcndpc2UgZG8gYSBpbmRleE9mIHNlYXJjaFxuICAgICAgICAgICAgaWYgKCFtYXBbKGlkID0gVXRpbC5nZXRFbGVtZW50SWQoJGN1cikpXSkge1xuICAgICAgICAgICAgICAvLyB0byBwcmV2ZW50IGRvdWJsZSBjaGVja2luZ1xuICAgICAgICAgICAgICAvLyBtYXJrIGlkIGFzIGZvdW5kXG4gICAgICAgICAgICAgIG1hcFtpZF0gPSB0cnVlO1xuICAgICAgICAgICAgICAvLyBjdXN0b20gaW5kZXhPZiB1c2luZyBjb21wYXJpdG9yIGNoZWNraW5nIG9sZGtpZHNbaV0ubm9kZSA9PT0gJGN1clxuICAgICAgICAgICAgICBpZiAoKGlkeCA9IFV0aWwuaW5kZXhPZkN1c3RvbU5vZGUoJG9sZGtpZHMsICRjdXIsIGopKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICBpZiAoY29uZmlnLmtpZHMpIHtcbiAgICAgICAgICAgICAgICAgIG11dGF0aW9ucy5wdXNoKFxuICAgICAgICAgICAgICAgICAgICBuZXcgTXV0YXRpb25SZWNvcmQoe1xuICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiY2hpbGRMaXN0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OiBub2RlLFxuICAgICAgICAgICAgICAgICAgICAgIGFkZGVkTm9kZXM6IFskY3VyXSxcbiAgICAgICAgICAgICAgICAgICAgICBuZXh0U2libGluZzogJGN1ci5uZXh0U2libGluZyxcbiAgICAgICAgICAgICAgICAgICAgICBwcmV2aW91c1NpYmxpbmc6ICRjdXIucHJldmlvdXNTaWJsaW5nLFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgIG51bUFkZGVkTm9kZXMrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uZmxpY3RzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgaTogaSxcbiAgICAgICAgICAgICAgICAgIGo6IGlkeCxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaSsrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAkb2xkICYmXG4gICAgICAgICAgICAvLyBzcGVjaWFsIGNhc2U6IHRoZSBjaGFuZ2VzIG1heSBoYXZlIGJlZW4gcmVzb2x2ZWQ6IGkgYW5kIGogYXBwZWFyIGNvbmd1cmVudCBzbyB3ZSBjYW4gY29udGludWUgdXNpbmcgdGhlIGV4cGVjdGVkIGNhc2VcbiAgICAgICAgICAgICRvbGQgIT09ICRraWRzW2ldXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBpZiAoIW1hcFsoaWQgPSBVdGlsLmdldEVsZW1lbnRJZCgkb2xkKSldKSB7XG4gICAgICAgICAgICAgIG1hcFtpZF0gPSB0cnVlO1xuICAgICAgICAgICAgICBpZiAoKGlkeCA9IFV0aWwuaW5kZXhPZigka2lkcywgJG9sZCwgaSkpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIGlmIChjb25maWcua2lkcykge1xuICAgICAgICAgICAgICAgICAgbXV0YXRpb25zLnB1c2goXG4gICAgICAgICAgICAgICAgICAgIG5ldyBNdXRhdGlvblJlY29yZCh7XG4gICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJjaGlsZExpc3RcIixcbiAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQ6IG9sZC5ub2RlLFxuICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZWROb2RlczogWyRvbGRdLFxuICAgICAgICAgICAgICAgICAgICAgIG5leHRTaWJsaW5nOiAkb2xka2lkc1tqICsgMV0sXG4gICAgICAgICAgICAgICAgICAgICAgcHJldmlvdXNTaWJsaW5nOiAkb2xka2lkc1tqIC0gMV0sXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgbnVtQWRkZWROb2Rlcy0tO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25mbGljdHMucHVzaCh7XG4gICAgICAgICAgICAgICAgICBpOiBpZHgsXG4gICAgICAgICAgICAgICAgICBqOiBqLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBqKys7XG4gICAgICAgICAgfVxuICAgICAgICB9IC8vIGVuZCB1bmNvbW1vbiBjYXNlXG4gICAgICB9IC8vIGVuZCBsb29wXG4gICAgICAvLyByZXNvbHZlIGFueSByZW1haW5pbmcgY29uZmxpY3RzXG4gICAgICBpZiAoY29uZmxpY3RzKSBfcmVzb2x2ZUNvbmZsaWN0cyhjb25mbGljdHMsIG5vZGUsICRraWRzLCAkb2xka2lkcywgbnVtQWRkZWROb2Rlcyk7XG4gICAgfTtcbiAgICBfZmluZE11dGF0aW9ucygkdGFyZ2V0LCAkb2xkc3RhdGUpO1xuICAgIHJldHVybiBkaXJ0eTtcbiAgfTtcbiAgTXV0YXRpb25PYnNlcnZlci5wcm90b3R5cGUuZmluZEF0dHJpYnV0ZU11dGF0aW9ucyA9IGZ1bmN0aW9uKG11dGF0aW9ucywgJHRhcmdldCwgJG9sZHN0YXRlLCBmaWx0ZXIpIHtcbiAgICB2YXIgY2hlY2tlZCA9IHt9O1xuICAgIHZhciBhdHRyaWJ1dGVzID0gJHRhcmdldC5hdHRyaWJ1dGVzO1xuICAgIHZhciBhdHRyO1xuICAgIHZhciBuYW1lO1xuICAgIHZhciBpID0gYXR0cmlidXRlcy5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgYXR0ciA9IGF0dHJpYnV0ZXNbaV07XG4gICAgICBuYW1lID0gYXR0ci5uYW1lO1xuICAgICAgaWYgKCFmaWx0ZXIgfHwgVXRpbC5oYXMoZmlsdGVyLCBuYW1lKSkge1xuICAgICAgICBpZiAoYXR0ci52YWx1ZSAhPT0gJG9sZHN0YXRlW25hbWVdKSB7XG4gICAgICAgICAgLy8gVGhlIHB1c2hpbmcgaXMgcmVkdW5kYW50IGJ1dCBnemlwcyB2ZXJ5IG5pY2VseVxuICAgICAgICAgIG11dGF0aW9ucy5wdXNoKFxuICAgICAgICAgICAgbmV3IE11dGF0aW9uUmVjb3JkKHtcbiAgICAgICAgICAgICAgdHlwZTogXCJhdHRyaWJ1dGVzXCIsXG4gICAgICAgICAgICAgIHRhcmdldDogJHRhcmdldCxcbiAgICAgICAgICAgICAgYXR0cmlidXRlTmFtZTogbmFtZSxcbiAgICAgICAgICAgICAgb2xkVmFsdWU6ICRvbGRzdGF0ZVtuYW1lXSxcbiAgICAgICAgICAgICAgYXR0cmlidXRlTmFtZXNwYWNlOiBhdHRyLm5hbWVzcGFjZVVSSSwgLy8gaW4gaWU8OCBpdCBpbmNvcnJlY3RseSB3aWxsIHJldHVybiB1bmRlZmluZWRcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBjaGVja2VkW25hbWVdID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgZm9yIChuYW1lIGluICRvbGRzdGF0ZSkge1xuICAgICAgaWYgKCFjaGVja2VkW25hbWVdKSB7XG4gICAgICAgIG11dGF0aW9ucy5wdXNoKFxuICAgICAgICAgIG5ldyBNdXRhdGlvblJlY29yZCh7XG4gICAgICAgICAgICB0YXJnZXQ6ICR0YXJnZXQsXG4gICAgICAgICAgICB0eXBlOiBcImF0dHJpYnV0ZXNcIixcbiAgICAgICAgICAgIGF0dHJpYnV0ZU5hbWU6IG5hbWUsXG4gICAgICAgICAgICBvbGRWYWx1ZTogJG9sZHN0YXRlW25hbWVdLFxuICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuICByZXR1cm4gTXV0YXRpb25PYnNlcnZlcjtcbn0pKCk7XG5tb2R1bGUuZXhwb3J0cy5NdXRhdGlvbk9ic2VydmVyID0gTXV0YXRpb25PYnNlcnZlcjtcbnZhciBNdXRhdGlvblJlY29yZCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uKCkge1xuICBmdW5jdGlvbiBNdXRhdGlvblJlY29yZChkYXRhKSB7XG4gICAgdmFyIHNldHRpbmdzID0ge1xuICAgICAgdHlwZTogbnVsbCxcbiAgICAgIHRhcmdldDogbnVsbCxcbiAgICAgIGFkZGVkTm9kZXM6IFtdLFxuICAgICAgcmVtb3ZlZE5vZGVzOiBbXSxcbiAgICAgIHByZXZpb3VzU2libGluZzogbnVsbCxcbiAgICAgIG5leHRTaWJsaW5nOiBudWxsLFxuICAgICAgYXR0cmlidXRlTmFtZTogbnVsbCxcbiAgICAgIGF0dHJpYnV0ZU5hbWVzcGFjZTogbnVsbCxcbiAgICAgIG9sZFZhbHVlOiBudWxsLFxuICAgIH07XG4gICAgZm9yICh2YXIgcHJvcCBpbiBkYXRhKSB7XG4gICAgICBpZiAoVXRpbC5oYXMoc2V0dGluZ3MsIHByb3ApICYmIGRhdGFbcHJvcF0gIT09IHVuZGVmaW5lZCkgc2V0dGluZ3NbcHJvcF0gPSBkYXRhW3Byb3BdO1xuICAgIH1cbiAgICByZXR1cm4gc2V0dGluZ3M7XG4gIH1cbiAgcmV0dXJuIE11dGF0aW9uUmVjb3JkO1xufSkoKTtcbm1vZHVsZS5leHBvcnRzLk11dGF0aW9uUmVjb3JkID0gTXV0YXRpb25SZWNvcmQ7XG52YXIgTXV0YXRpb25Ob3RpZmllciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uKF9zdXBlcikge1xuICBfX2V4dGVuZHMoTXV0YXRpb25Ob3RpZmllciwgX3N1cGVyKTtcbiAgZnVuY3Rpb24gTXV0YXRpb25Ob3RpZmllcigpIHtcbiAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgIF90aGlzLnNldE1heExpc3RlbmVycygxMDApO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuICBNdXRhdGlvbk5vdGlmaWVyLmdldEluc3RhbmNlID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKCFNdXRhdGlvbk5vdGlmaWVyLl9pbnN0YW5jZSkge1xuICAgICAgTXV0YXRpb25Ob3RpZmllci5faW5zdGFuY2UgPSBuZXcgTXV0YXRpb25Ob3RpZmllcigpO1xuICAgIH1cbiAgICByZXR1cm4gTXV0YXRpb25Ob3RpZmllci5faW5zdGFuY2U7XG4gIH07XG4gIE11dGF0aW9uTm90aWZpZXIucHJvdG90eXBlLmRlc3RydWN0ID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoXCJjaGFuZ2VkXCIpO1xuICB9O1xuICBNdXRhdGlvbk5vdGlmaWVyLnByb3RvdHlwZS5ub3RpZnlDaGFuZ2VkID0gZnVuY3Rpb24obm9kZSkge1xuICAgIHRoaXMuZW1pdChcImNoYW5nZWRcIiwgbm9kZSk7XG4gIH07XG4gIE11dGF0aW9uTm90aWZpZXIuX2luc3RhbmNlID0gbnVsbDtcbiAgcmV0dXJuIE11dGF0aW9uTm90aWZpZXI7XG59KShFdmVudEVtaXR0ZXIpO1xubW9kdWxlLmV4cG9ydHMuTXV0YXRpb25Ob3RpZmllciA9IE11dGF0aW9uTm90aWZpZXI7XG4iXSwibWFwcGluZ3MiOiI7O0FBY0EsSUFBQUEsT0FBQSxHQUFBQyxPQUFBO0FBZEE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBR0EsSUFBSUMsU0FBUyxHQUNWLFVBQVEsU0FBS0EsU0FBUyxJQUN0QixZQUFXO0VBQ1YsSUFBSUMsYUFBYSxHQUNmQyxNQUFNLENBQUNDLGNBQWMsSUFDcEI7SUFBRUMsU0FBUyxFQUFFO0VBQUcsQ0FBQyxZQUFZQyxLQUFLLElBQ2pDLFVBQVNDLENBQUMsRUFBRUMsQ0FBQyxFQUFFO0lBQ2JELENBQUMsQ0FBQ0YsU0FBUyxHQUFHRyxDQUFDO0VBQ2pCLENBQUUsSUFDSixVQUFTRCxDQUFDLEVBQUVDLENBQUMsRUFBRTtJQUNiLEtBQUss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