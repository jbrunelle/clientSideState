use Time::Local;

if($#ARGV < 1 || $#ARGV > 1)
{
	print "USAGE: perl runner.pl [URIFILE] [DIR]\n";
	exit();
}

my $ITERATIONS = 900;
my $BREADTH = 99999999;
my $DEPTH = 99999999;

my $curBreadth = 0;
my $curDepth = 0;

my $inFile = trim($ARGV[0]);
open(IN, $inFile);
my @uris = <IN>;
close(IN);

my $DIR = trim($ARGV[1]);
my $cmd = `mkdir $DIR`;

for(my $i = 0; $i < $#uris+1; $i++)
{
	my $u = trim($uris[$i]);
	my $start = `date +%s%N`;
	my $dh = `date`;
	$start = trim($start);

	##create a directory in which we will store all the generated state data
	my $cmd = "mkdir $DIR/$i";
	my $tmp = `$cmd`;
	$cmd = "rm $DIR/$i/*";
	##commented for debugging
	$tmp = `$cmd`;

	##find the initial state S_0
	$cmd = "phantomjs  --max-disk-cache-size=0 --disk-cache=false  interaction_ve.js \"$u\" "
	#$cmd = "/var/www/phantomjs/bin/phantomjs interaction.js \"$u\" "
			. "$DIR/$i/sx.png $DIR/$i/sx.html $DIR/$i/sx.404 $DIR/$i/sx_interactions.csv";
	

	#commented for debugging
	
	eval {
		local $SIG{ALRM} = sub {die "alarm\n"};
		alarm 60000;
		print "$i s0 -> $dh\n$u...";
		print "\n$start Executing $cmd \n\n";
		$tmp = `$cmd`;
		alarm 0;
	};
	wait();

	#$tmp = `$cmd`;

	my $end = `date +%s%N`;
	$end = trim($end);

	print "Done in ";
	my $time = $end/1000000000 - $start/1000000000;
	print "$time ns\n\n";


	open(IN, "$DIR/$i/sx_interactions.csv");
	my @allL = <IN>;
	close(IN);

	#print "$i/sx_interactions.csv ==> Size: $#allL\n";

	my $l = "";
	for(my $j = 0; $j < $#allL+1; $j++)
	{
		$l = trim($allL[$j]);

		#print $l . "\n";

		unless($l eq "")
		{
			$j = $#allL*2;
		}
	}

	#print "pre-l: $l\n\n";

	##debug
	#usage: generateJSON(line, htmlFile, 404File, stateID)
	generateJSON($l, "$DIR/$i/sx.html", "$DIR/$i/sx.404", "$DIR/$i/sx_interactions.csv", "$u", "null");


	##get the initial state hashes
	my $pngHash = getHash("$DIR/$i/s0.png");
	my $domHash = getHash("$DIR/$i/s0.html");

	##reading the states from s0_interactions (the S_0 interaction file)
		## and constructing the sub-states from S_0
	##constructStates(interaction file, directory, statenumber, prevState)
	my $temp = constructStates("$DIR/$i/sx_interactions.csv", "$DIR/$i", "", "");

	print "States; $temp\n\n";
	##run through the initial set of states, constructing new states
	my @listOfStates = ();

	##@states as an array (queue) is effectively a breadth-first search
	##@states as a stack is effectively a depth-first search.
	#### to treat a perl array as a stack, access the $array[-1] element

	print "initial add..." . $#states . "\n";
	my @states = split(/, /, $temp);
	print "after initial add..." . $#states . "\n";

	for(my $j = 0; (($j < $#states+1) && ($j < $ITERATIONS)); $j++)
	{
		my $s = trim($states[$j]);

		print "Running state $s\n";

		my $curState = $s;
		
		$s =~ s/$DIR\///ig;
		$s =~ s/$DIR//ig;
		$s =~ s/[0-9]*\/s//ig;
		$s =~ s/\.txt//ig;

		my @jnk = split(/_/, $s);

		my $thisdepth = length(@jnk);
		my $thisbreadth = max(@jnk);
		
		#print "$s is $thisdepth deep and $thisbreadth broad\n";

		if(($thisbreadth <= $BREADTH) 
			&& ($thisdepth <= $DEPTH))
		{
			##runState(URI, directory, statefile)
			my $newInteractionFile = runState($u, "$DIR/$i", $s);

			#print "Reading $s\n";
			open(IN, "$DIR/$i/$s");
			my @stateLines = <IN>;
			close(IN);

			push(@listOfStates, "$DIR/$i/$s");

			my $prevStates = join("\n", @stateLines);

			#print "Calling construct states: $newInteractionFile, $i, $j, $prevStates\n\n";
			##constructStates(interaction file, directory, statenumber, prevState)
			#my $temp = constructStates("$DIR/$i/sx_interactions.csv", "$DIR/$i", "", "");
			$temp = constructStates($newInteractionFile, "$DIR/$i", $j, trim($prevStates));
			print "States; $temp\n\n";

			generateJSON($l, "$DIR/$i/s$j.html", "$DIR/$i/s$j.404", "$DIR/$i/s$j_interactions.csv", "$u", $prevStates);

			my @newStates = split(/, /, $temp);
			print "before add..." . $#states . "\n";
			for(my $k = 0; $k < $#newStates+1; $k++)
			{
				print("Adding " . trim($newStates[$k]) . " to the state queue...\n");
				push(@states, trim($newStates[$k]));
			}
			print "after add..." . $#states . "\n";

		}#END if DEPTH && BREADTH

		#debugging
		#$j = 99;
	}

	## get the state hashes and compare the 404s
		##to do!

	my @uniqStates = ();
	my @deleteStates = ();
	for(my $j = 0; (($j < $#listOfStates+1)); $j++)
	{
		my $s1 = trim($listOfStates[$j]);
		unless($s1 eq "DUPE")
		{
			open(IN, $s1);
			my @lines1 = <IN>;
			close(IN);
			my %embedded1;
			for(my $h = 0; $h < $#lines1+1; $h++)
			{
				$embedded1{trim($lines1[$h])} = trim($lines1[$h]);
			}
			for(my $k = $j+1; $k < $#listOfStates+1; $k++)
			{
				my $HasDupe = 1;
				my $s2 = trim($listOfStates[$k]);
				##open file
				open(IN, $s2);
				my @lines2 = <IN>;
				close(IN);

				##get hash of all embedded resources
				my %embedded2;
				for(my $h = 0; $h < $#lines2+1; $h++)
				{
					$embedded2{trim($lines2[$h])} = trim($lines2[$h]);
				}

				##compare hashes
				if(keys( %embedded1 ) == keys( %embedded2 ))
				{
					while ( my ($key, $value) = each(%embedded1) ) 
					{
						if($embedded1 eq $embedded2)
						{
						}
						else
						{
							$HasDupe == 0;
						}
					}
				}
				else
				{
					$HasDupe == 0;
				}

				##if the hashes are equivalent, remove the equivalent guy from the list
				if($HasDupe == 1)
				{
					$listOfStats[$k] = "DUPE";
				}
			}
			push(@uniqStates, $s1);
			push(@deleteStates, $s1);
		}
	}

	my $finalStates = join("\n", @uniqStates);
	open(OUT, ">$DIR/$i/finalStates.txt");
	print OUT $finalStates;
	close(OUT);

	#delete the duplicate states
	for(my $j = 0; $j < $#deleteStates+1; $j++)
	{
		my $cmd = "rm $deleteStates[$j]";
		#$tmp = `$cmd`;
	}
}


sub trim($)
{
        my $string = shift;
        $string =~ s/^\s+//;
        $string =~ s/\s+$//;
        return $string;
}

sub convertTime
{
    my $dstring = shift;

    my %m = ( 'Jan' => 0, 'Feb' => 1, 'Mar' => 2, 'Apr' => 3,
            'May' => 4, 'Jun' => 5, 'Jul' => 6, 'Aug' => 7,
            'Sep' => 8, 'Oct' => 9, 'Nov' => 10, 'Dec' => 11 );

    if ($dstring =~ /(\S+)\s+(\d+)\s+(\d{2}):(\d{2}):(\d{2})/)
    {
        my ($month, $day, $h, $m, $s) = ($1, $2, $3, $4, $5);
        my $mnumber = $m{$month}; # production code should handle errors here

        timelocal( $s, $m, $h, $day, $mnumber, Year - 1900 );
    }
    else
    {
        die "Format not recognized: ", $dstring, "\n";
    }
}

sub convert_seconds_to_hhmmss {

  my $hourz=int($_[0]/3600);

  my $leftover=$_[0] % 3600;

  my $minz=int($leftover/60);

  my $secz=int($leftover % 60);

  

  return sprintf ("%02dh%02dm%02ds", $hourz,$minz,$secz)
}

sub getHash($)
{
	my $f = trim($_[0]);
	$tmp = `md5sum $f`;
	my @arr = split(/ /, $tmp);

	return trim($arr[0]);
}

sub runState($)
{
	##runState(URI, directory, statefile)
	my $uri = trim($_[0]);
	my $directory = trim($_[1]);
	my $stateFile = trim($_[2]);

	my $newState = $stateFile;
	$newState =~ s/\.txt//i;

	$cmd = "phantomjs  --max-disk-cache-size=0 --disk-cache=false scriptedInteraction.js \"$uri\""
	#$cmd = "/var/www/phantomjs/bin/phantomjs scriptedInteraction.js \"$uri\""
			. " $directory/s" . $newState . ".png $directory/s" . $newState . ".html"
			. " $directory/s" . $newState . ".404"
			. " $directory/$stateFile"
			. " $directory/s" . $newState . "_interactions.csv ";

	my $start = `date +%s%N`;
	my $dh = `date`;
	$start = trim($start);
	
	print "$dh: Running command: $cmd\n\n";
	my $tmp = `$cmd`;

	my $end = `date +%s%N`;
	$end = trim($end);

	print "Done in ";
	my $time = $end/1000000000 - $start/1000000000;
	print "$time ns\n\n";

	return ("$directory/s" . $newState . "_interactions.csv");
}

sub constructStates($)
{
	##constructStates(interaction file, directory, statenumber, prevState)
	my $interactionFile = trim($_[0]);
	my $directory = trim($_[1]);
	my $stateNum = trim($_[2]);
	my $prevStates = trim($_[3]);

	#print "Reading: $interactionFile; $directory, $stateNum, $prevStates\n\n";
	
	##read the itneraction file and construct the states based on the 
		##interactions that lead to them
	open(IN, $interactionFile);
	my @lines1 = <IN>;
	close(IN);

	my @states = ();

	#print "\n";

	my @lines =();
	for(my $k = 0; $k < $#lines1+1; $k++)
	{
		unless(trim($lines1[$k]) eq "")
		{
			push(@lines, $lines1[$k]);
		}
	}

	for(my $k = 0; $k < $#lines+1; $k++)
	{
		my $l = trim($lines[$k]);
		my $output = "";
		#onclick, img1, [8,62], <!-- [innerHTML] <img id="img1" src="./20140907_090111.jpg" height="300px" width="300px" onclick="runOnClickImg()"> -->
		
		#print "$prevStates\n $l\n";
		#print "Index: " . index(trim($prevStates), trim($l)) . "\n";
		if ((index(trim($prevStates), trim($l)) == -1) 
		#	&& !(trim($prevStates) eq "") && !(trim($l) eq "")
		)
		#if (1 == 1)
		{
			my $theNewOne = "";
			if($stateNum eq "")
			{
				$theNewOne = $k;
			}
			else
			{
				$theNewOne = $stateNum . "_" . $k;
			}

			unless($prevStates eq "")
			{
				$output = $prevStates . "\n";
			}
			$output .= $l;

			unless(hasDuplicate($directory, $output) == 1)
			{
				my $newState = "";
				if($stateNum eq "")
				{
					$newState = $k . ".txt";
				}
				else
				{
					$newState = $stateNum . "_" . $k . ".txt";
				}
				push(@states, $newState);
				print "created $newState\n";

				open(OUT, ">$directory/$theNewOne.txt");
				unless($prevStates eq "")
				{
					print OUT $prevStates . "\n";
					#$output = $prevStates . "\n";
				}
				print OUT $l;
				#$output .= $l;
				#print "$stateNum$k" . " ::: " . $l . "\n";
				close(OUT);
			}
			
		}

		##Need to check to see if the state that I am creating is equal to any other states. 
		###if it is, don't create it.
		###running into an infinite loop because we're creating states unnecessarily.

		##hasDuplicate(directory, set of States)
		#unless(hasDuplicate($directory, $output) == 1)
		#{
		#	my $newState = "";
		#	if($stateNum eq "")
		#	{
		#		$newState = $k . ".txt";
		#	}
		#	else
		#	{
		#		$newState = $stateNum . "_" . $k . ".txt";
		#	}
		#	push(@states, $newState);
		#	print "created $newState\n";
		#}
	}

	print "\n";

	return join(', ', @states);
}

sub hasDuplicate($)
{
	##hasDuplicate(directory, set of States)
	my $directory = trim($_[0]);
	my $stateString = trim($_[1]);
	my @states1 = split(/\n/, $stateString);	

	#print "\nRunning hasDuplicate($directory, $stateString)\n";

	my @states = ();

	for(my $k = 0; $k < $#states1+1; $k++)
	{
		unless(trim($states1[$k]) eq "")
		{
			push(@states, $states1[$k]);
		}
	}

	my $hasDupe = 0;

	my @files = `ls $directory/*.txt`;
	for(my $i = 0; $i < $#files+1; $i++)
	{
		my $f = trim($files[$i]);
		#open(IN, "$directory/$f");
		open(IN, "$f");
		my @compare1 = <IN>;
		close(IN);

		#print "running $f\n\n";
		
		my @compare = ();

		for(my $k = 0; $k < $#compare1+1; $k++)
		{
			#print "compar building: trim($compare1[$k])\n";
			unless(trim($compare1[$k]) eq "")
			{
				push(@compare, $compare1[$k]);
			}
		}

		#print "lengths: $#compare == $#states\n";
		if($#compare == $#states)
		{
			my $allEqual = 1;
			$compare[$j] = trim($compare[$j]);
			$states[$j] = trim($states[$j]);

			#$compare[$j] =~ s/^[0-9]*\://;
			#$states[$j]  =~ s/^[0-9]*\://;

			for(my $j = 0; $j < $#compare+1; $j++)
			{
				#print "comparing: \n$compare[$j]\n$states[$j]\n";
				unless(trim($compare[$j]) eq trim($states[$j]))
				{
					$allEqual = 0;
				}
			}
			if($allEqual == 1)
			{
				#print "FOUND A DUPE! $f!\n";
				$hasDupe = 1;
				return 1;
			}
		}
	}

	return $hasDupe;
}


sub generateJSON($)
{
	my $date = `date`;
	$date = trim($date);
	my $line = trim($_[0]);
	my $htmlFile = trim($_[1]);
	my $the404 = trim($_[2]);
	my $interactionFile = trim($_[3]);
	my $stateID = trim($_[4]);
	my $pageTimings = trim($_[5]);


	my $JSONFile = $the404;
	$JSONFile =~ s/\.404/\.json/i;

	print "My JSON File: $JSONFile\n\n";

	#print "The Line: $line\n\n";

	open(FILE, $the404);
	my @data = <FILE>;
	close(FILE);
	my $resources = join(", ", @data);
	$resources =~ s/\n//ig;

	#print "The html $#data: $htmlFile\n\n";


	open(FILE, $htmlFile);
	my @data = <FILE>;
	close(FILE);
	my $theHTML = join("\n ", @data);

	#print "The 404 $#data: $the404\n\n";


	open(FILE, $interactionFile);
	my @data = <FILE>;
	close(FILE);
	my $interactions = join("\n ", @data);

	#print "The 404 $#data: $the404\n\n";

	#/**the line:**
  	#id: event, DOM ID, [x,y] location, optional "options" for a drop down: value:ID, <!-- [innerHTML innerHTML --> 
	#0: change, picPicker, [10,56], value:0, value:1, value:2, value:3, value:4, value:5, <!-- [innerHTML] %0A%20%20%3... -->
	#/**/
	
	my @arr1 = split(/: /, $line);
	my @arr2 = split(/, /, $line);

	my $id = trim($arr1[0]);
	my @temp = split(/: /, $arr2[0]);
	my $event = trim($temp[1]);
	my $domID = trim($arr2[1]);
	my $loc = trim($arr2[2]);
	my @temp = split(/,/, trim(loc));
	
	my $xloc = trim($temp[0]);
	my $yloc = trim($temp[1]);

	$xloc =~ s/\[//ig;
	$yloc =~ s/\]//ig;

	#print "DEBUG: " . $id . "\n";

	my $innerHtml = "";
	if($#arr2>=0)
	{
		trim($arr2[$#arr2]);
	}

	my @options = ();
	my @values = ();

	for(my $i = 3; $i < $#arr2; $i++)
	{
		my @temp = split(/:/, $arr2[$i]);
		push(@options, trim($temp[0]));
		push(@values, trim($temp[1]));
	}

	#print "date: $date\n";

	my $json = "\"pages\": [\n"
		. "{\n" . 
		"\"startedDateTime\": \"$date\",\n" . 
		"\"id\": \"s_$stateID" . "_testPage.html\",\n" . 
		"\"title\": \"s_$stateID" . "_testPage.html\",\n" . 
		"\"pageTimings\": {" . $pageTimings . "},\n" . 
		"\"comment\": \"state $stateID - action number $id of the test page\",\n" . 
		"\"renderedContent\": {" . $theHTML . "},\n" . 
		"\"renderedElements\": [$resources],\n" . 
		"\"map\": [\n" . 
				"{\n" . $interactions ."\},\n" . 
			"]\n" . 
		"\}\n" . 
	"\]\n";

	open(OUT, ">$JSONFile");
	print OUT $json;
	close(OUT);


	#"pages": [
	#	{
	#	"startedDateTime": "2015-04-20T01:00:00.000+00:00",
	#	"id": "s\_3_testPage.html",
	#	"title": "Test Page",
	#	"pageTimings": {null},
	#	"comment": "state 3 of the test page",
	#	"renderedContent": {<html>
	#				<head>
	#				...
	#				<img id="img1" src="./20140908_111414.jpg" height=’300px’ width=’300px’
	#				onclick="runOnClickImg()">
	#				<img id="img2" src="./20140903_201206.jpg" height=’300px’ width=’300px’
	#				onclick="runOnClickImg2()">
	#				...
	#				<\html>
	#			   },
	#	"renderedElements": ["./20140907_090111.jpg", "./20140903_200818.jpg",
	#	"./20140908_111414.jpg", "./20140903_201206.jpg"],
	#	"map": [
	#			{
	#			"href": "img1",
	#			"location": {...}
	#			},
	#			{
	#			"href": "img2",
	#			"location": {...}
	#			},
	#		]
	#	}
	#]
		
}

sub max {
    my ($max, $next, @vars) = @_;
    return $max if not $next;
    return max( $max > $next ? $max : $next, @vars );
}










