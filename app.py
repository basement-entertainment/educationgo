from flask import Flask, render_template, send_from_directory, url_for, session, redirect
from os.path import exists
import os

app = Flask(__name__)
app.secret_key = "SECRET"

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/game')
def last_game():
    recent_game = session.get('last_game')
    if recent_game:
        return redirect(url_for('serve_game', game=recent_game))
    return "No Active Game", 404

@app.route('/<game>/')
def serve_game(game):
    # Save most recent game to session


    # 1. Check for a templated HTML game
    template_path = f'templates/{game}/index.html'
    if exists(template_path):
        game_url = url_for('static', filename=f'{game}/index.html')
        return render_template('game_wrapper.html', game=game, game_url=game_url)

    # 2. Check for static HTML game
    static_index_path = f'static/{game}/index.html'
    if exists(static_index_path):
        game_url = url_for('serve_game_static', game=game, filename='index.html')
        session['last_game'] = game
        return render_template('game_wrapper.html', game=game, game_url=game_url)

    return "404 Game Not Found", 404


@app.route('/<game>/<path:filename>')
def serve_game_static(game, filename):
    static_file_path = f'static/{game}/{filename}'
    if exists(static_file_path):
        return send_from_directory(f'static/{game}', filename)
    return "404 File Not Found", 404

if __name__ == '__main__':
    app.run(debug=True, port=5050)
