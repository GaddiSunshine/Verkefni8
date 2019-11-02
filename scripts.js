const ENTER_KEYCODE = 13;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const items = document.querySelector('.items');

  text.init(form, items);
});

const text = (() => {
  let items;

  function init(_form, _items) {
    items = _items;
    _form.addEventListener('submit', formHandler);
    
    for(const item of items.querySelectorAll('.item')){
      const checkbox = item.querySelector('.item__checkbox');
      checkbox.addEventListener('click', finish);

      const itemText = item.querySelector('.item__text');
      itemText.addEventListener('click', edit);

      const itemButton = item.querySelector('.item__button');
      itemButton.addEventListener('click', deleteItem);
    }


    // TODO láta hluti í _items virka
  }

  function formHandler(e) {
    e.preventDefault();

    const input = e.target.querySelector('.form__input');

    if (input.value.trim().length > 0) {
      add(input.value.trim());
    }
    input.value = '';
  }

  // event handler fyrir það að klára færslu
  function finish(e) {
    e.target.parentNode.classList.toggle('item--done');
  }

  // event handler fyrir það að breyta færslu
  function edit(e) {
    const { target } = e;
    const { textContent, parentNode } = target;

    parentNode.removeChild(target);

    const input = el('input', 'item__edit');
    input.setAttribute('type', 'text');
    input.value = textContent;
    input.addEventListener('keyup', commit);

    const button = parentNode.querySelector('.item__button');

    parentNode.insertBefore(input, button);
    input.focus();
  }

  // event handler fyrir það að klára að breyta færslu
  function commit(e) {
    const { keyCode, target } = e;

   if (keyCode === 13) {
     const { value, parentNode } = target;
   
     target.removeEventListener('keyup', commit);
     parentNode.removeChild(target);
   
     const text = el('span', 'item__text', edit);
     text.appendChild(document.createTextNode(value));
   
     const button = parentNode.querySelector('.item__button');
   
     parentNode.insertBefore(text, button);
    }  
  }

  // fall sem sér um að bæta við nýju item
  function add(value) {
    const item = el('li', 'item');

    const checkbox = el('input', 'item__checkbox', finish);
    checkbox.setAttribute('type', 'checkbox');

    const itemText = el('span', 'item__text', edit);
    itemText.appendChild(document.createTextNode(value));

    const itemButton = el('button', 'item__button', deleteItem);
    itemButton.appendChild(document.createTextNode('Eyða'));

    item.appendChild(checkbox);
    item.appendChild(itemText);
    item.appendChild(itemButton);

    items.appendChild(item);
  }

  // event handler til að eyða færslu
  function deleteItem(e) {
    const parent = e.target.parentNode;

    const checkbox = parent.querySelector('.item__checkbox');
    const itemText = parent.querySelector('.item__text');
    const itemButton = parent.querySelector('.item__button');
    
    checkbox.removeEventListener('click', finish);
    itemText.removeEventListener('click', edit);
    itemButton.removeEventListener('click', deleteItem);

    parent.parentNode.removeChild(parent);
  }

  // hjálparfall til að útbúa elesment
  function el(type, className, clickHandler) {
    const element = document.createElement(type);

    if (className) {
      element.classList.add(className);
    }

    if (clickHandler) {
      element.addEventListener('click', clickHandler)
    }
    return element;
  }

  return {
    init: init
  }
})();
