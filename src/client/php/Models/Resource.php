<?php

/**
* 
*/
class Resource
{
	const GRAPHICS = 0;
	const POSITIONS = 1;
	const COLORS = 2;
	const STRINGS = 3;

	public $value;
	public $name;
	public $type;

	function __construct($type, $name, $value = NULL)
	{
		$this->type = $type;
		$this->name = $name;
		$this->value = $value;
	}

	public function getTypeAsString() {
		switch($this->type) {
			case Resource::GRAPHICS:
				return "graphics";
				break;

			case Resource::POSITIONS:
				return "position";
				break;

			case Resource::COLORS:
				return "color";
				break;

			case Resource::STRINGS:
				return "string";
				break;
		}

		throw new Exception("unknown type");
	}

	/**
	 * Set value.
	 */
	public function value($value, $arg2=NULL) {
		if ($this->type==Resource::POSITIONS) {
			if ($arg2!==NULL)
				$value=array($value,$arg2);

			if (!is_array($value))
				$value=explode(",",$value);
		}

		$this->value=$value;

		return $this;
	}
}

?>