# Please see the newer visualizer instead 
[Coffee Visualizer](https://github.com/khoidauminh/coffeevis_rs)

## KD's audio visualizer
A small web pop-up window that displays the waveform/spectrum/sonogram of the input signal.

## How to use
Open the kdav_main.html with your browser (I've tested on Chrome and Firefox with Ok results). Once the pop-up window opens, click the 'start' button and choose your desired device (you can then close the other tab).

_note: the sonogram visualizer is still being worked on._

Sliders/parameters | Description
----------- | -----------
Waveform widowing | controlls the display time range of the oscilloscope and the sonogram. 
Rounghness | smaller value results in smoother spectrum animation, but will appear smaller.
Min frequency | 0 to 700 Hz.
Max frequency | 1000 to 20 000 Hz.
Height/brightness | controlls height of spectrum band columns and brightness of sonogram.
Frequency resolution | how many bands to process/display.
