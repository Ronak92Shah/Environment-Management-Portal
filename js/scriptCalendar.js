/////////////////////////////////////////// START OF CSS NAVIGATION BAR///////////////////////////////////////
// CSS for Navigation Bar
( function( $ ) {
$( document ).ready(function() {
$('#cssmenu').prepend('<div id="bg-one"></div><div id="bg-two"></div><div id="bg-three"></div><div id="bg-four"></div>');
});
})( jQuery );
/////////////////////////////////////////// END OF CSS NAVIGATION BAR///////////////////////////////////////


$(document).ready(function() {
	        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();
	$('#calendar').fullCalendar({
		header: {
			left: 'prev,next today',
			center: 'title',
			right: 'month,basicWeek,basicDay'
		},
		editable: false,
		eventLimit: true, // allow "more" link when too many events
 eventSources: [

                     {
                         url: 'ajax.php',
                         type: 'GET',
                         data: {},
                         error: function () {
                             alert('There was an error while fetching events!');
                         }
                     }
    ],
	
	eventRender: function (event, element) {
        element.attr('href', 'javascript:void(0);');
        element.click(function() {
			$("#show_release_package").html(event.release);
            $("#show_testing_phase").html(event.testing);
			$("#show_environment").html(event.environment);
            $("#show_start_time").html(moment(event.start).format('MMM Do YYYY'));
            $("#show_end_time").html(moment(event.end).format('MMM Do YYYY'));
            $("#eventContent").dialog({ modal: true, title: event.projName, width:350});
        });
    },
	// Nile(Pre-Prod), Prod, Yarra(UAT), Murray, Zambeze, Danube, Thames, Mekong, Ganges, Congo 
	eventAfterRender: function (event, element, view) {
        if (event.environment == 'Prod') {
            //event.color = "#FFB347"; //Em andamento
            element.css('background-color', '#E0FFFF');
			element.css('border', 'none');
        } else if (event.environment == 'Nile(Pre-Prod)') {
            //event.color = "#77DD77"; //Concluído OK
            element.css('background-color', '#FAFAD2');
			element.css('border', 'none');
        } else if (event.environment == 'Yarra(UAT)') {
            //event.color = "#AEC6CF"; //Não iniciado
            element.css('background-color', '#D3D3D3');
			element.css('border', 'none');
        }else if (event.environment == 'Murray') {
            //event.color = "#AEC6CF"; //Não iniciado
            element.css('background-color', '#32CD32');
			element.css('border', 'none');
        }else if (event.environment == 'Zambeze') {
            //event.color = "#AEC6CF"; //Não iniciado
            element.css('background-color', '#800000');
			element.css('border', 'none');
        }else if (event.environment == 'Danube') {
            //event.color = "#AEC6CF"; //Não iniciado
            element.css('background-color', '#FF00FF');
			element.css('border', 'none');
        }else if (event.environment == 'Thames') {
            //event.color = "#AEC6CF"; //Não iniciado
            element.css('background-color', '#87CEFA');
			element.css('border', 'none');
        }else if (event.environment == 'Mekong') {
            //event.color = "#AEC6CF"; //Não iniciado
            element.css('background-color', '#708090');
			element.css('border', 'none');
        }else if (event.environment == 'Ganges') {
            //event.color = "#AEC6CF"; //Não iniciado
            element.css('background-color', '#F0E68C');
			element.css('border', 'none');
        }else if (event.environment == 'Congo') {
            //event.color = "#AEC6CF"; //Não iniciado
            element.css('background-color', '#6A5ACD');
			element.css('border', 'none');
        }else{
			element.css('background-color', '#A0522D');
			element.css('border', 'none');
		}
    }
	
/*	
eventClick: function(calEvent, jsEvent, view) {
    alert(calEvent.title  +" \n "+ calEvent.release +" \n "+ calEvent.testing +" \n "+ calEvent.environment +" \n "+ 'Start Date: ' + calEvent.start +" \n "+ 'End Date: ' + calEvent.end);
    // change the border color just for fun
    //$(this).css('color', 'red');
}*/
	});
});
