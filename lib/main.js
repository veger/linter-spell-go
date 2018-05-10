'use babel';

import { CompositeDisposable } from 'atom';

const grammarScopes = [
  'source.go',         // language-go
  'source.embedded.go' // language-markdown
];

export default {
  disposables: null,

  provideGrammar () {
    return [{
      grammarScopes: grammarScopes,
      checkedScopes: {
        'source.go': false,
        'source.embedded.go': false,
        'comment.block.go': true,
        'comment.line.double-slash.go': true
      }
    }];
  },

  provideDictionary () {
    let wordList = require('linter-spell-word-list');
    let a = new wordList.ConfigWordList({
      name: 'Go',
      keyPath: 'linter-spell-go.words',
      grammarScopes: grammarScopes
    });
    this.disposables.add(a);
    return a.provideDictionary();
  },

  activate () {
    this.disposables = new CompositeDisposable();
    require('atom-package-deps').install('linter-spell-go')
      .then(() => {
        console.log('All dependencies installed, good to go');
      });
  },

  deactivate () {
    this.disposables.dispose();
  }
};
