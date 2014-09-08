game.resources = [

	/* Graphics. 
	 * @example
	 * {name: "example", type:"image", src: "data/img/example.png"},
	 */
	// level tileset
	{name: "tiles_1", type:"image", src: "data/img/map/tiles_1.png"},
	// metatiles
	{name: "metatiles", type:"image", src: "data/img/map/metatiles.png"},
	// main player spritesheet
	{name: "sprite_ukkeli", type:"image", src: "data/img/sprite/sprite_player.png"},

	// enemies
	{name: "sprite_frog", type: "image", src: "data/img/sprite/sprite_frog.png"},
	{name: "sprite_firefrog", type: "image", src: "data/img/sprite/sprite_firefrog.png"},
	// game font
	{name: "32x32_font", type: "image", src: "data/img/font/32x32_font.png"},
	// title
	{name: "title_screen", type: "image", src: "data/img/gui/title_screen.png"},


	/* Atlases 
	 * @example
	 * {name: "example_tps", type: "tps", src: "data/img/example_tps.json"},
	 */
		
	/* Maps. 
	 * @example
	 * {name: "example01", type: "tmx", src: "data/map/example01.tmx"},
	 * {name: "example01", type: "tmx", src: "data/map/example01.json"},
 	 */
 	{name: "map01", type: "tmx", src: "data/map/map01.tmx"},

	/* Background music. 
	 * @example
	 * {name: "example_bgm", type: "audio", src: "data/bgm/"},
	 */
	 // {name: "DST-InertExponent", type: "audio", src: "data/bgm/"},

	/* Sound effects. 
	 * @example
	 * {name: "example_sfx", type: "audio", src: "data/sfx/"}
	 */
	 // melonjs determines which format&file to play in specific browser
	 {name: "cling", type: "audio", src: "data/sfx/"},
	 {name: "stomp", type: "audio", src: "data/sfx/"},
	 {name: "jump", type: "audio", src: "data/sfx/"}


];
