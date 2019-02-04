'use babel';

const path = require('path');

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
  if (atom.packages.isPackageLoaded('tree-view') === false) {
    console.warn(`copy-filename: package tree-view not
                  loaded, so copy-filename isn't loaded`);
    return;
  }

  // Get the loaded tree-view module
  const pkg = atom.packages.getLoadedPackage('tree-view');
  const { treeView } = pkg.mainModule;
  const { selectedPath } = treeView;

  // Copy filename to users clipboard
  const filename = path.basename(selectedPath);
  atom.clipboard.write(filename);
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
