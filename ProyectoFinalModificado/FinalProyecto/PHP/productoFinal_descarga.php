<?php
session_start();
require_once('productoFinal_crud.php');
$master = new MasterPF();
$master->descarga();
header('location: ingresoProductoFinal.php');
