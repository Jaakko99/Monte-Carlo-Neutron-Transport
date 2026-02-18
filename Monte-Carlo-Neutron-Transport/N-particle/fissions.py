import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

# Load fission data from CSV
df = pd.read_csv('fissions.csv', names=['x', 'y', 'z'])

fig = plt.figure(figsize=(10, 8))
ax = fig.add_subplot(111, projection='3d')

# Plot fission points
ax.scatter(df['x'], df['y'], df['z'], c='red', marker='o', alpha=0.5)

# Draw the Uranium sphere for boundary reference

u, v = np.mgrid[0:2*np.pi:20j, 0:np.pi:10j]
x = 8.7 * np.cos(u) * np.sin(v)
y = 8.7 * np.sin(u) * np.sin(v)
z = 8.7 * np.cos(v)
ax.plot_wireframe(x, y, z, color="gray", alpha=0.1)

plt.title('Fission Locations in Uranium Sphere')
plt.show()