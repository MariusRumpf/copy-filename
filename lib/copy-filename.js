'use strict';

var path = require('path');

module.exports = {
  /**
   * Package activation
   */
  activate: function() {
    atom.commands.add('atom-workspace', {
      'copy-filename:copy-tree-view-name': (function(self) {
        return function() {
          return self.copyTreeFile();
        };
      })(this)
    });
    atom.commands.add('atom-workspace', {
      'copy-filename:copy-open-file-filename': (function(self) {
        return function() {
          return self.copyOpenFile();
        };
      })(this)
    });
  },

  /**
   * Copys a filename from the tree-view context to clipboard
   */
  copyTreeFile: function() {
    var packageObj;

    // Require package to get path from
    if (atom.packages.isPackageLoaded('tree-view') === true) {
      var treeView = atom.packages.getLoadedPackage('tree-view');
      treeView = require(treeView.mainModulePath);
      packageObj = treeView.serialize();
    } else if (atom.packages.isPackageLoaded('sublime-tabs') === true) {
      var sublimeTabs = atom.packages.getLoadedPackage('sublime-tabs');
      sublimeTabs = require(sublimeTabs.mainModulePath);
      packageObj = sublimeTabs.serialize();
    } else {
      console.warn('copy-filename: no tree-view or sublime-tabs package is ' +
                   'loaded, copy-filename isn\'t loaded');
      return;
    }

    // Extract and copy path
    if (typeof packageObj !== 'undefined' && packageObj !== null) {
      if (packageObj.selectedPath) {
        atom.clipboard.write(path.basename(packageObj.selectedPath));
      }
    }
  },

  /**
   * Copy the filename from the current focused file to clipboard
   */
  copyOpenFile: function() {
    var editor;
    var file;

    editor = atom.workspace.getActivePaneItem();
    if (!editor) {
      return;
    }
    file = editor.buffer.file;
    if (!file) {
      return;
    }
    atom.clipboard.write(path.basename(file.path));
  }
};
