<?php

	require_once __DIR__."/../bin/php/ResourceFiddle.php";

	$r=new ResourceFiddle();

	$r->addResource(ResourceFiddle::$GRAPHICS, "image_one", array("filename"=>"bunny.png"));
	$r->addResource(ResourceFiddle::$GRAPHICS, "image_two", array("filename"=>"cat.png"));

	$r->addResource(ResourceFiddle::$POSITIONS, "pos_one", array(10,10));

	$r->addResource(ResourceFiddle::$COLORS, "color_one", 0xff0000);
	$r->addResource(ResourceFiddle::$COLORS, "color_two", 0x00ff00);

	$r->setSession("session");
	$r->setTexturePath("textureFiles");

	$r->addTestcase("First test", "target.html?testcase=test1");
	$r->addTestcase("Second test", "target.html?testcase=test2");

	$r->dispatch();