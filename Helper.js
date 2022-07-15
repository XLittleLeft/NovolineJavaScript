/** @author XLittleLeft#7638, ezMatt#9161 @obf by XLittleLeft#7638 */
module = script.registerModule("Helper",COMBAT);
BooleanSetting = new BooleanSetting("speed_helper","SpeedHelper",true);
BooleanSetting = new BooleanSetting("anti_void","BetterAntiVoid",false);
NumberSetting = new NumberSetting("set_delay","AntiVoidDelay",1000.0,1000.0,3000.0,10.0);
BooleanSetting = new BooleanSetting("army","MakeArmy",false);
NumberSetting = new NumberSetting("army_delay","ArmyDelay",1000.0,10.0,5000.0,10.0);
BooleanSetting = new BooleanSetting("iq_booster","IQBooster",true);
BooleanSetting = new BooleanSetting("debug","Debug",false);

var timer = timer_util.getTimer();

var voidtimer = timer_util.getTimer();

var speed_flag = false;

var hide = true;

var packets = [];
var x, y, z;

function printInfo2(text) {
    client.print("\u00A7dX-Helper -> \u00A7c" + text + "\u00A7f");
};

function printInfo(text) {
    client.print("\u00A7dX-Helper -> \u00A7b" + text + "\u00A7f");
};

module.onEvent("playerPreUpdateEvent",function(event){
    if (module.getProperty("speed_helper").getBoolean()) {
        if (client.isEnabled("Speed")) {
            if (client.isEnabled("Step")) {
                speed_flag = true;
                client.toggleModule("Step");
                printInfo2("Disabled Step");
            }
        } else if (speed_flag) {
             client.toggleModule("Step");
             printInfo("Enabled Step");
             speed_flag = false;
        }
    }
    if (module.getProperty("army").getBoolean()) {
        if (timer.delay(module.getProperty("army_delay").getLong())) {
        client.toggleModule("Blink");
        timer.reset();
        }
        if (hide) {
            player.sendMessage(".hide Blink");
            hide = false;
        }
    }
    if (module.getProperty("anti_void").getBoolean()) {
        if (client.isEnabled("AntiVoid")) {
            client.toggleModule("AntiVoid");
        }
        if(player.ticksExisted() === 0) {
            voidtimer.reset();
        }
    }
});

module.onEvent("packetSendEvent", function(event) {
    if (module.getProperty("anti_void").getBoolean()) {
	try {
		
		var packet = event.getPacket();
		
		if(isC03(packet)) {
			if(packet.isOnGround()) {
				
				if(packet.getName() != "0x03" && packet.getName() != "0x05") {
					x = packet.getX();
					y = packet.getY();
					z = packet.getZ();
                    if (module.getProperty("debug").getBoolean()) {
					client.print(x, y, z)
                    }
				}
				
				voidtimer.reset();
				
			} else if(overVoid()) {
				event.setCancelled(true);
				packets.push[packet]
				
				if(voidtimer.delay(module.getProperty("set_delay").getDouble()) && player.motionY < 0) {
					player.setPosition(x, y, z);
					packets = [];
				}
			}
			
			if(packet.isOnGround() || !overVoid()) {
				if(packets.length > 0) {
					for(var i = 0; i < packets.length; i++) {
						
						switch(p.getName()) {
							case "0x03": {
								connection.sendPacketNoEvent("0x03", p.isOnGround());
							}
							case "0x04": {
								connection.sendPacketNoEvent("0x04", p.getX(), p.getY(), p.getZ(), p.isOnGround());
							}
							case "0x05": {
								connection.sendPacketNoEvent("0x05", p.getYaw(), p.getPitch(), p.isOnGround());
							}
							case "0x06": {
								connection.sendPacketNoEvent("0x06", p.getX(), p.getY(), p.getZ(), p.getYaw(), p.getPitch(), p.isOnGround());
							}
						}
						
					}
					packets = [];
				}
			}
		}
	
	} catch (e) {
		client.print(e.message) 
	}
}
});

module.onEvent("enable",function(event){
    printInfo("Thanks for use XLittleLeft & ezMatt's js");
});

module.onEvent("disable",function(event){
    printInfo("UnLoad Successfully")
    timer.reset();
    voidtimer.reset();
});

function isC03(packet) {
	return (packet.getName() == "0x03" || packet.getName() == "0x04" || packet.getName() == "0x05" || packet.getName() == "0x06")
};

function overVoid() {
	for(var i = 0; i < player.getY(); i++) {
		if(blockName(player.getX(), i, player.getZ()) != "tile.air") {
			return false;
		}
	}
	return true;
};

function blockName(x_p,y_p,z_p) {
    return world.getBlockName(world.getBlockAtBlockPos(BlockPos(x_p,y_p,z_p)))
};

function BlockPos(ix, iy, iz) {
	return world.getBlockPos(ix < 0 ? ix - 1 : ix, iy, iz < 0 ? iz - 1 : iz);
};

//Adds a so-called "Check Box" property to the module
function BooleanSetting(key,name,state) {
    return module.addBooleanProperty(key,name,state);
};

//Adds a so-called "Slider" property to the module
function NumberSetting(key,name,value,min,max,increment) {
    if (value.equals(".") || min.equals(".") || max.equals(".") || increment.equals(".")) {
        return module.addDoubleProperty(key,name,value,min,max,increment);
    } else {
        return module.addFloatProperty(key,name,value,min,max,increment);
    }
};