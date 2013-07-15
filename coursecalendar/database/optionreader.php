<?php
include('connect.php');
include('coursefields.php');
include('PhpConsole.php');

//Should be either GET or POST
$PARAMS = $_GET;

//Start the PHP console
PhpConsole::start();

$SEMESTER_MAP = array('01' => 'Winter', '09' => 'Fall');

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
		
		if ($PARAMS['fields'] == 'term') {
			$formatted = $SEMESTER_MAP[substr($option -> term, 4)].' '.substr($option -> term, 0, 4);
			$option -> term_format = $formatted;		
		}
		
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
	global $EXACT_FIELDS;
	global $TEST_TABLE;
	
	//The initial query
	
	if (array_key_exists('fields', $PARAMS)) {
	
		$query = "SELECT DISTINCT ".$PARAMS['fields']." FROM $TEST_TABLE";
		

		//Add all the fields into the query
		$first = True;
		foreach ($EXACT_FIELDS as $key) {
			
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
		
		return $query;
	}
	return null;
}

?>
