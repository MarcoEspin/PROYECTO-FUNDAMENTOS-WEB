<?php
session_start();
require_once('productoFinal_crud.php');
$master = new MasterPF();
$id = isset($_GET['id']) ? $_GET['id'] : '';
if(empty($id)){
    $_SESSION['msg_error'] = "Sin ID de miembro";
}else{
    $delete = $master->delete_data($id);
    if(isset($delete['status'])){
        if($delete['status'] == 'success'){
            $_SESSION['msg_success'] = 'Los datos de los miembros se han eliminado correctamente';
        }elseif($delete['error']){
            $_SESSION['msg_error'] = 'El eliminar ha fallado debido a un error. Error: '. $delete['error'];
        }
    }else{
        $_SESSION['msg_error'] = 'Los detalles no se han podido guardar debido a alg�n error.';
    }
}
header('location: ingresoProductoFinal.php');
