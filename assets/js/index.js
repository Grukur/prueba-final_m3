$(document).ready(function() {

    $('#btnSend').on('click', function(e){
        e.preventDefault();
        let idSuperHero = $('#pokeName').val();
        console.log(idSuperHero);
        $.ajax({
            type:'GET',
            url: 'https://www.superheroapi.com/api.php/3525635500807579/'+idSuperHero,
            contentType: 'application/json',
            dataType: 'json',
            success: (data)=>{
                console.log(data);
                renderData(data);
            }, 
            error:(error)=>{
                failData(error)
            }
        })
    })

    const renderData = (data)=>{
        if(data == undefined || data == null){
            alert('No se encontraron datos');
            return;
        }
        dataGraph(data)

        $('#card-title').text(`Nombre: ${data.name}`)
        $('#card-img').attr('src', data.image.url)
        $('#card-info').text(data.connections['group-affiliation'])
        $('#card-info-1').text(`Publicado por: ${data.biography.publisher}`)
        $('#card-info-2').text(`Ocupación: ${data.work.occupation}`)
        $('#card-info-3').text(`Primera aparición: ${data.biography['first-appearance']}`)
        $('#card-info-4').text(`Altura: ${data.appearance.height}`)
        $('#card-info-5').text(`Peso: ${data.appearance.weight}`)
        $('#card-info-6').text(`Alianzas: ${data.connections['group-affiliation']}`
        )
    }

    const dataGraph = (data)=>{
        let {powerstats:stats} = data;
        let powerstats = data.powerstats;

        let statsdata = [];
        for(let key in powerstats){
            statsdata.push({label:key, y:Number(powerstats[key])})
        }   
        
        let chart = new CanvasJS.Chart("graphContainer", {
            animationEnabled: true,
            title: {
                text: `Estadisticas de Poder para ${data.name}`
            },
            data: [{
                type: "bar",
                dataPoints:statsdata
            }]
        });
        return chart.render();
    }
})