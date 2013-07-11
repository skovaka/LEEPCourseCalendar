<?php
include('passwords_connect.php');
include('passwords_validfields.php');
include('PhpConsole.php');

PhpConsole::start();

//Should be either GET or POST
$PARAMS = $_POST;

//Connect to the database
$connection = mysql_connect($hostname, $username, $password) or die('Could not connect: ' . mysql_error());

//Select The database
$bool = mysql_select_db($database, $connection);
if ($bool === False){
	print "can't find $database";
}

//The initial query
$query = "SELECT * FROM $passwordsTable";

//Add all the fields into the query
$first = True;
foreach ($validfields as $key) {
	
	//If the field has a requested value
	if (array_key_exists($key, $PARAMS) && $PARAMS[$key] != "") {
		
		//Parse the "OR" statements
		$i = 0;
		$values = explode(",", $PARAMS[$key]);
		while ($i < count($values)) {
			
			//Add where to the beginning
			if ($first) {
				$query .= " WHERE (";
				$first = false;
				
			//Add and between fields
			} elseif ($i == 0) {
				$query .= " AND (";
				
			//Add or for multiple values in a field
			} else {
				$query .= " OR ";
			}
		  
			//Add it into the query
			$query .= "$key = '".$values[$i]."'";
		
			$i = $i + 1;
		}
		
		$query .= ")";
	}
}

//debug($query);

//Query the database and extract the result
$arr = array();
$result = mysql_query($query, $connection); 
if (mysql_num_rows($result) > 0) {
	while($obj = mysql_fetch_object($result)) {
		$arr[] = $obj;
	}
}

//Encode the data and output it
echo json_encode( array('success' => (count($arr) > 0), 'passwords' => $arr) );

?>
