import subprocess

# Your project dependencies
dependencies = ["express"]

# Install project dependencies
for dep in dependencies:
    subprocess.run(["npm", "install", dep])

print("Dependencies installed successfully.")