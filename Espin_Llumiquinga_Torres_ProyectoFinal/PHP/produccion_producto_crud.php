<?php

class MasterPP
{
    /**
     * Obtener todos los datos JSON
     */
    function get_all_data()
    {
        $json = (array) json_decode(file_get_contents('../DATOS/ordenProduccionProducto.json'));
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

    function pruductos_orden($orden = '')
    {   
        $registros = [];
        $i = 0;
        $data = $this->get_all_data();
        foreach($data as $reg){
            if ($reg->norden == $orden){
                $registros[$i] = $reg;
                $i++;
            }
                

        }
       
        return $registros;
        
       /* if (!empty($)) {
            $data = $this->get_all_data();
            if (isset($data[$id])) {
                return $data[$id];
            }
        }
        return (object) [];*/
    }
    /**
     * Insertar datos en un archivo JSON
     */
    function insert_to_json()
    {
      
        $norden = $_POST['norden'];
        $fecha = addslashes($_POST['fecha']);
        $nproducto = addslashes($_POST['nproducto']);
        $ncantidad = $_POST['ncantidad'];
        $nprecio = $_POST['nprecio'];

        $data = $this->get_all_data();
        $id = array_key_last($data) + 1;
        $data[$id] = (object) [
            "id" => $id,
            "norden" =>  $norden,
            "nproducto" => $nproducto,
            "ncantidad" => $ncantidad,
            "nprecio" => $nprecio
        ];
        $json = json_encode(array_values($data), JSON_PRETTY_PRINT);
        $insert = file_put_contents('../DATOS/ordenProduccionProducto.json', $json);
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
        $fecha = addslashes($_POST['fecha']);
        
        $data = $this->get_all_data();
        $data[$id] = (object) [
            "id" => $id,
            "ncliente" => $ncliente,
            "fecha" => $fecha
        ];
        $json = json_encode(array_values($data), JSON_PRETTY_PRINT);
        $update = file_put_contents('../DATOS/ordenProduccionProducto.json', $json);
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
                $update = file_put_contents('../DATOS/ordenProduccionProducto.json', $json);
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
