<?php

	require_once __DIR__."/../bin/php/ResourceFiddle.php";

	$r=new ResourceFiddle();

	$images=$r->category("Some Images");

	$sc=$images->category("subcategory");
	$sc->description("Some images...");
	$sc->image("image_one")->value("bunny.png");
	$sc->image("image_two")->value("cat.png");

	$sc=$images->category("subcategory");
	//$sc->description("Another sub...");
	$sc->position("test")->value(10,10);

	$r->position("pos_one")->value(10,10);
	$r->color("color_one")->value(0xff0000);
	$r->color("color_two")->value(0x00ff00);

	$r->addTestcase("First test", "target.html?testcase=test1");
	$r->addTestcase("Second test", "target.html?testcase=test2");

	$r->dispatch();