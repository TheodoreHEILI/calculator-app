# Calculator App

A simple, modern web calculator with a dark theme.

## Features

- Basic operations: add, subtract, multiply, divide
- Clear (AC), toggle sign (±), percent (%)
- Keyboard support: numbers, `+`, `-`, `*`, `/`, `Enter`, `Escape`
- Responsive layout

## How to run

Open `index.html` in your browser, or serve the folder with any static server:

```bash
cd calculator-app
python3 -m http.server 8000
```

Then visit http://localhost:8000

## Push to GitHub

1. **Create a new repository on GitHub**
   - Go to [github.com/new](https://github.com/new)
   - Choose a name (e.g. `calculator-app`)
   - Leave "Add a README" and "Add .gitignore" **unchecked** (this project already has them)
   - Click **Create repository**

2. **In your terminal, from the `calculator-app` folder:**

   ```bash
   git init
   git add .
   git commit -m "Initial commit: calculator app"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/calculator-app.git
   git push -u origin main
   ```

   Replace `YOUR_USERNAME` with your GitHub username (and `calculator-app` if you used a different repo name).
