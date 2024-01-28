if (typeof browser === 'undefined') {
  globalThis.browser = chrome
}

function onClickToolbarButton() {
}
browser.browserAction.onClicked.addListener(onClickToolbarButton)

function onClickSaveImage(info, tab) {
  console.log(info);
}
browser.contextMenus.create(
  {
    id: 'clutter-save-image',
    title: 'Save to Clutter',
    contexts: ['image'],
    icons: {
      32: 'icons/clutter-32.png',
    },
  },
)
browser.contextMenus.onClicked.addListener((info, tab) => {
  switch (info.menuItemId) {
    case 'clutter-save-image':
      onClickSaveImage(info, tab);
      break;
  }
})
