function search(lat, long, radius, fuelType, selfService) {
    return new Promise((resolve, reject) => {
        urlLink = 'http://localhost:3000'
        if (fuelType === undefined && selfService === undefined) {
            // Handle case with 3 parameters
            $.ajax({
                url: urlLink,
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({'points':[{'lat': lat, 'lng': long}], 'radius': radius}),
                success: function (data) {
                    resolve(data);
                },
                error: function (error) {
                    reject(error);
                }
            });
        } else {
            switch(fuelType){
                case 'Benzina':
                    fuelType = '1';
                    break;
                case 'Gasolio':
                    fuelType = '2';
                    break;
                case 'Metano':
                    fuelType = '3';
                    break;
                case 'GPL':
                    fuelType = '4';
                    break;
                case 'L-GNC':
                    fuelType = '323';
                    break;
                case 'GNL':
                    fuelType = '324';
                    break;
                default:
                    alert('Errore: tipo di carburante non riconosciuto');
                    return;
            }

            switch(selfService){
                case true:
                    fuelType += '-1';
                    break;
                case false:
                    fuelType += '-0';
                    break;
                default:
                    fuelType += '-x';
            }

            $.ajax({
                url: urlLink,
                type: 'POST',
                data: {'points':[{'lat': lat, 'lng': long}], 'fuelType': fuelType, 'radius': radius},
                success: function (data) {
                    resolve(data);
                },
                error: function (error) {
                    reject(error);
                },
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
                }
            });
        }
    });
}
