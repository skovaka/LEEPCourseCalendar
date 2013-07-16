<?php
include('connect.php');
include('coursefields.php');
include('PhpConsole.php');


//Maps the day letters to their respective number values
$DAY_MAP = array('M' => 1, 'T' => 2, 'W' => 3, 'R' => 4, 'F' => 5, 'S' => 6);

//Start the PHP console
PhpConsole::start();

//Connect to the database
$connection = getCourseDatabase();

//Build the query for the database
$query = 'SELECT block, name, superblock, days, start, end, percent FROM block_times AS times, block_info as info WHERE times.block = info.id';

//Query the database
$result = mysql_query($query, $connection); 

$id = 0;

//Put the result in an array
$courses = array();
if (mysql_num_rows($result) > 0) {
	while($course = mysql_fetch_object($result)) {
		
		//Add a random calender id to the course
		$course -> block += 1;
		
		//Parse the day for the course
		foreach (str_split($course -> days) as $index => $day) {
			if (array_key_exists($day, $DAY_MAP)) {
				
				$courseday = clone $course;
				$courseday -> cal_start = getCourseDate($day, $course -> start);
				$courseday -> cal_end = getCourseDate($day, $course -> end);
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
