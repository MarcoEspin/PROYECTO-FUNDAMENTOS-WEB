<?php
session_start();
require_once('../PHP/produccion_crud.php');
$master = new Master();
$json_data = $master->buscar();
require_once('../PHP/produccion_producto_crud.php');
$productosProduccion = new MasterPP();
$listaProductos = $productosProduccion->get_all_data();

?>
<!doctype html>
<html>
<head>
	<meta charset="utf-8">
	<title>INNOVA TECH</title>
	<link rel="stylesheet" href="../CSS/estiloIngresoCliente.css">
	<link rel="stylesheet" href="../CSS/bootstrap.min.css">
	<link rel="icon" href="../img/logoIcono.jpeg">
	<link rel="stylesheet" href="CSS/estilo.css">
    <script src = "../JS/descargaJson.js"></script>
</head>
	
<body>	
<div class="line w-100 mt-2 mb-3"></div>
    <h2 class="text-center">Ingreso de la Orden de Producción</h2>
        <div class="row">
            <!-- Contenedor del contenido de la página -->
            <div class="col-lg-10 col-md-11 col-sm-12 mt-4 pt-4 mx-auto">
                <div class="container-fluid">
                    <!-- Gestión de mensajes Sesión de formulario -->
                    <?php if (isset($_SESSION['msg_success']) || isset($_SESSION['msg_error'])): ?>
                        <?php if (isset($_SESSION['msg_success'])): ?>
                            <div class="alert alert-success rounded-0">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="col-auto flex-shrink-1 flex-grow-1">
                                        <?= $_SESSION['msg_success'] ?>
                                    </div>
                                    <div class="col-auto">
                                        <a href="#" onclick="$(this).closest('.alert').remove()"
                                            class="text-decoration-none text-reset fw-bolder mx-3">
                                            <i class="fa-solid fa-times"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <?php unset($_SESSION['msg_success']); ?>
                        <?php endif; ?>
                        <?php if (isset($_SESSION['msg_error'])): ?>
                            <div class="alert alert-danger rounded-0">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="col-auto flex-shrink-1 flex-grow-1">
                                        <?= $_SESSION['msg_error'] ?>
                                    </div>
                                    <div class="col-auto">
                                        <a href="#" onclick="$(this).closest('.alert').remove()"
                                            class="text-decoration-none text-reset fw-bolder mx-3">
                                            <i class="fa-solid fa-times"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <?php unset($_SESSION['msg_error']); ?>
                        <?php endif; ?>
                    <?php endif; ?>
                    <!--Fin de la sesión del formulario de tratamiento de mensajes -->
                    <div class="card rounded-0 shadow">
                        <div class="card-header">
                            <div class="d-flex justify-content-between">
                                <div class="card-title col-auto flex-shrink-1 flex-grow-1">Orden de Producción</div>
                                <nav class="botonesx">
                                <div class="col-atuo">
                                    <a class="btn btn-danger btn-sm btn-flat" href="produccion_nuevo.php" style="background-color: #134459;border-color: #134459"><i
                                            class="fa fa-plus-square"></i>&nbsp Agregar Orden</a>
                                            <a class="btn btn-danger btn-sm btn-flat" href="produccion_descarga.php" 
                                            onclick="DescargaArchivo('../DATOS/ordenProduccion.json','Orden.json')" 
                                            style="background-color: #134459;border-color: #134459"><i  class="fa fa-plus-square"></i>&nbsp Descargar Orden</a> 
                                </div>
                                </nav>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="container-fluid">
                                <table class="table table-stripped table-bordered">
                                    <colgroup>
                                        <col width="10%">
                                        <col width="40%">
                                        <col width="20%">
                                        <col width="20%">
                                    </colgroup>
                                    <thead style="background-color:#721E4F; border-button: solid 5px ">

                                       <tr>
                                            <th class="text-center" style= "color: #FFFFFF">Nro. Orden</th>
                                            <th class="text-center" style= "color: #FFFFFF">Nombre del Cliente</th>
                                            <th class="text-center" style= "color: #FFFFFF">Fecha de la Orden</th>
                                            <th class="text-center" style= "color: #FFFFFF">Opciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <?php foreach ($json_data as $data): ?>
                                            <tr>
                                                <td class="text-center">
                                                <?= $data->id ?>
                                                </td>
                                                <td>
                                                <?= $data->ncliente ?>
                                                </td>
                                                <td>
                                                <?= $data->fecha ?>
                                                </td>
                                                <td class="text-center">
                                                    <a style="background-color: #134459;color: #FFF0F0;" href="produccion_producto_nuevo.php?norden=<?= $data->id ?>"
                                                        class="btn btn-sm btn-outline-danger rounded-0">
                                                        <i class="fa-solid fa-trash">C</i>
                                                    </a>
                                                    <a style="background-color: #640000;color: #FFF0F0;" href="ingresoProduccion.php?norden=<?= $data->id ?>"
                                                        class="btn btn-sm btn-outline-danger rounded-0">
                                                        <i class="fa-solid fa-trash">R</i>
                                                    </a>
                                                    <a style="background-color: #134459;color: #FFF0F0;" href="produccion_nuevo.php?id=<?= $data->id ?>"
                                                        class="btn btn-sm btn-outline-info rounded-0">
                                                        <i class="fa-solid fa-edit">U</i>
                                                    </a>
                                                    <a style="background-color: #640000;color: #FFF0F0;" href="produccion_elimina.php?id=<?= $data->id ?>"
                                                        class="btn btn-sm btn-outline-danger rounded-0"
                                                        onclick="if(confirm(`¿Deseas eliminar del registro a <?= $data->ncliente ?>?`) === false) event.preventDefault();">
                                                        <i class="fa-solid fa-trash">D</i>
                                                    </a>
                                                    
                                                </td>  
                                                
                                            </tr>
                                        <?php endforeach; ?>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="card-header">
                            <div class="d-flex justify-content-between">
                                <div class="card-title col-auto flex-shrink-1 flex-grow-1">Productos de la Orden</div>
                                <nav class="botonesx">
                                <a class="btn btn-danger btn-sm btn-flat" href="produccion_descarga.php" 
                                            onclick="DescargaArchivo('../DATOS/ordenProduccionProducto.json','Orden.json')" 
                                            style="background-color: #134459;border-color: #134459"><i  class="fa fa-plus-square"></i>&nbsp Descargar Productos</a>   
                                
                                </nav>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="container-fluid">
                                <table class="table table-stripped table-bordered">
                                    <colgroup>
                                        <col width="15%">
                                        <col width="15%">
                                        <col width="55%">
                                        <col width="15%">
                                       <!-- <col width="5%">-->
                                        
                                       
                                    </colgroup>
                                    <thead style="background-color:#721E4F; border-button: solid 5px ">
                                        <tr>
                                            <th class="text-center" style= "color: #FFFFFF">Sec.</th>
                                            <th class="text-center" style= "color: #FFFFFF">Nro. Orden</th>
                                            <th class="text-center" style= "color: #FFFFFF">Producto Final</th>
                                            <th class="text-center" style= "color: #FFFFFF">Cantidad</th>
                                            <!--<th class="text-center" style= "color: #FFFFFF">Opcion</th>-->
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <?php $listaProductos = $productosProduccion->pruductos_orden($_GET['norden']); ?>
                                        <?php foreach ($listaProductos as $lproducto): ?>
                                            <tr>
                                                <td class="text-center">
                                                    <?= $lproducto->id ?>
                                                </td>
                                                <td>
                                                    <?= $lproducto->norden ?>
                                                </td>
                                                <td>
                                                    <?= $lproducto->nproducto ?>
                                                </td>
                                                <td>
                                                    <?= $lproducto->ncantidad ?>
                                                </td>
                                                
                                                <td class="text-center">
                                                  <!--  <a href="produccion_nuevo.php?id=<?= $data->id ?>"
                                                        class="btn btn-sm btn-outline-info rounded-0">
                                                        <i class="fa-solid fa-edit"></i>
                                                    </a>
                                                -->
                                                <!--  <a href="produccion_producto_elimina.php?id=<?= $lproducto->id ?>&norden=<?= $lproducto->norden ?>"
                                                        class="btn btn-sm btn-outline-danger rounded-0"
                                                        onclick="if(confirm(`¿Deseas eliminar del registro a <?= $data->ncliente ?>?`) === false) event.preventDefault();">
                                                        <i class="fa-solid fa-trash">D</i> -->
                                                    </a>
                                                </td>
                                            </tr>
                                        <?php endforeach; ?>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
<div class="line w-100 my-3"></div>

</body>
</html>
