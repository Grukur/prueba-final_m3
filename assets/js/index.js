$(document).ready(function () {

    $('#btnSend').on('click', function (e) {
        e.preventDefault();

        const regexValidacion = /^[0-9]+$/i;
        let idSuperHero = $('#pokeName').val();
        if (regexValidacion.test(idSuperHero) && idSuperHero<732 && idSuperHero > 0) {
            //SI ID OR NOMBR ES VÁLIDO
            getHero(idSuperHero);
        } else {
            failRegex(idSuperHero)
        };

    })
    const getHero = (idSuperHero) => {

        $.ajax({
            type: 'GET',
            url: 'https://www.superheroapi.com/api.php/3525635500807579/' + idSuperHero,
            contentType: 'application/json',
            dataType: 'json',
            success: (data) => {
                if (data != undefined || data != null) {
                    renderData(data);
                }
            },            
            error: (error) => {
                console.log('Error, data llego sin datos')
            }
        });
    }

    const renderData = (data) => {
        if (data == undefined || data == null) {
            alert('No se encontraron datos');
            return;
        }
        $('#pokeName').val('')
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

    const dataGraph = (data) => {
        let { powerstats: stats } = data;
        let powerstats = data.powerstats;

        let statsdata = [];
        for (let key in powerstats) {
            statsdata.push({ label: key, y: Number(powerstats[key]) })
        }

        let chart = new CanvasJS.Chart("graphContainer", {
            animationEnabled: true,
            title: {
                text: `Estadisticas de Poder para ${data.name}`
            },
            data: [{
                type: "bar",
                dataPoints: statsdata
            }]
        });
        return chart.render();
    }

    const failRegex = (idSuperHero) => {
        $('#modalLabel').text(`El Heroe con id: ${idSuperHero} no existe`);
        $('#exampleModal').modal('show');
        $('#modalBody').text(`Por favor introduce un ID numérico valido y menor a 732`);
        $('#pokeName').val('');
        console.log('Error al capturar datos por fracaso de validacion en regex ')
    }
})