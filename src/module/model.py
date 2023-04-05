import cv2
import mediapipe as mp
import numpy as np
from playsound import playsound
from numpy import loadtxt

import os
import time





mp_drawing = mp.solutions.drawing_utils
mp_pose = mp.solutions.pose
pose = mp_pose.Pose()
points = mp_pose.PoseLandmark # Landmarks
file = open('../csv/graph.txt', 'w')
trained1 = []
trained2 = []
trained3 = []
trained4 = []

trained1 = loadtxt('../csv/good-posture1r.txt')
min_angle1 = int(min(trained1))
max_angle1 = int(max(trained1))
trained2 = loadtxt('../csv/good-posture2r.txt')
min_angle2 = int(min(trained2))
max_angle2 = int(max(trained2))
trained3 = loadtxt('../csv/bad-posture3r.txt')
min_angle3 = int(min(trained3))
max_angle3 = int(max(trained3))
trained4 = loadtxt('../csv/bad-posture4r.txt')
min_angle4 = int(min(trained4))
max_angle4 = int(max(trained4))


def calculate_angle(a, b, c):
    a = np.array(a)  # First
    b = np.array(b)  # Mid
    c = np.array(c)  # End

    radians = np.arctan2(c[1] - b[1], c[0] - b[0]) - np.arctan2(a[1] - b[1], a[0] - b[0])
    angle = np.abs(radians * 180.0 / np.pi)

    if angle > 180.0:
        angle = 360 - angle

    return angle

def model():
    cap = cv2.VideoCapture(0)
    stage = None
    s_num = None
    status = [None] * 60
    graph = []  # help to get an prediction graph

    ## Setup mediapipe instance
    with mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5) as pose:
        while cap.isOpened():
            ret, frame = cap.read()

            # Recolor image to RGB
            image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            image.flags.writeable = False

            # Make detection
            results = pose.process(image)

            # Recolor back to BGR
            image.flags.writeable = True
            image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

            # Extract landmarks
            try:
                for i in range(60):  # help to count how many times
                    landmarks = results.pose_landmarks.landmark

                    # Get coordinates
                    left_shoulder = [landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].x,
                                     landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].y]
                    right_shoulder = [landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].x,
                                      landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].y]
                    left_hip = [landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].x,
                                landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].y]
                    right_hip = [landmarks[mp_pose.PoseLandmark.RIGHT_HIP.value].x,
                                 landmarks[mp_pose.PoseLandmark.RIGHT_HIP.value].y]

                    # Calculate angle
                    angle1 = calculate_angle(left_shoulder, left_hip, right_hip)

                    # Visualize angle
                    cv2.putText(image, str(angle1),
                                tuple(np.multiply(left_hip, [640, 480]).astype(int)),
                                cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 2, cv2.LINE_AA
                                )

                    # Calculate angle
                    angle2 = calculate_angle(left_hip, left_shoulder, right_shoulder)

                    # Visualize angle
                    cv2.putText(image, str(angle2),
                                tuple(np.multiply(left_shoulder, [640, 480]).astype(int)),
                                cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 2, cv2.LINE_AA
                                )

                    if ((int(angle1) in range(min_angle1, max_angle1)) and (
                            int(angle2) in range(min_angle2, max_angle2))):

                        status[i] = "Good"

                    elif ((int(angle1) not in range(min_angle1, max_angle1)) and (
                            int(angle2) not in range(min_angle2, max_angle2))):

                        status[i] = "Bad"

                    elif ((int(angle1) in range(min_angle3, max_angle3)) and (
                            int(angle2) in range(min_angle4, max_angle4))):

                        if ((int(angle1) not in range(min_angle1, max_angle1)) and (
                                int(angle2) not in range(min_angle2, max_angle2))):

                            status[i] = "Bad"

                        else:

                            status[i] = "Good"

                predict = 0
                for value in status:
                    if value == "Good":
                        predict += 1

                length = len(status)
                if (predict / length) * 100 >= 75:
                    stage = "Excellent"
                    s_num = str(2)
                elif (predict / length) * 100 >= 65:
                    stage = "Good"
                    s_num = str(1)
                elif (predict / length) * 100 >= 50:
                    stage = "Average"
                    s_num = str(0)
                elif (predict / length) * 100 >= 35:
                    stage = "Bad"
                    s_num = str(-1)
                else:
                    stage = "Poor"
                    playsound.playsound('Warning.mp3')
                    s_num = str(-2)

                file = open('../csv/graph.txt', 'a')
                file.write(s_num + '\n')  # save the status to a txt file to further usage
                file.close()

            except:
                pass

            # Setup status box
            cv2.rectangle(image, (0, 0), (400, 75), (245, 117, 16), -1)

            # Stage data
            cv2.putText(image, 'STAGE', (35, 12),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 0), 1, cv2.LINE_AA)
            cv2.putText(image, stage,
                        (30, 60),
                        cv2.FONT_HERSHEY_SIMPLEX, 2, (255, 255, 255), 2, cv2.LINE_AA)

            # Render detections
            mp_drawing.draw_landmarks(image, results.pose_landmarks, mp_pose.POSE_CONNECTIONS,
                                      mp_drawing.DrawingSpec(color=(245, 117, 66), thickness=2, circle_radius=2),
                                      mp_drawing.DrawingSpec(color=(245, 66, 230), thickness=2, circle_radius=2)
                                      )

            cv2.imshow('Mediapipe Feed', image)


            if cv2.waitKey(10) & 0xFF == ord('q'):
                break
            success, buffer = cv2.imencode('.jpeg', image)
            image_bytes = buffer.tobytes()

            yield(b'--frame\r\n'
                  b'Content-Type: image/jpeg\r\n\r\n' + image_bytes + b'\r\n')


        cap.release()
        cv2.destroyAllWindows()

model()
