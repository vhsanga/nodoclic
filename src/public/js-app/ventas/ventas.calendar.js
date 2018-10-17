var date = new Date()
    var d    = date.getDate(),
        m    = date.getMonth(),
        y    = date.getFullYear()
    $('#calendarioVentas').fullCalendar({
      header    : {
        left  : 'prev,next today',
        center: 'title',        
      },
      buttonText: {
        today: 'hoy',
      },
      //Random default events
      events    : [],
      editable  : true,
      dayClick: function( date, jsEvent, view ) { 
          console.log(date.format());
          loadTablaVentaFecha(date.format(),"LL");

      },
      
    })