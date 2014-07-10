var path = require('path');

module.exports = {
  /**
   * Package activation
   */
  activate: function(state) {
    var workspace;
    console.log('activate(state)');
    console.log(state);
    workspace = atom.workspaceView;
    workspace.command("copy-filename:copy-tree-view-filename", (function(_this) {
      return function() {
        return _this.copyTreeFile();
      };
    })(this));
    return workspace.command("copy-filename:copy-open-file-filename", (function(_this) {
      return function() {
        return _this.copyOpenFile();
      };
    })(this));
  },

  /*
   * Copys a filename from the tree-view context to clipboard
   */
  copyTreeFile: function() {
    var treeView, treeViewMain;

    treeView = atom.packages.getLoadedPackage('tree-view');
    if(!treeView) {
      return;
    }
    treeViewMain = treeView.mainModule.treeView;
    if(treeViewMain.selectedPath) {
      atom.clipboard.write(path.basename(treeViewMain.selectedPath));
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
