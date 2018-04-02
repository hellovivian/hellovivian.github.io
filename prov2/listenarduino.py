##############
## Script listens to serial port and writes contents into a file
##############
## requires pySerial to be installed 
import serial
import time

serial_port = '/dev/cu.usbmodem1421'
baud_rate = 115200; #In arduino, Serial.begin(baud_rate)
write_to_file_path = "./geotimeoutput.txt"
time.sleep(2)
ser = serial.Serial(serial_port, baud_rate, timeout=20)
i = 0
while True:
    output_file = open(write_to_file_path, "a")
    line = ser.readline()
    line = line.decode("utf-8") #ser.readline returns a binary, convert to string
    print(line)
    output_file.write(line)
    output_file.close()




# import sys, os, serial, threading

# def monitor():

#    ser = serial.Serial(COMPORT, BAUDRATE, timeout=0)

#    while (1):
#        line = ser.readline()
#        if (line != ""):
#            #print line[:-1]         # strip \n
#            fields = line[:-1].split('; ');

    
#            print "device ID: ", ID
#            # write to file
#            text_file = open("./Pdata.log", "w")
         
#            text_file.write(line)
#            text_file.close()

#        # do some other things here

#    print "Stop Monitoring"

# """ -------------------------------------------
# MAIN APPLICATION
# """  

# print "Start Serial Monitor"
# print

# COMPORT = 4;
# BAUDRATE = 115200

# monitor()