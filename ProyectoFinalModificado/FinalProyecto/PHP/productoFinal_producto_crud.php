<?php

class MasterPP
{
    /**
     * Obtener todos los datos JSON
     */
    function get_all_data()
    {
        $json = (array) json_decode(file_get_contents('../DATOS/ordenProductoFinal.json'));
        $data = [];
        foreach ($json as $row) {
            $data[$row->id] = $row;
        }
        return $data;
    }
    function get_arreglo()
    {
       
        $data = json_decode(file_get_contents('../DATOS/ordenProductoFinal.json'),true);
        
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
         $inventario =  json_decode(file_get_contents('../DATOS/inventario.json'),true);
         $nproducto = addslashes($_POST['nproducto']);
         $key  = array_search($nproducto,array_column( $inventario,'nombreIn'));
         $precioIn = $inventario[$key]['precioIn'];
         $norden = $_POST['norden'];
         $ncantidad = $_POST['ncantidad'];

       /*
        $orden =  json_decode(file_get_contents('../DATOS/productoFinal.json'),true);
             
        $norden = $_POST['norden'];
        $fecha = addslashes($_POST['fecha']);
        $nproducto = addslashes($_POST['nproducto']);
        $ncantidad = $_POST['ncantidad'];
        $nprecio = $_POST['nprecio'];
             
        $key  = array_search($nproducto,array_column( $inventario,'nombreIn'));
       
        $posicion = array_search($norden,array_column( $orden ,'norden'));
        $ocantidad = $orden[$posicion]['cantidadPfinal'];
        $tcantidad =  $ncantidad * $ocantidad;
        if (  $inventario[$key]['cantidadIn']< $tcantidad){
            $resp['failed'] = 'Existencia insuficente del Producto: '. $inventario[$key]['nombreIn'];
            return $resp;
           }
        else
            {   $id = $inventario[$key]['id'];
                $nombreIn = $inventario[$key]['nombreIn'];
                $cantidadIn = $inventario[$key]['cantidadIn'] - $tcantidad;
                $precioIn = $inventario[$key]['precioIn'];
                $nomProveedorIn = $inventario[$key]['nomProveedorIn'];
                $inventario[$key] = (object) [
                    "id" => $id,
                    "nombreIn" =>  $nombreIn,
                    "cantidadIn" => $cantidadIn,
                    "precioIn" => $precioIn,
                    "nomProveedorIn" => $nomProveedorIn
                ];
                $json = json_encode(array_values($inventario), JSON_PRETTY_PRINT);
                $update = file_put_contents('../DATOS/inventario.json', $json);
                
                if ($update) {
                    $resp['status'] = 'success';
                } else {
                    $resp['failed'] = 'failed';
                    return $resp;
                }
               
            } */
        $data = $this->get_all_data();
        $id = array_key_last($data) + 1;
        $data[$id] = (object) [
            "id" => $id,
            "norden" =>  $norden,
            "nproducto" => $nproducto,
            "ncantidad" => $ncantidad,
            "nprecio" => $precioIn
        ];
        $json = json_encode(array_values($data), JSON_PRETTY_PRINT);
        $insert = file_put_contents('../DATOS/ordenProductoFinal.json', $json);
        

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
        $update = file_put_contents('../DATOS/ordenProductoFinal.json', $json);
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
    function delete_data($id = '',$norden = '')
    {

       
        if (empty($id)) {
            $resp['status'] = 'failed';
            $resp['error'] = 'El ID de miembro dado está vacío 1.';
        } else {
            
            $data= [];
           
            $data = $this->get_arreglo();
            foreach ($data as $clave=>$lista ){
                if (($lista['id'] == $id) && ($lista['norden'] == $norden)){
                    unset($data[$clave]);
                    continue;
                }
            }
           
            $json = json_encode(array_values($data), JSON_PRETTY_PRINT);
            $update = file_put_contents('../DATOS/ordenProductoFinal.json', $json);
           
            if ($update) {
                $resp['status'] = 'success';
            } else {
                $resp['failed'] = 'failed';
            }
        
        }
        return $resp;
    }
}
?>