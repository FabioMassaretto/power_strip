import RPi.GPIO as GPIO

# Variables for the pins
pinNums = [4,17,22,24,23]

sw1 = 4
sw2 = 17
sw3 = 22
sw4 = 24
sw5 = 23

# GPIO Setup
GPIO.setwarnings(False)
GPIO.setmode(GPIO.BCM)

GPIO.setup(sw1, GPIO.OUT)
GPIO.setup(sw2, GPIO.OUT)
GPIO.setup(sw3, GPIO.OUT)
GPIO.setup(sw4, GPIO.OUT)
GPIO.setup(sw5, GPIO.OUT)

def Sw1On():
  GPIO.output(sw1, GPIO.HIGH)

def Sw1Off():
  GPIO.output(sw1, GPIO.LOW)

def SetSwitch(state):
  if state:
    Sw1On()
  else: Sw1Off()

if __name__ == "__main__":
  init()
  try:
    while(True):
      SetSwitch(True)
  except:
    Sw1Off()
    GPIO.cleanup()
    quit()
