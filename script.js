$(document).ready(function(){

	var iduser=null;
	function sortprop(mas,prop){ //сортування
			mas.sort(function(a,b){
					if(a[prop]>b[prop])
						return 1
						return -1
			})
		}
	function createTable(mas,container){
		$(container).empty();
		$("<table>").addClass("table").appendTo(container);
		$("<tr>").addClass("trr").appendTo(".table") //створення заголовків для сортування
		for (var k = 1; k <= 3; k++) {
			var span=$("<span>")
			$("<td>").addClass('tdd').appendTo('.trr:last');
			if(k==1)
				span.text('name')
			if(k==2)
				span.text("age")
			if(k==3)
				span.text("salary")
			$(".table .trr td:last").append(span)
		}
		
		$('.tdd').click(function(){ //сортування
			var prop=$(this).text()
			sortprop(mas,prop)
			createTable(mas,"#mastable");
		
		})
		for (var i = 0; i < mas.length; i++) {
			$("<tr>").addClass("tr").appendTo('.table');
			for(var key in mas[i]){
				$('<td>').appendTo('.tr:last').text(mas[i][key]);
			}
			for (var j = 1; j <= 2; j++) {
				$('<td>').appendTo('.tr:last');
				var btn=$('<button>');
				if(j==1){
					btn.text('Delete').addClass('delete')
				}
				else{
						btn.text('Update').addClass('update')
					}
					$(".table .tr td:last").append(btn)
			}
			//$('.tr:last').find('td').first().hide();//скриває id стовпець
			//$('.tr:last').find('td').eq(4).hide();//скриває 4 стовпець
		}
		$('.tr').children().filter(':first-child').hide();//скриває id стовпець
		

		$('.delete').click(function(){ //обробник кнопки delete
			console.log(this)
			var id=$(this).parent().parent().children().filter(':first').text();
			console.log(id);
			var obj={id:id}
			$.post('/delete',obj,function(data){
				console.log(data);
				getUsers();
			})
		})
		$('.update').click(function(){
			console.log(this)
		var tds=$(this).parent().parent().children();
		console.log(tds);
		var name=$(tds[1]).text();
		console.log(name);
		$("#name").val(name);
		var age=$(tds[2]).text();
		console.log(age);
		$("#age").val(age);
		var salary=$(tds[3]).text();
		console.log(salary);
		$("#salary").val(salary);
		$('#btn').val('update user');
		iduser=$(tds[0]).text();
		console.log(iduser);
		})

	}
	function getUsers(){
		$.get('/allusers',function(data){
			console.log(data);
			createTable(data,"#mastable");
		});
		//$("#name").val(name)=""
	}
	getUsers();
	$('#btn').click(function(){
		var obj={
			name:$("#name").val(),
			age:$("#age").val(),
			salary:$("#salary").val()
		}
		if($(this).val()=='update user'){
			obj.id=iduser
			}

		$.post('/send',obj,function(data){
			console.log(data)
			getUsers();
		})
	$(this).val('Send');
	})
	
})