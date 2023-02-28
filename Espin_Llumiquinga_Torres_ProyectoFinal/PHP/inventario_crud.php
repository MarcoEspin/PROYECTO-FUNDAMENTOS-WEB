<?php

class MasterProducto
{
    /**
     * Obtener todos los datos JSON
     */
    function get_all_data()
    {
        $json = (array) json_decode(file_get_contents('../DATOS/inventario.json'));
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

    function buscar(){
        $registros = [];
        $i = 1;
        
        $data = $this->get_all_data();

        if (isset($_POST['search'])) {
            if (strlen($_POST['keywords']) > 0) {
                $keywords = $_POST['keywords'];
                //echo '1'.$keywords;
                foreach($data as $reg){
           
                    if (strpos($reg->nombreIn, $keywords) !== false ){
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
    function descarga(){
        
        //$datos = $this->get_all_data();
        $datos =  json_decode(file_get_contents('../DATOS/inventario.json'));
        $filename = '../descargas/inventario.json';
        $json = json_encode(array_values($datos), JSON_PRETTY_PRINT);
        $insert = file_put_contents($filename, $json);
       

    }
    /**
     * Insertar datos en un archivo JSON
     */
    function insert_to_json()
    {
        $nombreIn = addslashes($_POST['nombreIn']);
        $cantidadIn = addslashes($_POST['cantidadIn']);
        $precioIn = $_POST['precioIn'];
        $nomProveedorIn = addslashes($_POST['nomProveedorIn']);
        $data = $this->get_all_data();
        foreach ($data as $dato) {
            if ($dato->nombreIn == $nombreIn && $dato->nomProveedorIn == $nomProveedorIn) {
                    $resp['failed'] = 'failed';
                    return $resp;
                }
            }
        $id = array_key_last($data) + 1;
        $data[$id] = (object) [
            "id" => $id,
            "nombreIn" => $nombreIn,
            "cantidadIn" => $cantidadIn,
            "precioIn" => $precioIn,
            "nomProveedorIn" => $nomProveedorIn
        ];
        $json = json_encode(array_values($data), JSON_PRETTY_PRINT);
        $insert = file_put_contents('../DATOS/inventario.json', $json);
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
       
        $nombreIn = addslashes($_POST['nombreIn']);
        $cantidadIn = addslashes($_POST['cantidadIn']);
        $precioIn = $_POST['precioIn'];
        $nomProveedorIn = addslashes($_POST['nomProveedorIn']);

        $data = $this->get_all_data();
        $data[$id] = (object) [
            "id" => $id,
            "nombreIn" => $nombreIn,
            "cantidadIn" =>$cantidadIn,
            "precioIn" => $precioIn,
            "nomProveedorIn" => $nomProveedorIn
        ];
        $json = json_encode(array_values($data), JSON_PRETTY_PRINT);
        $update = file_put_contents('../DATOS/inventario.json', $json);
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
                $update = file_put_contents('../DATOS/inventario.json', $json);
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
