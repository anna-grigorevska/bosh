const apiUrl = 'http://msk2-api.edinie.ru';
const types = ['hol', 'sma', 'pmm', 'sush', 'varo', 'duh', 'mcv', 'kof'];
$(document).ready(function() {
  let activePhone = '';
  let activeOrder = '';
  // добавленние типов техники
  types.map(item => {
    $('[data-type="'+ item +'"]').parents('.technics').removeClass('d-none')
  })
  // маска для телефона
  $('[type="tel"]').mask("+9999 999 9999",{placeholder:" "})

  // изменение контента в зависимости от выбраного типа
  $('.technics input').on('change', function (e) {
    $('.technics input').prop( "disabled", true );
    $('.section-toggle.open').removeClass('open');
    let newTitle = $(this).parents('.technics').find('span').text().toLowerCase();
    $('#active-name').text(getTitle(newTitle));
    setTimeout(
      () => {
        $(`.${e.target.id}`).addClass('open');
        $('.technics input').prop( "disabled", false );
      }
      , 900)
  })
  // Вернуть заголовок
  function getTitle (title) {
    switch (title) {
      case 'холодильники':
        return 'холодильник'
      case 'стиральные машины':
        return 'стиральную машину'
      case 'посудомойки':
        return 'посудомойку'
      case 'сушилки':
        return 'сушилку'
      case 'варочные поверхности':
        return 'варочную поверхность'
      case 'духовки':
        return 'духовку'
      case 'свч печи':
        return 'свч печь'
      case 'кофемашины':
        return 'кофемашину'
      default:
        return ''
    }
  }

  // подкалюченние слайдера
  $('.owl-carousel').owlCarousel({
    items: 1,
    autoplay: true,
    loop: true
  });
  // Открытие модального окна с верхней формы
  $('#top-form').click(function() {
    $('#phone-top').removeClass('error');
    let tel = $('#phone-top').val() || false;
    if (!tel) {
      $('#phone-top').addClass('error');
      return false
    }
    activePhone = tel;
    createOrder(tel);
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
    activePhone = tel;
    createOrder(tel);
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
    updateOrder(user, options, location)
    $('#thank-callback-modal').removeClass('open');
    $('#thank').addClass('open')
  });
  // обработчик клика на кнопку модального окна fix-modal
  $('#fix-modal button').click(function() {
    let valid = true;
    $('#fix-modal input').removeClass('error')
    let phone = $('#fix-modal input[name="phone"]').val() || false;
    if(!phone){
      valid = false;
      $('#fix-modal input[name="phone"]').addClass('error')
    }
    let location = $('#fix-modal input[name="location"]').val() || false;
    if(!location){
      valid = false;
      $('#fix-modal input[name="location"]').addClass('error')
    }
    let option = $('#fix-modal input[name="option"]').val() || false;
    if(!option){
      valid = false;
      $('#fix-modal input[name="option"]').addClass('error')
    }
    let user = $('#fix-modal input[name="user"]').val() || false;
    if(!user){
      valid = false;
      $('#fix-modal input[name="user"]').addClass('error')
    }
    if(!valid) {return false}
    createOrder(phone, user, option, location)
    $('#fix-modal').removeClass('open');
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
    createOrder(phone, '', option, location);
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
    $('#fix-modal [name="option"]').val('запрос юрлица');
  })
  // узнать о скидке
  $('#discount').click(function() {
    $('.modals-wrap').addClass('open');
    $('#fix-modal').addClass('open');
    $('#fix-modal [name="option"]').val('узнать о скидке');
  })
  // Создание заявки
  function createOrder(phone, name, description, district) {
    let data = {phone, description: ''}
    let type_id = $('[name="type"]:checked').data();
    if(name) {data.name = name}
    if(description) {data.description = '' + description}
    if(district) {data.district = district}
    if(type_id) {data.type_id = type_id.type}
    axios.post(apiUrl + '/site-form-api/order/create', data).then(data => {
      activeOrder = data.data.code
    })
  }
  // Обновление заявки
  function updateOrder(name, description, district) {
    let type_id = $('[name="type"]:checked').data().type;
    axios.post(apiUrl + '/site-form-api/order/update?code=' + activeOrder, {
      description: '' + description,
      name,
      district,
      type_id
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
  // custom scroll
  setTimeout(
    () => {
      $('body').niceScroll();
    },
    1000
  )
  $('.price-fridge').niceScroll('.price-wrap');
  console.log()
  $('.nicescroll-rails-hr .nicescroll-cursors').html('<div class="scroll-custom"><span></span><span></span><span></span></div>')
  $(`[data-type="${types[0]}"]`).prop( "checked", true );
  let title = $(`[data-type="${types[0]}"]`).parents('.technics').find('span').text().toLowerCase();
  let activeInputId = $(`[data-type="${types[0]}"]`).attr('id');
  $('.' + activeInputId).addClass('open');
  $('#active-name').text(getTitle(title));
})
