import math

x_length = 140
y_length = 58

x_axis_upper = 70
y_axis_upper = 29

def q2_xaxis_length(q1, q2):
    q2_length = (q2**2 - q1**2 + x_length**2) / (2 * x_length)
    return q2_length

def q1_yaxis_length(q1, q4):
    q1_length = (q1**2 - q4**2 + y_length**2) / (2 * y_length)
    return q1_length

def x_coord(q2_length):
    result = 0

    if (q2_length > x_axis_upper):
        result = q2_length - x_axis_upper

    elif (q2_length < x_axis_upper):
        result = -abs(x_axis_upper - q2_length)
        
    return result

def y_coord(q1_length):
    result = 0

    if (q1_length > y_axis_upper):
        result = -abs(q1_length - y_axis_upper)

    elif (q1_length < y_axis_upper):
        result = y_axis_upper - q1_length
        
    return result


# q1, q2, q3 = 75
test1_lengthxaxis = q2_xaxis_length(75, 75)
test1_lengthyaxis = q1_yaxis_length(75, 75)

x_coordinate = x_coord(test1_lengthxaxis)
y_coordinate = y_coord(test1_lengthyaxis)

print(x_coordinate)
print(y_coordinate)

# q1, q2, q4 = 42, 101, 59

test2_lengthxaxis = q2_xaxis_length(42, 101)
test2_lengthyaxis = q1_yaxis_length(42, 59)

x2_coordinate = x_coord(test2_lengthxaxis)
y2_coordinate = y_coord(test2_lengthyaxis)

print(x2_coordinate)
print(y2_coordinate)
