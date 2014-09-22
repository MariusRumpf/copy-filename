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
    var treeView, treeViewObj, filepath;

    treeView = atom.packages.getLoadedPackage('tree-view');
    treeView = require(treeView.path);

    treeViewObj = treeView.serialize();
    if(typeof treeViewObj !== 'undefined' && treeViewObj !== null) {
      if(treeViewObj.selectedPath) {
        filepath = path.basename(treeViewObj.selectedPath);
        atom.clipboard.write(filepath);
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
