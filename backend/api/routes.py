from flask import Blueprint, request, jsonify
import api.analyze as an
from scraper.spiders.audit_spider import run_spider

main = Blueprint('main', __name__)

@main.route('/audit', methods=['POST'])
def audit():
    url = request.json.get('url')
    if url:
        try:
            items = run_spider(url)
            print(f"Items returned to route: {items}")
            return jsonify(items), 200
        except Exception as e:
            print(f"Error: {str(e)}")
            return jsonify({"message": str(e)}), 500
    else:
        return jsonify({"message": "URL is required"}), 400

@main.route('/check_title', methods=['POST'])
def check_title():
    data = request.json
    title = data.get('title', '')
    result, status = an.analyze_title(title)
    return jsonify({'result': result, 'status': 'V' if status else 'X'})

@main.route('/check_meta_description', methods=['POST'])
def check_meta_description():
    data = request.json
    meta_description = data.get('metaDescription', '')
    result, status = an.analyze_meta_description(meta_description)
    return jsonify({'result': result, 'status': 'V' if status else 'X'})
