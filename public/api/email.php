<?php
    $data = getJsonFromBody();
    $message = getTextBySchema($data, [
        'name' => 'Имя',
        'phone' => 'Телефон',
        'home' => 'Тип объекта',
        'cars' => 'Количество машиномест',
        'exit-in' => 'Количество въездов на территорию парковки',
        'exit-out' => 'Количество выездов с территории парковки',
        'exit-reverse' => 'Количество реверсивных проездов (сквозной въезд-выезд)',
        'users' => 'Пользователи парковки',
        'terminals' => 'Сколько терминалов оплаты вам нужно',
        'address' => 'Адрес объекта',
    ]);
    $status = sendEmail('lid@r-p-s.ru', $message);
    // sendEmail('alexey-bakhirev@yandex.ru', $message);
    sendResponse($status ? 'ok' : 'error');

    function getJsonFromBody() {
        $rawInput = fopen('php://input', 'r');
        $tempStream = fopen('php://temp', 'r+');
        stream_copy_to_stream($rawInput, $tempStream);
        rewind($tempStream);
        $body = stream_get_contents($tempStream);
        return $body ? json_decode($body, true) : null;
    }

    
    function sendEmail($email, $message) {
        if (is_null($message)) return false;

        $header  = "From: support@bakhirev.biz\n";
        $header .= "Content-type: text/html; charset=\"utf-8\"";

        $text  = "<HTML>\r\n";
        $text .= "<HEAD>\r\n";
        $text .= "<META http-equiv=Content-Type content='text/html; charset=utf-8'>\r\n";
        $text .= "</HEAD>\r\n";
        $text .= "<BODY>\r\n";
        $text .=  $message."\r\n";
        $text .= "</BODY>\r\n";
        $text .= "</HTML>";


        @mail($email, 'Заявка по quiz', $text ,$header);
        return true;
    }
    
    function getTextBySchema($data, $schema) {
        if (is_null($data)) return null;
        $text = '';
        foreach ($schema as $key => $value) {
            if (!isset($data[$key])) continue;
            if (is_array($data[$key])) {
                $text .= $value . ': ' . implode(', ', array_map(htmlspecialchars, $data[$key])) . '<br>';
            } else {
                $text .= $value . ': ' . htmlspecialchars($data[$key]) . '<br>';
            }
        }
        return $text;
    }

    function sendResponse($status) {
        header($_SERVER["SERVER_PROTOCOL"] . " 200 ", true, $code);
        header("Content-Type: application/json; charset=utf-8");
        echo "{\"status\":\"{$status}\"}";
    }
?>