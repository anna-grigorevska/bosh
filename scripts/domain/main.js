$(document).ready(function() {
  // изменение контента в зависимости от выбраного типа
  $('.technics input').on('change', function (e) {
    $('.technics input').prop( "disabled", true );
    $('.section-toggle.open').removeClass('open');
    setTimeout(
      () => {
        $(`.${e.target.id}`).addClass('open');
        $('.technics input').prop( "disabled", false );
      }
      , 900)
  })
  // подкалюченние слайдера
  $('.owl-carousel').owlCarousel({
    items: 1
  });
  // Открытие модального окна с верхней формы
  $('#top-form').click(function() {
    $('#phone-top').removeClass('error');
    let tel = $('#phone-top').val() || false;
    if (!tel) {
      $('#phone-top').addClass('error');
      return false
    }
    // api call here
    $('#thank-callback-modal').addClass('open');
    $('.modals-wrap').addClass('open');
  });
  // Открытие модального окна с нижней формы
  $('#bottom-form').click(function() {
    $('#phone-bottom').removeClass('error');
    let tel = $('#phone-bottom').val() || false;
    if (!tel) {
      $('#phone-bottom').addClass('error');
      return false
    }
    // api call here
    $('#thank-callback-modal').addClass('open');
    $('.modals-wrap').addClass('open');
  });
  // клик на оверлей или на закрыть на попапе
  $('.overlay, #close').click(function() {
    $('.modals-wrap, .modal-inner').removeClass('open');
  });
  // обработчик клика на кнопку модального окна thank-callback-modal
  $('#thank-callback-modal button').click(function() {
    let valid = true;
    $('#thank-callback-modal input').removeClass('error')
    let location = $('#thank-callback-modal input[name="location"]').val() || false;
    if(!location){
      valid = false;
      $('#thank-callback-modal input[name="location"]').addClass('error')
    }
    let options = $('#thank-callback-modal input[name="options"]').val() || false;
    if(!options){
      valid = false;
      $('#thank-callback-modal input[name="options"]').addClass('error')
    }
    let user = $('#thank-callback-modal input[name="user"]').val() || false;
    if(!user){
      valid = false;
      $('#thank-callback-modal input[name="user"]').addClass('error')
    }
    if(!valid) {return false}
    // api call
    $('#thank-callback-modal').removeClass('open');
    $('#thank').addClass('open')
  });

  // Обработка форм в изменяющемся контенте
  $('.main-form').on('submit', function(e){
    e.preventDefault();
    let valid = true;
    $(this).find('input').removeClass('error');
    let phone = $(this).find('[name="tel"]').val()
    if(!phone){
      valid = false;
      $(this).find('[name="tel"]').addClass('error')
    }
    let location = $(this).find('[name="geo"]').val()
    if(!location){
      valid = false;
      $(this).find('[name="geo"]').addClass('error')
    }
    let option = $(this).find('[name="problem"]').val()
    if(!option){
      valid = false;
      $(this).find('[name="problem"]').addClass('error')
    }
    if(!valid) {return false}
    // api call
    $('.modals-wrap').addClass('open');
    $('#thank').addClass('open')
  })

  // нажатие на кнопку ордер
  $('button.order').click(function (e) {
    let problem = $(this).parents('.breakdown-wrap').find('h5').text();
    $('.modals-wrap').addClass('open');
    $('#fix-modal').addClass('open');
    $('#fix-modal [name="option"]').val(problem);
  });
  // кнопка комерческое предложение
  $('#commercial-proposal').click(function() {
    $('.modals-wrap').addClass('open');
    $('#fix-modal').addClass('open');
  })
  // узнать о скидке
  $('#discount').click(function() {
    $('.modals-wrap').addClass('open');
    $('#fix-modal').addClass('open');
  })
  // Отправка номера телефона
  function sendPhone(phone) {
    axios.post('https://msk.edinie.ru/site-form-api/order/create', {
      phone
    })
  }
  // scroll to block 
  $('.scroll').on('click', function(event) {
    let target = $( $(this).attr('href') );
    if( target.length ) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: target.offset().top
        }, 500);
    }
  });
})