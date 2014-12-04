<?php

	require_once __DIR__."/../bin/php/ResourceFiddle.php";

	$r=new ResourceFiddle();

	$r->addResource(ResourceFiddle::$GRAPHICS, "table");

	$r->setSession("session");
	$r->setTexturePath("textureFiles");

	$r->addTestcase("test1", "First test", "target.php?testcase=test1");

	$r->dispatch();