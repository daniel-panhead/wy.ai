import math

height = 78
human = 5.7

vertical = height - human

def base_distance(angle):
    return vertical / math.tan(math.radians(angle))

# angle 30
distance = base_distance(60)
print(distance)