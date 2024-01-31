import { uploadImage } from './api.mjs'

if (typeof browser === 'undefined') {
  globalThis.browser = chrome
}

// #region Toolbar button

function onClickToolbarButton() {}

browser.browserAction.onClicked.addListener(onClickToolbarButton)

// #endregion

// #region Context menu

async function onClickSaveImage(info, tab) {
  await uploadImage(info.srcUrl)
}

browser.contextMenus.create({
  id: 'clutter-save-image',
  title: 'Save to Clutter',
  contexts: ['image'],
  icons: {
    32: 'icons/clutter-32.png',
  },
})

browser.contextMenus.onClicked.addListener((info, tab) => {
  switch (info.menuItemId) {
    case 'clutter-save-image':
      onClickSaveImage(info, tab)
      break
  }
})

// #endregion
