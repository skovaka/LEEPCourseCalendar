<?php
include('connect.php');
include('coursefields.php');
include('PhpConsole.php');

//Should be either GET or POST
$PARAMS = $_GET;

//Start the PHP console
PhpConsole::start();

//Connect to the database
$connection = getCourseDatabase();

//Build the query for the database
$query = buildQuery();

//Query the database
$result = mysql_query($query, $connection); 

$id = 0;

//Put the result in an array
$options = array();
if (mysql_num_rows($result) > 0) {
	while($option = mysql_fetch_object($result)) {
		//echo $course -> $PARAMS['fields'];		
		$options[] = $option;
	}
}

//Encode the data and output it
echo json_encode( array('success' => (count($options) > 0), 'options' => $options) );


/*
 * Builds a MySQL query for the courses table based on what's in PARAMS
 */
function buildQuery() {
	global $PARAMS;
	global $COURSE_FIELDS;
	global $TEST_TABLE;
	
	//The initial query
	
	if (array_key_exists('fields', $PARAMS)) {
	
		$query = "SELECT DISTINCT ".$PARAMS['fields']." FROM $TEST_TABLE";
		

		//Add all the fields into the query
		$first = True;
		foreach ($COURSE_FIELDS as $key) {
			
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
					$query .= "$key = '".mysql_real_escape_string($values[$i])."'";
				
					$i = $i + 1;
				}
				$query .= ")";
			}
		}
	
		echo $query."<br>";
		
		return $query;
	}
	return null;
}

//Returns what time block a course should be in
function getBlock($course) {
	global $BLOCK_TABLE;
	
	if (substr($course -> section, 0, 1) == "9" && strlen($course -> section) == 3)
		return 6;
	
	$days = str_replace(" ", "", $course -> days);
	$start = $course -> start;
	$end = $course -> end;
	$query = "SELECT block FROM $BLOCK_TABLE WHERE days = '$days' AND start = '$start' AND end = '$end'";
	
	$connection = getCourseDatabase();
	$result = mysql_query($query, $connection);
	mysql_close($connection);
	
	if ($r = mysql_fetch_object($result))
		return $r -> block;
		
	return 5;
	
}

?>
