<?php

if (isset($_POST['email']) && isset($_POST['surname']) && isset($_POST['firstname']))  {

  $headers = "From: " . strip_tags($_POST['email']) . "\r\n";
  $headers .= "Reply-To: ". strip_tags($_POST['email']) . "\r\n";
  $headers  = 'MIME-Version: 1.0' . "\r\n";
  $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

  $subject = 'Volunteer Application';
  
  //Email information
  $admin_email = "t_gichuhi@yahoo.com";
  $surname = $_POST['surname'];
  $firstname = $_POST['firstname'];
  $email = $_POST['email'];
  $phone = $_POST['phone'];
  $address = $_POST['address'];
  $gender = $_POST['gender'];
  $age = $_POST['age'];
  $why = $_POST['why'];
  $message = "<p>Surname: ".$surname."</p> <p>First Name: ".$firstname."</p> <p>Email: ".$email."</p> <p>Phone: ".$phone."</p> <p>Address: ".$address."</p> <p>Gender: ".$gender."</p> <p>Age: ".$age."</p> <p>Why: ".$why."</p>";
  
  //send email
  $send = mail($admin_email, "$subject", $message, $headers);

  if(!$send) {   
     echo "<p style='color:red font-weight:bold'>Error sending email!</p>";   
  } else {
     echo "<p style='color:green; font-weight:bold'>Message sent successfully. Thank you for contacting us!</p>";
  }

} else {
	
}
