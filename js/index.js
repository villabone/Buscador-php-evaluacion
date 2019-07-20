/*
  Creación de una función personalizada para jQuery que detecta cuando se detiene el scroll en la página
*/
$.fn.scrollEnd = function(callback, timeout) {
  $(this).scroll(function(){
    var $this = $(this);
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback,timeout));
  });
};
/*
  Función que inicializa el elemento Slider
*/

function inicializarSlider(){
  $("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 200,
    to: 80000,
    prefix: "$"
  });
}
/*
  Función que reproduce el video de fondo al hacer scroll, y deteiene la reproducción al detener el scroll
*/
function playVideoOnScroll(){
  var ultimoScroll = 0,
      intervalRewind;
  var video = document.getElementById('vidFondo');
  $(window)
    .scroll((event)=>{
      var scrollActual = $(window).scrollTop();
      if (scrollActual > ultimoScroll){
       video.play();
     } else {
        //this.rewind(1.0, video, intervalRewind);
        video.play();
     }
     ultimoScroll = scrollActual;
    })
    .scrollEnd(()=>{
      video.pause();
    }, 10)
}

inicializarSlider();
playVideoOnScroll();

$(function(){
  var Bienes = {
    formulario: $('#formulario'),
    $btnTodos: $('#mostrarTodos'),
    contBienes: $('#bienes'),

    Init: function(){
      var self = this
      self.cargarSelect()
      self.cargarTodos()
      self.formulario.submit(function(e){
        e.preventDefault()
        self.searchBienes()
      })
    },
    cargarSelect: function(){
      $('select').material_select()
    },
    searchBienes: function(e){
      var self = this
      var ciudad = $('form').find('select[id="selectCiudad"]').val()
      var tipo = $('form').find('select[id="selectTipo"]').val()
      var from = self.toNumero($('.irs-from').text())
      var to = self.toNumero($('.irs-to').text())

      var datos = {ciudad: ciudad, tipo: tipo, from: from, to: to}
      self.ajaxData(datos)
    },
    cargarTodos: function(){
      var self = this
      self.$btnTodos.on('click', (e)=>{
        var datos = {todos: ""}
        self.ajaxData(datos)
      })
    },
    ajaxData: function(datos){
      var self = this
      $.ajax({
        url: 'buscador.php',
        type: 'POST',
        data: datos
      }).done(function(data){
        var newData = JSON.parse(data)
        self.renderBienes(newData)
      })
    },
    toNumero: function(num){
      var numero = num
      var newNumero = Number(numero.replace('$', '').replace(',', '').replace(' ', ''))
      return newNumero
    },
    renderBienes: function(bienes){
      var self = this
      var bien = bienes
      self.contBienes.html('')

      bien.map((bien)=>{
        var bienTemplate = '<div class="itemMostrado card horizontal">'+
                                '<img src="img/home.jpg">'+
                                '<div class="card-stacked">'+
                                '<div class="card-content">'+
                                '<div>'+
                                '<b>Direccion: </b>:direccion:<p></p>'+
                                '</div>'+
                                '<div>'+
                                '<b>Ciudad: </b>:ciudad:<p></p>'+
                                '</div>'+
                                '<div>'+
                                '<b>Telefono: </b>:telefono:<p></p>'+
                                '</div>'+
                                '<div>'+
                                '<b>Código postal: </b>:codigo_postal:<p></p>'+
                                '</div>'+
                                '<div>'+
                                '<b>Precio: </b>:precio:<p></p>'+
                                '</div>'+
                                '<div>'+
                                '<b>Tipo: </b>:tipo:<p></p>'+
                                '</div>'+
                                '</div>'+
                                '<div class="card-action right-align">'+
                                '<a href="#">Ver más</a>'+
                                '</div>'+
                                '</div>'+
                                '</div>';

        var newBien = bienTemplate.replace(':direccion:', bien.Direccion)
                                  .replace(':ciudad:', bien.Ciudad)
                                  .replace(':telefono:', bien.Telefono)
                                  .replace(':codigo_postal:', bien.Codigo_Postal)
                                  .replace(':precio:', bien.Precio)
                                  .replace(':tipo:', bien.Tipo)
        self.contBienes.append(newBien)
      })
    }
  }
  Bienes.Init()
})