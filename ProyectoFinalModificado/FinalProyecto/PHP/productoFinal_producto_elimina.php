<?php
session_start();
require_once('productoFinal_producto_crud.php');
$master = new MasterPP();
$id = $_GET['id']; // ? $_GET['id'] : '';
$norden = $_GET['norden'];//) ? $_GET['norden'] : '';
if(empty($id) or empty($norden) ){
    $_SESSION['msg_error'] = "No existe registro a Eliminar";
}else{
    $delete = $master->delete_data($id,$norden);
    if(isset($delete['status'])){
        if($delete['status'] == 'success'){
            $_SESSION['msg_success'] = 'Los datos de los miembros se han eliminado correctamente';
        }elseif($delete['error']){
            $_SESSION['msg_error'] = 'El eliminar ha fallado debido a un error. Error: '. $delete['error'];
        }
    }else{
        $_SESSION['msg_error'] = 'Los detalles no se han podido guardar debido a algún error.';
    }
}
header('location: ingresoProductoFinal.php');
?>
