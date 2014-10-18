'use strict';

var path = require('path');

module.exports = {
  /**
   * Package activation
   */
  activate: function() {
    var workspace;
    workspace = atom.workspaceView;
    workspace.command('copy-filename:copy-tree-view-name', (function(_this) {
      return function() {
        return _this.copyTreeFile();
      };
    })(this));
    return workspace.command('copy-filename:copy-open-file-filename', (function(_this) {
      return function() {
        return _this.copyOpenFile();
      };
    })(this));
  },

  /*
   * Copys a filename from the tree-view context to clipboard
   */
  copyTreeFile: function() {
    var packageObj;

    // Require package to get path from
    if(atom.packages.isPackageLoaded('tree-view') === true) {
      var treeView = atom.packages.getLoadedPackage('tree-view');
      treeView = require(treeView.path);
      packageObj = treeView.serialize();
    } else if(atom.packages.isPackageLoaded('sublime-tabs') === true) {
      var sublimeTabs = atom.packages.getLoadedPackage('sublime-tabs');
      sublimeTabs = require(sublimeTabs.path);
      packageObj = sublimeTabs.serialize();
    } else {
      return console.warn('copy-filename: tree-view or sublime-tabs package is not loaded');
    }

    // Extract and copy path
    if(typeof packageObj !== 'undefined' && packageObj !== null) {
      if(packageObj.selectedPath) {
        atom.clipboard.write(path.basename(packageObj.selectedPath));
      }
    }
  },

  /*
   * Copy the filename from the current focused file to clipboard
   */
  copyOpenFile: function() {
    var editor, file;

    editor = atom.workspace.getActivePaneItem();
    if(!editor) {
      return;
    }
    file = editor.buffer.file;
    if(!file) {
      return;
    }
    atom.clipboard.write(path.basename(file.path));
  }

};
