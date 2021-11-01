<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EventBook - Login</title>
    <link rel="stylesheet" type="text/css" href="../public/css/styles.css">
</head>
<body>
    <main>
    <section id="login-body">
    <div class="login flex browser-center">
        <form name="login-form" action="../../scripts/login.php" method="POST">
            <p>
                <img src="../public/images/carl3.webp" alt="Logo of Company" id="login-logo">
            </p>
            <p>
            <label for="username">Username:</label>
            <br>
            <input type="text" placeholder="Username" name="username" class="login-username">
            </p>
            <p>
            <label for="password">Password:</label>
            <br>
            <input type="password" placeholder="***********" name="password" class="login-password">
            <br>
            <a href="ResetPassword/resetpassword.php" id="forgot-password-link"><i>forgot password?</i></a>
            <br>
            </p>
            <p>
                <input type="checkbox" name="remember-me" id="login-remember-me"> Keep me logged in
                <br>
                <input type="submit" value="Login" id="login-btn" name="user_login">
            </p>

        </form>
    </div>
    </section>
    </main>
</body>
</html>