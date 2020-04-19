const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById( 'todo-list' );
const itemCountSpan = document.getElementById( 'item-count' );
const uncheckedCountSpan = document.getElementById( 'unchecked-count' );
const description = document.getElementById( 'todo-description' );
const submitButton = document.getElementById('submit-button' );

let count = 0;
let uncheckedCount = 0;

function newTodo() {
  if ( description.value === '' ){
    alert( 'mmm...a description is missing' );
    return null;
  };

  count++
  uncheckedCount++
  itemCountSpan.innerText = count;
  uncheckedCountSpan.innerText = uncheckedCount;

  const newTodo = document.createElement( 'span' )
  newTodo.innerText= description.value;
  newTodo.classList.add( classNames.TODO_TEXT )
  description.value = '';

  const deleteButton = document.createElement( 'button' );
  const text = document.createTextNode( 'Delete Me' );
  deleteButton.appendChild( text );
  deleteButton.classList.add( classNames.TODO_DELETE );
  deleteButton.addEventListener( 'click', e => {
    const grandParent = e.target.parentElement.parentElement;
    grandParent.remove();
    count--;
    itemCountSpan.innerText = count;
    if ( ! e.target.parentElement.firstChild.checked ){
      uncheckedCount--;
      uncheckedCountSpan.innerText = uncheckedCount;
    };
  });

  const checkbox = document.createElement( 'input' );
  checkbox.type = 'checkbox';
  checkbox.classList.add( classNames.TODO_CHECKBOX );
  checkbox.addEventListener( 'click', e => {
    if ( e.target.checked ){
      uncheckedCount--;
      return uncheckedCountSpan.innerText = uncheckedCount;
    };
    uncheckedCount++;
    uncheckedCountSpan.innerText = uncheckedCount;
  });

  const span = document.createElement( 'span' );
  span.appendChild( checkbox );
  span.appendChild( newTodo );
  span.appendChild( deleteButton );

  const li = document.createElement( 'li' );
  li.appendChild( span );
  li.classList.add( classNames.TODO_ITEM );
  list.appendChild( li );
};

description.addEventListener( 'keydown', e => {
  if ( e.key === 'Enter' ){
    return newTodo();
  }
});