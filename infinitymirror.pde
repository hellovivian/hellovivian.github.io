import ddf.minim.*;
import ddf.minim.analysis.*;
import ddf.minim.spi.*;
import processing.serial.*;

Serial port; 
AudioPlayer song;
BeatDetect beat;
Minim minim;
int vara = 65; int varb = 66; int varc = 67; int vard = 68; int vare = 69;

class BeatListener implements AudioListener
{
  private BeatDetect beat;
  private AudioPlayer source;
  
  BeatListener(BeatDetect beat, AudioPlayer source)
  {
    this.source = source;
    this.source.addListener(this);
    this.beat = beat;
  }
  
  void samples(float[] samps)
  {
    beat.detect(source.mix);
  }
  
  void samples(float[] sampsL, float[] sampsR)
  {
    beat.detect(source.mix);
  }
}

BeatListener bl;

void setup() {
  size(512, 300);
  minim = new Minim(this);
  song = minim.loadFile("olmos.mp3", 2048);
  song.play();
  beat = new BeatDetect(song.bufferSize(), song.sampleRate());
  beat.setSensitivity(200);
  bl = new BeatListener(beat, song);
  port = new Serial(this, Serial.list()[1], 9600);
  
  
}



void draw() {
  background(0);
  beat.detect(song.mix);
  float rectW = width / beat.detectSize();
  for(int i = 0; i < beat.detectSize(); ++i)
  {
    // test one frequency band for an onset
    if ( beat.isOnset(i) )
    {
       port.clear();
      if ( beat.isRange(5, 15, 4) ) {
        fill(232, 179, 2, 200);
      } else {
        fill(0,200,0);
      }
      //println(i);
      port.write(i);
      delay(50);
       //if ( beat.isRange(0, 5, 2) ) { port.write(vara); }
       //else if ( beat.isRange(6, 10, 2) ) { port.write(varb);  }
       //else if ( beat.isRange(11, 15, 2) ) { port.write(varc);  }
       //if ( beat.isRange(6, 8, 1) ) { port.write(varc);  }
       //if ( beat.isRange(9, 11, 1) ) { port.write(vard);  }
       //if ( beat.isRange(12, 15, 1) ) { port.write(vare);  }
      rect( i*rectW, 0, rectW, height);
    } else {
  
    }
   
  }
  
 
 
}