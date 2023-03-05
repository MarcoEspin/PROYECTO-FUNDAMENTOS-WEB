<?php
class MasterCliente
{
    /**
     * Obtener todos los datos JSON
     */
    function get_all_data()
    {
        $json = (array) json_decode(file_get_contents('../DATOS/clientes.json'));
        $data = [];
        foreach ($json as $row) {
            $data[$row->id] = $row;
        }
        return $data;
    }
    /**
     * Obtener datos JSON únicos
     */
    function get_data($id = '')
    {
        if (!empty($id)) {
            $data = $this->get_all_data();
            if (isset($data[$id])) {
                return $data[$id];
            }
        }
        return (object) [];
    }

    function descarga(){
        
        //$datos = $this->get_all_data();
        $datos =  json_decode(file_get_contents('../DATOS/clientes.json'));
        $filename = '../descargas/clientes.json';
        $json = json_encode(array_values($datos), JSON_PRETTY_PRINT);
        $insert = file_put_contents($filename, $json);
        /*header('Content-Type: application/json');
        header("Content-Type: application/download");
        header('Content-Disposition: attachment; filename="'.basename($filename).'"');
        header('Expires: 0');
        header('Cache-Control: must-revalidate');
        header('Pragma: public');
        header('Content-Length: ' . filesize($filename));*/
        

        // Lee y envía el archivo
       //readfile($filename);
       // print $datos;

    }
    function buscar(){
        $registros = [];
        $i = 1;
        
        $data = $this->get_all_data();

        if (isset($_POST['search'])) {
            if (strlen($_POST['keywords']) > 0) {
                $keywords = $_POST['keywords'];
                //echo '1'.$keywords;
                foreach($data as $reg){
           
                    if (strpos($reg->ncliente, $keywords) !== false ){
                        //echo $keywords;
                        $registros[$i] = $reg;
                        $i++;
                    }
                }
                return  $registros;
            }
        }    
        
        return $data;

        
    }
    

    /**
     * Insertar datos en un archivo JSON
     */
    function insert_to_json()
    {
        $ncliente = addslashes($_POST['ncliente']);
        $telefonoc = addslashes($_POST['telefonoc']);
        $correoc = addslashes($_POST['correoc']);
        $direccionc = addslashes($_POST['direccionc']);
        $data = $this->get_all_data();
        foreach ($data as $dato) {
            if ($dato->ncliente == $ncliente) {
              $resp['failed'] = 'failed';
              return $resp;
            }
          }
        $id = array_key_last($data) + 1;
        $data[$id] = (object) [
            "id" => $id,
            "ncliente" => $ncliente,
            "telefonoc" => $telefonoc,
            "correoc" => $correoc,
            "direccionc" => $direccionc
        ];
        $json = json_encode(array_values($data), JSON_PRETTY_PRINT);
        $insert = file_put_contents('../DATOS/clientes.json', $json);
        if ($insert) {
            $resp['status'] = 'success';
        } else {
            $resp['failed'] = 'failed';
        }
        return $resp;
    }
    /**
     * Actualizar datos del archivo JSON
     */
    function update_json_data()
    {
        $id = $_POST['id'];
        $ncliente = addslashes($_POST['ncliente']);
        $telefonoc = addslashes($_POST['telefonoc']);
        $correoc = addslashes($_POST['correoc']);
        $direccionc = addslashes($_POST['direccionc']);

        $data = $this->get_all_data();
        $data[$id] = (object) [
            "id" => $id,
            "ncliente" => $ncliente,
            "telefonoc" => $telefonoc,
            "correoc" =>$correoc,
            "direccionc" => $direccionc
        ];
        $json = json_encode(array_values($data), JSON_PRETTY_PRINT);
        $update = file_put_contents('../DATOS/clientes.json', $json);
        if ($update) {
            $resp['status'] = 'success';
        } else {
            $resp['failed'] = 'failed';
        }
        return $resp;
    }
    /**
     * Eliminar datos del archivo JSON
     */
    function delete_data($id = '')
    {
        if (empty($id)) {
            $resp['status'] = 'failed';
            $resp['error'] = 'El ID de miembro dado está vacío.';
        } else {
            $data = $this->get_all_data();
            if (isset($data[$id])) {
                unset($data[$id]);
                $json = json_encode(array_values($data), JSON_PRETTY_PRINT);
                $update = file_put_contents('../DATOS/clientes.json', $json);
                if ($update) {
                    $resp['status'] = 'success';
                } else {
                    $resp['failed'] = 'failed';
                }
            } else {
                $resp['status'] = 'failed';
                $resp['error'] = 'El ID de miembro dado no existe en el archivo JSON.';
            }
        }
        return $resp;
    }
}
?>