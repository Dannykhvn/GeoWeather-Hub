import subprocess

# Your project dependencies
dependencies = ["express", "sqlite3", "react", "axios", "cors", "bootstrap", "react-router-dom", "passport", "passport-local", "passport-local-mongoose", "express-session", "bcrypt"]

# Install project dependencies
for dep in dependencies:
    subprocess.run(["npm", "install", dep])

print("Dependencies installed successfully.")

