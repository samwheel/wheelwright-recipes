from flask import Flask, Response, send_from_directory
from flask_cors import CORS

app = Flask(__name__, static_folder='recipe-app/dist', static_url_path='/static')
CORS(app)

# Custom error handling
def not_found(status_code: int) -> tuple[Response, int]:
    return Response(status=status_code), status_code

# Frontend serving (if needed)
@app.route('/', methods=['GET'])
def serve_frontend() -> Response:
    # Serve built frontend index.html from recipe-app/dist if present,
    # otherwise serve recipe-app/index.html
    try:
        return send_from_directory('dist', 'index.html')
    except Exception:
        return send_from_directory('.', 'index.html')


@app.route('/<path:resource>', methods=['GET'])
def serve_static(resource: str) -> Response | tuple[Response, int]:
    # Try serving static files from the built frontend directory first.
    # If the file isn't found, fall back to the root `recipe-app` folder,
    # and finally return the SPA `index.html` so client-side routing works
    # only for known SPA routes. Unknown paths should return 404 so tests
    # and API behavior are preserved.
    # Serve obvious static files (assets, files with extensions, vite.svg).
    if resource.startswith('assets') or '.' in resource or resource in ('vite.svg', 'favicon.ico'):
        try:
            return send_from_directory('dist', resource)
        except Exception:
            pass
        try:
            return send_from_directory('.', resource)
        except Exception:
            return not_found(404)

    # Known SPA routes (handled client-side) should return index.html.
    if resource == '' or resource.startswith('recipe') or resource in ('add-recipe', 'about', 'recipes'):
        try:
            return send_from_directory('dist', 'index.html')
        except Exception:
            return send_from_directory('.', 'index.html')

    # For anything else, propagate a 404 so the API and tests behave as expected.
    return not_found(404)

app.register_error_handler(404, not_found)

if __name__ == '__main__':
    app.run(debug=False, port=5000, host='0.0.0.0')