/*-----------------------
a player entity
------------------------*/
game.PlayerEntity = me.ObjectEntity.extend({

	/* -----
	constructor
	----- */

	init: function(x, y, settings) {
		// call the constructor
		this.parent(x, y, settings);

		// set the default horizontal & vertical speed (accel vector)
		this.setVelocity(3, 10);

		// set the display to follow our position on both axis
		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
	},

	/* --- update the player position --- */
	update: function(dt) {
		if (me.input.isKeyPressed('left')) {
			// flip the sprite on horizontal axis
			this.flipX(true);
			// update the entity velocity
			this.vel.x -= this.accel.x * me.timer.tick;
		} else if (me.input.isKeyPressed('right')) {
			// unflip the sprite
			this.flipX(false);
			// update the entity velocity
			this.vel.x += this.accel.x * me.timer.tick;
		} else {
			this.vel.x = 0;
		}
		if (me.input.isKeyPressed('jump')) {
			// make sure we are not already jumping or falling
			if (!this.jumping && !this.falling) {
				// set current vel to the maximum defined value
				// gravity will then do the rest
				this.vel.y = -this.maxVel.y * me.timer.tick;
				// set the jumping flag
				this.jumping = true;
				// play some audio
				me.audio.play("jump");
			}

		}
		
		// check & update player movement
		this.updateMovement();

		// check for collision
		var res = me.game.world.collide(this);

		if (res) {
			// if we collide with an enemy
			if (res.obj.type == me.game.ENEMY_OBJECT) {
				// check if we jumped on it
				if ((res.y > 0) && !this.jumping) {
					// bounce (force jump)
					this.falling = false;
					this.vel.y = -this.maxVel.y * me.timer.tick;
					// set the jumping flag
					this.jumping = true;
					// play some audio
					me.audio.play("stomp");
                    // give some score
                    game.data.score += 50;
				} else {
					// let's flicker in case we touched an enemy
					this.renderable.flicker(750);
				}
			}
		}

		// update animation if necessary
		if (this.vel.x != 0 || this.vel.y != 0) {
			// update object animation
			this.parent(dt);
			return true;
		}

		// else inform the engine we did not perform
		// any update (e.g. position, animation)
		return false;
	}

});


/* ---
Frog entity
--- */
game.EnemyEntity = me.ObjectEntity.extend({
	init: function (x, y, settings) {
		// define this here instead of Tiled
		settings.image = "sprite_frog";

		// save the area size defined in Tiled
		var width = settings.width;
		var height = settings.height;

		// adjust the size setting information to match the sprite size
		// so that the entity object is created with the right size
		settings.spritewidth = settings.width = 16;
		settings.spriteheight = settings.height = 16; // ???

		// call the parent constructor
		this.parent(x, y, settings);

		// set start/end position based on the initial area size
		x = this.pos.x;
		this.startX = x;
		this.endX = x + width - settings.spritewidth;
		this.pos.x = x + width - settings.spritewidth;

		// walking & jumping speed
		this.setVelocity(4,6);

		// make it collidable
		this.collidable = true;
		this.type = me.game.ENEMY_OBJECT;
	},

	// call by the engine when colliding with another object
	// obj parameter corresponds to the other object (typically the player)
	// touching this one
	onCollision: function(res, obj) {
		// res.y >0 means touched by something on the bottom
		// which mean at top position for this one
		if (this.alive && (res.y > 0) && obj.falling) {
			this.renderable.flicker(750);
		}
	},

	// manage the enemy movement
	update: function(dt) {
		// do nothing if not in viewport
		if (!this.inViewport)
			return false;
		if (this.alive) {
			if (this.walkLeft && this.pos.x <= this.startX) {
				this.walkLeft = false;
			} else if (!this.walkLeft && this.pos.x >= this.endX) {
				this.walkLeft = true;
			}
			// make it walk
			this.flipX(this.walkLeft);
			this.vel.x += (this.walkLeft) ? -this.accel.x * me.timer.tick : this.accel.x * me.timer.tick;
		} else {
			this.vel.x = 0;
		}
		// check and update movement
		this.updateMovement();

		// update animation if necessary
		if (this.vel.x != 0 || this.vel.y != 0) {
			// update animation
			this.parent(dt);
			return true;
		}
		return false;
	}
});
