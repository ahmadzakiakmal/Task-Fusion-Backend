from flask import Flask, request, jsonify
from kafka import KafkaProducer, KafkaConsumer
from kafka.errors import KafkaError
import json
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

kafka_broker = os.getenv('KAFKA_BROKER')

producer = KafkaProducer(
    bootstrap_servers=[kafka_broker],
    value_serializer=lambda v: json.dumps(v).encode('utf-8')
)

topic_name = 'notification'

@app.route("/", methods=["GET"])
def landing_page():
    return("""
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
  <body>
    <div style='min-height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; font-size: 24px; font-family: "Poppins"; text-align: center'>
      <p style='font-weight: 600; margin: 0'>
        Notification Service using Kafka
      </p>
    </div>
  </body>
  """)

@app.route('/produce', methods=['POST'])
def produce_message():
    message = request.json
    try:
        producer.send(topic_name, message)
        producer.flush()
        return jsonify({'status': 'Message sent to Kafka'}), 200
    except KafkaError as e:
        return jsonify({'status': 'Failed to send message', 'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
