function cariFilm(){
	$('#daftar-film').html('');

	$.ajax({
		url : 'http://www.omdbapi.com',
		type : 'get',
		dataType : 'json',
		data : {
			'apikey': '7fa74e57',
			's' : $('#search-input').val()
		},
		success : function(result){
			if(result.Response == "True"){
				let movies = result.Search;
				$.each(movies, function(i, data){
					$('#daftar-film').append(`
						<div class="col-md-4">
							<div class="card mb-3">
							  <img src="`+ data.Poster +`" class="card-img-top" alt="...">
							  <div class="card-body">
							    <h5 class="card-title">`+data.Title+`</h5>
							    <h6 class="card-subtitle mb-2 text-muted">`+data.Year+`</h6>
							    <a href="#" class="card-link detail-film" data-toggle="modal" data-target="#exampleModal" data-id="`+data.imdbID+`">Lihat Detail</a>
							  </div>
							</div>
						</div>
					`);
				});

				$('#search-input').val('');

			}else{
				$('#daftar-film').html(`
					<div class = "col">
						<h1 class="text-center">`+ result.Error +`</h1>
					</div>`
				);
			}
		}
	});
}


$('#search-button').on('click', function(){
	cariFilm();
});

$('#search-input').on('keyup', function(e){
	if(e.which === 13){
		cariFilm();
	}
});

$('#daftar-film').on('click', '.detail-film', function(){

	// console.log($(this).data('id')); 
	$.ajax({
		url : 'http://www.omdbapi.com',
		dataType : 'json',
		type : 'get',
		data : {
			'apikey': '7fa74e57',
			'i': $(this).data('id')
		},
		success : function(film){
			if(film.Response === "True"){
				$('.modal-body').html(`
					<div class="container-fluid">
					    <div class="row">
					      <div class="col-md-4">
					      	  <img src="`+film.Poster+`" class="img-fluid">
					      </div>

					      <div class="col-md-8">
					      	<ul class="list-group">
							  <li class="list-group-item"><h3>`+film.Title+`</h3></li>
							  <li class="list-group-item"><h4>`+film.Year+`</h4></li>
							  <li class="list-group-item">Rilis: `+film.Released+`</li>
							  <li class="list-group-item">Waktu: `+film.Runtime+`</li>
							</ul>
					      </div>
					    </div>
					</div>

				`);
			}
		}
	});
})