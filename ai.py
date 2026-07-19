"""
AIHubMix Local Coding Assistant
Usage: python ai.py "your coding question"
"""
import sys
import os
import requests
import json

def load_env():
    env_path = os.path.join(os.path.dirname(__file__), '.env')
    if os.path.exists(env_path):
        with open(env_path) as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#') and '=' in line:
                    key, val = line.split('=', 1)
                    os.environ.setdefault(key.strip(), val.strip())

def chat(prompt):
    load_env()
    api_key = os.environ.get('AIHUBMIX_API_KEY', '')
    base_url = os.environ.get('AIHUBMIX_BASE_URL', 'https://aihubmix.com/v1')
    model = os.environ.get('AIHUBMIX_MODEL', 'coding-kimi-k3-free')

    if not api_key or api_key == 'YOUR_REGENERATED_KEY_HERE':
        print('Error: Set your API key in .env file')
        print('Get one at: https://aihubmix.com/token')
        sys.exit(1)

    resp = requests.post(
        f'{base_url}/chat/completions',
        headers={
            'Authorization': f'Bearer {api_key}',
            'Content-Type': 'application/json',
        },
        json={
            'model': model,
            'messages': [
                {'role': 'system', 'content': 'You are a coding assistant. Be concise and direct.'},
                {'role': 'user', 'content': prompt}
            ],
            'temperature': 0.3,
        },
        timeout=30,
    )
    resp.raise_for_status()
    return resp.json()['choices'][0]['message']['content']

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print('Usage: python ai.py "your question"')
        sys.exit(1)
    print(chat(sys.argv[1]))
