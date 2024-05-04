function search(lat, long, radius, fuelType, selfService){
    if(fuelType === undefined && selfService === undefined) {
        // Handle case with 3 parameters
        $.ajax({
            url: 'https://cors-anywhere.herokuapp.com/https://carburanti.mise.gov.it/ospzApi/search/zone',
            type: 'POST',
            contentType: 'application/json',
            data: {'points':[{'lat': lat, 'lng': long}], 'radius': radius},
            success: function (data) {
                // Your success logic here
            }
        });
    } else {
        print('ssss');
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
            url: 'https://cors-anywhere.herokuapp.com/https://carburanti.mise.gov.it/ospzApi/search/zone',
            type: 'POST',
            //contentType: 'application/json',
            data: {'points':[{'lat': lat, 'lng': long}], 'fuelType': fuelType, 'radius': radius},
            success: function (data) {
                //alert(data.message);
                // Create a new Blob from the JSON data
                var blob = new Blob([JSON.stringify(data, null, 2)], {type : 'application/json'});
    
                // Create an object URL for the Blob
                var url = '.'.createObjectURL(blob);
    
                // Open a new window or tab with the object URL
                window.open(url, '_blank');
            }
        });
    }
}
