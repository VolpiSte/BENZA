<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the JSON data from the request body
    $json = file_get_contents('php://input');

    // Set the URL to send the JSON data
    $url = 'https://carburanti.mise.gov.it/ospzApi/search/zone';

    // Set the headers for the request
    $headers = [
        'Content-Type: application/json',
    ];

    // Create a new cURL resource
    $curl = curl_init();

    // Set the cURL options
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_POST, true);
    curl_setopt($curl, CURLOPT_POSTFIELDS, $json);
    curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

    // Execute the cURL request
    $response = curl_exec($curl);

    // Check for cURL errors
    if (curl_errno($curl)) {
        $error = curl_error($curl);
        // Handle the error
        // ...
    }

    // Close the cURL resource
    curl_close($curl);

    // Set the response headers
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Expose-Headers: strict-origin-when-cross-origin');

    // Save the response to a file
    file_put_contents('info.json', $response);

    // Output the response
    echo $response;
}
?>
