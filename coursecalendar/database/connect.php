<?php
$HOSTNAME = "localhost";
$DATABASE = "regleep";
$USERNAME = "root";
$PASSWORD = "root";

$COURSE_TABLE = "courses";
$TEST_TABLE = "courses_testing";
$BLOCK_TABLE = "block_times";
$BLOCK_INFO_TABLE = "block_info";


/*
 * Returns a connection to the course database
 */
function getCourseDatabase() {
	global $HOSTNAME;
	global $USERNAME;
	global $PASSWORD;
	global $DATABASE;
	
	//Connect to MySQL
	$connection = mysql_connect($HOSTNAME, $USERNAME, $PASSWORD) or die('Could not connect: ' . mysql_error());

	//Select The database
	if (!mysql_select_db($DATABASE, $connection)){
		echo "Error: can't find $DATABASE";
	}
	
	//Return the connection
	return $connection;
}

?>
