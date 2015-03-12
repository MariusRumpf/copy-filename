'use babel';

var path = require('path');

/**
 * Atom package activation
 */
export function activate() {
  atom.commands.add('atom-workspace', {
    'copy-filename:copy-tree-view-name': () => {
      return this.copyTreeFile();
    },
    'copy-filename:copy-open-file-filename': () => {
      return this.copyOpenFile();
    }
  });
}

/**
 * Copy's a name from tree-view context to clipboard
 */
export function copyTreeFile() {
  let packageObj;

  // Require package to get path from
  if (atom.packages.isPackageLoaded('tree-view') === true) {
    let treeView = atom.packages.getLoadedPackage('tree-view');
    treeView = require(treeView.mainModulePath);
    packageObj = treeView.serialize();
  } else if (atom.packages.isPackageLoaded('sublime-tabs') === true) {
    let sublimeTabs = atom.packages.getLoadedPackage('sublime-tabs');
    sublimeTabs = require(sublimeTabs.mainModulePath);
    packageObj = sublimeTabs.serialize();
  } else {
    console.warn(`copy-filename: no tree-view or sublime-tabs package
                  loaded, copy-filename isn't loaded`);
    return;
  }

  // Extract and copy path
  if (typeof packageObj !== 'undefined' && packageObj !== null) {
    if (packageObj.selectedPath) {
      atom.clipboard.write(path.basename(packageObj.selectedPath));
    }
  }
}

/**
 * Copy the name from the current focused file to clipboard
 */
export function copyOpenFile() {
  let editor = atom.workspace.getActivePaneItem();
  if (!editor) {
    return;
  }

  let file = editor.buffer.file;
  if (!file) {
    return;
  }
  atom.clipboard.write(path.basename(file.path));
}
