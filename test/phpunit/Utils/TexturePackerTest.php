<?php

	require_once __DIR__."/../../../src/client/php/Utils/TexturePacker.php";

	class TexturePackerTest extends \PHPUnit_Framework_TestCase {

		function testPack() {
			if (!is_dir(__DIR__."/../out"))
				mkdir(__DIR__."/../out");

			$texturePacker=new TexturePacker();
			$texturePacker->addImagesInDirectory(__DIR__."/../res");
			$texturePacker->setTextureFolder(__DIR__."/../out");
			$texturePacker->pack();

			$data=$texturePacker->getJson();

			$this->assertEquals(1,count($data["textures"]));
		}
	}