<?php

if (isset($_POST['email']) && isset($_POST['name']) && isset($_POST['msg']))  {

  $headers = "From: " . strip_tags($_POST['email']) . "\r\n";
  $headers .= "Reply-To: ". strip_tags($_POST['email']) . "\r\n";
  $headers  = 'MIME-Version: 1.0' . "\r\n";
  $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

  //Email information
  $admin_email = "youremailaddress@yahoo.com";
  $subject = "Email from website";
  $email = $_POST['email'];
  $name = $_POST['name'];
  $phone = $_POST['phone'];
  $msg = $_POST['msg'];
  $message = "<p>Name: ".$name."</p> <p>Email: ".$email."</p> <p>Phone: ".$phone."</p> <p>Message: ".$msg."</p>";

  //send email
  $send = mail($admin_email, "$subject", $message, $headers);

  if(!$send) {
     echo "<p style='color:red font-weight:bold'>Error sending email!</p>";
  } else {
     echo "<p style='color:green; font-weight:bold'>Message sent successfully. Thank you for contacting us!</p>";
  }

} else {
	echo 'nothisng';
}
