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
    app.run(host='0.0.0.0', port=5000)
