function formatMyMessage(message) {
  return `<div class="row text-light my-message">

  <div class="col-1 mt-4">
  <i class="fas fa-user fa-2x text-primary"></i>
  </div>
  <div class="col mb-2 text-left">
    <span class="badge badge-pill bg-primary p-3">${message}</span>
  </div>
  <div class="col-2"></div>

</div>`
}

function formatBotMessage(message) {
  return `<div class="row text-light bot-message">
  <div class="col-2"></div>
  <div class="col  mb-2  text-right">
    <span class="badge badge-pill bg-info p-3">${message}</span>
  </div>
  <div class="col-1 mt-4">
    <i class="fas fa-robot text-info fa-2x"></i>
  </div>
</div>`
}

function addMyMessage(message) {
  addMessage(formatMyMessage(message))
}

function addBotAnswer(message) {
  addMessage(formatBotMessage(message))
}

function addMessage(message) {
  //$('#messages').append(message)
  document.getElementById('messages').insertAdjacentHTML(
    'beforeend',
    message
  )
}


$(function() {
  document.getElementById('input').onkeypress = function(e) {
    if (e.code == 'Enter') {
      addMyMessage($(this).val())
      addBotAnswer($(this).val())
      $(this).val('')
    }
  };
});