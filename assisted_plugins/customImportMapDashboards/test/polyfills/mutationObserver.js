"use strict";

var _events = require("events");
/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
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
Object.defineProperty(module.exports, '__esModule', {
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
    return this.indexOf(set, $node, idx, JSCompiler_renameProperty('node'));
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
  Util.expando = 'mo_id';
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
    MutationNotifier.getInstance().on('changed', this._notifyListener);
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
    MutationNotifier.getInstance().removeListener('changed', this._notifyListener);
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
          type: 'characterData',
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
            type: 'childList',
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
            type: 'characterData',
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
              type: 'characterData',
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
                    type: 'childList',
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
                    type: 'childList',
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
            type: 'attributes',
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
          type: 'attributes',
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
    this.removeAllListeners('changed');
  };
  MutationNotifier.prototype.notifyChanged = function (node) {
    this.emit('changed', node);
  };
  MutationNotifier._instance = null;
  return MutationNotifier;
}(_events.EventEmitter);
module.exports.MutationNotifier = MutationNotifier;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfZXZlbnRzIiwicmVxdWlyZSIsIl9fZXh0ZW5kcyIsImV4dGVuZFN0YXRpY3MiLCJPYmplY3QiLCJzZXRQcm90b3R5cGVPZiIsIl9fcHJvdG9fXyIsIkFycmF5IiwiZCIsImIiLCJwIiwiaGFzT3duUHJvcGVydHkiLCJfXyIsImNvbnN0cnVjdG9yIiwicHJvdG90eXBlIiwiY3JlYXRlIiwibW9kdWxlIiwiZXhwb3J0cyIsImRlZmluZVByb3BlcnR5IiwidmFsdWUiLCJVdGlsIiwiY2xvbmUiLCIkdGFyZ2V0IiwiY29uZmlnIiwicmVjdXJzZSIsImNvcHkiLCJlbGVzdHJ1Y3QiLCJub2RlIiwiY2hhckRhdGEiLCJhdHRyIiwia2lkcyIsIm5vZGVUeXBlIiwibm9kZVZhbHVlIiwicmVkdWNlIiwiYXR0cmlidXRlcyIsIm1lbW8iLCJhZmlsdGVyIiwibmFtZSIsImRlc2NlbmRlbnRzIiwibWFwIiwiY2hpbGROb2RlcyIsImluZGV4T2ZDdXN0b21Ob2RlIiwic2V0IiwiJG5vZGUiLCJpZHgiLCJKU0NvbXBpbGVyX3JlbmFtZVByb3BlcnR5IiwiYSIsImluZGV4T2YiLCJnZXRFbGVtZW50SWQiLCIkZWxlIiwiaWQiLCJleHBhbmRvIiwiY291bnRlciIsImUiLCJzaGl0aWUiLCJpdGVyYXRvciIsInJlc3VsdHMiLCJpbmRleCIsImxlbmd0aCIsIml0ZW0iLCJwcm9wIiwiaGFzIiwib2JqIiwidW5kZWZpbmVkIiwiTXV0YXRpb25PYnNlcnZlciIsImxpc3RlbmVyIiwiX3RoaXMiLCJfd2F0Y2hlZCIsIl9saXN0ZW5lciIsIl9wZXJpb2QiLCJfdGltZW91dCIsIl9kaXNwb3NlZCIsIl9ub3RpZnlMaXN0ZW5lciIsInNjaGVkdWxlTXV0YXRpb25DaGVjayIsIm9ic2VydmUiLCJzZXR0aW5ncyIsImF0dHJpYnV0ZUZpbHRlciIsImF0dHJpYnV0ZU9sZFZhbHVlIiwiY2hpbGRMaXN0Iiwic3VidHJlZSIsImNoYXJhY3RlckRhdGEiLCJjaGFyYWN0ZXJEYXRhT2xkVmFsdWUiLCJNdXRhdGlvbk5vdGlmaWVyIiwiZ2V0SW5zdGFuY2UiLCJvbiIsIndhdGNoZWQiLCJpIiwidGFyIiwic3BsaWNlIiwicHVzaCIsImZuIiwiY3JlYXRlTXV0YXRpb25TZWFyY2hlciIsInRha2VSZWNvcmRzIiwibXV0YXRpb25zIiwiZGlzY29ubmVjdCIsInJlbW92ZUxpc3RlbmVyIiwiY2xlYXJUaW1lb3V0IiwiJG9sZHN0YXRlIiwib2xlbiIsImRpcnR5IiwiTXV0YXRpb25SZWNvcmQiLCJ0eXBlIiwidGFyZ2V0Iiwib2xkVmFsdWUiLCJmaW5kQXR0cmlidXRlTXV0YXRpb25zIiwic2VhcmNoU3VidHJlZSIsIm9ic2VydmVyIiwic2V0VGltZW91dCIsIm11dGF0aW9uQ2hlY2tlciIsIl9yZXNvbHZlQ29uZmxpY3RzIiwiY29uZmxpY3RzIiwiJGtpZHMiLCIkb2xka2lkcyIsIm51bUFkZGVkTm9kZXMiLCJkaXN0YW5jZSIsIiRjdXIiLCJvbGRzdHJ1Y3QiLCJjb25mbGljdCIsInBvcCIsImoiLCJNYXRoIiwiYWJzIiwiYWRkZWROb2RlcyIsInJlbW92ZWROb2RlcyIsIm5leHRTaWJsaW5nIiwicHJldmlvdXNTaWJsaW5nIiwiX2ZpbmRNdXRhdGlvbnMiLCJvbGQiLCJrbGVuIiwiJG9sZCIsImZpbHRlciIsImNoZWNrZWQiLCJhdHRyaWJ1dGVOYW1lIiwiYXR0cmlidXRlTmFtZXNwYWNlIiwibmFtZXNwYWNlVVJJIiwiZGF0YSIsIl9zdXBlciIsImNhbGwiLCJzZXRNYXhMaXN0ZW5lcnMiLCJfaW5zdGFuY2UiLCJkZXN0cnVjdCIsInJlbW92ZUFsbExpc3RlbmVycyIsIm5vdGlmeUNoYW5nZWQiLCJlbWl0IiwiRXZlbnRFbWl0dGVyIl0sInNvdXJjZXMiOlsibXV0YXRpb25PYnNlcnZlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IE9wZW5TZWFyY2ggQ29udHJpYnV0b3JzXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gJ2V2ZW50cyc7XG5cbnZhciBfX2V4dGVuZHMgPVxuICAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHxcbiAgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9XG4gICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgICAgZC5fX3Byb3RvX18gPSBiO1xuICAgICAgICB9KSB8fFxuICAgICAgZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgICB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgIGZ1bmN0aW9uIF9fKCkge1xuICAgICAgICB0aGlzLmNvbnN0cnVjdG9yID0gZDtcbiAgICAgIH1cbiAgICAgIGQucHJvdG90eXBlID1cbiAgICAgICAgYiA9PT0gbnVsbFxuICAgICAgICAgID8gT2JqZWN0LmNyZWF0ZShiKVxuICAgICAgICAgIDogKChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSksIG5ldyBfXygpKTtcbiAgICB9O1xuICB9KSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLmV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBVdGlsID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBVdGlsKCkge31cbiAgVXRpbC5jbG9uZSA9IGZ1bmN0aW9uICgkdGFyZ2V0LCBjb25maWcpIHtcbiAgICB2YXIgcmVjdXJzZSA9IHRydWU7IC8vIHNldCB0cnVlIHNvIGNoaWxkTGlzdCB3ZSdsbCBhbHdheXMgY2hlY2sgdGhlIGZpcnN0IGxldmVsXG4gICAgcmV0dXJuIChmdW5jdGlvbiBjb3B5KCR0YXJnZXQpIHtcbiAgICAgIHZhciBlbGVzdHJ1Y3QgPSB7XG4gICAgICAgIC8qKiBAdHlwZSB7Tm9kZX0gKi9cbiAgICAgICAgbm9kZTogJHRhcmdldCxcbiAgICAgICAgY2hhckRhdGE6IG51bGwsXG4gICAgICAgIGF0dHI6IG51bGwsXG4gICAgICAgIGtpZHM6IG51bGwsXG4gICAgICB9O1xuICAgICAgLy8gU3RvcmUgY3VycmVudCBjaGFyYWN0ZXIgZGF0YSBvZiB0YXJnZXQgdGV4dCBvciBjb21tZW50IG5vZGUgaWYgdGhlIGNvbmZpZyByZXF1ZXN0c1xuICAgICAgLy8gdGhvc2UgcHJvcGVydGllcyB0byBiZSBvYnNlcnZlZC5cbiAgICAgIGlmIChcbiAgICAgICAgY29uZmlnLmNoYXJEYXRhICYmXG4gICAgICAgICgkdGFyZ2V0Lm5vZGVUeXBlID09PSAzIHx8ICR0YXJnZXQubm9kZVR5cGUgPT09IDgpXG4gICAgICApIHtcbiAgICAgICAgZWxlc3RydWN0LmNoYXJEYXRhID0gJHRhcmdldC5ub2RlVmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBBZGQgYXR0ciBvbmx5IGlmIHN1YnRyZWUgaXMgc3BlY2lmaWVkIG9yIHRvcCBsZXZlbCBhbmQgYXZvaWQgaWZcbiAgICAgICAgLy8gYXR0cmlidXRlcyBpcyBhIGRvY3VtZW50IG9iamVjdCAoIzEzKS5cbiAgICAgICAgaWYgKGNvbmZpZy5hdHRyICYmIHJlY3Vyc2UgJiYgJHRhcmdldC5ub2RlVHlwZSA9PT0gMSkge1xuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIGNsb25lIGxpdmUgYXR0cmlidXRlIGxpc3QgdG8gYW4gb2JqZWN0IHN0cnVjdHVyZSB7bmFtZTogdmFsfVxuICAgICAgICAgICAqIEB0eXBlIHtPYmplY3QuPHN0cmluZywgc3RyaW5nPn1cbiAgICAgICAgICAgKi9cbiAgICAgICAgICBlbGVzdHJ1Y3QuYXR0ciA9IFV0aWwucmVkdWNlKFxuICAgICAgICAgICAgJHRhcmdldC5hdHRyaWJ1dGVzLFxuICAgICAgICAgICAgZnVuY3Rpb24gKG1lbW8sIGF0dHIpIHtcbiAgICAgICAgICAgICAgaWYgKCFjb25maWcuYWZpbHRlciB8fCBjb25maWcuYWZpbHRlclthdHRyLm5hbWVdKSB7XG4gICAgICAgICAgICAgICAgbWVtb1thdHRyLm5hbWVdID0gYXR0ci52YWx1ZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gbWVtbztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7fVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gd2hldGhlciB3ZSBzaG91bGQgaXRlcmF0ZSB0aGUgY2hpbGRyZW4gb2YgJHRhcmdldCBub2RlXG4gICAgICAgIGlmIChcbiAgICAgICAgICByZWN1cnNlICYmXG4gICAgICAgICAgKGNvbmZpZy5raWRzIHx8XG4gICAgICAgICAgICBjb25maWcuY2hhckRhdGEgfHxcbiAgICAgICAgICAgIChjb25maWcuYXR0ciAmJiBjb25maWcuZGVzY2VuZGVudHMpKVxuICAgICAgICApIHtcbiAgICAgICAgICAvKiogQHR5cGUge0FycmF5LjwhT2JqZWN0Pn0gOiBBcnJheSBvZiBjdXN0b20gY2xvbmUgKi9cbiAgICAgICAgICBlbGVzdHJ1Y3Qua2lkcyA9IFV0aWwubWFwKCR0YXJnZXQuY2hpbGROb2RlcywgY29weSk7XG4gICAgICAgIH1cbiAgICAgICAgcmVjdXJzZSA9IGNvbmZpZy5kZXNjZW5kZW50cztcbiAgICAgIH1cbiAgICAgIHJldHVybiBlbGVzdHJ1Y3Q7XG4gICAgfSkoJHRhcmdldCk7XG4gIH07XG4gIC8qKlxuICAgKiBpbmRleE9mIGFuIGVsZW1lbnQgaW4gYSBjb2xsZWN0aW9uIG9mIGN1c3RvbSBub2Rlc1xuICAgKlxuICAgKiBAcGFyYW0ge05vZGVMaXN0fSBzZXRcbiAgICogQHBhcmFtIHshT2JqZWN0fSAkbm9kZSA6IEEgY3VzdG9tIGNsb25lZCBub2RlZzMzM1xuICAgKiBAcGFyYW0ge251bWJlcn0gaWR4IDogaW5kZXggdG8gc3RhcnQgdGhlIGxvb3BcbiAgICogQHJldHVybiB7bnVtYmVyfVxuICAgKi9cbiAgVXRpbC5pbmRleE9mQ3VzdG9tTm9kZSA9IGZ1bmN0aW9uIChzZXQsICRub2RlLCBpZHgpIHtcbiAgICB2YXIgSlNDb21waWxlcl9yZW5hbWVQcm9wZXJ0eSA9IGZ1bmN0aW9uIChhKSB7XG4gICAgICByZXR1cm4gYTtcbiAgICB9O1xuICAgIHJldHVybiB0aGlzLmluZGV4T2Yoc2V0LCAkbm9kZSwgaWR4LCBKU0NvbXBpbGVyX3JlbmFtZVByb3BlcnR5KCdub2RlJykpO1xuICB9O1xuICAvKipcbiAgICogQXR0ZW1wdCB0byB1bmlxdWVseSBpZCBhbiBlbGVtZW50IGZvciBoYXNoaW5nLiBXZSBjb3VsZCBvcHRpbWl6ZSB0aGlzIGZvciBsZWdhY3kgYnJvd3NlcnMgYnV0IGl0IGhvcGVmdWxseSB3b250IGJlIGNhbGxlZCBlbm91Z2ggdG8gYmUgYSBjb25jZXJuXG4gICAqXG4gICAqIEBwYXJhbSB7Tm9kZX0gJGVsZVxuICAgKiBAcmV0dXJuIHsoc3RyaW5nfG51bWJlcil9XG4gICAqL1xuICBVdGlsLmdldEVsZW1lbnRJZCA9IGZ1bmN0aW9uICgkZWxlKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgICRlbGUuaWQgfHwgKCRlbGVbdGhpcy5leHBhbmRvXSA9ICRlbGVbdGhpcy5leHBhbmRvXSB8fCB0aGlzLmNvdW50ZXIrKylcbiAgICAgICk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLy8gaWUgPDggd2lsbCB0aHJvdyBpZiB5b3Ugc2V0IGFuIHVua25vd24gcHJvcGVydHkgb24gYSB0ZXh0IG5vZGVcbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiAkZWxlLm5vZGVWYWx1ZTsgLy8gbmFpdmVcbiAgICAgIH0gY2F0Y2ggKHNoaXRpZSkge1xuICAgICAgICAvLyB3aGVuIHRleHQgbm9kZSBpcyByZW1vdmVkOiBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9tZWdhd2FjLzgzNTU5NzggOihcbiAgICAgICAgcmV0dXJuIHRoaXMuY291bnRlcisrO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbiAgLyoqXG4gICAqICoqbWFwKiogQXBwbHkgYSBtYXBwaW5nIGZ1bmN0aW9uIHRvIGVhY2ggaXRlbSBvZiBhIHNldFxuICAgKiBAcGFyYW0ge0FycmF5fE5vZGVMaXN0fSBzZXRcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0b3JcbiAgICovXG4gIFV0aWwubWFwID0gZnVuY3Rpb24gKHNldCwgaXRlcmF0b3IpIHtcbiAgICB2YXIgcmVzdWx0cyA9IFtdO1xuICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBzZXQubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICByZXN1bHRzW2luZGV4XSA9IGl0ZXJhdG9yKHNldFtpbmRleF0sIGluZGV4LCBzZXQpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0cztcbiAgfTtcbiAgLyoqXG4gICAqICoqUmVkdWNlKiogYnVpbGRzIHVwIGEgc2luZ2xlIHJlc3VsdCBmcm9tIGEgbGlzdCBvZiB2YWx1ZXNcbiAgICogQHBhcmFtIHtBcnJheXxOb2RlTGlzdHxOYW1lZE5vZGVNYXB9IHNldFxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRvclxuICAgKiBAcGFyYW0geyp9IFttZW1vXSBJbml0aWFsIHZhbHVlIG9mIHRoZSBtZW1vLlxuICAgKi9cbiAgVXRpbC5yZWR1Y2UgPSBmdW5jdGlvbiAoc2V0LCBpdGVyYXRvciwgbWVtbykge1xuICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBzZXQubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICBtZW1vID0gaXRlcmF0b3IobWVtbywgc2V0W2luZGV4XSwgaW5kZXgsIHNldCk7XG4gICAgfVxuICAgIHJldHVybiBtZW1vO1xuICB9O1xuICAvKipcbiAgICogKippbmRleE9mKiogZmluZCBpbmRleCBvZiBpdGVtIGluIGNvbGxlY3Rpb24uXG4gICAqIEBwYXJhbSB7QXJyYXl8Tm9kZUxpc3R9IHNldFxuICAgKiBAcGFyYW0ge09iamVjdH0gaXRlbVxuICAgKiBAcGFyYW0ge251bWJlcn0gaWR4XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbcHJvcF0gUHJvcGVydHkgb24gc2V0IGl0ZW0gdG8gY29tcGFyZSB0byBpdGVtXG4gICAqL1xuICBVdGlsLmluZGV4T2YgPSBmdW5jdGlvbiAoc2V0LCBpdGVtLCBpZHgsIHByb3ApIHtcbiAgICBmb3IgKDsgLyppZHggPSB+fmlkeCovIGlkeCA8IHNldC5sZW5ndGg7IGlkeCsrKSB7XG4gICAgICAvLyBzdGFydCBpZHggaXMgYWx3YXlzIGdpdmVuIGFzIHRoaXMgaXMgaW50ZXJuYWxcbiAgICAgIGlmICgocHJvcCA/IHNldFtpZHhdW3Byb3BdIDogc2V0W2lkeF0pID09PSBpdGVtKSByZXR1cm4gaWR4O1xuICAgIH1cbiAgICByZXR1cm4gLTE7XG4gIH07XG4gIC8qKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gICAqIEBwYXJhbSB7KHN0cmluZ3xudW1iZXIpfSBwcm9wXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqL1xuICBVdGlsLmhhcyA9IGZ1bmN0aW9uIChvYmosIHByb3ApIHtcbiAgICByZXR1cm4gb2JqW3Byb3BdICE9PSB1bmRlZmluZWQ7IC8vIHdpbGwgYmUgbmljZWx5IGlubGluZWQgYnkgZ2NjXG4gIH07XG4gIFV0aWwuY291bnRlciA9IDE7XG4gIFV0aWwuZXhwYW5kbyA9ICdtb19pZCc7XG4gIHJldHVybiBVdGlsO1xufSkoKTtcbm1vZHVsZS5leHBvcnRzLlV0aWwgPSBVdGlsO1xudmFyIE11dGF0aW9uT2JzZXJ2ZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIE11dGF0aW9uT2JzZXJ2ZXIobGlzdGVuZXIpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIHRoaXMuX3dhdGNoZWQgPSBbXTtcbiAgICB0aGlzLl9saXN0ZW5lciA9IG51bGw7XG4gICAgdGhpcy5fcGVyaW9kID0gMzA7XG4gICAgdGhpcy5fdGltZW91dCA9IG51bGw7XG4gICAgdGhpcy5fZGlzcG9zZWQgPSBmYWxzZTtcbiAgICB0aGlzLl9ub3RpZnlMaXN0ZW5lciA9IG51bGw7XG4gICAgdGhpcy5fd2F0Y2hlZCA9IFtdO1xuICAgIHRoaXMuX2xpc3RlbmVyID0gbGlzdGVuZXI7XG4gICAgdGhpcy5fcGVyaW9kID0gMzA7XG4gICAgdGhpcy5fbm90aWZ5TGlzdGVuZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBfdGhpcy5zY2hlZHVsZU11dGF0aW9uQ2hlY2soX3RoaXMpO1xuICAgIH07XG4gIH1cbiAgTXV0YXRpb25PYnNlcnZlci5wcm90b3R5cGUub2JzZXJ2ZSA9IGZ1bmN0aW9uICgkdGFyZ2V0LCBjb25maWcpIHtcbiAgICB2YXIgc2V0dGluZ3MgPSB7XG4gICAgICBhdHRyOiAhIShcbiAgICAgICAgY29uZmlnLmF0dHJpYnV0ZXMgfHxcbiAgICAgICAgY29uZmlnLmF0dHJpYnV0ZUZpbHRlciB8fFxuICAgICAgICBjb25maWcuYXR0cmlidXRlT2xkVmFsdWVcbiAgICAgICksXG4gICAgICAvLyBzb21lIGJyb3dzZXJzIGVuZm9yY2UgdGhhdCBzdWJ0cmVlIG11c3QgYmUgc2V0IHdpdGggY2hpbGRMaXN0LCBhdHRyaWJ1dGVzIG9yIGNoYXJhY3RlckRhdGEuXG4gICAgICAvLyBXZSBkb24ndCBjYXJlIGFzIHNwZWMgZG9lc24ndCBzcGVjaWZ5IHRoaXMgcnVsZS5cbiAgICAgIGtpZHM6ICEhY29uZmlnLmNoaWxkTGlzdCxcbiAgICAgIGRlc2NlbmRlbnRzOiAhIWNvbmZpZy5zdWJ0cmVlLFxuICAgICAgY2hhckRhdGE6ICEhKGNvbmZpZy5jaGFyYWN0ZXJEYXRhIHx8IGNvbmZpZy5jaGFyYWN0ZXJEYXRhT2xkVmFsdWUpLFxuICAgICAgYWZpbHRlcjogbnVsbCxcbiAgICB9O1xuICAgIE11dGF0aW9uTm90aWZpZXIuZ2V0SW5zdGFuY2UoKS5vbignY2hhbmdlZCcsIHRoaXMuX25vdGlmeUxpc3RlbmVyKTtcbiAgICB2YXIgd2F0Y2hlZCA9IHRoaXMuX3dhdGNoZWQ7XG4gICAgLy8gcmVtb3ZlIGFscmVhZHkgb2JzZXJ2ZWQgdGFyZ2V0IGVsZW1lbnQgZnJvbSBwb29sXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB3YXRjaGVkLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAod2F0Y2hlZFtpXS50YXIgPT09ICR0YXJnZXQpIHdhdGNoZWQuc3BsaWNlKGksIDEpO1xuICAgIH1cbiAgICBpZiAoY29uZmlnLmF0dHJpYnV0ZUZpbHRlcikge1xuICAgICAgLyoqXG4gICAgICAgKiBjb252ZXJ0cyB0byBhIHtrZXk6IHRydWV9IGRpY3QgZm9yIGZhc3RlciBsb29rdXBcbiAgICAgICAqIEB0eXBlIHtPYmplY3QuPFN0cmluZyxCb29sZWFuPn1cbiAgICAgICAqL1xuICAgICAgc2V0dGluZ3MuYWZpbHRlciA9IFV0aWwucmVkdWNlKFxuICAgICAgICBjb25maWcuYXR0cmlidXRlRmlsdGVyLFxuICAgICAgICBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICAgIGFbYl0gPSB0cnVlO1xuICAgICAgICAgIHJldHVybiBhO1xuICAgICAgICB9LFxuICAgICAgICB7fVxuICAgICAgKTtcbiAgICB9XG4gICAgd2F0Y2hlZC5wdXNoKHtcbiAgICAgIHRhcjogJHRhcmdldCxcbiAgICAgIGZuOiB0aGlzLmNyZWF0ZU11dGF0aW9uU2VhcmNoZXIoJHRhcmdldCwgc2V0dGluZ3MpLFxuICAgIH0pO1xuICB9O1xuICBNdXRhdGlvbk9ic2VydmVyLnByb3RvdHlwZS50YWtlUmVjb3JkcyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgbXV0YXRpb25zID0gW107XG4gICAgdmFyIHdhdGNoZWQgPSB0aGlzLl93YXRjaGVkO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgd2F0Y2hlZC5sZW5ndGg7IGkrKykge1xuICAgICAgd2F0Y2hlZFtpXS5mbihtdXRhdGlvbnMpO1xuICAgIH1cbiAgICByZXR1cm4gbXV0YXRpb25zO1xuICB9O1xuICBNdXRhdGlvbk9ic2VydmVyLnByb3RvdHlwZS5kaXNjb25uZWN0ID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuX3dhdGNoZWQgPSBbXTsgLy8gY2xlYXIgdGhlIHN0dWZmIGJlaW5nIG9ic2VydmVkXG4gICAgTXV0YXRpb25Ob3RpZmllci5nZXRJbnN0YW5jZSgpLnJlbW92ZUxpc3RlbmVyKFxuICAgICAgJ2NoYW5nZWQnLFxuICAgICAgdGhpcy5fbm90aWZ5TGlzdGVuZXJcbiAgICApO1xuICAgIHRoaXMuX2Rpc3Bvc2VkID0gdHJ1ZTtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5fdGltZW91dCk7IC8vIHJlYWR5IGZvciBnYXJiYWdlIGNvbGxlY3Rpb25cbiAgICB0aGlzLl90aW1lb3V0ID0gbnVsbDtcbiAgfTtcbiAgTXV0YXRpb25PYnNlcnZlci5wcm90b3R5cGUuY3JlYXRlTXV0YXRpb25TZWFyY2hlciA9IGZ1bmN0aW9uIChcbiAgICAkdGFyZ2V0LFxuICAgIGNvbmZpZ1xuICApIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIC8qKiB0eXBlIHtFbGVzdHVjdH0gKi9cbiAgICB2YXIgJG9sZHN0YXRlID0gVXRpbC5jbG9uZSgkdGFyZ2V0LCBjb25maWcpOyAvLyBjcmVhdGUgdGhlIGNsb25lZCBkYXRhc3RydWN0dXJlXG4gICAgLyoqXG4gICAgICogY29uc3VtZXMgYXJyYXkgb2YgbXV0YXRpb25zIHdlIGNhbiBwdXNoIHRvXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0FycmF5LjxNdXRhdGlvblJlY29yZD59IG11dGF0aW9uc1xuICAgICAqL1xuICAgIHJldHVybiBmdW5jdGlvbiAobXV0YXRpb25zKSB7XG4gICAgICB2YXIgb2xlbiA9IG11dGF0aW9ucy5sZW5ndGg7XG4gICAgICB2YXIgZGlydHk7XG4gICAgICBpZiAoXG4gICAgICAgIGNvbmZpZy5jaGFyRGF0YSAmJlxuICAgICAgICAkdGFyZ2V0Lm5vZGVUeXBlID09PSAzICYmXG4gICAgICAgICR0YXJnZXQubm9kZVZhbHVlICE9PSAkb2xkc3RhdGUuY2hhckRhdGFcbiAgICAgICkge1xuICAgICAgICBtdXRhdGlvbnMucHVzaChcbiAgICAgICAgICBuZXcgTXV0YXRpb25SZWNvcmQoe1xuICAgICAgICAgICAgdHlwZTogJ2NoYXJhY3RlckRhdGEnLFxuICAgICAgICAgICAgdGFyZ2V0OiAkdGFyZ2V0LFxuICAgICAgICAgICAgb2xkVmFsdWU6ICRvbGRzdGF0ZS5jaGFyRGF0YSxcbiAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgLy8gQWxyaWdodCB3ZSBjaGVjayBiYXNlIGxldmVsIGNoYW5nZXMgaW4gYXR0cmlidXRlcy4uLiBlYXN5XG4gICAgICBpZiAoY29uZmlnLmF0dHIgJiYgJG9sZHN0YXRlLmF0dHIpIHtcbiAgICAgICAgX3RoaXMuZmluZEF0dHJpYnV0ZU11dGF0aW9ucyhcbiAgICAgICAgICBtdXRhdGlvbnMsXG4gICAgICAgICAgJHRhcmdldCxcbiAgICAgICAgICAkb2xkc3RhdGUuYXR0cixcbiAgICAgICAgICBjb25maWcuYWZpbHRlclxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgLy8gY2hlY2sgY2hpbGRsaXN0IG9yIHN1YnRyZWUgZm9yIG11dGF0aW9uc1xuICAgICAgaWYgKGNvbmZpZy5raWRzIHx8IGNvbmZpZy5kZXNjZW5kZW50cykge1xuICAgICAgICBkaXJ0eSA9IF90aGlzLnNlYXJjaFN1YnRyZWUobXV0YXRpb25zLCAkdGFyZ2V0LCAkb2xkc3RhdGUsIGNvbmZpZyk7XG4gICAgICB9XG4gICAgICAvLyByZWNsb25lIGRhdGEgc3RydWN0dXJlIGlmIHRoZXJlcyBjaGFuZ2VzXG4gICAgICBpZiAoZGlydHkgfHwgbXV0YXRpb25zLmxlbmd0aCAhPT0gb2xlbikge1xuICAgICAgICAvKiogdHlwZSB7RWxlc3R1Y3R9ICovXG4gICAgICAgICRvbGRzdGF0ZSA9IFV0aWwuY2xvbmUoJHRhcmdldCwgY29uZmlnKTtcbiAgICAgIH1cbiAgICB9O1xuICB9O1xuICBNdXRhdGlvbk9ic2VydmVyLnByb3RvdHlwZS5zY2hlZHVsZU11dGF0aW9uQ2hlY2sgPSBmdW5jdGlvbiAob2JzZXJ2ZXIpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIC8vIE9ubHkgc2NoZWR1bGUgaWYgdGhlcmUgaXNuJ3QgYWxyZWFkeSBhIHRpbWVyLlxuICAgIGlmICghb2JzZXJ2ZXIuX3RpbWVvdXQpIHtcbiAgICAgIG9ic2VydmVyLl90aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBfdGhpcy5tdXRhdGlvbkNoZWNrZXIob2JzZXJ2ZXIpO1xuICAgICAgfSwgdGhpcy5fcGVyaW9kKTtcbiAgICB9XG4gIH07XG4gIE11dGF0aW9uT2JzZXJ2ZXIucHJvdG90eXBlLm11dGF0aW9uQ2hlY2tlciA9IGZ1bmN0aW9uIChvYnNlcnZlcikge1xuICAgIC8vIGFsbG93IHNjaGVkdWxpbmcgYSBuZXcgdGltZXIuXG4gICAgb2JzZXJ2ZXIuX3RpbWVvdXQgPSBudWxsO1xuICAgIHZhciBtdXRhdGlvbnMgPSBvYnNlcnZlci50YWtlUmVjb3JkcygpO1xuICAgIGlmIChtdXRhdGlvbnMubGVuZ3RoKSB7XG4gICAgICAvLyBmaXJlIGF3YXlcbiAgICAgIC8vIGNhbGxpbmcgdGhlIGxpc3RlbmVyIHdpdGggY29udGV4dCBpcyBub3Qgc3BlYyBidXQgY3VycmVudGx5IGNvbnNpc3RlbnQgd2l0aCBGRiBhbmQgV2ViS2l0XG4gICAgICBvYnNlcnZlci5fbGlzdGVuZXIobXV0YXRpb25zLCBvYnNlcnZlcik7XG4gICAgfVxuICB9O1xuICBNdXRhdGlvbk9ic2VydmVyLnByb3RvdHlwZS5zZWFyY2hTdWJ0cmVlID0gZnVuY3Rpb24gKFxuICAgIG11dGF0aW9ucyxcbiAgICAkdGFyZ2V0LFxuICAgICRvbGRzdGF0ZSxcbiAgICBjb25maWdcbiAgKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAvLyBUcmFjayBpZiB0aGUgdHJlZSBpcyBkaXJ0eSBhbmQgaGFzIHRvIGJlIHJlY29tcHV0ZWQgKCMxNCkuXG4gICAgdmFyIGRpcnR5O1xuICAgIC8qXG4gICAgICogSGVscGVyIHRvIGlkZW50aWZ5IG5vZGUgcmVhcnJhbmdtZW50IGFuZCBzdHVmZi4uLlxuICAgICAqIFRoZXJlIGlzIG5vIGdhdXJlbnRlZSB0aGF0IHRoZSBzYW1lIG5vZGUgd2lsbCBiZSBpZGVudGlmaWVkIGZvciBib3RoIGFkZGVkIGFuZCByZW1vdmVkIG5vZGVzXG4gICAgICogaWYgdGhlIHBvc2l0aW9ucyBoYXZlIGJlZW4gc2h1ZmZsZWQuXG4gICAgICogY29uZmxpY3RzIGFycmF5IHdpbGwgYmUgZW1wdGllZCBieSBlbmQgb2Ygb3BlcmF0aW9uXG4gICAgICovXG4gICAgdmFyIF9yZXNvbHZlQ29uZmxpY3RzID0gZnVuY3Rpb24gKFxuICAgICAgY29uZmxpY3RzLFxuICAgICAgbm9kZSxcbiAgICAgICRraWRzLFxuICAgICAgJG9sZGtpZHMsXG4gICAgICBudW1BZGRlZE5vZGVzXG4gICAgKSB7XG4gICAgICAvLyB0aGUgZGlzdGFuY2UgYmV0d2VlbiB0aGUgZmlyc3QgY29uZmxpY3Rpbmcgbm9kZSBhbmQgdGhlIGxhc3RcbiAgICAgIHZhciBkaXN0YW5jZSA9IGNvbmZsaWN0cy5sZW5ndGggLSAxO1xuICAgICAgLy8gcHJldmVudHMgc2FtZSBjb25mbGljdCBiZWluZyByZXNvbHZlZCB0d2ljZSBjb25zaWRlciB3aGVuIHR3byBub2RlcyBzd2l0Y2ggcGxhY2VzLlxuICAgICAgLy8gb25seSBvbmUgc2hvdWxkIGJlIGdpdmVuIGEgbXV0YXRpb24gZXZlbnQgKG5vdGUgLX4gaXMgdXNlZCBhcyBhIG1hdGguY2VpbCBzaG9ydGhhbmQpXG4gICAgICB2YXIgY291bnRlciA9IC1+KChkaXN0YW5jZSAtIG51bUFkZGVkTm9kZXMpIC8gMik7XG4gICAgICB2YXIgJGN1cjtcbiAgICAgIHZhciBvbGRzdHJ1Y3Q7XG4gICAgICB2YXIgY29uZmxpY3Q7XG4gICAgICB3aGlsZSAoKGNvbmZsaWN0ID0gY29uZmxpY3RzLnBvcCgpKSkge1xuICAgICAgICAkY3VyID0gJGtpZHNbY29uZmxpY3QuaV07XG4gICAgICAgIG9sZHN0cnVjdCA9ICRvbGRraWRzW2NvbmZsaWN0LmpdO1xuICAgICAgICAvLyBhdHRlbXB0IHRvIGRldGVybWluZSBpZiB0aGVyZSB3YXMgbm9kZSByZWFycmFuZ2VtZW50Li4uIHdvbid0IGdhdXJlbnRlZSBhbGwgbWF0Y2hlc1xuICAgICAgICAvLyBhbHNvIGhhbmRsZXMgY2FzZSB3aGVyZSBhZGRlZC9yZW1vdmVkIG5vZGVzIGNhdXNlIG5vZGVzIHRvIGJlIGlkZW50aWZpZWQgYXMgY29uZmxpY3RzXG4gICAgICAgIGlmIChcbiAgICAgICAgICBjb25maWcua2lkcyAmJlxuICAgICAgICAgIGNvdW50ZXIgJiZcbiAgICAgICAgICBNYXRoLmFicyhjb25mbGljdC5pIC0gY29uZmxpY3QuaikgPj0gZGlzdGFuY2VcbiAgICAgICAgKSB7XG4gICAgICAgICAgbXV0YXRpb25zLnB1c2goXG4gICAgICAgICAgICBuZXcgTXV0YXRpb25SZWNvcmQoe1xuICAgICAgICAgICAgICB0eXBlOiAnY2hpbGRMaXN0JyxcbiAgICAgICAgICAgICAgdGFyZ2V0OiBub2RlLFxuICAgICAgICAgICAgICBhZGRlZE5vZGVzOiBbJGN1cl0sXG4gICAgICAgICAgICAgIHJlbW92ZWROb2RlczogWyRjdXJdLFxuICAgICAgICAgICAgICAvLyBoYWhhIGRvbid0IHJlbHkgb24gdGhpcyBwbGVhc2VcbiAgICAgICAgICAgICAgbmV4dFNpYmxpbmc6ICRjdXIubmV4dFNpYmxpbmcsXG4gICAgICAgICAgICAgIHByZXZpb3VzU2libGluZzogJGN1ci5wcmV2aW91c1NpYmxpbmcsXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICk7XG4gICAgICAgICAgY291bnRlci0tOyAvLyBmb3VuZCBjb25mbGljdFxuICAgICAgICB9XG4gICAgICAgIC8vIEFscmlnaHQgd2UgZm91bmQgdGhlIHJlc29ydGVkIG5vZGVzIG5vdyBjaGVjayBmb3Igb3RoZXIgdHlwZXMgb2YgbXV0YXRpb25zXG4gICAgICAgIGlmIChjb25maWcuYXR0ciAmJiBvbGRzdHJ1Y3QuYXR0cilcbiAgICAgICAgICBfdGhpcy5maW5kQXR0cmlidXRlTXV0YXRpb25zKFxuICAgICAgICAgICAgbXV0YXRpb25zLFxuICAgICAgICAgICAgJGN1cixcbiAgICAgICAgICAgIG9sZHN0cnVjdC5hdHRyLFxuICAgICAgICAgICAgY29uZmlnLmFmaWx0ZXJcbiAgICAgICAgICApO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgY29uZmlnLmNoYXJEYXRhICYmXG4gICAgICAgICAgJGN1ci5ub2RlVHlwZSA9PT0gMyAmJlxuICAgICAgICAgICRjdXIubm9kZVZhbHVlICE9PSBvbGRzdHJ1Y3QuY2hhckRhdGFcbiAgICAgICAgKSB7XG4gICAgICAgICAgbXV0YXRpb25zLnB1c2goXG4gICAgICAgICAgICBuZXcgTXV0YXRpb25SZWNvcmQoe1xuICAgICAgICAgICAgICB0eXBlOiAnY2hhcmFjdGVyRGF0YScsXG4gICAgICAgICAgICAgIHRhcmdldDogJGN1cixcbiAgICAgICAgICAgICAgb2xkVmFsdWU6IG9sZHN0cnVjdC5jaGFyRGF0YSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBub3cgbG9vayBAIHN1YnRyZWVcbiAgICAgICAgaWYgKGNvbmZpZy5kZXNjZW5kZW50cykgX2ZpbmRNdXRhdGlvbnMoJGN1ciwgb2xkc3RydWN0KTtcbiAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIE1haW4gd29ya2VyLiBGaW5kcyBhbmQgYWRkcyBtdXRhdGlvbnMgaWYgdGhlcmUgYXJlIGFueVxuICAgICAqIEBwYXJhbSB7Tm9kZX0gbm9kZVxuICAgICAqIEBwYXJhbSB7IU9iamVjdH0gb2xkIDogQSBjbG9uZWQgZGF0YSBzdHJ1Y3R1cmUgdXNpbmcgaW50ZXJuYWwgY2xvbmVcbiAgICAgKi9cbiAgICB2YXIgX2ZpbmRNdXRhdGlvbnMgPSBmdW5jdGlvbiAobm9kZSwgb2xkKSB7XG4gICAgICB2YXIgJGtpZHMgPSBub2RlLmNoaWxkTm9kZXM7XG4gICAgICB2YXIgJG9sZGtpZHMgPSBvbGQua2lkcztcbiAgICAgIHZhciBrbGVuID0gJGtpZHMubGVuZ3RoO1xuICAgICAgLy8gJG9sZGtpZHMgd2lsbCBiZSB1bmRlZmluZWQgZm9yIHRleHQgYW5kIGNvbW1lbnQgbm9kZXNcbiAgICAgIHZhciBvbGVuID0gJG9sZGtpZHMgPyAkb2xka2lkcy5sZW5ndGggOiAwO1xuICAgICAgLy8gaWYgKCFvbGVuICYmICFrbGVuKSByZXR1cm47IC8vIGJvdGggZW1wdHk7IGNsZWFybHkgbm8gY2hhbmdlc1xuICAgICAgLy8gd2UgZGVsYXkgdGhlIGludGlhbGl6YXRpb24gb2YgdGhlc2UgZm9yIG1hcmdpbmFsIHBlcmZvcm1hbmNlIGluIHRoZSBleHBlY3RlZCBjYXNlIChhY3R1YWxseSBxdWl0ZSBzaWduZmljYW50IG9uIGxhcmdlIHN1YnRyZWVzIHdoZW4gdGhlc2Ugd291bGQgYmUgb3RoZXJ3aXNlIHVudXNlZClcbiAgICAgIC8vIG1hcCBvZiBjaGVja2VkIGVsZW1lbnQgb2YgaWRzIHRvIHByZXZlbnQgcmVnaXN0ZXJpbmcgdGhlIHNhbWUgY29uZmxpY3QgdHdpY2VcbiAgICAgIHZhciBtYXA7XG4gICAgICAvLyBhcnJheSBvZiBwb3RlbnRpYWwgY29uZmxpY3RzIChpZSBub2RlcyB0aGF0IG1heSBoYXZlIGJlZW4gcmUgYXJyYW5nZWQpXG4gICAgICB2YXIgY29uZmxpY3RzO1xuICAgICAgdmFyIGlkOyAvLyBlbGVtZW50IGlkIGZyb20gZ2V0RWxlbWVudElkIGhlbHBlclxuICAgICAgdmFyIGlkeDsgLy8gaW5kZXggb2YgYSBtb3ZlZCBvciBpbnNlcnRlZCBlbGVtZW50XG4gICAgICB2YXIgb2xkc3RydWN0O1xuICAgICAgLy8gY3VycmVudCBhbmQgb2xkIG5vZGVzXG4gICAgICB2YXIgJGN1cjtcbiAgICAgIHZhciAkb2xkO1xuICAgICAgLy8gdHJhY2sgdGhlIG51bWJlciBvZiBhZGRlZCBub2RlcyBzbyB3ZSBjYW4gcmVzb2x2ZSBjb25mbGljdHMgbW9yZSBhY2N1cmF0ZWx5XG4gICAgICB2YXIgbnVtQWRkZWROb2RlcyA9IDA7XG4gICAgICAvLyBpdGVyYXRlIG92ZXIgYm90aCBvbGQgYW5kIGN1cnJlbnQgY2hpbGQgbm9kZXMgYXQgdGhlIHNhbWUgdGltZVxuICAgICAgdmFyIGkgPSAwO1xuICAgICAgdmFyIGogPSAwO1xuICAgICAgLy8gd2hpbGUgdGhlcmUgaXMgc3RpbGwgYW55dGhpbmcgbGVmdCBpbiAka2lkcyBvciAkb2xka2lkcyAoc2FtZSBhcyBpIDwgJGtpZHMubGVuZ3RoIHx8IGogPCAkb2xka2lkcy5sZW5ndGg7KVxuICAgICAgd2hpbGUgKGkgPCBrbGVuIHx8IGogPCBvbGVuKSB7XG4gICAgICAgIC8vIGN1cnJlbnQgYW5kIG9sZCBub2RlcyBhdCB0aGUgaW5kZXhzXG4gICAgICAgICRjdXIgPSAka2lkc1tpXTtcbiAgICAgICAgb2xkc3RydWN0ID0gJG9sZGtpZHNbal07XG4gICAgICAgICRvbGQgPSBvbGRzdHJ1Y3QgJiYgb2xkc3RydWN0Lm5vZGU7XG4gICAgICAgIGlmICgkY3VyID09PSAkb2xkKSB7XG4gICAgICAgICAgLy8gZXhwZWN0ZWQgY2FzZSAtIG9wdGltaXplZCBmb3IgdGhpcyBjYXNlXG4gICAgICAgICAgLy8gY2hlY2sgYXR0cmlidXRlcyBhcyBzcGVjaWZpZWQgYnkgY29uZmlnXG4gICAgICAgICAgaWYgKGNvbmZpZy5hdHRyICYmIG9sZHN0cnVjdC5hdHRyKSB7XG4gICAgICAgICAgICAvKiBvbGRzdHJ1Y3QuYXR0ciBpbnN0ZWFkIG9mIHRleHRub2RlIGNoZWNrICovXG4gICAgICAgICAgICBfdGhpcy5maW5kQXR0cmlidXRlTXV0YXRpb25zKFxuICAgICAgICAgICAgICBtdXRhdGlvbnMsXG4gICAgICAgICAgICAgICRjdXIsXG4gICAgICAgICAgICAgIG9sZHN0cnVjdC5hdHRyLFxuICAgICAgICAgICAgICBjb25maWcuYWZpbHRlclxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gY2hlY2sgY2hhcmFjdGVyIGRhdGEgaWYgbm9kZSBpcyBhIGNvbW1lbnQgb3IgdGV4dE5vZGUgYW5kIGl0J3MgYmVpbmcgb2JzZXJ2ZWRcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBjb25maWcuY2hhckRhdGEgJiZcbiAgICAgICAgICAgIG9sZHN0cnVjdC5jaGFyRGF0YSAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICAkY3VyLm5vZGVWYWx1ZSAhPT0gb2xkc3RydWN0LmNoYXJEYXRhXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBtdXRhdGlvbnMucHVzaChcbiAgICAgICAgICAgICAgbmV3IE11dGF0aW9uUmVjb3JkKHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnY2hhcmFjdGVyRGF0YScsXG4gICAgICAgICAgICAgICAgdGFyZ2V0OiAkY3VyLFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gcmVzb2x2ZSBjb25mbGljdHM7IGl0IHdpbGwgYmUgdW5kZWZpbmVkIGlmIHRoZXJlIGFyZSBubyBjb25mbGljdHMgLSBvdGhlcndpc2UgYW4gYXJyYXlcbiAgICAgICAgICBpZiAoY29uZmxpY3RzKVxuICAgICAgICAgICAgX3Jlc29sdmVDb25mbGljdHMoY29uZmxpY3RzLCBub2RlLCAka2lkcywgJG9sZGtpZHMsIG51bUFkZGVkTm9kZXMpO1xuICAgICAgICAgIC8vIHJlY3Vyc2Ugb24gbmV4dCBsZXZlbCBvZiBjaGlsZHJlbi4gQXZvaWRzIHRoZSByZWN1cnNpdmUgY2FsbCB3aGVuIHRoZXJlIGFyZSBubyBjaGlsZHJlbiBsZWZ0IHRvIGl0ZXJhdGVcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBjb25maWcuZGVzY2VuZGVudHMgJiZcbiAgICAgICAgICAgICgkY3VyLmNoaWxkTm9kZXMubGVuZ3RoIHx8XG4gICAgICAgICAgICAgIChvbGRzdHJ1Y3Qua2lkcyAmJiBvbGRzdHJ1Y3Qua2lkcy5sZW5ndGgpKVxuICAgICAgICAgIClcbiAgICAgICAgICAgIF9maW5kTXV0YXRpb25zKCRjdXIsIG9sZHN0cnVjdCk7XG4gICAgICAgICAgaSsrO1xuICAgICAgICAgIGorKztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyAodW5jb21tb24gY2FzZSkgbG9va2FoZWFkIHVudGlsIHRoZXkgYXJlIHRoZSBzYW1lIGFnYWluIG9yIHRoZSBlbmQgb2YgY2hpbGRyZW5cbiAgICAgICAgICBkaXJ0eSA9IHRydWU7XG4gICAgICAgICAgaWYgKCFtYXApIHtcbiAgICAgICAgICAgIC8vIGRlbGF5ZWQgaW5pdGFsaXphdGlvbiAoYmlnIHBlcmYgYmVuZWZpdClcbiAgICAgICAgICAgIG1hcCA9IHt9O1xuICAgICAgICAgICAgY29uZmxpY3RzID0gW107XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICgkY3VyKSB7XG4gICAgICAgICAgICAvLyBjaGVjayBpZCBpcyBpbiB0aGUgbG9jYXRpb24gbWFwIG90aGVyd2lzZSBkbyBhIGluZGV4T2Ygc2VhcmNoXG4gICAgICAgICAgICBpZiAoIW1hcFsoaWQgPSBVdGlsLmdldEVsZW1lbnRJZCgkY3VyKSldKSB7XG4gICAgICAgICAgICAgIC8vIHRvIHByZXZlbnQgZG91YmxlIGNoZWNraW5nXG4gICAgICAgICAgICAgIC8vIG1hcmsgaWQgYXMgZm91bmRcbiAgICAgICAgICAgICAgbWFwW2lkXSA9IHRydWU7XG4gICAgICAgICAgICAgIC8vIGN1c3RvbSBpbmRleE9mIHVzaW5nIGNvbXBhcml0b3IgY2hlY2tpbmcgb2xka2lkc1tpXS5ub2RlID09PSAkY3VyXG4gICAgICAgICAgICAgIGlmICgoaWR4ID0gVXRpbC5pbmRleE9mQ3VzdG9tTm9kZSgkb2xka2lkcywgJGN1ciwgaikpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIGlmIChjb25maWcua2lkcykge1xuICAgICAgICAgICAgICAgICAgbXV0YXRpb25zLnB1c2goXG4gICAgICAgICAgICAgICAgICAgIG5ldyBNdXRhdGlvblJlY29yZCh7XG4gICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2NoaWxkTGlzdCcsXG4gICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OiBub2RlLFxuICAgICAgICAgICAgICAgICAgICAgIGFkZGVkTm9kZXM6IFskY3VyXSxcbiAgICAgICAgICAgICAgICAgICAgICBuZXh0U2libGluZzogJGN1ci5uZXh0U2libGluZyxcbiAgICAgICAgICAgICAgICAgICAgICBwcmV2aW91c1NpYmxpbmc6ICRjdXIucHJldmlvdXNTaWJsaW5nLFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgIG51bUFkZGVkTm9kZXMrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uZmxpY3RzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgaTogaSxcbiAgICAgICAgICAgICAgICAgIGo6IGlkeCxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaSsrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAkb2xkICYmXG4gICAgICAgICAgICAvLyBzcGVjaWFsIGNhc2U6IHRoZSBjaGFuZ2VzIG1heSBoYXZlIGJlZW4gcmVzb2x2ZWQ6IGkgYW5kIGogYXBwZWFyIGNvbmd1cmVudCBzbyB3ZSBjYW4gY29udGludWUgdXNpbmcgdGhlIGV4cGVjdGVkIGNhc2VcbiAgICAgICAgICAgICRvbGQgIT09ICRraWRzW2ldXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBpZiAoIW1hcFsoaWQgPSBVdGlsLmdldEVsZW1lbnRJZCgkb2xkKSldKSB7XG4gICAgICAgICAgICAgIG1hcFtpZF0gPSB0cnVlO1xuICAgICAgICAgICAgICBpZiAoKGlkeCA9IFV0aWwuaW5kZXhPZigka2lkcywgJG9sZCwgaSkpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIGlmIChjb25maWcua2lkcykge1xuICAgICAgICAgICAgICAgICAgbXV0YXRpb25zLnB1c2goXG4gICAgICAgICAgICAgICAgICAgIG5ldyBNdXRhdGlvblJlY29yZCh7XG4gICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2NoaWxkTGlzdCcsXG4gICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OiBvbGQubm9kZSxcbiAgICAgICAgICAgICAgICAgICAgICByZW1vdmVkTm9kZXM6IFskb2xkXSxcbiAgICAgICAgICAgICAgICAgICAgICBuZXh0U2libGluZzogJG9sZGtpZHNbaiArIDFdLFxuICAgICAgICAgICAgICAgICAgICAgIHByZXZpb3VzU2libGluZzogJG9sZGtpZHNbaiAtIDFdLFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgIG51bUFkZGVkTm9kZXMtLTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uZmxpY3RzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgaTogaWR4LFxuICAgICAgICAgICAgICAgICAgajogaixcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaisrO1xuICAgICAgICAgIH1cbiAgICAgICAgfSAvLyBlbmQgdW5jb21tb24gY2FzZVxuICAgICAgfSAvLyBlbmQgbG9vcFxuICAgICAgLy8gcmVzb2x2ZSBhbnkgcmVtYWluaW5nIGNvbmZsaWN0c1xuICAgICAgaWYgKGNvbmZsaWN0cylcbiAgICAgICAgX3Jlc29sdmVDb25mbGljdHMoY29uZmxpY3RzLCBub2RlLCAka2lkcywgJG9sZGtpZHMsIG51bUFkZGVkTm9kZXMpO1xuICAgIH07XG4gICAgX2ZpbmRNdXRhdGlvbnMoJHRhcmdldCwgJG9sZHN0YXRlKTtcbiAgICByZXR1cm4gZGlydHk7XG4gIH07XG4gIE11dGF0aW9uT2JzZXJ2ZXIucHJvdG90eXBlLmZpbmRBdHRyaWJ1dGVNdXRhdGlvbnMgPSBmdW5jdGlvbiAoXG4gICAgbXV0YXRpb25zLFxuICAgICR0YXJnZXQsXG4gICAgJG9sZHN0YXRlLFxuICAgIGZpbHRlclxuICApIHtcbiAgICB2YXIgY2hlY2tlZCA9IHt9O1xuICAgIHZhciBhdHRyaWJ1dGVzID0gJHRhcmdldC5hdHRyaWJ1dGVzO1xuICAgIHZhciBhdHRyO1xuICAgIHZhciBuYW1lO1xuICAgIHZhciBpID0gYXR0cmlidXRlcy5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgYXR0ciA9IGF0dHJpYnV0ZXNbaV07XG4gICAgICBuYW1lID0gYXR0ci5uYW1lO1xuICAgICAgaWYgKCFmaWx0ZXIgfHwgVXRpbC5oYXMoZmlsdGVyLCBuYW1lKSkge1xuICAgICAgICBpZiAoYXR0ci52YWx1ZSAhPT0gJG9sZHN0YXRlW25hbWVdKSB7XG4gICAgICAgICAgLy8gVGhlIHB1c2hpbmcgaXMgcmVkdW5kYW50IGJ1dCBnemlwcyB2ZXJ5IG5pY2VseVxuICAgICAgICAgIG11dGF0aW9ucy5wdXNoKFxuICAgICAgICAgICAgbmV3IE11dGF0aW9uUmVjb3JkKHtcbiAgICAgICAgICAgICAgdHlwZTogJ2F0dHJpYnV0ZXMnLFxuICAgICAgICAgICAgICB0YXJnZXQ6ICR0YXJnZXQsXG4gICAgICAgICAgICAgIGF0dHJpYnV0ZU5hbWU6IG5hbWUsXG4gICAgICAgICAgICAgIG9sZFZhbHVlOiAkb2xkc3RhdGVbbmFtZV0sXG4gICAgICAgICAgICAgIGF0dHJpYnV0ZU5hbWVzcGFjZTogYXR0ci5uYW1lc3BhY2VVUkksIC8vIGluIGllPDggaXQgaW5jb3JyZWN0bHkgd2lsbCByZXR1cm4gdW5kZWZpbmVkXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgY2hlY2tlZFtuYW1lXSA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAobmFtZSBpbiAkb2xkc3RhdGUpIHtcbiAgICAgIGlmICghY2hlY2tlZFtuYW1lXSkge1xuICAgICAgICBtdXRhdGlvbnMucHVzaChcbiAgICAgICAgICBuZXcgTXV0YXRpb25SZWNvcmQoe1xuICAgICAgICAgICAgdGFyZ2V0OiAkdGFyZ2V0LFxuICAgICAgICAgICAgdHlwZTogJ2F0dHJpYnV0ZXMnLFxuICAgICAgICAgICAgYXR0cmlidXRlTmFtZTogbmFtZSxcbiAgICAgICAgICAgIG9sZFZhbHVlOiAkb2xkc3RhdGVbbmFtZV0sXG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG4gIHJldHVybiBNdXRhdGlvbk9ic2VydmVyO1xufSkoKTtcbm1vZHVsZS5leHBvcnRzLk11dGF0aW9uT2JzZXJ2ZXIgPSBNdXRhdGlvbk9ic2VydmVyO1xudmFyIE11dGF0aW9uUmVjb3JkID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBNdXRhdGlvblJlY29yZChkYXRhKSB7XG4gICAgdmFyIHNldHRpbmdzID0ge1xuICAgICAgdHlwZTogbnVsbCxcbiAgICAgIHRhcmdldDogbnVsbCxcbiAgICAgIGFkZGVkTm9kZXM6IFtdLFxuICAgICAgcmVtb3ZlZE5vZGVzOiBbXSxcbiAgICAgIHByZXZpb3VzU2libGluZzogbnVsbCxcbiAgICAgIG5leHRTaWJsaW5nOiBudWxsLFxuICAgICAgYXR0cmlidXRlTmFtZTogbnVsbCxcbiAgICAgIGF0dHJpYnV0ZU5hbWVzcGFjZTogbnVsbCxcbiAgICAgIG9sZFZhbHVlOiBudWxsLFxuICAgIH07XG4gICAgZm9yICh2YXIgcHJvcCBpbiBkYXRhKSB7XG4gICAgICBpZiAoVXRpbC5oYXMoc2V0dGluZ3MsIHByb3ApICYmIGRhdGFbcHJvcF0gIT09IHVuZGVmaW5lZClcbiAgICAgICAgc2V0dGluZ3NbcHJvcF0gPSBkYXRhW3Byb3BdO1xuICAgIH1cbiAgICByZXR1cm4gc2V0dGluZ3M7XG4gIH1cbiAgcmV0dXJuIE11dGF0aW9uUmVjb3JkO1xufSkoKTtcbm1vZHVsZS5leHBvcnRzLk11dGF0aW9uUmVjb3JkID0gTXV0YXRpb25SZWNvcmQ7XG52YXIgTXV0YXRpb25Ob3RpZmllciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgX19leHRlbmRzKE11dGF0aW9uTm90aWZpZXIsIF9zdXBlcik7XG4gIGZ1bmN0aW9uIE11dGF0aW9uTm90aWZpZXIoKSB7XG4gICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICBfdGhpcy5zZXRNYXhMaXN0ZW5lcnMoMTAwKTtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cbiAgTXV0YXRpb25Ob3RpZmllci5nZXRJbnN0YW5jZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIU11dGF0aW9uTm90aWZpZXIuX2luc3RhbmNlKSB7XG4gICAgICBNdXRhdGlvbk5vdGlmaWVyLl9pbnN0YW5jZSA9IG5ldyBNdXRhdGlvbk5vdGlmaWVyKCk7XG4gICAgfVxuICAgIHJldHVybiBNdXRhdGlvbk5vdGlmaWVyLl9pbnN0YW5jZTtcbiAgfTtcbiAgTXV0YXRpb25Ob3RpZmllci5wcm90b3R5cGUuZGVzdHJ1Y3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoJ2NoYW5nZWQnKTtcbiAgfTtcbiAgTXV0YXRpb25Ob3RpZmllci5wcm90b3R5cGUubm90aWZ5Q2hhbmdlZCA9IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgdGhpcy5lbWl0KCdjaGFuZ2VkJywgbm9kZSk7XG4gIH07XG4gIE11dGF0aW9uTm90aWZpZXIuX2luc3RhbmNlID0gbnVsbDtcbiAgcmV0dXJuIE11dGF0aW9uTm90aWZpZXI7XG59KShFdmVudEVtaXR0ZXIpO1xubW9kdWxlLmV4cG9ydHMuTXV0YXRpb25Ob3RpZmllciA9IE11dGF0aW9uTm90aWZpZXI7XG4iXSwibWFwcGluZ3MiOiI7O0FBS0EsSUFBQUEsT0FBQSxHQUFBQyxPQUFBO0FBTEE7QUFDQTtBQUNBO0FBQ0E7O0FBSUEsSUFBSUMsU0FBUyxHQUNWLFVBQVEsU0FBS0EsU0FBUyxJQUN0QixZQUFZO0VBQ1gsSUFBSUMsYUFBYSxHQUNmQyxNQUFNLENBQUNDLGNBQWMsSUFDcEI7SUFBRUMsU0FBUyxFQUFFO0VBQUcsQ0FBQyxZQUFZQyxLQUFLLElBQ2pDLFVBQVVDLENBQUMsRUFBRUMsQ0FBQyxFQUFFO0lBQ2RELENBQUMsQ0FBQ0YsU0FBUyxHQUFHRyxDQUFDO0VBQ2pCLENBQUUsSUFDSixVQUFVRCxDQUFDLEVBQUVDLENBQUMsRUFBRTtJQUNkLEtBQUssSUFBSUMsQ0FBQyxJQUFJRCxDQUFDLEVBQUUsSUFBSUEsQ0FBQyxDQUFDRSxjQUFjLENBQUNELENBQUMsQ0FBQyxFQUFFRixDQUFDLENBQUNFLENBQUMsQ0FBQyxHQUFHRCxDQUFDLENBQUNDLENBQUMsQ0FBQztFQUN2RCxDQUFDO0VBQ0gsT0FBTyxVQUFVRixDQUFDLEVBQUVDLENBQUMsRUFBRTtJQUNyQk4sYUFBYSxDQUFDSyxDQUFDLEVBQUVDLENBQUMsQ0FBQztJQUNuQixTQUFTRyxFQUFFQSxDQUFBLEVBQUc7TUFDWixJQUFJLENBQUNDLFdBQVcsR0FBR0wsQ0FBQztJQUN0QjtJQUNBQSxDQUFDLENBQUNNLFNBQVMsR0FDVEwsQ0FBQyxLQUFLLElBQUksR0FDTkwsTUFBTSxDQUFDVyxNQUFNLENBQUNOLENBQUMsQ0FBQyxJQUNkRyxFQUFFLENBQUNFLFNBQVMsR0FBR0wsQ0FBQyxDQUFDSyxTQUFTLEVBQUcsSUFBSUYsRUFBRSxDQUFDLENBQUMsQ0FBQztFQUNoRCxDQUFDO0FBQ0gsQ0FBQyxDQUFFLENBQUM7QUFFTkksTUFBTSxDQUFDQyxPQUFPLEdB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