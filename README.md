## KD's audio visualizer
A small web pop-up window that displays the waveform/spectrum/sonogram of the input signal.

I wrote this HTML/CSS/Javascript program because I was frustrated for not being able to find any linux audio visualizers that satisfy me. Most of the programs I've been using come either as a Windows VST (which I have to run with Wine), a good linux program that unfortunately has an annoying bug, or one written in C that's old as heck. 

## How to use
Open the kdav_main.html with your browser (I've tested on Chrome and Firefox with Ok results). Once the pop-up window opens, click the 'start' button and choose your desired device (you can then close the other tab).

_note: the sonogram visualizer is still being worked on._

Sliders/parameters : 
Waveform widowing : controlls the display time range of the oscilloscope and the sonogram. 
Rounghness : smaller value results in smoother spectrum animation, but will appear smaller.
Min frequency : 0 to 700 Hz.
Max frequency : 1000 to 20 000 Hz.
Height/brightness : controlls height of spectrum band columns and brightness of sonogram.
Frequency resolution : how many bands to process/display.
