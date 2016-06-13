from flask import Flask, render_template, request, jsonify
import pins

app = Flask(__name__)

# Routing
@app.route('/')
def Index():
  return 'Hello world'

@app.route('/api')
def switch():
  state = request.args.get('state')
  switch = request.args.get('switch')
  if state =="on":
    pins.SwitchOn(switch)
  else:
    pins.SwitchOff(switch)
  return "success"


if __name__ == '__main__':
  app.run(debug=True, host='0.0.0.0')