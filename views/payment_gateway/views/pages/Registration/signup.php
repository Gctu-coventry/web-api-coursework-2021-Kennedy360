<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EventBook - Signup</title>
    <link rel="stylesheet" type="text/css" href="../public/css/styles.css">
</head>
<body>
    <main>
    <section id="signup-body">
        <div class="signup-hero"></div>
    <div class="signup flex">
        <form name="login-form" action="../../scripts/signup.php
        " method="POST" enctype="multipart/form-data">
            <p>
                <img src="../public/images/logo3.png" alt="Logo of Company" id="signup-logo">
            </p> 
                <label for="firstname">FirstName</label> <br>
                <input type="text" placeholder="Firstname" name="firstname" id="user-firstname">
                <br>
                <label for="lastname">LastName</label> <br>
                <input type="text" placeholder="Lastname" name="lastname" id="user-lastname">
                <br>
                <label for="email">Email</label><br>
                <input type="email" placeholder="user@gmail.com" name="email" id="user-email">
                <br>
                <label for="phonenumber">Phone Number</label><br>
                <input type="tel"  name="phonenumber" id="user-phonenumber" placeholder="+233">
                <br>
                <label for="password">Password</label><br>
                <input type="password" placeholder="*************" name="password" id="user-password">
                <br>
                <input type="submit" value="Signup" name="user_signup" id="user-signup">
                <p>
                    <center>Already having an account? <a href="login.php">Log in</a></center>
                </p>

        </form>
    </div>
    </section>
    </main>
</body>
</html>