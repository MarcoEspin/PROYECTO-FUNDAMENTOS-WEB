<?php
session_start();
require_once('../PHP/inventario_crud.php');
$master = new MasterProducto();
$json_data = $master->buscar();
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
</head>
	
<body>	
<div class="line w-100 mt-2 mb-3"></div>
    <h2 class="text-center">Ingreso de Inventario</h2>
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
                    <form action="../PHP/ingresoInventario.php" method="POST">
                    <div class="card rounded-0 shadow">
                        <div class="card-header">
                            <div class="d-flex justify-content-between">
                                <div class="card-title col-auto flex-shrink-1 flex-grow-1">Inventario</div>
                                <nav class="botonesx">
                                <div class="col-atuo">
                                    <a class="btn btn-danger btn-sm btn-flat" href="inventario_nuevo.php" style="background-color: #134459;border-color: #134459"><i
                                            class="fa fa-plus-square"></i>&nbsp Agregar Producto</a>
                                            <a class="btn btn-danger btn-sm btn-flat" href="inventario_descarga.php" 
                                            onclick="if(confirm(`¿Deseas descargar el Archivo de Inventario ?`) === false) event.preventDefault();" 
                                            style="background-color: #134459;border-color: #134459"><i  class="fa fa-plus-square"></i>&nbsp Descargar Inventario</a>  
                                </nav>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="container-fluid">
                                <table class="table table-stripped table-bordered">
                                    <colgroup>
										<col width="5%">
                                        <col width="25%">
                                        <col width="15%">
                                        <col width="15%">
                                        <col width="25%">
                                        <col width="15%">
                                        
                                    </colgroup>
                                    <thead style="background-color:#721E4F; border-button: solid 5px ">
                                    
                                    <input type="text" id="keywords" name="keywords" size="30" maxlength="30">
                                    <input type="submit" name="search" id="search" value="Buscar" style="background-color: #134459; color:white; margin-bottom: 20px;">
                                        <tr>
                                            <th class="text-center" style= "color: #FFFFFF">Código</th>
                                            <th class="text-center" style= "color: #FFFFFF">Nombre del Producto</th>
                                            <th class="text-center" style= "color: #FFFFFF">Cantidad</th>
                                            <th class="text-center" style= "color: #FFFFFF">Precio</th>
                                            <th class="text-center" style= "color: #FFFFFF">Nombre del Proveedor</th>
                                            <th class="text-center" style= "color: #FFFFFF">Acción</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <?php foreach ($json_data as $data): ?>
                                            <tr>
                                                <td class="text-center">
                                                    <?= $data->id ?>
                                                </td>
                                                <td>
                                                    <?= $data->nombreIn ?>
                                                </td>
                                                <td>
                                                 <?= $data->cantidadIn ?>
                                                </td>
                                                <td>
                                                 <?= $data->precioIn ?>
                                                </td>
                                                <td>
                                                    <?= $data->nomProveedorIn ?>
                                                </td>
                                                <td class="text-center">
                                                    <a href="inventario_nuevo.php?id=<?= $data->id ?>"
                                                        class="btn btn-sm btn-outline-info rounded-0">
                                                        <i class="fa-solid fa-edit">U</i>
                                                    </a>
                                                    <a href="inventario_elimina.php?id=<?= $data->id ?>"
                                                        class="btn btn-sm btn-outline-danger rounded-0"
                                                        onclick="if(confirm(`¿Deseas eliminar del registro a <?= $data->nombreIn ?>?`) === false) event.preventDefault();">
                                                        <i class="fa-solid fa-trash">D</i>
                                                    </a>
                                                </td>
                                            </tr>
                                        <?php endforeach; ?>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
        
<div class="line w-100 my-3"></div>

</body>
</html>
