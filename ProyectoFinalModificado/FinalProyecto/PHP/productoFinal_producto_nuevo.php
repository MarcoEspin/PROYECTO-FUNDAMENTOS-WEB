<?php
session_start();
require_once('productoFinal_producto_crud.php');
$master = new MasterPP();
require_once('inventario_crud.php');
$producto = new MasterProducto();
$listadoProductos = $producto->get_all_data();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    /*if (isset($_POST['id']) && is_numeric($_POST['id']) && $_POST['id'] > 0) {
        $save = $master->update_json_data();
    } else {
        $save = $master->insert_to_json();
    }*/
    $save = $master->insert_to_json();
    if (isset($save['status'])) {
        if ($save['status'] == 'success') {
            if (isset($_POST['id']) && is_numeric($_POST['id']) && $_POST['id'] > 0)
                $_SESSION['msg_success'] = 'Se ha agregado un nuevo miembro al archivo JSON con éxito';
            else
                $_SESSION['msg_success'] = 'Los detalles del miembro se han actualizado en el archivo JSON con éxito';
            header('location: ingresoProductoFinal.php');
            exit;
        }
    } else {
        $_SESSION['msg_error'] = $save['failed'];//'Los detalles no se pudieron guardar debido a algún error del sistema. 1';
    }
}
$data = $master->get_data(isset($_GET['id']) ? $_GET['id'] : '',isset($_GET['norden']) ? $_GET['norden'] : '');
?>
<!DOCTYPE html>
<html lang="en">

<head>
<link rel="stylesheet" href="CSS/estilo.css">
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>INNOVA TECH</title>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/js/all.min.js" integrity="sha512-naukR7I+Nk6gp7p5TMA4ycgfxaZBJ7MO5iC3Fp6ySQyKFHOGfpkSZkYVWV5R7u7cfAicxanwYQ5D1e17EfJcMA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">

    <script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="style.css">
</head>

<body>

    <div class="container px-5 my-3">
        <h2 class="text-center">Productos</h2>
        <div class="row">
            <!-- Contenedor de contenido de página -->
            <div class="col-lg-10 col-md-11 col-sm-12 mt-4 pt-4 mx-auto">
                <div class="container-fluid">
                    <!-- Sesión de formulario de manejo de mensajes -->
                    <?php if (isset($_SESSION['msg_success']) || isset($_SESSION['msg_error'])) : ?>
                        <?php if (isset($_SESSION['msg_success'])) : ?>
                            <div class="alert alert-success rounded-0">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="col-auto flex-shrink-1 flex-grow-1"><?= $_SESSION['msg_success'] ?></div>
                                    <div class="col-auto">
                                        <a href="#" onclick="$(this).closest('.alert').remove()" class="text-decoration-none text-reset fw-bolder mx-3">
                                            <i class="fa-solid fa-times"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <?php unset($_SESSION['msg_success']); ?>
                        <?php endif; ?>
                        <?php if (isset($_SESSION['msg_error'])) : ?>
                            <div class="alert alert-danger rounded-0">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="col-auto flex-shrink-1 flex-grow-1"><?= $_SESSION['msg_error'] ?></div>
                                    <div class="col-auto">
                                        <a href="#" onclick="$(this).closest('.alert').remove()" class="text-decoration-none text-reset fw-bolder mx-3">
                                            <i class="fa-solid fa-times"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <?php unset($_SESSION['msg_error']); ?>
                        <?php endif; ?>
                    <?php endif; ?>
                    <!--FIN de la Sesión del Formulario de Manejo de Mensajes -->

                    <div class="card rounded-0 shadow">
                        <div class="card-header">
                            <div class="d-flex justify-content-between">
                                <div class="card-title col-auto flex-shrink-1 flex-grow-1">Pestaña de Ingreso</div>
                                <div class="col-atuo">
                                    <button class="btn btn-danger btn-sm btn-flat" id="add" style="background-color:#721E4F; border-color: #721E4F"><i class="fa fa-plus-square"></i> Añadir Producto</button>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="container-fluid">
                                <?php if (isset($_GET['norden'])) : ?>
                                    <p class="text-muted"><i>Actualizar los detalles de la Orden Nro. <b><?= isset($_GET['norden']) ? $_GET['norden']: '' ?></b></i></p>
                                <?php else : ?>
                                    <p class="text-muted"><i>Añadir Producto</b></i></p>
                                <?php endif; ?>
                                <form id="member-form" action="" method="POST">
                                    <input type="hidden" name="norden" value="<?= isset($_GET['norden']) ? $_GET['norden'] : '' ?>">
                                    <input  type="hidden" name="id" value="<?= isset($_GET['id']) ? $_GET['id'] : '' ?>">
                                    <div class="mb-3">
                                        <label for="producto" class="form-label">Producto</label>
                                        
                                        <select  name="nproducto" >
                                            <option value="<?= isset($data->nproducto) ? $data->nproducto: '0' ?>"><?= isset($data->nproducto) ? $data->nproducto: '                                           ' ?></option>
                                            <?php foreach ($listadoProductos as $datos): 
                                                    echo '<option value="'.$datos->nombreIn.'">'.$datos->nombreIn.'</option>';
                                                 endforeach; 
                                            ?>
                                        </select>
                                    </div>

                                    <div class="mb-3">
                                        <label for="cantidad" class="form-label">Cantidad</label>
                                        <input type="text" class="form-control rounded-0" id="ncantidad" name="ncantidad" required="required" value="<?= isset($data->ncantidad) ? $data->ncantidad: '' ?>">
                                    </div>
                                                                       
                                </form>
                            </div>
                        </div>
                        <div class="card-footer text-center">
                            <button class="btn btn-danger rounded-0" form="member-form" style="background-color: #134459;border-color: #134459"><i class="fa-solid fa-save" ></i> Guardar y Actualizar</button>
                            <a class="btn btn-light border rounded-0" href="ingresoProductoFinal.php" style="background-color:#721E4F; border-color: #721E4F"><i class="fa-solid fa-times" ></i> <span style="color: #FFFFFF">Salir</span></a>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Contenedor de contenido de fin de página -->
        </div>
    </div>
</body>

</html>