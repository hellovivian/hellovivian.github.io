// franticEscape (custom)

class franticEscape extends RelationalVerb {
  update(entity, dt, data, bounds) {
    var spd = (data._params && data._params.speed) || 170;
    if (!data._t) data._t = 0;
    data._t += dt;
    this.lookAway(entity, dt, 10);
    var tgt = entity._target;
    var dx = entity.x - tgt.x, dy = entity.y - tgt.y;
    var dist = Math.sqrt(dx*dx+dy*dy)||1;
    // Panic when closer
    var panic = Math.max(0, 1 - dist/250);
    var curSpd = spd * (1 + panic*1.2);
    // Zigzag escape
    var zigzag = Math.sin(data._t*4)*0.6*panic;
    var ang = Math.atan2(dy,dx) + zigzag;
    var fx = Math.cos(ang), fy = Math.sin(ang);
    entity.vx += fx*curSpd*5*dt; entity.vy += fy*curSpd*5*dt;
    var drag = Math.exp(-3*dt);
    entity.vx *= drag; entity.vy *= drag;
    entity.x += entity.vx*dt; entity.y += entity.vy*dt;
    var r = entity.radius||15, b = bounds;
    if(entity.x<b.left+r){entity.x=b.left+r;entity.vx=Math.abs(entity.vx)*0.8;}
    if(entity.x>b.right-r){entity.x=b.right-r;entity.vx=-Math.abs(entity.vx)*0.8;}
    if(entity.y<b.top+r){entity.y=b.top+r;entity.vy=Math.abs(entity.vy)*0.8;}
    if(entity.y>b.bottom-r){entity.y=b.bottom-r;entity.vy=-Math.abs(entity.vy)*0.8;}
  }
}

// tunableParams
[
  {
    "name": "speed",
    "min": 60,
    "max": 300,
    "default": 170,
    "label": "Flee Speed"
  }
]

// franticEscape (custom)

class franticEscape extends RelationalVerb {
  update(entity, dt, data, bounds) {
    var spd = (data._params && data._params.speed) || 170;
    if (!data._t) data._t = 0;
    data._t += dt;
    this.lookAway(entity, dt, 10);
    var tgt = entity._target;
    var dx = entity.x - tgt.x, dy = entity.y - tgt.y;
    var dist = Math.sqrt(dx*dx+dy*dy)||1;
    // Panic when closer
    var panic = Math.max(0, 1 - dist/250);
    var curSpd = spd * (1 + panic*1.2);
    // Zigzag escape
    var zigzag = Math.sin(data._t*4)*0.6*panic;
    var ang = Math.atan2(dy,dx) + zigzag;
    var fx = Math.cos(ang), fy = Math.sin(ang);
    entity.vx += fx*curSpd*5*dt; entity.vy += fy*curSpd*5*dt;
    var drag = Math.exp(-3*dt);
    entity.vx *= drag; entity.vy *= drag;
    entity.x += entity.vx*dt; entity.y += entity.vy*dt;
    var r = entity.radius||15, b = bounds;
    if(entity.x<b.left+r){entity.x=b.left+r;entity.vx=Math.abs(entity.vx)*0.8;}
    if(entity.x>b.right-r){entity.x=b.right-r;entity.vx=-Math.abs(entity.vx)*0.8;}
    if(entity.y<b.top+r){entity.y=b.top+r;entity.vy=Math.abs(entity.vy)*0.8;}
    if(entity.y>b.bottom-r){entity.y=b.bottom-r;entity.vy=-Math.abs(entity.vy)*0.8;}
  }
}

// tunableParams
[
  {
    "name": "speed",
    "min": 60,
    "max": 300,
    "default": 170,
    "label": "Flee Speed"
  }
]