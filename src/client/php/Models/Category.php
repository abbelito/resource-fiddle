<?php

	/**
	 * A resource category.
	 */
	class Category {
		protected $resources;
		protected $categories;
		protected $description;
		protected $title;

		/**
		 * Construct.
		 */
		function __construct($title=NULL) {
			$this->title=$title;
			$this->resources=array();
			$this->categories=array();
		}

		/**
		 * Add resource.
		 */
		public function addResource($resource) {
			$this->resources[]=$resource;
		}

		/**
		 * Shorthand function to add a resource.
		 */
		public function image($name) {
			$r=new Resource(Resource::GRAPHICS, $name);
			$this->addResource($r);
			return $r;
		}

		/**
		 * Shorthand function to add a resource.
		 */
		public function color($name) {
			$r=new Resource(Resource::COLORS, $name);
			$this->addResource($r);
			return $r;
		}

		/**
		 * Shorthand function to add a resource.
		 */
		public function position($name) {
			$r=new Resource(Resource::POSITIONS, $name);
			$this->addResource($r);
			return $r;
		}

		/**
		 * Shorthand function to add a resource.
		 */
		public function string($name) {
			$r=new Resource(Resource::STRINGS, $name);
			$this->addResource($r);
			return $r;
		}

		/**
		 * Set description.
		 */
		public function description($desc) {
			$this->description=$desc;

			return $this;
		}

		/**
		 * Create and add a sub category.
		 */
		public function category($name) {
			$c=new Category($name);
			$this->categories[]=$c;
			return $c;
		}

		/**
		 * Get init data.
		 */
		protected function getDefinitionData() {
			$definitionData=array();

			$definitionData["title"]=$this->title;

			$definitionData["items"]=array();
			foreach ($this->resources as $item) {
				$definitionData["items"][]=array(
					"type"=>$item->getTypeAsString(),
					"name"=>$item->name,
					"value"=>$item->value
				);
			}

			$definitionData["categories"]=array();
			foreach ($this->categories as $cat) {
				$definitionData["categories"][]=$cat->getDefinitionData();
			}

			return $definitionData;
		}
	}