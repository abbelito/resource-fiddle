<?php

include_once("./php/ResourceFiddle.php");

$resourceFiddle = new ResourceFiddle();
/*
$resourceFiddle->addResource(ResourceFiddle::$GRAPHICS, "table");

$resourceFiddle->addResource(ResourceFiddle::$GRAPHICS, "timerBackground");
$resourceFiddle->addResource(ResourceFiddle::$GRAPHICS, "seatPlate");
$resourceFiddle->addResource(ResourceFiddle::$GRAPHICS, "cardFrame");
$resourceFiddle->addResource(ResourceFiddle::$GRAPHICS, "cardBack");
$resourceFiddle->addResource(ResourceFiddle::$GRAPHICS, "dividerLine");
$resourceFiddle->addResource(ResourceFiddle::$GRAPHICS, "suitSymbol1");
$resourceFiddle->addResource(ResourceFiddle::$GRAPHICS, "suitSymbol2");
$resourceFiddle->addResource(ResourceFiddle::$GRAPHICS, "suitSymbol3");
$resourceFiddle->addResource(ResourceFiddle::$GRAPHICS, "suitSymbol4");
$resourceFiddle->addResource(ResourceFiddle::$GRAPHICS, "dealerButton");
$resourceFiddle->addResource(ResourceFiddle::$GRAPHICS, "chip1");
$resourceFiddle->addResource(ResourceFiddle::$GRAPHICS, "chip2");
$resourceFiddle->addResource(ResourceFiddle::$GRAPHICS, "chip3");
$resourceFiddle->addResource(ResourceFiddle::$GRAPHICS, "chip4");
$resourceFiddle->addResource(ResourceFiddle::$GRAPHICS, "chip5");
$resourceFiddle->addResource(ResourceFiddle::$GRAPHICS, "buttonBackground");
$resourceFiddle->addResource(ResourceFiddle::$GRAPHICS, "framePlate");
$resourceFiddle->addResource(ResourceFiddle::$GRAPHICS, "chatBackground");
$resourceFiddle->addResource(ResourceFiddle::$GRAPHICS, "textScrollbarTrack");
$resourceFiddle->addResource(ResourceFiddle::$GRAPHICS, "textScrollbarThumb");
$resourceFiddle->addResource(ResourceFiddle::$GRAPHICS, "bigButton");
$resourceFiddle->addResource(ResourceFiddle::$GRAPHICS, "sliderBackground");
$resourceFiddle->addResource(ResourceFiddle::$GRAPHICS, "checkboxBackground");
$resourceFiddle->addResource(ResourceFiddle::$GRAPHICS, "checkboxTick");
$resourceFiddle->addResource(ResourceFiddle::$GRAPHICS, "sliderKnob");
$resourceFiddle->addResource(ResourceFiddle::$GRAPHICS, "dialogButton");
$resourceFiddle->addResource(ResourceFiddle::$GRAPHICS, "wrenchIcon");
$resourceFiddle->addResource(ResourceFiddle::$GRAPHICS, "upArrow");


$resourceFiddle->addResource(ResourceFiddle::$POSITIONS, "seatPosition0");
$resourceFiddle->addResource(ResourceFiddle::$POSITIONS, "seatPosition1");
$resourceFiddle->addResource(ResourceFiddle::$POSITIONS, "seatPosition2");
$resourceFiddle->addResource(ResourceFiddle::$POSITIONS, "seatPosition3");
$resourceFiddle->addResource(ResourceFiddle::$POSITIONS, "seatPosition4");
$resourceFiddle->addResource(ResourceFiddle::$POSITIONS, "seatPosition5");
$resourceFiddle->addResource(ResourceFiddle::$POSITIONS, "seatPosition6");
$resourceFiddle->addResource(ResourceFiddle::$POSITIONS, "seatPosition7");
$resourceFiddle->addResource(ResourceFiddle::$POSITIONS, "seatPosition8");
$resourceFiddle->addResource(ResourceFiddle::$POSITIONS, "seatPosition9");
$resourceFiddle->addResource(ResourceFiddle::$POSITIONS, "betPosition0");
$resourceFiddle->addResource(ResourceFiddle::$POSITIONS, "betPosition1");
$resourceFiddle->addResource(ResourceFiddle::$POSITIONS, "betPosition2");
$resourceFiddle->addResource(ResourceFiddle::$POSITIONS, "betPosition3");
$resourceFiddle->addResource(ResourceFiddle::$POSITIONS, "betPosition4");
$resourceFiddle->addResource(ResourceFiddle::$POSITIONS, "betPosition5");
$resourceFiddle->addResource(ResourceFiddle::$POSITIONS, "betPosition6");
$resourceFiddle->addResource(ResourceFiddle::$POSITIONS, "betPosition7");
$resourceFiddle->addResource(ResourceFiddle::$POSITIONS, "betPosition8");
$resourceFiddle->addResource(ResourceFiddle::$POSITIONS, "betPosition9");
$resourceFiddle->addResource(ResourceFiddle::$POSITIONS, "dealerButtonPosition0");
$resourceFiddle->addResource(ResourceFiddle::$POSITIONS, "dealerButtonPosition1");
$resourceFiddle->addResource(ResourceFiddle::$POSITIONS, "dealerButtonPosition2");
$resourceFiddle->addResource(ResourceFiddle::$POSITIONS, "dealerButtonPosition3");
$resourceFiddle->addResource(ResourceFiddle::$POSITIONS, "dealerButtonPosition4");
$resourceFiddle->addResource(ResourceFiddle::$POSITIONS, "dealerButtonPosition5");
$resourceFiddle->addResource(ResourceFiddle::$POSITIONS, "dealerButtonPosition6");
$resourceFiddle->addResource(ResourceFiddle::$POSITIONS, "dealerButtonPosition7");
$resourceFiddle->addResource(ResourceFiddle::$POSITIONS, "dealerButtonPosition8");
$resourceFiddle->addResource(ResourceFiddle::$POSITIONS, "dealerButtonPosition9");
$resourceFiddle->addResource(ResourceFiddle::$POSITIONS, "bigButtonPosition");
$resourceFiddle->addResource(ResourceFiddle::$POSITIONS, "communityCardsPosition");
$resourceFiddle->addResource(ResourceFiddle::$POSITIONS, "potPosition");
$resourceFiddle->addResource(ResourceFiddle::$POSITIONS, "seatPlatePosition");
$resourceFiddle->addResource(ResourceFiddle::$POSITIONS, "suitSymbol1Position");
$resourceFiddle->addResource(ResourceFiddle::$POSITIONS, "suitSymbol2Position");
$resourceFiddle->addResource(ResourceFiddle::$POSITIONS, "suitSymbol3Position");
$resourceFiddle->addResource(ResourceFiddle::$POSITIONS, "suitSymbol4Position");


$resourceFiddle->addResource(ResourceFiddle::$COLORS, "chipsColor0");
$resourceFiddle->addResource(ResourceFiddle::$COLORS, "chipsColor1");
$resourceFiddle->addResource(ResourceFiddle::$COLORS, "chipsColor2");
$resourceFiddle->addResource(ResourceFiddle::$COLORS, "chipsColor3");
$resourceFiddle->addResource(ResourceFiddle::$COLORS, "chipsColor4");

$resourceFiddle->addTestcase("test1", "First test", "testcase=test1");
$resourceFiddle->addTestcase("test2", "Second test", "testcase=test2");
$resourceFiddle->addTestcase("test3", "Third test", "testcase=test3");
$resourceFiddle->addTestcase("test4", "Fourth test", "testcase=test4");

$resourceFiddle->setSession("bajs");

$resourceFiddle->setTarget("target.php");
*/

$resourceFiddle->addResource(ResourceFiddle::$GRAPHICS, "background");
$resourceFiddle->addResource(ResourceFiddle::$GRAPHICS, "scratchSurface");
$resourceFiddle->addResource(ResourceFiddle::$GRAPHICS, "buyButton");
$resourceFiddle->addResource(ResourceFiddle::$GRAPHICS, "checkButton");
$resourceFiddle->addResource(ResourceFiddle::$GRAPHICS, "logo");
$resourceFiddle->addResource(ResourceFiddle::$GRAPHICS, "result");
$resourceFiddle->addResource(ResourceFiddle::$GRAPHICS, "scratchItem");

$resourceFiddle->addTestcase("test4", "Fourth test", "viewcase=action_test");

$resourceFiddle->setSession("bajs");

$resourceFiddle->setTarget("http://localhost:8888/cryptoscratch/test/view/ticket.html");


$resourceFiddle->dispatch();

?>