<?php

	require_once __DIR__."/../bin/php/ResourceFiddle.php";

	$r=new ResourceFiddle();
	$r->load("skin.xml");

	$r->addTestcase("First test", "target.html?testcase=test1");
	$r->addTestcase("Second test", "target.html?testcase=test2");

	$r->dispatch();