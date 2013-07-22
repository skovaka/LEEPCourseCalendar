<?php
include('connect.php');
include('coursefields.php');
include('PhpConsole.php');


//Maps the day letters to their respective number values
$DAY_MAP = array('M' => 1, 'T' => 2, 'W' => 3, 'R' => 4, 'F' => 5, 'S' => 6);

//Should be either GET or POST
$PARAMS = $_POST;

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
$courses = array();
if (mysql_num_rows($result) > 0) {
	while($course = mysql_fetch_object($result)) {
		if ($course -> master != "MC") continue;
		
		//Add a random calender id to the course
		$block = getBlock($course);
		$course -> block = $block['id'] + 1;
		$course -> superblock = $block['superblock'];
		
		
		
		//Parse the day for the course
		foreach (explode(' ', ($course -> days)) as $index => $day) {
			if (array_key_exists($day, $DAY_MAP)) {
				
				$courseday = clone $course;
				$courseday -> cal_start = getCourseDate($day, $course -> start);
				$courseday -> cal_end = getCourseDate($day, $course -> end);
				$courseday -> course_id = $courseday -> id;
				$courseday -> id = $id;
				$id += 1;
				
				//echo ($courseday -> title)."<br>";
				
				$courses[] = $courseday;
			}
		}
	}
}

//Encode the data and output it
echo json_encode( array('success' => true, 'courses' => $courses) );


/*
 * Returns true if the given day is valid.
 */
function isValidDay($day) {
	global $DAY_MAP;
	return array_key_exists($day, $DAY_MAP);
}

/*
 * Parses the day and time and returns a formatted date.
 */
function getCourseDate($day, $time) {
	global $DAY_MAP;
	
	if (array_key_exists($day, $DAY_MAP)) {
		
		if (strlen($time) == 4) {
			$hour = substr($time, 0, 2);
			$min = substr($time, 2, 2);
		} else {
			$hour = substr($time, 0, 1);
			$min = substr($time, 1, 2);
		}
		
		return date('c', mktime($hour, $min, 0, 7, $DAY_MAP[$day], 2013));
	}
	
	return null;
}

/*
 * Builds a MySQL query for the courses table based on what's in PARAMS
 */
function buildQuery() {
	global $PARAMS, $EXACT_FIELDS, $SEARCH_FIELDS, $TEST_TABLE;
	
	//The initial query
	$query = "SELECT * FROM $TEST_TABLE";

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
	
	foreach ($SEARCH_FIELDS as $key) {
		if (array_key_exists($key, $PARAMS) && $PARAMS[$key] != "") {
			$query .= " AND (";
			
			if ($key == 'fac_name') {
				$query .= "CONCAT(fac_first, ' ', fac_last)";
			} else {
				$query .= $key;
			}
			
			$query .= " LIKE '%".$PARAMS[$key]."%')";
			
		}
	}
	
	return $query;
}

//Returns what time block a course should be in
function getBlock($course) {
	global $BLOCK_TABLE, $BLOCK_INFO_TABLE;
	
	if (substr($course -> section, 0, 1) == "9" && strlen($course -> section) == 3)
		return array('id' => 6, 'superblock' => 'E');
	
	$days = str_replace(" ", "", $course -> days);
	$start = $course -> start;
	$end = $course -> end;
	$query = "SELECT block, superblock FROM $BLOCK_TABLE, $BLOCK_INFO_TABLE WHERE $BLOCK_TABLE.block = $BLOCK_INFO_TABLE.id AND days = '$days' AND start = '$start' AND end = '$end'";
	
	
	$connection = getCourseDatabase();
	$result = mysql_query($query, $connection);
	mysql_close($connection);
	
	if ($r = mysql_fetch_object($result))
		return array('id' => ($r -> block), 'superblock' => ($r -> superblock));
		
	return array('id' => 5, 'superblock' => 'D');
	
}

?>
